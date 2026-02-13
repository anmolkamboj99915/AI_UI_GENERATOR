import OpenAI from "openai";
import axios from "axios";
import { Mistral } from "@mistralai/mistralai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function callLLM(messages, temperature = 0.3) {

  // 🔹 1️⃣ PRIMARY: OpenAI
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature,
    });

    return response.choices[0].message.content;

  } catch (openaiError) {
    console.warn("⚠ OpenAI failed:", openaiError.message);
  }

  // 🔹 2️⃣ SECONDARY: Direct Mistral API
  try {
    const response = await mistral.chat.complete({
      model: "mistral-small-latest",
      messages,
      temperature,
    });

    return response.choices[0].message.content;

  } catch (mistralError) {
    console.warn("⚠ Mistral direct failed:", mistralError.message);
  }

  // 🔹 3️⃣ TERTIARY: OpenRouter
  try {
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages,
        temperature,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data.choices[0].message.content;

  } catch (openrouterError) {
    console.warn("⚠ OpenRouter failed.");
  }

  // 🔹 4️⃣ FINAL ROLE-AWARE FALLBACK

  const systemPrompt = messages[0]?.content || "";
  const lowerPrompt = systemPrompt.toLowerCase();

  // Planner fallback
  if (lowerPrompt.includes("planner")) {
    return JSON.stringify({
      layout: "dashboard",
      components: [
        { type: "Card", props: { title: "Fallback Dashboard" } }
      ]
    });
  }

  // Generator fallback
  if (lowerPrompt.includes("generator")) {
    return `
function GeneratedComponent() {
  return React.createElement(
    "div",
    null,
    React.createElement(Card, { title: "Fallback UI" },
      React.createElement(Button, { label: "Fallback Response" })
    )
  );
}
`;
  }

  // Explainer fallback
  return "Fallback explanation due to AI provider failure.";
}
