const allowedLayouts = ["dashboard", "form", "table", "custom"];

const allowedComponents = [
  "Button",
  "Card",
  "Input",
  "Table",
  "Modal",
  "Sidebar",
  "Navbar",
  "Chart",
];

// ✅ PLAN VALIDATION
export function validatePlan(plan) {
  if (!plan || typeof plan !== "object") {
    throw new Error("Invalid plan structure");
  }

  if (!allowedLayouts.includes(plan.layout)) {
    throw new Error(`Invalid layout type: ${plan.layout}`);
  }

  if (!Array.isArray(plan.components)) {
    throw new Error("Plan components must be an array");
  }

  plan.components.forEach((component) => {
    if (!allowedComponents.includes(component.type)) {
      throw new Error(
        `Unauthorized component in plan: ${component.type}`
      );
    }

    if (typeof component.props !== "object") {
      throw new Error("Component props must be an object");
    }
  });

  return true;
}

// ✅ GENERATED CODE VALIDATION
export function validateGeneratedCode(code) {
  if (!code.includes("function GeneratedComponent")) {
    throw new Error("GeneratedComponent function missing");
  }

  if (
    code.includes("<style") ||
    code.includes("style=") ||
    code.includes("style={{")
  ) {
    throw new Error("Inline styles not allowed");
  }

  if (code.includes("className=")) {
    throw new Error("Dynamic styling not allowed");
  }

  if (code.includes("import ")) {
    throw new Error("Generator must not include imports");
  }

  if (code.includes("export ")) {
    throw new Error("Generator must not export anything");
  }

  // 🔹 UPDATED COMPONENT VALIDATION LOGIC

  // Match ALL JSX tags
  const tagMatches = code.match(/<\s*([a-zA-Z][a-zA-Z0-9]*)/g) || [];

  tagMatches.forEach((match) => {
    const tag = match.replace("<", "").trim();

    const isCapitalized = /^[A-Z]/.test(tag);

    if (isCapitalized) {
      if (!allowedComponents.includes(tag)) {
        throw new Error(`Unauthorized component used: ${tag}`);
      }
    } else {
      if (tag !== "div") {
        throw new Error(`Unauthorized HTML tag used: ${tag}`);
      }
    }
  });

  return true;
}

// ✅ FULL REWRITE DETECTION
export function detectFullRewrite(previousCode, newCode) {
  if (!previousCode) return false;

  const previousLines = previousCode
    .split("\n")
    .map(l => l.trim())
    .filter(l => l.length > 0);

  const newLines = newCode
    .split("\n")
    .map(l => l.trim())
    .filter(l => l.length > 0);

  const matchedLines = previousLines.filter(line =>
    line.length > 5 && newLines.includes(line)
  );

  const similarityRatio = matchedLines.length / previousLines.length;

  if (similarityRatio < 0.4) {
    throw new Error("Full rewrite detected without explicit request");
  }

  return false;
}
