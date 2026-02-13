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

  let explanation = await callLLM(messages, 0.4);

  // Remove markdown fences
  explanation = explanation
    .replace(/```[a-zA-Z]*\n?/g, "")
    .replace(/```/g, "")
    .trim();

  return explanation;
}
