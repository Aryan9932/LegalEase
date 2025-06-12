import { generateLawContent } from "../services/ai.service.js";

export async function getLawResponse(req, res) {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const answer = await generateLawContent(prompt);
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

