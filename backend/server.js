import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import path from "path";
import cors from "cors"
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express(); // main thing

app.use(express.json()); // to accept json data
app.use(cors())
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

// --------------------------deployment------------------------------
const __dirname = path.resolve();

if ("production" === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = 4000;

app.listen(
  PORT,
  console.log(
    `Server running in "production" mode on port ${PORT}..`.yellow
      .bold
  )
);
