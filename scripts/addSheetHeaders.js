// scripts/addSheetHeaders.js
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

// Path to credentials file
const credentialsPath = path.join(__dirname, "..", "adroit-arcana-372515-97cf1bc28d52.json");

if (!fs.existsSync(credentialsPath)) {
  throw new Error(`❌ Credentials file not found at: ${credentialsPath}`);
}

const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf-8"));

// Google Sheets setup
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SHEET_ID = "1CgBhtGuMXq-lF7cCLfvxcv756QAbbrACHDytD5xhr0w";

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const addHeaders = async () => {
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    // ✅ Headers aligned exactly with your Blog model fields
    const headers = [[
      "imageUrl",        // Blog main image URL
      "imageCredit",     // Image credit
      "title",           // Blog title
      "slug",            // Auto-generated slug
      "introText",       // Short intro or summary
      "content",         // Full blog content
      "tags",            // Array of tags
      "likes",           // Number of likes
      "author",          // Author name
      "authorTitle",     // Author’s title
      "authorImage",     // Author’s photo
      "authorBio",       // Author biography
      "twitter",         // Social - Twitter
      "linkedin",        // Social - LinkedIn
      "website",         // Social - Website
      "createdAt",       // Created timestamp
      "updatedAt"        // Updated timestamp
    ]];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A1:Q1", // 17 columns (A–Q)
      valueInputOption: "USER_ENTERED",
      resource: { values: headers },
    });

    console.log("✅ Headers added successfully based on Blog model!");
  } catch (error) {
    console.error("❌ Error adding headers:", error.message);
  }
};

addHeaders();
