# 🔧 Fix: Google Sheet Not Connected

## The Problem
The error "Cannot read properties of null" means your Google Apps Script can't find the sheet named 'Richieste'.

## ✅ Solution - Fix Your Google Sheet

### Step 1: Check Your Sheet Name
1. Open your Google Sheet
2. Look at the tab at the bottom - it should say **"Richieste"**
3. If it says something else (like "Foglio1" or "Sheet1"), you need to rename it:
   - Right-click the sheet tab
   - Click "Rename"
   - Type exactly: **Richieste** (with capital R)

### Step 2: Verify Column Headers
Make sure Row 1 has these EXACT headers (case matters!):

| A1  | B1   | C1   | D1    | E1       | F1    | G1        | H1    | I1   |
|-----|------|------|-------|----------|-------|-----------|-------|------|
| ID  | Data | Nome | Email | Telefono | Corso | Messaggio | Stato | Note |

### Step 3: Check Apps Script Connection
1. In Google Sheet, go to **Extensions** → **Apps Script**
2. Make sure the script code is there (the full 210-line script)
3. Look at line 5 of the script - it should say:
   ```javascript
   const SHEET_NAME = 'Richieste';
   ```

### Step 4: Re-deploy if Needed
If you made changes to the script or sheet name:
1. In Apps Script, click **Deploy** → **Manage deployments**
2. Click the pencil/edit icon
3. Click **Deploy**

### Step 5: Test Again
Try submitting the contact form on your website. A new row should appear in your sheet!

## Still Not Working?

If you're still having issues, try this:
1. Take a screenshot of your Google Sheet showing:
   - The sheet tab name at the bottom
   - Row 1 with the headers
2. Take a screenshot of your Apps Script showing the first 10 lines
3. Share those with me and I'll help troubleshoot!

## Quick Test
Run this command to test if it's working now:
```bash
curl -sL "https://script.google.com/macros/s/AKfycbwbGs6Rpnc0SbIW3mCmylENvcrjX_4AAKKfIWYNFXJDJyNtlzYxtOPcXwM7VN59zqvg/exec?action=get"
```

If it returns `{"success":true,"data":[]}` - Success! It's working!
If it still shows an error - the sheet name is still wrong.
