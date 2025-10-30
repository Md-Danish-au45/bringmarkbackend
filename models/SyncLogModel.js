// models/SyncLogModel.js
const mongoose = require("mongoose");

const syncLogSchema = new mongoose.Schema(
  {
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
    title: { type: String },
    status: { type: String, enum: ["success", "fail"], required: true },
    errorMessage: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SyncLog", syncLogSchema);
