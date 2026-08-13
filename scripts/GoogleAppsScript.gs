/********************************************************
 * SOBHA SANCTUARY - Lead Form Backend
 * Google Apps Script Web App
 *
 * SETUP:
 * 1. Go to https://script.google.com  -> New project.
 * 2. Paste this whole file as Code.gs.
 * 3. Set ADMIN_EMAIL below (the email that receives
 *    enquiry notifications).
 * 4. Deploy -> New deployment -> Web app
 *      Execute as  : Me
 *      Who has access : Anyone
 * 5. Copy the Web app URL into
 *    src/services/leadService.ts (APPS_SCRIPT_URL).
 ********************************************************/

var ADMIN_EMAIL = 'your-admin-email@gmail.com'; // TODO: replace with admin email

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var firstName = data.firstName || '';
    var lastName = data.lastName || '';
    var email = data.email || '';
    var phone = data.phone || '';
    var city = data.city || '';
    var reason = data.reason || '';
    var type = data.type || 'Enquiry';

    // 1) Admin notification
    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: 'New Enquiry - ' + type + ' - Sobha Sanctuary',
      htmlBody: buildAdminEmail(firstName, lastName, email, phone, city, reason, type),
    });

    // 2) Thank-you email to the user
    if (email) {
      MailApp.sendEmail({
        to: email,
        subject: 'Thank You - Sobha Sanctuary',
        htmlBody: buildUserEmail(firstName, lastName),
      });
    }

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: String(err) });
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function buildAdminEmail(firstName, lastName, email, phone, city, reason, type) {
  var name = [firstName, lastName].filter(Boolean).join(' ') || '-';
  var rows =
    '<tr><td style="padding:10px 0;color:#5f5e5e;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">Full Name</td><td style="padding:10px 0;color:#1b1c1c;font-size:14px;">' + escapeHtml(name) + '</td></tr>' +
    '<tr><td style="padding:10px 0;color:#5f5e5e;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">Email</td><td style="padding:10px 0;color:#1b1c1c;font-size:14px;">' + escapeHtml(email) + '</td></tr>' +
    '<tr><td style="padding:10px 0;color:#5f5e5e;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">Phone</td><td style="padding:10px 0;color:#1b1c1c;font-size:14px;">' + escapeHtml(phone || '-') + '</td></tr>' +
    '<tr><td style="padding:10px 0;color:#5f5e5e;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">Country</td><td style="padding:10px 0;color:#1b1c1c;font-size:14px;">' + escapeHtml(city || '-') + '</td></tr>' +
    '<tr><td style="padding:10px 0;color:#5f5e5e;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">Interest</td><td style="padding:10px 0;color:#1b1c1c;font-size:14px;">' + escapeHtml(reason || '-') + '</td></tr>' +
    '<tr><td style="padding:10px 0;color:#5f5e5e;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">Source</td><td style="padding:10px 0;color:#1b1c1c;font-size:14px;">' + escapeHtml(type || '-') + '</td></tr>';

  return (
    '<div style="background:#f5f3f3;padding:40px 20px;font-family:Arial,Helvetica,sans-serif;">' +
    '  <div style="max-width:620px;margin:0 auto;background:#ffffff;border-top:6px solid #79542e;">' +
    '    <div style="background:#1b1c1c;padding:28px 32px;text-align:center;">' +
    '      <div style="color:#c9a86a;font-size:12px;letter-spacing:4px;font-weight:bold;">SOBHA SANCTUARY</div>' +
    '      <div style="color:#ffffff;font-size:20px;margin-top:8px;letter-spacing:1px;">New ' + escapeHtml(type) + '</div>' +
    '    </div>' +
    '    <div style="padding:32px;">' +
    '      <table style="width:100%;border-collapse:collapse;">' + rows + '</table>' +
    '    </div>' +
    '    <div style="background:#f5f3f3;padding:16px 32px;color:#5f5e5e;font-size:12px;text-align:center;border-top:1px solid #e4e2e2;">' +
    '      This enquiry was submitted through the Sobha Sanctuary website.' +
    '    </div>' +
    '  </div>' +
    '</div>'
  );
}

function buildUserEmail(firstName, lastName) {
  var greeting = firstName || (firstName + ' ' + lastName) || 'there';

  return (
    '<div style="background:#f5f3f3;padding:40px 20px;font-family:Arial,Helvetica,sans-serif;">' +
    '  <div style="max-width:620px;margin:0 auto;background:#ffffff;border-top:6px solid #79542e;">' +
    '    <div style="background:#1b1c1c;padding:32px;text-align:center;">' +
    '      <div style="color:#c9a86a;font-size:12px;letter-spacing:4px;font-weight:bold;">SOBHA SANCTUARY</div>' +
    '      <div style="color:#ffffff;font-size:22px;margin-top:10px;">Thank You</div>' +
    '    </div>' +
    '    <div style="padding:32px;color:#1b1c1c;">' +
    '      <h2 style="margin:0 0 16px;font-size:20px;">Dear ' + escapeHtml(greeting) + ',</h2>' +
    '      <p style="font-size:14px;line-height:1.7;color:#5f5e5e;">Thank you for your interest in Sobha Sanctuary by Sobha Realty. We have received your enquiry and one of our dedicated investment advisors will be in touch with you shortly regarding availability, pricing and exclusive offers.</p>' +
    '      <div style="border-left:4px solid #c9a86a;background:#f5f3f3;padding:16px 20px;margin:24px 0;">' +
    '        <div style="color:#5f5e5e;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">Our Team</div>' +
    '        <div style="color:#1b1c1c;font-size:14px;margin-top:6px;">Sobha Realty Sales Team</div>' +
    '        <div style="color:#1b1c1c;font-size:14px;">+971 52 164 2020</div>' +
    '      </div>' +
    '      <p style="font-size:13px;color:#5f5e5e;line-height:1.6;">We look forward to welcoming you to Sobha Sanctuary in Dubailand, Dubai.</p>' +
    '    </div>' +
    '    <div style="background:#1b1c1c;padding:20px 32px;color:#ffffff;font-size:12px;text-align:center;letter-spacing:1px;">SOBHA SANCTUARY - A LIFE WITHIN</div>' +
    '  </div>' +
    '</div>'
  );
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
