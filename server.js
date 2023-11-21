import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDb from "./config/dbConnection.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import corsOptions from "./config/corsOptions.js";

dotenv.config();

// Connection to MongoDb
connectDb();

// Getting port from .env file
const port = process.env.SERVER_PORT;

// Creating app with express
const app = express();

// Cross Origin Resource Sharing - CORS Middleware
// app.use(cors(corsOptions));

// Body parser middleware for enabling req.body which returns parsed json
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }));

// Cookie parser middleware for enabling req.cookies
app.use(cookieParser());

app.use("/auth", authRoutes);

// Secured routes
app.use(authMiddleware);
app.use("/user", userRoutes);
app.use("/todo", todoRoutes);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDb");
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});
