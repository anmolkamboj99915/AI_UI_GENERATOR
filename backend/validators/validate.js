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

export function validateGeneratedCode(code) {
  if (!code.includes("function GeneratedComponent")) {
    throw new Error("GeneratedComponent function missing");
  }

  if (code.includes("<style") || code.includes("style=")) {
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

  const componentUsage = code.match(/<([A-Z][A-Za-z]*)/g) || [];

  componentUsage.forEach((match) => {
    const component = match.replace("<", "");
    if (!allowedComponents.includes(component) && component !== "div") {
      throw new Error(`Unauthorized component used: ${component}`);
    }
  });

  return true;
}

export function detectFullRewrite(previousCode, newCode) {
  if (!previousCode) return false;

  const similarity =
    previousCode.length > 0
      ? newCode.includes(previousCode.slice(0, 50))
      : true;

  if (!similarity) {
    throw new Error("Full rewrite detected without explicit request");
  }

  return false;
}
