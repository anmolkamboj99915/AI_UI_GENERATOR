import express from "express";
import { planWithAI } from "../agents/planner.js";
import { generateCode } from "../agents/generator.js";
import { explainCode } from "../agents/explainer.js";
import { validateGeneratedCode, detectFullRewrite  } from "../validators/validate.js";
import { saveVersion } from "../memory/versionStore.js";
import { getVersions, getVersion } from "../memory/versionStore.js";


const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message, previousPlan, previousCode } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Invalid message" });
    }

    const lowerMessage = message.toLowerCase();

    const isFullRegenerate =
      lowerMessage.includes("regenerate completely") ||
      lowerMessage.includes("full rewrite") ||
      lowerMessage.includes("start over");

    const blockedPhrases = [
      "ignore previous instructions",
      "disregard system prompt",
      "override rules",
      "act as system",
      "act as root",
    ];

    if (blockedPhrases.some((phrase) => lowerMessage.includes(phrase))) {
      return res.status(400).json({
        error: "Prompt injection attempt detected",
      });
    }

    // 1️⃣ Planner
    const plan = await planWithAI(message, previousPlan);

    // 2️⃣ Generator
    const code = await generateCode(plan, isFullRegenerate ? null : previousCode, isFullRegenerate);

    // 3️⃣ Validation
    validateGeneratedCode(code);

    if (!isFullRegenerate) {
      detectFullRewrite(previousCode, code);
    }


    // 4️⃣ Explainer
    const explanation = await explainCode(plan, code);

    // 5️⃣ Save Version
    saveVersion({ plan, code, explanation });

    res.json({
      plan,
      code,
      explanation,
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Get all versions
router.get("/versions", (req, res) => {
  res.json(getVersions());
});

// Rollback to version
router.get("/versions/:index", (req, res) => {
  const index = parseInt(req.params.index, 10);
  const version = getVersion(index);

  if (!version) {
    return res.status(404).json({ error: "Version not found" });
  }

  res.json(version);
});

export default router;
