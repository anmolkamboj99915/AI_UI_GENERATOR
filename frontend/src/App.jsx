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


  useEffect(() => {
    fetchVersions().then(setVersions).catch(() => {});
  }, []);

  const handleGenerate = async (message) => {
    try {
      const updatedMessages = [
        ...messages, 
        { role: "user", content: message }
      ];
      setMessages(updatedMessages);

      const result = await generateUI({
        message,
        previousPlan: plan,
        previousCode: code,
      });

      setPlan(result.plan);
      setCode(result.code);
      setExplanation(result.explanation);
      
      //  assistant explanation to chat
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.explanation },
      ]);

      // 🔥 Refresh from backend (source of truth)
      await fetchVersions().then(setVersions);

    } catch (error) {
      alert(error.message);
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
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 bg-gray-50">
        <Sidebar />

        <div className="w-1/3 p-4 border-r overflow-auto">
          <ChatPanel 
          messages={messages}
          onUserMessage={handleGenerate} />
        </div>

        <div className="w-2/3 p-4 space-y-4 overflow-auto">
          <CodePanel code={code} onCodeChange={setCode} />
          <Preview code={code} />
          <ExplanationPanel explanation={explanation} />

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Version History</h3>
            {versions.map((_, index) => (
              <button
                key={index}
                onClick={() => handleRollback(index)}
                className="text-blue-600 text-sm mr-3"
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
