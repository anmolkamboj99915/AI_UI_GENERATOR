import express from "express";
import { planWithAI } from "../agents/planner.js";
import { generateCode } from "../agents/generator.js";
import { explainCode } from "../agents/explainer.js";
import {
  validateGeneratedCode,
  detectFullRewrite,
  validatePlan
} from "../validators/validate.js";
import {
  getVersions,
  getVersion,
  saveVersion
} from "../memory/versionStore.js";

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
    const plannerResult = await planWithAI(message, previousPlan);
    const plan = plannerResult.plan;
    const provider = plannerResult.provider;

    validatePlan(plan);

    // 2️⃣ Generator
    const generatorResult = await generateCode(
      plan,
      isFullRegenerate ? null : previousCode,
      isFullRegenerate
    );

    const code = generatorResult.code;

    validateGeneratedCode(code);

    if (
      !isFullRegenerate && 
      previousCode &&
      typeof previousCode === "string" &&
      previousCode.trim() !== ""
      ) {
      detectFullRewrite(previousCode, code);
    }

    // 3️⃣ Explainer
    const explainerResult = await explainCode(plan, code);
    const explanation = explainerResult.explanation;

    // 4️⃣ Save Version
    saveVersion({ plan, code, explanation });

    // 5️⃣ Send Response (Include Provider)
    res.json({
      plan,
      code,
      explanation,
      provider // ✅ Send provider to frontend
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
  const index = parseInt(req.params.index);

  if (Number.isNaN(index)) {
    return res.status(400).json({ error: "Invalid version index" });
  }

  const version = getVersion(index);

  if (!version) {
    return res.status(404).json({ error: "Version not found" });
  }

  res.json(version);
});

export default router;
