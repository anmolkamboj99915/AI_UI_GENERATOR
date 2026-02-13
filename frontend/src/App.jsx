import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ChatPanel from "./layout/ChatPanel";
import CodePanel from "./layout/CodePanel";
import Preview from "./layout/Preview";
import ExplanationPanel from "./layout/ExplanationPanel";
import { generateUI, fetchVersion, fetchVersions } from "./api";

function App() {
  const [code, setCode] = useState("");
  const [plan, setPlan] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [versions, setVersions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState(""); // ✅ Added

  useEffect(() => {
    fetchVersions().then(setVersions).catch(() => {});
  }, []);

  const handleGenerate = async (message) => {
    setLoading(true);

    try {
      setMessages((prev) => [...prev, { role: "user", content: message }]);

      const result = await generateUI({
        message,
        previousPlan: plan,
        previousCode: code,
      });

      setPlan(result.plan);
      setCode(result.code);
      setExplanation(result.explanation);
      setProvider(result.provider); // ✅ Added

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.explanation },
      ]);

      await fetchVersions().then(setVersions);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRollback = async (index) => {
    try {
      const version = await fetchVersion(index);
      setPlan(version.plan);
      setCode(version.code);
      setExplanation(version.explanation);
    } catch {
      alert("Failed to rollback");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar provider={provider} /> {/* ✅ Updated */}

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <div className="w-56 border-r bg-white">
          <Sidebar />
        </div>

        {/* Chat */}
        <div className="w-80 border-r bg-gray-50 flex flex-col">
          <ChatPanel
            messages={messages}
            onUserMessage={handleGenerate}
          />
        </div>

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col overflow-hidden p-4 space-y-4">

          {loading && (
            <div className="bg-white p-3 rounded shadow text-sm text-gray-600 animate-pulse">
              AI is generating UI...
            </div>
          )}

          <div className="flex-1 grid grid-cols-2 gap-4 overflow-hidden">

            {/* Left: Code */}
            <div className="overflow-auto">
              <CodePanel code={code} onCodeChange={setCode} />
            </div>

            {/* Right: Preview + Explanation */}
            <div className="flex flex-col gap-4 overflow-auto">
              <div className="flex-1 overflow-auto">
                <Preview code={code} />
              </div>

              <div className="flex-1 overflow-auto">
                <ExplanationPanel explanation={explanation} />
              </div>
            </div>

          </div>

          {/* Version History */}
          <div className="bg-white p-3 rounded shadow-sm">
            <h3 className="font-semibold mb-2 text-sm text-gray-600">
              Version History
            </h3>
            {versions.map((_, index) => (
              <button
                key={index}
                onClick={() => handleRollback(index)}
                className="text-blue-600 text-sm mr-3 hover:underline"
              >
                Version {index + 1}
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
