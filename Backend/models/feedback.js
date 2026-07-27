const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  title: String,
  description: String,
  severity: {
    type: String,
    enum: ["low", "medium", "high"], 
    default: "low"
  },
  imageUrl: String,
  metadata: {
    url: String,
    browser: String,
    os: String,
    viewport: String
  },

  submittedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["open", "in-progress", "resolved"],
    default: "open"
  }
});



module.exports = mongoose.model("Feedback", FeedbackSchema);