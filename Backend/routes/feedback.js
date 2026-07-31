const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");
const analyzeBug = require("../services/aiService");
// POST feedback
router.post("/", async (req, res) => {
  try {

    const aiResult = await analyzeBug(
      req.body.title,
      req.body.description,
      req.body.metadata
    );
    console.log("AI Result:", aiResult);

    const newFeedback = new Feedback({

      ...req.body,

      aiCategory: aiResult.aiCategory,
      aiPriority: aiResult.aiPriority,
      aiSuggestion: aiResult.aiSuggestion,
      possibleCause: aiResult.possibleCause,
      confidence: aiResult.confidence

    });

    await newFeedback.save();
    console.log(newFeedback);

    res.status(201).json({
      message: "Feedback submitted!",
      feedback: newFeedback
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to save feedback"
    });

  }
});

// GET all feedback (simple unauthenticated route for now)
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ submittedAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch feedbacks" });
  }
});


// PATCH /api/feedback/:id/status
router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await Feedback.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
