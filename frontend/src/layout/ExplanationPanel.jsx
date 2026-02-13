import Card from "../components/Card";

function ExplanationPanel({ explanation }) {
  return (
    <Card title="Explanation">
      <div className="text-sm whitespace-pre-wrap">
        {explanation || "No explanation yet."}
      </div>
    </Card>
  );
}

export default ExplanationPanel;
