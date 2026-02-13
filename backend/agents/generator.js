import { callLLM } from "../services/AIService.js";
import { generatorPrompt } from "../prompts.js";

export async function generateCode(
  plan,
  previousCode = null,
  isFullRegenerate = false
) {
  const messages = [
    {
      role: "system",
      content: generatorPrompt,
    },
    {
      role: "user",
      content: `
Plan:
${JSON.stringify(plan)}

Mode:
${isFullRegenerate ? "FULL_REWRITE" : "INCREMENTAL_MODIFY"}

Previous Code:
${previousCode || "None"}
      `,
    },
  ];

  let code = await callLLM(messages, 0.2);

  // Remove markdown fences
  code = code
    .replace(/```[a-zA-Z]*\n?/g, "")
    .replace(/```/g, "")
    .trim();

  if (!code.includes("GeneratedComponent")) {
    throw new Error("Invalid generator output");
  }

  return code;
}
