/**
 * Google Apps Script — paste this into Extensions > Apps Script on the
 * Google Sheet you want registrations saved to.
 *
 * Setup (Sheet + deployment):
 * 1. Create a Google Sheet. In row 1, add these headers (in this order):
 *    Timestamp | Full Name | Email | Phone | Emergency Contact | Gender | DOB | City | Category | Entry Type | Tanning Add-on | Division | Message | Payment ID | Order ID | Amount | Payment Status
 * 2. Extensions > Apps Script, delete any starter code, paste this file's contents.
 * 3. Project Settings (gear icon on the left) > Script Properties > add two properties:
 *      RAZORPAY_KEY_ID     = your Razorpay Key ID (test or live)
 *      RAZORPAY_KEY_SECRET = your Razorpay Key Secret (test or live)
 *    Do NOT hardcode these in this file — Script Properties keep the secret out of
 *    the source and out of version history.
 * 4. Deploy > New deployment > select type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Click Deploy, authorize the script, and copy the Web app URL (ends in /exec).
 * 6. Paste that URL into GOOGLE_SHEET_ENDPOINT in src/landingpage/RegistrationForm.jsx.
 * 7. Whenever you change this script, you must create a NEW deployment version
 *    (Deploy > Manage deployments > edit > New version) for changes to take effect.
 *
 * Flow:
 * - Frontend calls this endpoint with { action: 'create_order', amount, category }
 *   to get back a Razorpay order id, then opens Razorpay Checkout.
 * - After a successful payment, frontend calls this endpoint again with
 *   { action: 'verify_and_save', ...form fields, razorpay_payment_id, razorpay_order_id, razorpay_signature }.
 *   This script verifies the signature server-side (using the Key Secret, which
 *   never touches the browser) before appending the row — so a forged/fake
 *   "success" from the browser can't create a fake paid registration.
 */

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var action = data.action;

  var result;
  if (action === 'create_order') {
    result = createOrder(data);
  } else if (action === 'verify_and_save') {
    result = verifyAndSave(data);
  } else {
    result = { result: 'error', message: 'Unknown or missing action' };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function createOrder(data) {
  var props = PropertiesService.getScriptProperties();
  var keyId = props.getProperty('RAZORPAY_KEY_ID');
  var keySecret = props.getProperty('RAZORPAY_KEY_SECRET');

  if (!keyId || !keySecret) {
    return { result: 'error', message: 'Razorpay keys are not configured in Script Properties.' };
  }

  var amountInPaise = Math.round(Number(data.amount) * 100);
  if (!amountInPaise || amountInPaise <= 0) {
    return { result: 'error', message: 'Invalid amount.' };
  }

  var payload = {
    amount: amountInPaise,
    currency: 'INR',
    receipt: 'npc_' + new Date().getTime(),
  };

  var response = UrlFetchApp.fetch('https://api.razorpay.com/v1/orders', {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Basic ' + Utilities.base64Encode(keyId + ':' + keySecret),
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });

  var body = JSON.parse(response.getContentText());

  if (response.getResponseCode() !== 200) {
    return { result: 'error', message: (body.error && body.error.description) || 'Failed to create Razorpay order.' };
  }

  return {
    result: 'success',
    orderId: body.id,
    amount: body.amount,
    currency: body.currency,
    keyId: keyId,
  };
}

function verifyAndSave(data) {
  var props = PropertiesService.getScriptProperties();
  var keySecret = props.getProperty('RAZORPAY_KEY_SECRET');

  if (!keySecret) {
    return { result: 'error', message: 'Razorpay keys are not configured in Script Properties.' };
  }

  var orderId = data.razorpay_order_id;
  var paymentId = data.razorpay_payment_id;
  var signature = data.razorpay_signature;

  var expectedSignatureBytes = Utilities.computeHmacSha256Signature(orderId + '|' + paymentId, keySecret);
  var expectedSignature = expectedSignatureBytes.map(function (byte) {
    var v = (byte < 0 ? byte + 256 : byte).toString(16);
    return v.length === 1 ? '0' + v : v;
  }).join('');

  if (expectedSignature !== signature) {
    return { result: 'error', message: 'Payment verification failed.' };
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
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
    paymentId || '',
    orderId || '',
    data.amount || '',
    'Paid',
  ]);

  return { result: 'success' };
}
