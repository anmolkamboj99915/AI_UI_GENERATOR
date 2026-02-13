import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

function ChatPanel({ messages, onUserMessage }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onUserMessage(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full p-4">

      <h2 className="text-sm font-semibold text-gray-600 mb-4">
        AI Chat
      </h2>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded text-sm ${
              msg.role === "user"
                ? "bg-blue-100"
                : "bg-gray-200"
            }`}
          >
            <strong className="capitalize">{msg.role}:</strong>{" "}
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={setInput}
          placeholder="Describe UI..."
        />
        <Button label="Generate" onClick={handleSend} />
      </div>

    </div>
  );
}

export default ChatPanel;
