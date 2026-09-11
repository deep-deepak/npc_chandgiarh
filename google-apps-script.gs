/**
 * Google Apps Script — paste this into Extensions > Apps Script on the
 * Google Sheet you want registrations saved to.
 *
 * Setup:
 * 1. Create a Google Sheet. In row 1, add these headers (in this order):
 *    Timestamp | Full Name | Email | Phone | Emergency Contact | Gender | DOB | City | Category | Entry Type | Tanning Add-on | Division | Message | Amount
 * 2. Extensions > Apps Script, delete any starter code, paste this file's contents.
 * 3. Deploy > New deployment > select type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Click Deploy, authorize the script, and copy the Web app URL (ends in /exec).
 * 5. Paste that URL into GOOGLE_SHEET_ENDPOINT in src/landingpage/RegistrationForm.jsx.
 * 6. Whenever you change this script, you must create a NEW deployment version
 *    (Deploy > Manage deployments > edit > New version) for changes to take effect.
 *
 * Note: this script only saves the registration — it does not collect payment.
 * The "Amount" column is the fee the athlete owes based on their selected entry
 * type, recorded for the organizers to follow up on.
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.fullName || '',
    data.email || '',
    data.phone || '',
    data.emergencyContact || '',
    data.gender || '',
    data.dob || '',
    data.city || '',
    data.category || '',
    data.entryType || '',
    data.tanning ? 'Yes' : 'No',
    data.division || '',
    data.message || '',
    data.amount || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
