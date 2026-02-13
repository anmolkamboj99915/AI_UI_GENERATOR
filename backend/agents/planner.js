import { callLLM } from "../services/AIService.js";
import { plannerPrompt } from "../prompts.js";

export async function planWithAI(userMessage, previousPlan = null) {
  const messages = [
    {
      role: "system",
      content: plannerPrompt,
    },
    {
      role: "user",
      content: `
User Request:
${userMessage}

Previous Plan:
${JSON.stringify(previousPlan || {})}
      `,
    },
  ];

  let raw = await callLLM(messages, 0.2);

  // Remove markdown fences
  raw = raw
    .replace(/```json\n?/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("Planner returned invalid JSON");
  }
}
