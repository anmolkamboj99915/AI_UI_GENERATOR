import { callLLM } from "../services/AIService.js";
import { explainerPrompt } from "../prompts.js";

export async function explainCode(plan, code) {
  const messages = [
    {
      role: "system",
      content: explainerPrompt,
    },
    {
      role: "user",
      content: `
Plan:
${JSON.stringify(plan)}

Generated Code:
${code}
      `,
    },
  ];

  const result = await callLLM(messages, 0.4);
  let explanation = result.content; // ✅ Extract content

  explanation = explanation
    .replace(/```[a-zA-Z]*\n?/g, "")
    .replace(/```/g, "")
    .trim();

  return {
    explanation,
    provider: result.provider // optional but consistent
  };
}
