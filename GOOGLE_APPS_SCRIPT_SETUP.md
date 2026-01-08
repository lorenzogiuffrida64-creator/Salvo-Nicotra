# Google Sheets & Apps Script Setup Guide

Follow these steps to connect your contact form and admin dashboard to Google Sheets.

## Step 1: Create a Google Sheet

1. Go to https://sheets.google.com
2. Create a new spreadsheet
3. Name it: **Salvo Nicotra - Richieste Contatti**
4. Rename the first sheet to: **Richieste**
5. Add these column headers in Row 1:
   - A1: `ID`
   - B1: `Data`
   - C1: `Nome`
   - D1: `Email`
   - E1: `Telefono`
   - F1: `Corso`
   - G1: `Messaggio`
   - H1: `Stato`
   - I1: `Note`

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy and paste the ENTIRE script below:

```javascript
// Google Apps Script for Salvo Nicotra Contact Form & Admin Dashboard
// This script handles form submissions and admin dashboard operations

const SHEET_NAME = 'Richieste';

// Main function that handles all requests
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);
    const action = e.parameter.action || data.action;
    
    Logger.log('Action received: ' + action);
    Logger.log('Data received: ' + JSON.stringify(data));
    
    switch(action) {
      case 'add':
        return addRequest(sheet, data);
      case 'update':
        return updateRequest(sheet, data);
      case 'delete':
        return deleteRequest(sheet, data);
      default:
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          message: 'Unknown action: ' + action
        })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch(error) {
    Logger.log('Error in doPost: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for fetching data)
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const action = e.parameter.action;
    
    if (action === 'get') {
      return getAllRequests(sheet);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Invalid GET action'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    Logger.log('Error in doGet: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Add new request from contact form
function addRequest(sheet, data) {
  const row = [
    data.id || Date.now().toString(),
    data.date || new Date().toLocaleString('it-IT'),
    data.name || '',
    data.email || '',
    data.phone || '',
    data.course || '',
    data.message || '',
    data.status || 'NUOVA',
    data.notes || ''
  ];
  
  sheet.appendRow(row);
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Richiesta aggiunta con successo',
    id: row[0]
  })).setMimeType(ContentService.MimeType.JSON);
}

// Get all requests for admin dashboard
function getAllRequests(sheet) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const requests = rows.map(row => {
    return {
      id: row[0] ? row[0].toString() : '',
      date: row[1] ? row[1].toString() : '',
      name: row[2] || '',
      email: row[3] || '',
      phone: row[4] || '',
      course: row[5] || '',
      message: row[6] || '',
      status: row[7] || 'NUOVA',
      notes: row[8] || ''
    };
  });
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    data: requests
  })).setMimeType(ContentService.MimeType.JSON);
}

// Update existing request (status or notes)
function updateRequest(sheet, data) {
  const allData = sheet.getDataRange().getValues();
  const id = data.id ? data.id.toString() : '';
  
  for (let i = 1; i < allData.length; i++) {
    if (allData[i][0].toString() === id) {
      if (data.status) {
        sheet.getRange(i + 1, 8).setValue(data.status);
      }
      if (data.notes !== undefined) {
        sheet.getRange(i + 1, 9).setValue(data.notes);
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Richiesta aggiornata'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    message: 'Richiesta non trovata'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Delete request
function deleteRequest(sheet, data) {
  const allData = sheet.getDataRange().getValues();
  const id = data.id ? data.id.toString() : '';
  
  for (let i = 1; i < allData.length; i++) {
    if (allData[i][0].toString() === id) {
      sheet.deleteRow(i + 1);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Richiesta eliminata'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    message: 'Richiesta non trovata'
  })).setMimeType(ContentService.MimeType.JSON);
}
```

## Step 3: Deploy the Script

1. Click the **Deploy** button (top right) → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" → Choose **Web app**
3. Configure:
   - **Description**: Contact Form API v1
   - **Execute as**: Me (your email)
   - **Who has access**: **Anyone** (IMPORTANT!)
4. Click **Deploy**
5. **Authorize** the script (click "Authorize access" → Choose your Google account → Click "Advanced" if warned → Click "Go to [Project Name]" → Click "Allow")
6. **COPY THE WEB APP URL** - It looks like:
   ```
   https://script.google.com/macros/s/XXXXX.../exec
   ```

## Step 4: Update Your Website

Now you need to update the Google Script URL in your code:

### Option A: I'll do it for you
Tell me the Web App URL you copied and I'll update the code automatically.

### Option B: Manual update
1. Open `components/ContactForm.tsx`
2. Replace line 5:
   ```typescript
   const GOOGLE_SCRIPT_URL = 'YOUR_WEB_APP_URL_HERE';
   ```

3. Open `components/AdminDashboard.tsx`
4. Replace line 8:
   ```typescript
   const GOOGLE_SCRIPT_URL = 'YOUR_WEB_APP_URL_HERE';
   ```

## Step 5: Test Everything

### Test Contact Form:
1. Go to your website
2. Fill out the contact form
3. Submit it
4. Check your Google Sheet - a new row should appear!

### Test Admin Dashboard:
1. Go to your website `/admin/login`
2. Password: `Nicotra123`
3. You should see all submitted requests
4. Try updating status or adding notes

## Troubleshooting

### Form submits but nothing appears in Google Sheet:
- Make sure you deployed as "Web app"
- Make sure "Who has access" is set to "Anyone"
- Check the Apps Script logs: Extensions → Apps Script → Executions

### Admin Dashboard shows "Errore di connessione":
- Make sure the Web App URL is correct in both files
- The URL must end with `/exec` not `/dev`
- Try accessing the URL directly in your browser - it should return JSON

### "Authorization required" error:
- You need to re-authorize the script
- Go to Apps Script → Deploy → Manage deployments → Edit → Re-authorize

## Security Note

The current admin login password is hardcoded as `Nicotra123`. For production:
1. Change this password in `components/AdminLogin.tsx` (line 14)
2. Consider using environment variables
3. Add backend authentication for better security

## Need Help?

If you get stuck, share:
1. The error message (if any)
2. What happens when you submit the form
3. A screenshot of your Google Sheet setup

I'm here to help!
