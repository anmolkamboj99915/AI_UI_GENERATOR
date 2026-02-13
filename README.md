# 🧠 AI UI Generator  
**AI Agent → Deterministic UI Generator (Claude-Code Style)**

Deployed Frontend: https://ai-ui-generator-8giausn1l-anmolkamboj99915s-projects.vercel.app/
Deployed Backend: https://ai-ui-generator-backend-2wmm.onrender.com
---
      
      
## 🎯 Overview

This project implements a deterministic AI-powered UI generation system.

Users can:

- Describe UI in natural language  
- See working React UI rendered instantly  
- Iteratively modify the UI via chat  
- Understand why decisions were made  
- Roll back to previous versions  

The system is built around a **strict deterministic component library** and a **multi-step AI agent pipeline** to ensure safety, reproducibility, and explainability.

---

# 🏗 Architecture

The system follows a structured 3-agent pipeline:

```
User Intent
    ↓
Planner Agent
    ↓
Generator Agent
    ↓
Explainer Agent
    ↓
Validated Output → Live Preview
```

---

## 1️⃣ Planner Agent

**Responsibility:**

- Interpret user intent  
- Select layout type  
- Select allowed components  
- Output structured JSON plan  

### Example Output

```json
{
  "layout": "dashboard",
  "components": [
    { "type": "Card", "props": { "title": "Revenue" } },
    { "type": "Chart", "props": {} }
  ]
}
```

Strict Rules:

- Can only use whitelisted components  
- Cannot create new components  
- Returns valid JSON only  

---

## 2️⃣ Generator Agent

**Responsibility:**

- Convert plan → deterministic React code  
- Use only fixed component library  
- Modify previous code incrementally  
- Prevent full rewrites unless explicitly requested  

### Constraints Enforced

- No imports  
- No exports  
- No inline styles  
- No className usage  
- No arbitrary HTML tags  
- No event handlers  
- Static UI only  
- Must return `function GeneratedComponent()`  

Generated code runs safely inside:

```js
new Function("React", ...)
```

---

## 3️⃣ Explainer Agent

**Responsibility:**

- Explain layout decisions  
- Explain component selection  
- Describe incremental modifications  
- Clarify what changed and why  

Produces clear plain-English output.

---

# 🔒 Deterministic Component System

The UI is built using a fixed component library.

## Allowed Components

- Button  
- Card  
- Input  
- Table  
- Modal  
- Sidebar  
- Navbar  
- Chart  

## Hard Constraints

- No new components may be created by AI  
- Component implementation never changes  
- No inline styling  
- No AI-generated Tailwind  
- No external UI libraries  

Validation is enforced before rendering.

---

# 🔁 Iterative Editing & Rewrite Detection

The system supports incremental modification.

Example:

> “Make this more minimal and add a settings modal.”

The system:

- Preserves structure  
- Modifies only necessary sections  
- Compares new vs previous code  
- Blocks full rewrites unless explicitly requested  

Rewrite detection uses line similarity analysis.  
If similarity < 40% → request rejected.

---

# 🛡 Safety & Validation

Multiple layers of protection are implemented:

## 1. Component Whitelist Enforcement

- Validates planner output  
- Validates generated code  

## 2. Prompt Injection Protection

Blocks phrases such as:

- "ignore previous instructions"  
- "override system prompt"  
- "act as root"  

## 3. Generated Code Validation

Prevents:

- Inline styles  
- className usage  
- import/export statements  
- Unauthorized components  

## 4. Safe Rendering

Code runs in isolated function scope with controlled component injection.

## 5. Error Handling

- Backend try/catch  
- Validation errors surfaced  
- React ErrorBoundary in frontend  

---

# 🖥 UI Structure (Claude-Style)

The application includes:

- Left panel → AI chat  
- Center → Generated code (editable)  
- Live preview → Rendered UI  
- Explanation panel  
- Version history with rollback  

Live reload occurs immediately after generation.

---

# 🗂 Versioning System

Each generation stores:

- Plan  
- Code  
- Explanation  
- Timestamp  

Users can:

- View previous versions  
- Roll back to any version  

Storage is in-memory (acceptable per assignment constraints).

---

# ⚙️ Tech Stack

## Frontend

- React + Vite  
- TailwindCSS  
- ErrorBoundary for runtime protection  

## Backend

- Node.js + Express  
- Multi-provider LLM service  
- Validation middleware  

## AI Providers

- OpenAI (Primary)  
- Mistral (Fallback)  
- OpenRouter (Tertiary fallback)  

---

# 🚀 Setup Instructions

## Backend

```bash
cd backend
npm install
npm run dev
```

Create `.env` file:

```
OPENAI_API_KEY=your_key
MISTRAL_API_KEY=your_key
OPENROUTER_API_KEY=your_key
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Set environment variable:

```
VITE_API_URL=http://localhost:5000
```

---

# 📦 Deployment

Frontend deployed via Vercel  
Backend deployed via Render  

Environment variables configured in hosting dashboards.

---

# 🧪 What This Demonstrates

- Explicit AI agent orchestration  
- Deterministic UI generation  
- Incremental reasoning  
- Rewrite detection logic  
- Safe dynamic execution  
- Explainable AI decisions  

---

# ⚠ Known Limitations

- In-memory version storage resets on server restart  
- No diff viewer (optional bonus)  
- No streaming responses  
- Basic similarity rewrite detection (line-based)  

---

# 🔮 Improvements With More Time

- Persistent database versioning  
- Visual diff viewer  
- Structured component schema validation  
- Replayable generation logs  
- Streaming token rendering  
- More advanced rewrite detection (AST-level comparison)  

---

# 🎥 Demo Coverage

The demo video includes:

- Initial UI generation  
- Iterative modification  
- Live preview update  
- Explanation output  
- Version rollback  

---

# 🏁 Final Notes

This project prioritizes:

- Determinism over randomness  
- Safety over flexibility  
- Explainability over black-box generation  
- Correctness over visual polish  

The goal is to build a trustworthy AI UI system — not just a UI generator.
