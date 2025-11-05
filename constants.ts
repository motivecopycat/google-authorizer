
// IMPORTANT: Replace with your actual Google Cloud project's OAuth 2.0 Client ID.
// You can create one here: https://console.cloud.google.com/apis/credentials
export const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

// The OAuth 2.0 scopes required for the application.
export const OAUTH_SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets', // Full access to Google Sheets
  'https://www.googleapis.com/auth/drive',        // Full access to Google Drive files
  'https://www.googleapis.com/auth/script.projects' // Manage Google Apps Script projects
];
