import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import connectDb from "./config/dbConnection.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

// Connection to MongoDb
connectDb();

// Getting port from .env file
const port = process.env.SERVER_PORT;

// Creating app with express
const app = express();

// Body parser middleware for enabling req.body which returns parsed json
app.use(bodyParser.json());

// Cookie parser middleware for enabling req.cookies
app.use(cookieParser());

// Routes for authorization
app.use("/auth", authRoutes);

// Routes for todos
app.use("/todo", todoRoutes);

// Routes for user
app.use("/user", userRoutes);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDb");
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});
