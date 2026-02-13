import React, { useEffect, useState } from "react";
import Card from "../components/Card";

import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Chart from "../components/Chart";

function Preview({ code }) {
  const [RenderedComponent, setRenderedComponent] = useState(null);

  useEffect(() => {
    if (!code) return;
    if (!code.includes("GeneratedComponent")) return;

    try {
      const componentFactory = new Function(
        "React",
        "Button",
        "Card",
        "Input",
        "Table",
        "Modal",
        "Sidebar",
        "Navbar",
        "Chart",
        `
        ${code}
        return GeneratedComponent;
        `
      );

      const Component = componentFactory(
        React,
        Button,
        Card,
        Input,
        Table,
        Modal,
        Sidebar,
        Navbar,
        Chart
      );

      setRenderedComponent(() => Component);
    } catch (error) {
      console.error("Preview error:", error);
      setRenderedComponent(() => () => (
        <div className="p-4 text-sm text-red-600 bg-red-100 rounded">
          Generated code is invalid or failed validation.
        </div>
      ));
    }
  }, [code]);

  return (
    <Card title="Preview">
      {RenderedComponent && <RenderedComponent />}
    </Card>
  );
}

export default Preview;
