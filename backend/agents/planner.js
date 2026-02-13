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

  const result = await callLLM(messages, 0.2);
  let raw = result.content; // ✅ Extract content

  raw = raw
    .replace(/```json\n?/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return {
      plan: JSON.parse(raw),
      provider: result.provider
    };
  } catch {
    throw new Error("Planner returned invalid JSON");
  }
}
