import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function callLLM(messages, temperature = 0.3) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature,
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error("AI Error:", error.message);

    if (error.status === 429) {

      // 🔹 Planner fallback
      if (messages[0].content.includes("Planner")) {
        return JSON.stringify({
          layout: "dashboard",
          components: [
            { type: "Card", props: { title: "Fallback Dashboard" } }
          ]
        });
      }

      // 🔹 Generator fallback
      if (messages[0].content.includes("generator")) {
        return `
function GeneratedComponent() {
  return (
    <div>
      <Card title="Fallback UI">
        <Button label="Click Me" />
      </Card>
    </div>
  );
}
`;
      }

      // 🔹 Explainer fallback
      return "Fallback explanation due to quota limit.";
    }

    throw error;
  }
}
