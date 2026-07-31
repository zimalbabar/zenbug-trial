const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

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
  aiCategory: {
    type: String,
    default: ""
  },

  aiPriority: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    default: "Low"
  },

  aiSuggestion: {
    type: String,
    default: ""
  },

  possibleCause: {
    type: String,
    default: ""
  },

  confidence: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  status: {
    type: String,
    enum: ["open", "in-progress", "resolved"],
    default: "open"
  },

  submittedAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Feedback", FeedbackSchema);