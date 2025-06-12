import ai from "../config/gemini.config.js";

export async function generateLawContent(prompt) {
  const lawPrompt = `
    You are an AI law assistant. When answering any query regarding the law, ensure that your response is clear, concise, and based on legal principles.
    
    Follow these guidelines when crafting your response:
    1. Provide an explanation of the relevant legal concepts.
    2. Reference specific laws, articles, or provisions where applicable.
    3. If applicable, cite case law or legal precedents.
    4. Keep the language formal, precise, and neutral. Avoid giving personal opinions or interpretations.
    5. If the query is specific to a particular jurisdiction (e.g., India, USA), make sure to clarify that in your answer.
    6. First line of you responce should contain the Case type
    Now answer the following query: 
    "${prompt}"
  `;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",  // You can adjust the model as needed
      contents: lawPrompt,
    });

    return result.text;  // Assuming the response structure contains the `text` field
  } catch (err) {
    console.error("Gemini API Error:", err);
    throw new Error("Failed to get response from Gemini API");
  }
}
