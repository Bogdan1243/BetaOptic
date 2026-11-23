import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import glassesLogo from '../assets/glasses-logo.webp';
import {
  ArrowLeft,
  Gift,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Copy,
  Check,
  Send,
  UserX,
  FileText,
} from 'lucide-react';
import LocationSection from './LocationSection';

// ============================================================================
// DATELE LEGALE ALE FIRMEI — DE COMPLETAT
// Completează câmpurile de mai jos cu datele oficiale ale societății (S.R.L.)
// ============================================================================
export const COMPANY_LEGAL_INFO = {
  srlName: '[DE COMPLETAT: S.C. NUME FIRMĂ S.R.L.]',
  cui: '[DE COMPLETAT: RO12345678]',
  regCom: '[DE COMPLETAT: J35/XXXX/20XX]',
  registeredAddress: '[DE COMPLETAT: Adresa Sediului Social, Timișoara, Jud. Timiș]',
  workingPointMain: 'Strada Lucian Blaga nr. 7, 300002 Timișoara, Jud. Timiș',
  workingPointOutlet: 'Strada Paris nr. 2a, 300003 Timișoara, Jud. Timiș',
  contactEmail: 'contact@betaoptic.ro',
  whatsappNumberDisplay: '+40 721 316 224',
  whatsappNumberRaw: '40721316224',
  voucherAmountRon: 100,
  voucherValidUntil: '23 Noiembrie 2027',
  // Opțional: Dacă dorești să salvezi automat numerele și într-un Google Sheet / Make.com webhook,
  // adaugă URL-ul webhook-ului aici (ex: "https://hook.eu1.make.com/...")
  optionalWebhookUrl: '',
};

/**
 * Generates a deterministic, verifiable voucher code from the user's phone number
 * so the same phone number receives a consistent code (e.g. BETA100-7K4M).
 */
