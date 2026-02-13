const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function generateUI(payload) {
  const response = await fetch(`${BASE_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Generation failed");
  }

  return response.json();
}

export async function fetchVersions() {
  const res = await fetch(`${BASE_URL}/api/generate/versions`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to fetch versions");
  }

  return res.json();
}

export async function fetchVersion(index) {
  const res = await fetch(
    `${BASE_URL}/api/generate/versions/${index}`
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to fetch version");
  }

  return res.json();
}
