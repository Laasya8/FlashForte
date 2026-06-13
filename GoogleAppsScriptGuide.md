# Google Apps Script Setup Guide for Custom Forms

This guide walks you through the process of setting up a Google Apps Script to act as a backend for your custom React/Vite forms. It allows you to save form submissions directly into a Google Sheet.

---

## Step 1: Prepare Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/) and create a new blank spreadsheet.
2. Name the spreadsheet (e.g., "FlashForte Event Registrations").
3. Rename the active sheet tab at the bottom to `Sheet1` (or remember whatever name you choose, as you'll need it in the code).
4. Set up your column headers in Row 1. They should exactly match the data you plan to store. For the expanded registration form we just built, your headers from A to N should be:
   - `Timestamp`
   - `Full Name`
   - `Email`
   - `Phone`
   - `Roll Number`
   - `Branch`
   - `Section`
   - `Year of Study`
   - `Discord ID`
   - `Heard About Us`

## Step 2: Open Google Apps Script

1. In your Google Sheet, click on **Extensions** in the top menu.
2. Select **Apps Script**. This will open a new tab with the Apps Script code editor.
3. Rename the project at the top left (e.g., "FlashForte Form Backend").

## Step 3: Paste the Code Template

Delete any code currently in the `Code.gs` file and replace it with the following robust template:

```javascript
// ==========================================
// CONFIGURATION
// ==========================================
// Change this if you rename the tab in your Google Sheet
const SHEET_NAME = "Sheet1"; 
const DRIVE_FOLDER_ID = ""; // Optional: Add folder ID if you want to store files in Drive

// ==========================================
// MAIN POST HANDLER
// ==========================================
function doPost(e) {
  try {
    // 1. Get the active spreadsheet and the specific sheet
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      throw new Error("Sheet named '" + SHEET_NAME + "' not found.");
    }

    // 2. Extract parameters from the incoming POST request
    // Our CustomForm sends JSON stringified payload with text/plain content type
    const params = JSON.parse(e.postData.contents);
    
    // BACKEND VALIDATION
    if (!params.name || !params.email || !params.phone) {
      throw new Error("Validation Failed: Missing required fields (name, email, phone).");
    }
    
    // 3. Handle File Uploads (if any)
    let fileUrl = "No file attached";
    if (params.fileBase64 && params.fileName && DRIVE_FOLDER_ID) {
      const decodedData = Utilities.base64Decode(params.fileBase64);
      const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
      
      // Use rollNo for the filename
      const extension = params.fileName.split('.').pop();
      const baseName = params.rollNo ? params.rollNo : (params.phone || "submission");
      const finalFileName = `${baseName}.${extension}`;
      
      // Check if file for this rollNo already exists, and trash it to override
      let existingFiles = folder.searchFiles("title contains '" + baseName + ".'");
      while (existingFiles.hasNext()) {
        let file = existingFiles.next();
        if (file.getName().startsWith(baseName + ".")) {
          file.setTrashed(true);
        }
      }
      
      const blob = Utilities.newBlob(decodedData, params.mimeType || "application/octet-stream", finalFileName);
      const newFile = folder.createFile(blob);
      fileUrl = newFile.getUrl();
    } else if (params.fileName) {
       fileUrl = params.fileName + " (File data received but Drive Folder ID not configured)";
    }
    
    // 4. Prepare the data row. 
    // IMPORTANT: The order here MUST match the order of columns in your Google Sheet!
    const rowData = [
      new Date(), // Column A: Timestamp
      params.name || "", // Column B: Full Name
      params.email || "", // Column C: Email Address
      params.phone || "", // Column D: Phone Number
      params.rollNo || "", // Column E: Roll Number
      params.branch || "", // Column F: Branch
      params.section || "", // Column G: Section
      params.yearOfStudy || "", // Column H: Year of Study
      params.discordId || "", // Column I: Discord ID
      params.tshirtSize || "", // Column J: T-Shirt Size
      params.dietaryRequirements || "", // Column K: Dietary Requirements
      params.heardAboutUs || "",  // Column L: How did you hear about us?
      fileUrl // Column M: Uploaded File URL
    ];

    // 5. Write the data row safely using LockService to prevent concurrent overwrites
    const lock = LockService.getScriptLock();
    // Wait for up to 30 seconds for other processes to finish.
    lock.waitLock(30000);
    
    try {
      // Search for an existing entry by Roll Number
      const data = sheet.getDataRange().getValues();
      let rowIndex = -1;
      
      if (params.rollNo) {
        for (let i = 1; i < data.length; i++) { // Skip header row (index 0)
          // Check Column E (index 4) for Roll Number
          if (data[i][4] == params.rollNo) {
            rowIndex = i + 1; // 1-based index for sheet
            break;
          }
        }
      }

      if (rowIndex > -1) {
        // Overwrite existing row
        sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
      } else {
        // Append new row
        sheet.appendRow(rowData);
      }
      
      // Optional: SpreadsheetApp.flush() forces the change to be written immediately
      SpreadsheetApp.flush();
    } finally {
      // Release the lock so other executions can continue
      lock.releaseLock();
    }

    // 6. Return a success response
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", row: sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return an error response if something fails
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ==========================================
// OPTIONAL: CORS PREFLIGHT HANDLER
// ==========================================
// If your frontend doesn't use mode: "no-cors", you might need an OPTIONS handler
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Step 4: Deploy the Script as a Web App

1. In the top right corner of the Apps Script editor, click the **Deploy** button.
2. Select **New deployment**.
3. Click the gear icon ⚙️ next to "Select type" and choose **Web app**.
4. Fill in the deployment details:
   - **Description:** e.g., "Initial Deployment v1"
   - **Execute as:** Select `Me (your-email@gmail.com)`
   - **Who has access:** Select `Anyone` (This is critical so the form can submit without requiring attendees to sign in to Google).
5. Click **Deploy**.
6. **Authorization:** Google will ask you to authorize the script to access your spreadsheets. 
   - Click "Authorize access".
   - Select your Google account.
   - You might see a "Google hasn’t verified this app" warning. Click **Advanced** and then **Go to [Project Name] (unsafe)**.
   - Click **Allow**.
7. Once deployed, you will be given a **Web app URL**. Copy this URL.

## Step 5: Connect Your Frontend

1. Go back to your codebase.
2. Open `src/app/components/form/formConfig.js`.
3. Locate the `DUMMY_URL` constant at the top of the file.
4. Replace the dummy URL with the Web app URL you copied in Step 4.

```javascript
const DUMMY_URL = "YOUR_NEW_WEB_APP_URL_HERE";
```

> [!TIP]
> **Testing your connection:** Use the `/test` dashboard we built! Click the **"Run 50 Simultaneous Registrations"** button, and then check your Google Sheet. If set up correctly, you should see 50 rows populate almost instantly.



> [!WARNING]
> When using file uploads via Google Apps Script, there is a payload limit (usually around 50MB). If your participants are submitting very large game builds or design files, it is highly recommended to have them upload to their own Google Drive/Dropbox and paste the shareable link into a standard text field instead.
