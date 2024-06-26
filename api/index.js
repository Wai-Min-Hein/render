import express from "express";

import mongoose from "mongoose";

import dotenv from "dotenv";

import UserRouter from "./routes/users.route.js";
import authRouter from "./routes/auth.route.js";

import artWorksRouter from "./routes/artworks.route.js";
import artistRouter from "./routes/artist.route.js";

import blogRouter from "./routes/blog.route.js";

import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.Mongo_URL)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => console.log("Cannot connected to the database" + err));

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/user", UserRouter);
app.use("/api/auth", authRouter);

app.use("/api/artworks", artWorksRouter);

app.use("/api/artist", artistRouter);

app.use("/api/blog", blogRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(process.env.Port, () => {
  console.log(`Server is listening at port ${process.env.Port}`);
});
