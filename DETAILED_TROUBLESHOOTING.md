# 🔍 Detailed Troubleshooting: Google Sheet Connection

The error persists, which means we need to check a few more things.

## ✅ Step-by-Step Checklist

### 1. Verify Sheet Name (Double Check)

In your Google Sheet:
1. Look at the **bottom-left** corner
2. You should see a tab that says **exactly**: `Richieste`
3. **NOT**: "richieste", "Richiesta", "Sheet1", "Foglio1"
4. Case matters! It must be `Richieste` with capital R

**Screenshot what you see at the bottom**

---

### 2. Check Apps Script Code

1. In your Google Sheet, go to: **Extensions** → **Apps Script**
2. Check if you see ANY code at all
3. The FIRST line should be a comment like:
   ```javascript
   // Google Apps Script for Salvo Nicotra Contact Form & Admin Dashboard
   ```
4. Look at line 5 (approximately), it should say:
   ```javascript
   const SHEET_NAME = 'Richieste';
   ```

**If the script is empty or different**, you need to add the script code.

---

### 3. Add/Replace the Script Code

**Copy this COMPLETE script** (all of it!):

```javascript
// Google Apps Script for Salvo Nicotra Contact Form & Admin Dashboard
const SHEET_NAME = 'Richieste';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Sheet "' + SHEET_NAME + '" not found. Please create a sheet named exactly: Richieste'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = JSON.parse(e.postData.contents);
    const action = e.parameter.action || data.action;
    
    Logger.log('Action: ' + action);
    Logger.log('Data: ' + JSON.stringify(data));
    
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
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Error: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Sheet "' + SHEET_NAME + '" not found in this spreadsheet. Current sheets: ' + 
                 SpreadsheetApp.getActiveSpreadsheet().getSheets().map(s => s.getName()).join(', ')
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const action = e.parameter.action;
    
    if (action === 'get') {
      return getAllRequests(sheet);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Script is working! Sheet found: ' + SHEET_NAME
    })).setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    Logger.log('Error in doGet: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Error: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

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
    message: 'Request added successfully',
    id: row[0]
  })).setMimeType(ContentService.MimeType.JSON);
}

function getAllRequests(sheet) {
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      data: []
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
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
        message: 'Request updated'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    message: 'Request not found'
  })).setMimeType(ContentService.MimeType.JSON);
}

function deleteRequest(sheet, data) {
  const allData = sheet.getDataRange().getValues();
  const id = data.id ? data.id.toString() : '';
  
  for (let i = 1; i < allData.length; i++) {
    if (allData[i][0].toString() === id) {
      sheet.deleteRow(i + 1);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Request deleted'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    message: 'Request not found'
  })).setMimeType(ContentService.MimeType.JSON);
}
```

---

### 4. Save and Deploy

After pasting the script:

1. Click the **disk icon** or press **Ctrl+S** to save
2. Click **Deploy** (top right) → **Manage deployments**
3. Click the **pencil/edit icon** next to your existing deployment
4. Change "Version" to **"New version"**
5. Click **Deploy**
6. **Copy the new Web App URL** (should be the same as before)

---

### 5. Test Again

After deploying, run this test:
```bash
curl -sL "https://script.google.com/macros/s/AKfycbwbGs6Rpnc0SbIW3mCmylENvcrjX_4AAKKfIWYNFXJDJyNtlzYxtOPcXwM7VN59zqvg/exec?action=get"
```

**Expected result if working:**
```json
{"success":true,"data":[]}
```

**If you still get an error**, it will now tell you which sheets exist, like:
```json
{"success":false,"message":"Sheet 'Richieste' not found. Current sheets: Sheet1, Foglio1"}
```

This will tell us exactly what the sheet is named!

---

## 📸 If Still Not Working

Please share:
1. Screenshot of the **bottom of your Google Sheet** showing the sheet tab name
2. Screenshot of **line 1-10** of your Apps Script code
3. The **exact error message** you get when testing

I'll help you fix it! 🛠️
