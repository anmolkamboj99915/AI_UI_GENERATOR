import "dotenv/config";
import express from "express";
import cors from "cors";
import generateRoute from "./routes/generate.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health check route for Render
app.get("/", (req, res) => {
  res.status(200).send("Backend is running");
});

app.use("/api/generate", generateRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