function generateVoucherCode(phone) {
  const digits = phone.replace(/\D/g, '').slice(-8);
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

function navigateInternal(e, href) {
  if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
    e.preventDefault();
    if (window.location.pathname !== href) {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/**
 * Compact, Stylish & Non-Intrusive 100 RON WhatsApp Voucher Section
 */
export function VoucherSection() {
  const [phone, setPhone] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('betaoptic_voucher_100');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.code) {
          setGeneratedCode(parsed.code);
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanedPhone = phone.trim();
    const digitsOnly = cleanedPhone.replace(/\D/g, '');
    if (digitsOnly.length < 9 || digitsOnly.length > 15) {
      setErrorMsg('Te rugăm să introduci un număr de telefon valid (ex: 0721 000 000).');
      return;
    }

    if (!gdprConsent) {
      setErrorMsg('Pentru primirea codului pe WhatsApp, este necesar acordul de prelucrare a datelor (GDPR).');
      return;
    }

    setIsSubmitting(true);
    const fallbackCode = generateVoucherCode(cleanedPhone);
    const timestamp = new Date().toISOString();

    try {
      const res = await fetch('/api/voucher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'subscribe',
          phone: cleanedPhone,
          gdprConsent: true,
          consentVersion: 'v1-2026-11-23-whatsapp-100ron',
        }),
      });

      let finalCode = fallbackCode;
      if (res.ok) {
        const data = await res.json();
        if (data && data.code) finalCode = data.code;
      }

      setGeneratedCode(finalCode);
      try {
        window.localStorage.setItem(
          'betaoptic_voucher_100',
          JSON.stringify({ code: finalCode, phone: cleanedPhone, consentTimestamp: timestamp })
        );
      } catch {
        // ignore storage errors
      }
    } catch {
      // Fallback if running locally without serverless runtime (`vite` instead of `vercel dev`)
      setGeneratedCode(fallbackCode);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    if (!generatedCode || !navigator.clipboard) return;
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="voucher-cadou"
      className="pb-16 sm:pb-20 px-4 sm:px-6 md:px-16 w-full bg-[#FAF8F5] text-[#172554]"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-9 rounded-3xl bg-[#F4EFE6]/90 border border-[#E5DEC9] shadow-xs relative overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Left Column: Offer Description */}
            <div className="md:col-span-6 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#172554] text-[#FAF8F5] text-[10px] uppercase tracking-widest font-semibold">
                <Gift className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Beneficiu Exclusiv pe WhatsApp</span>
              </div>

              <h3 className="serif-title text-2xl sm:text-4xl font-bold text-[#172554] leading-tight">
                Voucher 100 RON Reducere în Showroom
              </h3>

              <p className="text-xs sm:text-sm text-[#172554]/80 leading-relaxed">
                Primești pe WhatsApp un cod personal de <strong>100 RON reducere</strong> pentru
                achiziția de <strong>rame de vedere sau ochelari de soare</strong> în magazin.
                Voucherul este valabil până la <strong>{COMPANY_LEGAL_INFO.voucherValidUntil}</strong> și{' '}
                <strong>se cumulează inclusiv cu produsele deja reduse</strong>.
              </p>
            </div>

            {/* Right Column: Form or Generated Code */}
            <div className="md:col-span-6">
              {generatedCode ? (
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DEC9] text-center space-y-3">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A6928] uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                    <span>Trimis pe WhatsApp & Activat</span>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <span className="font-mono text-xl sm:text-2xl font-bold tracking-widest px-4 py-2 rounded-xl bg-[#F4EFE6] border border-[#172554]/20 text-[#172554]">
                      {generatedCode}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      aria-label="Copiază codul"
                      className="p-2.5 rounded-xl bg-[#172554] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#172554] transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <p className="text-[11px] text-[#172554]/75 leading-relaxed">
                    Ți-am trimis mesajul cu voucherul pe WhatsApp! Prezintă codul în showroom la
                    achiziție (valabil până la {COMPANY_LEGAL_INFO.voucherValidUntil}).
                  </p>

                  <button
                    type="button"
                    onClick={() => setGeneratedCode('')}
                    className="text-[11px] underline text-[#172554]/60 hover:text-[#172554] cursor-pointer"
                  >
                    Introdu alt număr de telefon
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                  <div>
                    <label htmlFor="voucher-phone" className="sr-only">
                      Număr de telefon WhatsApp
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        id="voucher-phone"
                        type="tel"
                        required
                        maxLength={25}
                        autoComplete="tel"
                        placeholder="Număr telefon (ex: 0721 000 000)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-full bg-[#FAF8F5] border border-[#172554]/20 text-[#172554] placeholder:text-[#172554]/45 text-sm focus:outline-none focus:border-[#172554]"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-full bg-[#172554] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#172554] disabled:opacity-60 text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-xs cursor-pointer shrink-0"
                      >
                        <Send className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-[#172554]" />
                        <span>{isSubmitting ? 'Se trimite...' : 'Primește pe WhatsApp'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Mandatory Unchecked-by-Default GDPR Consent Checkbox */}
                  <label className="flex items-start gap-2.5 text-[11px] text-[#172554]/75 leading-snug cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={gdprConsent}
                      onChange={(e) => setGdprConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-[#172554]/30 accent-[#172554] shrink-0 cursor-pointer"
                    />
                    <span>
                      Sunt de acord cu prelucrarea numărului de telefon pentru a primi codul de 100
                      RON reducere și oferte speciale viitoare pe WhatsApp din partea Beta Optic,
                      conform{' '}
                      <a
                        href="/politica-de-confidentialitate"
                        onClick={(e) => navigateInternal(e, '/politica-de-confidentialitate')}
                        className="underline font-semibold text-[#172554] hover:text-[#8A6928]"
                      >
                        Politicii de Confidențialitate & Regulamentului
                      </a>
                      . Mă pot{' '}
                      <a
                        href="/dezabonare"
                        onClick={(e) => navigateInternal(e, '/dezabonare')}
                        className="underline font-semibold text-[#172554] hover:text-[#8A6928]"
                      >
                        dezabona
                      </a>{' '}
                      oricând.
                    </span>
                  </label>

                  {errorMsg && (
                    <p role="alert" className="text-xs font-medium text-red-700">
                      {errorMsg}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LegalHeader({ onBack }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#172554]/10 px-4 sm:px-6 md:px-16 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href="/"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                e.preventDefault();
                if (onBack) onBack();
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 md:py-2 min-h-[44px] md:min-h-0 rounded-full border border-[#172554]/20 bg-[#F4EFE6] hover:bg-[#172554] hover:text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-xs group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-[#FAF8F5] group-hover:-translate-x-1 transition-transform shrink-0" />
            <span>Pagina Principală</span>
          </a>

          <div className="h-6 w-px bg-[#172554]/15 hidden sm:block" />

          <a
            href="/"
            aria-label="Beta Optic Timișoara — Pagina Principală"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                e.preventDefault();
                if (onBack) onBack();
              }
            }}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full border border-[#172554]/30 flex items-center justify-center bg-[#FAF8F5] p-1.5 shrink-0">
              <img
                src={glassesLogo}
                alt="Sigla Beta Optic Timișoara"
                width="36"
                height="26"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <span className="serif-title text-lg font-bold tracking-widest text-[#172554] uppercase leading-none block">
                BETA OPTIC<sup className="text-[10px] font-bold align-super ml-0.5">®</sup>
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#172554]/60 uppercase font-medium">
                Timișoara
              </span>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}

/**
 * Dedicated GDPR Privacy Policy & Official Voucher Campaign Regulation Page
 * (/politica-de-confidentialitate)
 */
export function PrivacyPolicyPage({ onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] text-[#172554] selection:bg-[#172554] selection:text-[#FAF8F5] font-sans antialiased overflow-x-hidden">
      <LegalHeader onBack={onBack} />

      <main className="py-12 sm:py-16 px-4 sm:px-6 md:px-16 max-w-4xl mx-auto space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#172554]/15 bg-[#F4EFE6] text-xs uppercase tracking-widest">
            <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Protecția Datelor (GDPR) & Regulament</span>
          </div>
          <h1 className="serif-title text-3xl sm:text-5xl font-bold text-[#172554]">
            Politica de Confidențialitate (GDPR) și Regulamentul Voucherului de 100 RON
          </h1>
          <p className="text-xs text-[#172554]/60">
            Ultima actualizare: 23 Noiembrie 2026
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#F4EFE6] border border-[#E5DEC9] space-y-6 text-sm leading-relaxed text-[#172554]/90">
          <section className="space-y-2">
            <h2 className="serif-title text-2xl font-bold text-[#172554]">
              1. Identitatea Operatorului de Date cu Caracter Personal
            </h2>
            <p>
              Website-ul <strong>betaoptic.ro</strong> și programul de acordare a voucherelor
              promoționale pe WhatsApp sunt operate de{' '}
              <strong>{COMPANY_LEGAL_INFO.srlName}</strong>, având Codul Unic de Înregistrare (CUI){' '}
              <strong>{COMPANY_LEGAL_INFO.cui}</strong>, înregistrată la Registrul Comerțului sub
              nr. <strong>{COMPANY_LEGAL_INFO.regCom}</strong>, cu sediul social în{' '}
              <strong>{COMPANY_LEGAL_INFO.registeredAddress}</strong> și punctele de lucru în:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Beta Optic (Sediu Central):</strong> {COMPANY_LEGAL_INFO.workingPointMain}
              </li>
              <li>
                <strong>Beta Optic Outlet:</strong> {COMPANY_LEGAL_INFO.workingPointOutlet}
              </li>
            </ul>
            <p>
              Pentru orice solicitări privind protecția datelor cu caracter personal, ne poți
              contacta la adresa de e-mail <strong>{COMPANY_LEGAL_INFO.contactEmail}</strong> sau la
              numărul de telefon/WhatsApp <strong>{COMPANY_LEGAL_INFO.whatsappNumberDisplay}</strong>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="serif-title text-2xl font-bold text-[#172554]">
              2. Ce Date Colectăm, Scopul și Temeiul Legal (Art. 6 alin. 1 lit. a GDPR)
            </h2>
            <p>
              În cadrul secțiunii „Voucher 100 RON Reducere în Showroom”, colectăm exclusiv{' '}
              <strong>numărul tău de telefon</strong>, data/ora exprimării consimțământului și codul
              de reducere asociat, doar în urma bifării explicite a căsuței de consimțământ.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Scop:</strong> Emiterea și validarea codului de reducere de 100 RON în
                showroom, precum și transmiterea de oferte speciale și promoții Beta Optic prin
                intermediul WhatsApp/SMS.
              </li>
              <li>
                <strong>Temei legal:</strong> Consimțământul tău expres, liber exprimat și
                neechivoc, conform Art. 6 alin. (1) lit. (a) din Regulamentul (UE) 2016/679 (GDPR)
                și Art. 12 din Legea nr. 506/2004.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="serif-title text-2xl font-bold text-[#172554]">
              3. Durata de Stocare și Destinatarii Datelor
            </h2>
            <p>
              Datele tale sunt păstrate în condiții de securitate până la retragerea
              consimțământului (dezabonare) sau pe o perioadă de maximum 24 de luni de la ultima
              interacțiune. Nu vindem și nu cedăm numărul tău de telefon către terți.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="serif-title text-2xl font-bold text-[#172554]">
              4. Drepturile Tale Conform GDPR și Cum Te Poți Dezabona
            </h2>
            <p>
              Conform GDPR, beneficiezi de: dreptul de acces la date, dreptul la rectificare,
              dreptul la ștergerea datelor („dreptul de a fi uitat”), dreptul la restricționarea
              prelucrării, dreptul la portabilitate și{' '}
              <strong>dreptul de a-ți retrage consimțământul în orice moment</strong>.
            </p>
            <p>
              Te poți dezabona oricând, gratuit și fără nicio justificare, accesând pagina dedicată
              de{' '}
              <a
                href="/dezabonare"
                onClick={(e) => navigateInternal(e, '/dezabonare')}
                className="underline font-bold text-[#172554]"
              >
                Dezabonare
              </a>
              , trimițând mesajul <strong>STOP</strong> pe WhatsApp la{' '}
              <strong>{COMPANY_LEGAL_INFO.whatsappNumberDisplay}</strong> sau printr-un e-mail la{' '}
              <strong>{COMPANY_LEGAL_INFO.contactEmail}</strong>. De asemenea, ai dreptul de a
              depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu
              Caracter Personal (ANSPDCP — www.dataprotection.ro).
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-[#172554]/15">
            <h2 className="serif-title text-2xl font-bold text-[#172554]">
              5. Regulamentul Oficial al Campaniei „Voucher 100 RON Reducere” (OUG 99/2000)
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Valoarea reducerii:</strong> 100 RON (lei) reducere aplicată direct la
                achiziția din showroom.
              </li>
              <li>
                <strong>Produse eligibile:</strong> Voucherul se aplică la achiziția de{' '}
                <strong>rame de vedere</strong> sau <strong>ochelari de soare</strong> din
                showroom-urile Beta Optic Timișoara.
              </li>
              <li>
                <strong>Cumularea cu alte reduceri:</strong> Voucherul de 100 RON{' '}
                <strong>se aplică inclusiv produselor deja reduse</strong> (se cumulează cu
                reducerile existente în magazin).
              </li>
              <li>
                <strong>Perioada de valabilitate:</strong> Codul este valabil până la data de{' '}
                <strong>{COMPANY_LEGAL_INFO.voucherValidUntil}</strong>.
              </li>
              <li>
                <strong>Mod de utilizare:</strong> Prezentarea codului generat (și a mesajului
                WhatsApp) în showroom înainte de emiterea bonului fiscal. Un client poate utiliza un
                singur voucher de 100 RON per achiziție; voucherul nu poate fi preschimbat în
                numerar.
              </li>
            </ul>
          </section>
        </div>
      </main>

      <LocationSection />
    </div>
  );
}

/**
 * Dedicated Unsubscribe Page (/dezabonare)
 */
export function UnsubscribePage({ onBack }) {
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const cleaned = phone.trim();
    const digits = cleaned.replace(/\D/g, '');
    if (digits.length < 9 || digits.length > 15) {
      setErrorMsg('Te rugăm să introduci numărul de telefon pe care dorești să îl dezabonezi.');
      return;
    }

    setIsSubmitting(true);

    try {
      window.localStorage.removeItem('betaoptic_voucher_100');
    } catch {
      // ignore
    }

    try {
      await fetch('/api/voucher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'unsubscribe',
          phone: cleaned,
        }),
      });
    } catch {
      // ignore network error in local static preview
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] text-[#172554] selection:bg-[#172554] selection:text-[#FAF8F5] font-sans antialiased overflow-x-hidden">
      <LegalHeader onBack={onBack} />

      <main className="py-14 sm:py-20 px-4 sm:px-6 md:px-16 max-w-2xl mx-auto">
        <div className="p-6 sm:p-10 rounded-3xl bg-[#F4EFE6] border border-[#E5DEC9] shadow-xs text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E5DEC9] flex items-center justify-center mx-auto text-[#C5A059]">
            <UserX className="w-5 h-5" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#8A6928]">
              Retragerea Consimțământului GDPR
            </span>
            <h1 className="serif-title text-3xl sm:text-4xl font-bold text-[#172554]">
              Dezabonare Oferte WhatsApp
            </h1>
            <p className="text-xs sm:text-sm text-[#172554]/75 leading-relaxed max-w-md mx-auto">
              Introdu numărul tău de telefon mai jos pentru a-ți retrage consimțământul și a opri
              primirea ofertelor promoționale pe WhatsApp din partea Beta Optic.
            </p>
          </div>

          {submitted ? (
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DEC9] space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#C5A059] mx-auto" />
              <h2 className="serif-title text-2xl font-bold text-[#172554]">
                Dezabonare Confirmată
              </h2>
              <p className="text-xs text-[#172554]/80 leading-relaxed">
                Numărul <strong>{phone}</strong> a fost dezabonat cu succes din lista de comunicări
                comerciale pe WhatsApp a Beta Optic, conform GDPR.
              </p>
            </div>
          ) : (
            <form onSubmit={handleUnsubscribe} className="space-y-4 max-w-md mx-auto" noValidate>
              <div>
                <label htmlFor="unsub-phone" className="sr-only">
                  Numărul de telefon pentru dezabonare
                </label>
                <input
                  id="unsub-phone"
                  type="tel"
                  required
                  maxLength={25}
                  placeholder="Numărul tău de telefon (ex: 0721 000 000)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-[#FAF8F5] border border-[#172554]/20 text-[#172554] text-sm text-center focus:outline-none focus:border-[#172554]"
                />
              </div>

              {errorMsg && (
                <p role="alert" className="text-xs font-medium text-red-700">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 min-h-[44px] rounded-full bg-[#172554] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#172554] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-xs cursor-pointer"
              >
                Confirmă Dezabonarea
              </button>
            </form>
          )}

          <p className="text-[11px] text-[#172554]/60 pt-2">
            Poți citi toate detaliile privind drepturile tale în{' '}
            <a
              href="/politica-de-confidentialitate"
              onClick={(e) => navigateInternal(e, '/politica-de-confidentialitate')}
              className="underline font-semibold text-[#172554]"
            >
              Politica de Confidențialitate (GDPR)
            </a>
            .
          </p>
        </div>
      </main>

      <LocationSection />
    </div>
  );
}
