const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function analyzeBug(description) {
  try {
    const prompt = `
Analyze the following software bug.

Return ONLY valid JSON in exactly this format:

{
  "aiCategory": "",
  "aiPriority": "",
  "aiSuggestion": "",
  "possibleCause": "",
  "confidence": 0
}

Bug Description:
${description}
`;

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    const text = response.choices[0].message.content;

    // Remove Markdown code fences if present
    const cleaned = text.replace(/```json|```/g, "").trim();

    return JSON.parse(cleaned);

  } catch (error) {
    console.error("Groq AI Error:", error);

    return {
      aiCategory: "Unknown",
      aiPriority: "Low",
      aiSuggestion: "AI analysis unavailable.",
      possibleCause: "Unknown",
      confidence: 0,
    };
  }
}

module.exports = analyzeBug;