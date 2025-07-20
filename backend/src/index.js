import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRoute from "./route/auth.route.js";
import cookieParser from "cookie-parser";
import messageRoute from "./route/message.route.js";
import cors from "cors";
import path from "path";
import { app, server } from "./config/socket.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

dotenv.config();
console.log("Registering middleware: express.json");
app.use(express.json({ limit: "5mb" }));
console.log("Registering middleware: cookieParser");
app.use(cookieParser());
console.log("Registering middleware: cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const __dirname = path.dirname(__filename);

console.log("Registering route: /api/auth");
app.use("/api/auth", authRoute);
console.log("Registering route: /api/message");
app.use("/api/message", messageRoute);

if (process.env.NODE_ENV === "production") {
  console.log("Registering static file serving for production");
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  console.log("Registering wildcard route: regex /^\\/.*/$");
  app.get(/^\/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`server started at port ${port}`);
  connectDb();
});
