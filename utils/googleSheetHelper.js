const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const Blog = require("../models/Blog");
const SyncLog = require("../models/SyncLogModel");

// Path to credentials
const credentialsPath = path.join(__dirname, "..", "adroit-arcana-372515-97cf1bc28d52.json");

if (!fs.existsSync(credentialsPath)) {
  throw new Error(`❌ Credentials file not found at: ${credentialsPath}`);
}

const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf-8"));
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SHEET_ID = "1CgBhtGuMXq-lF7cCLfvxcv756QAbbrACHDytD5xhr0w";

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const appendBlogToSheet = async (blog) => {
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const values = [[
      blog.imageUrl || "",
      blog.imageCredit || "",
      blog.title || "",
      blog.slug || "",
      blog.introText || "",
      blog.content || "",
      blog.tags?.join(", ") || "",
      blog.likes || 0,
      blog.author || "",
      blog.authorTitle || "",
      blog.authorImage || "",
      blog.authorBio || "",
      blog.socialLinks?.twitter || "",
      blog.socialLinks?.linkedin || "",
      blog.socialLinks?.website || "",
      blog.createdAt ? new Date(blog.createdAt).toLocaleString() : "",
      blog.updatedAt ? new Date(blog.updatedAt).toLocaleString() : ""
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:Q", // 17 columns
      valueInputOption: "USER_ENTERED",
      resource: { values },
    });

    console.log(`✅ Blog "${blog.title}" synced to Google Sheet.`);
    return true;
  } catch (err) {
    console.error(`❌ Google Sheet sync failed for "${blog.title}":`, err.message);
    return err;
  }
};

const syncAllBlogsToSheet = async () => {
  const blogs = await Blog.find({});
  let successCount = 0;

  for (const blog of blogs) {
    const result = await appendBlogToSheet(blog);
    if (result === true) {
      successCount++;
      await SyncLog.create({
        blogId: blog._id,
        title: blog.title,
        status: "success",
        errorMessage: "",
      });
    } else {
      await SyncLog.create({
        blogId: blog._id,
        title: blog.title,
        status: "fail",
        errorMessage: result?.message || "Unknown error",
      });
    }

    await new Promise((res) => setTimeout(res, 500)); // Delay to avoid rate limits
  }

  console.log(`🎉 Done! Successfully synced ${successCount}/${blogs.length} blogs.`);
};

module.exports = { appendBlogToSheet, syncAllBlogsToSheet };
