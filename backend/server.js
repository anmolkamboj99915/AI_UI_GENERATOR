import "dotenv/config";
import express from "express";
import cors from "cors";
import generateRoute from "./routes/generate.js";

const app = express();

// ✅ Proper Production CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-ui-generator-8giausn1l-anmolkamboj99915s-projects.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like curl, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.status(200).send("Backend is running");
});

app.use("/api/generate", generateRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
