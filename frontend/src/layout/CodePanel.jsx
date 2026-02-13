import { useState, useEffect } from "react";

function CodePanel({ code, onCodeChange }) {
  const [localCode, setLocalCode] = useState(code);

  useEffect(() => {
    setLocalCode(code);
  }, [code]);

  return (
    <div className="bg-[#1e1e1e] text-gray-200 rounded shadow h-full flex flex-col">
      
      <div className="px-4 py-2 border-b border-gray-700 text-sm text-gray-400">
        Generated Code
      </div>

      <textarea
        className="flex-1 bg-[#1e1e1e] p-4 text-sm font-mono outline-none resize-none"
        value={localCode}
        onChange={(e) => {
          setLocalCode(e.target.value);
          onCodeChange(e.target.value);
        }}
      />
    </div>
  );
}

export default CodePanel;
