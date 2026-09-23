# Aero Tech Global Visa Portal

## Included updates
- Invalid random login credentials are rejected.
- Visa applications show **application created date/time**.
- Create, edit and delete actions are recorded in **Recent Activity**.
- Approved visa field added to each case. Admin can upload through the connected Google Drive Web App or paste a Drive share/download link.
- Clients see a **Download** link when an approved visa is attached.
- **Export Report** downloads a CSV and opens the supplied Google Sheet when the Google Apps Script URL is not configured. With the Apps Script URL configured, the report is written directly into the `Visa Report` tab.
- Google Drive folder and Google Sheet links supplied by the owner are already configured.

## Demo login
Email: `admin@aerotechglobal.com`  
Password: `AeroTech@2026`

## To enable direct Google Drive upload + direct Google Sheet export
1. Open Google Apps Script and create a new project.
2. Paste the contents of `google-apps-script.gs` and save it.
3. Deploy it as a **Web app**. Execute as your account and give the web app access appropriate for your Google account.
4. Copy the deployed Web App URL.
5. Open `index.html` and replace the empty `APPS_SCRIPT_URL` value with that URL.
6. Upload the updated `index.html` to GitHub.

The Apps Script uses the provided Drive folder ID and Spreadsheet ID. The first run will request Google permissions for Drive and Sheets.

## Important
The GitHub site is a front-end prototype. Do not treat the demo login as production security. For a real client portal, authentication, authorization, and document access should be enforced server-side.
