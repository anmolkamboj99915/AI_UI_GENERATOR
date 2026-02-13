import { useState, useEffect } from "react";
import Card from "../components/Card";

function CodePanel({ code, onCodeChange }) {
  const [localCode, setLocalCode] = useState(code);

  useEffect(() => {
    setLocalCode(code);
  }, [code]);

  return (
    <Card title="Generated Code">
      <textarea
        className="w-full h-[400px] text-sm bg-gray-100 p-2 rounded"
        value={localCode}
        onChange={(e) => {
          setLocalCode(e.target.value);
          onCodeChange(e.target.value);
        }}
      />
    </Card>
  );
}

export default CodePanel;
