/**
 * Vercel Serverless Function: /api/voucher
 *
 * Handles:
 * 1. POST { action: "subscribe", phone, gdprConsent, consentVersion }
 *    -> Normalizes phone number, generates BETA100-XXXX code, logs to Google Sheet,
 *       and sends the voucher message via Official Meta WhatsApp Cloud API.
 * 2. POST { action: "unsubscribe", phone }
 *    -> Marks the phone number as DEZABONAT in the Google Sheet.
 * 3. GET (Meta Webhook Verification) & POST (Meta Incoming Message Webhook for "STOP" replies).
 */

function normalizeRomanianPhone(rawPhone = '') {
  let digits = String(rawPhone).replace(/\D/g, '');
  if (digits.startsWith('00')) {
    digits = digits.slice(2);
  }
  if (digits.length === 10 && digits.startsWith('07')) {
    return `4${digits}`; // 07xxxxxxxx -> 407xxxxxxxx
  }
  if (digits.length === 9 && digits.startsWith('7')) {
    return `40${digits}`; // 7xxxxxxxx -> 407xxxxxxxx
  }
  return digits;
}

function generateVoucherCode(normalizedPhone) {
  const digits = normalizedPhone.slice(-8);
  let hash = 2166136261;
  for (let i = 0; i < digits.length; i++) {
    hash ^= digits.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let suffix = '';
  let val = Math.abs(hash);
  for (let i = 0; i < 4; i++) {
    suffix += alphabet[val % alphabet.length];
    val = Math.floor(val / alphabet.length);
  }
  return `BETA100-${suffix}`;
}

async function logToGoogleSheet(payload) {
  const sheetWebhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!sheetWebhookUrl) return { logged: false, reason: 'GOOGLE_SHEET_WEBHOOK_URL not set' };

  try {
    const res = await fetch(sheetWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return { logged: res.ok };
  } catch (err) {
    console.error('Google Sheet webhook error:', err);
    return { logged: false, error: err.message };
  }
}

async function sendMetaWhatsAppVoucher({ toPhone, code }) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME || 'hello_world';
  const templateLang = process.env.WHATSAPP_TEMPLATE_LANG || (templateName === 'hello_world' ? 'en_US' : 'ro');

  if (!token || !phoneId) {
    return {
      sent: false,
      reason: 'Missing WHATSAPP_TOKEN or WHATSAPP_PHONE_NUMBER_ID environment variables',
    };
  }

  const url = `https://graph.facebook.com/v21.0/${phoneId}/messages`;

  const templatePayload =
      templateName === 'hello_world'
          ? {
            name: 'hello_world',
            language: { code: 'en_US' },
          }
          : {
            name: templateName,
            language: { code: templateLang },
            components: [
              {
                type: 'body',
                parameters: [{ type: 'text', text: code }],
              },
            ],
          };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: toPhone,
      type: 'template',
      template: templatePayload,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    console.error('Meta WhatsApp API error:', data);
    return {
      sent: false,
      error: data?.error?.message || 'Meta API request failed',
      details: data,
    };
  }

  return { sent: true, messageId: data?.messages?.[0]?.id };
}

async function sendMetaWhatsAppTextReply({ toPhone, text }) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneId) return;

  await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: toPhone,
      type: 'text',
      text: { body: text },
    }),
  }).catch(() => {});
}

export default async function handler(req, res) {
  // CORS pentru site-ul găzduit pe CyberFolks (betaoptic.ro)
  const allowedOrigins = ['https://betaoptic.ro', 'https://www.betaoptic.ro'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://betaoptic.ro');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. Meta Webhook Verification (GET /api/voucher?hub.mode=subscribe&hub.verify_token=...)
  if (req.method === 'GET') {
    const mode = req.query?.['hub.mode'];
    const token = req.query?.['hub.verify_token'];
    const challenge = req.query?.['hub.challenge'];
    const verifyToken = (
        process.env.WHATSAPP_VERIFY_TOKEN ||
        process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN ||
        'betaoptic2026'
    ).trim();

    if (mode === 'subscribe' && token === verifyToken) {
      return res.status(200).send(challenge);
    }
    return res.status(200).json({ status: 'Beta Optic WhatsApp Voucher API active' });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};

  // 2. Meta Incoming WhatsApp Message Webhook (e.g., user replies "STOP" or "DEZABONARE")
  if (body.object === 'whatsapp_business_account') {
    try {
      const entry = body.entry?.[0];
      const change = entry?.changes?.[0]?.value;
      const message = change?.messages?.[0];
      if (message && message.from) {
        const senderPhone = message.from;
        const textBody = (
            message.text?.body ||
            message.button?.text ||
            ''
        )
            .trim()
            .toUpperCase();

        if (textBody === 'STOP' || textBody === 'DEZABONARE' || textBody.includes('DEZABONARE')) {
          await logToGoogleSheet({
            action: 'UNSUBSCRIBE',
            phone: senderPhone,
            timestamp: new Date().toISOString(),
            source: 'WHATSAPP_STOP_REPLY',
          });

          await sendMetaWhatsAppTextReply({
            toPhone: senderPhone,
            text: 'Confirmare Beta Optic: Numărul dvs. a fost dezabonat cu succes de la comunicările comerciale pe WhatsApp, conform GDPR.',
          });
        }
      }
    } catch (err) {
      console.error('Webhook processing error:', err);
    }
    return res.status(200).json({ received: true });
  }

  // 3. Website Form Submissions: Subscribe or Unsubscribe
  const { action = 'subscribe', phone, gdprConsent, consentVersion } = body;
  const normalizedPhone = normalizeRomanianPhone(phone);

  if (!normalizedPhone || normalizedPhone.length < 10 || normalizedPhone.length > 15) {
    return res.status(400).json({
      error: 'Te rugăm să introduci un număr de telefon valid (ex: 0721 000 000).',
    });
  }

  if (action === 'unsubscribe') {
    const timestamp = new Date().toISOString();
    await logToGoogleSheet({
      action: 'UNSUBSCRIBE',
      phone: normalizedPhone,
      timestamp,
      source: 'WEBSITE_UNSUBSCRIBE_PAGE',
    });

    return res.status(200).json({
      ok: true,
      message: 'Numărul tău a fost dezabonat cu succes din lista de comunicări comerciale.',
    });
  }

  // Default action: subscribe & send 100 RON voucher
  if (!gdprConsent) {
    return res.status(400).json({
      error: 'Este necesar acordul GDPR pentru a primi codul de reducere pe WhatsApp.',
    });
  }

  const code = generateVoucherCode(normalizedPhone);
  const timestamp = new Date().toISOString();

  // Log consent & voucher in Google Sheet + send WhatsApp message in parallel
  const [sheetResult, waResult] = await Promise.all([
    logToGoogleSheet({
      action: 'SUBSCRIBE',
      phone: normalizedPhone,
      code,
      consent: true,
      consentVersion: consentVersion || 'v1-2026-11-23-whatsapp-100ron',
      timestamp,
    }),
    sendMetaWhatsAppVoucher({
      toPhone: normalizedPhone,
      code,
    }),
  ]);

  return res.status(200).json({
    ok: true,
    code,
    whatsappSent: waResult.sent,
    sheetLogged: sheetResult.logged,
    note: waResult.sent
        ? 'Mesajul cu codul de reducere a fost trimis pe WhatsApp.'
        : 'Codul a fost generat (completează cheile Meta API în variabilele de mediu pentru trimitere automată pe WhatsApp).',
  });
}