import { useState } from "react";
import Card from "../components/Card";
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
    <Card title="Chat">
      {messages?.map((msg, index) => (
        <div key={index} className="mb-2">
          <strong>{msg.role}:</strong> {msg.content}
        </div>
      ))}

      <div className="mt-4 flex gap-2">
        <Input
          value={input}
          onChange={setInput}
          placeholder="Type request..."
        />
        <Button label="Send" onClick={handleSend} />
      </div>
    </Card>
  );
}

export default ChatPanel;
