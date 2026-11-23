/**
 * ============================================================================
 * GOOGLE SHEETS GDPR & VOUCHER AUDIT REGISTRY — GOOGLE APPS SCRIPT
 * ============================================================================
 * Cum se instalează (durează 1 minut, 100% gratuit):
 * 1. Creează un Google Sheet nou și privat pe contul Google al firmei (ex: "Beta Optic - Vouchere 100 RON & GDPR").
 * 2. În meniul de sus al tabelului, apasă pe: Extensions (Extensii) -> Apps Script.
 * 3. Șterge codul existent acolo și lipește tot acest fișier.
 * 4. Apasă pe butonul "Deploy" (Dreapta sus) -> "New deployment":
 *    - Select type: "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (astfel încât serverul betaoptic.ro să poată trimite datele în tabel)
 * 5. Copiază "Web app URL" generat și adaugă-l în Vercel (Environment Variables) sub numele:
 *    GOOGLE_SHEET_WEBHOOK_URL
 * ============================================================================
 */

function ensureHeaderRow(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Data & Ora (Timestamp GDPR)',
      'Număr Telefon',
      'Cod Voucher 100 RON',
      'Status Marketing (ACTIV / DEZABONAT)',
      'Versiune Acord GDPR',
      'Folosit în Magazin? (NU / DA)',
      'Data & Sursa Dezabonării'
    ]);
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    ensureHeaderRow(sheet);

    var data = JSON.parse(e.postData.contents || '{}');
    var phone = String(data.phone || '').replace(/\D/g, '');
    var action = data.action || 'SUBSCRIBE';
    var timestamp = data.timestamp || new Date().toISOString();

    var lastRow = sheet.getLastRow();
    var existingRowIndex = -1;

    if (lastRow > 1) {
      var phoneColumn = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
      for (var i = 0; i < phoneColumn.length; i++) {
        var rowPhone = String(phoneColumn[i][0]).replace(/\D/g, '');
        if (rowPhone === phone) {
          existingRowIndex = i + 2;
          break;
        }
      }
    }

    if (action === 'UNSUBSCRIBE') {
      if (existingRowIndex !== -1) {
        sheet.getRange(existingRowIndex, 4).setValue('DEZABONAT');
        sheet.getRange(existingRowIndex, 7).setValue(timestamp + ' (' + (data.source || 'WEB') + ')');
      } else {
        sheet.appendRow([
          timestamp,
          phone,
          '-',
          'DEZABONAT',
          '-',
          '-',
          timestamp + ' (' + (data.source || 'WEB') + ')'
        ]);
      }
      return ContentService.createTextOutput(JSON.stringify({ ok: true, status: 'DEZABONAT' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // SUBSCRIBE action
    if (existingRowIndex !== -1) {
      // Reactivate consent if previously unsubscribed, keep existing voucher code & usage status
      sheet.getRange(existingRowIndex, 1).setValue(timestamp);
      sheet.getRange(existingRowIndex, 4).setValue('ACTIV');
      sheet.getRange(existingRowIndex, 5).setValue(data.consentVersion || 'v1-2026-11-23');
      sheet.getRange(existingRowIndex, 7).setValue('-');
    } else {
      sheet.appendRow([
        timestamp,
        phone,
        data.code || '',
        'ACTIV',
        data.consentVersion || 'v1-2026-11-23',
        'NU',
        '-'
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true, status: 'ACTIV' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
