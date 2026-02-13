🧠 AI Agent → Deterministic UI Generator
    An AI-powered multi-step agent that converts natural language UI intent into a working React UI with live preview — while enforcing strict determinism and component safety.

    Built as a Claude-Code–style UI system with safety, iteration awareness, and multi-provider LLM redundancy.

🚀 Live Demo (Frontend)
https://ai-ui-generator-8giausn1l-anmolkamboj99915s-projects.vercel.app/

🔗 API Base URL (Backend)
https://ai-ui-generator-backend-2wmm.onrender.com


🎯 Assignment Goal

Convert natural language UI descriptions into:

Working React UI code

Live rendered preview

Clear explanation of decisions

Iterative modifications

Rollback support

While strictly enforcing a fixed deterministic component system.

🏗 Architecture Overview
Frontend

React + Vite

Tailwind (fixed component styling only)

Claude-style layout:

Left: Chat

Right: Code editor + Preview + Explanation

Version history panel

Backend

Node.js + Express

Multi-step AI agent orchestration

Agent Flow
User Input
   ↓
Planner (Structured JSON Plan)
   ↓
Plan Validation
   ↓
Generator (Deterministic React Code)
   ↓
Code Validation + Rewrite Detection
   ↓
Explainer (Plain English reasoning)
   ↓
Version Store

🧠 Multi-Step Agent Design
1️⃣ Planner

Interprets user intent

Selects layout

Chooses allowed components

Outputs structured JSON

Example output:

{
  "layout": "dashboard",
  "components": [
    { "type": "Card", "props": {} },
    { "type": "Chart", "props": {} }
  ]
}

2️⃣ Generator

Converts structured plan → React function

Must output function GeneratedComponent

No imports

No exports

No inline styles

No className usage

Only allowed components

Only <div> as native HTML element

3️⃣ Explainer

Explains layout choice

Explains component selection

Explains modifications during incremental updates

Plain English, no markdown

🔒 Deterministic Component System (Core Constraint)

Allowed components:

Button

Card

Input

Table

Modal

Sidebar

Navbar

Chart

Strict enforcement:

No new components

No inline styles

No arbitrary HTML tags (only <div> allowed)

No imports or exports

Component whitelist validation before render

Validation occurs at two layers:

Plan validation

Generated code validation

This guarantees visual and structural consistency.

🔁 Iteration & Incremental Modification

The system supports incremental edits.

Behavior:

Previous plan is passed to Planner

Previous code is passed to Generator

Rewrite detection prevents silent full rewrites

Full rewrite allowed only when explicitly requested

Rewrite detection uses similarity ratio threshold to ensure structure preservation.

🛡 Safety & Validation Layers

Prompt injection filtering

Plan schema validation

Component whitelist enforcement

Generated code validation

Full rewrite detection

Error boundary in frontend

Multi-provider LLM fallback chain

🔄 Multi-Provider LLM Redundancy

To guarantee availability, the system implements a fallback chain:

OpenAI (Primary)

Mistral (Direct API)

OpenRouter

Deterministic role-aware fallback

If all providers fail, the system still returns valid UI without breaking determinism.

💾 Versioning System

In-memory version store

Every generation is saved

Users can rollback to previous versions

Enables reproducibility and debugging

🧪 How to Run Locally
Backend
cd backend
npm install
npm start

Frontend
cd frontend
npm install
npm run dev

⚠ Known Limitations

Version store is in-memory (resets on server restart)

Rewrite detection uses heuristic similarity (not AST-based)

Chart component uses mocked implementation

No persistent database

No streaming LLM responses

🔮 Future Improvements

AST-based diff enforcement

Persistent version storage (Redis / DB)

Structured plan schema validation with Zod

Streaming responses

Diff viewer between versions

Deterministic prop schema enforcement

Observability + provider health metrics

🧠 What This Project Demonstrates

Multi-step AI agent orchestration

Deterministic code generation

Incremental reasoning enforcement

Safety-first AI design

Multi-provider resilience

UI systems thinking

📌 Tech Stack

Frontend:

React

Vite

Tailwind CSS

Backend:

Node.js

Express

AI Providers:

OpenAI

Mistral

OpenRouter

🎥 Demo Coverage

The demo demonstrates:

Initial UI generation

Iterative modification via chat

Live preview updates

Explanation output

Rollback to previous version

👤 Author

Anmol Kamboj
AI Agent Architecture Implementation