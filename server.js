import express from "express";
import colors from "colors";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";

import studentRouter from "./routes/student.js";
import bookRouter from "./routes/book.js";

import authRouter from "./routes/auth.js";

import { mongodbConnection } from "./config/mongodb.js";
import { errorHandler } from "./middlewares/errorHandler.js";

// environment var
dotenv.config();
const PORT = process.env.PORT || 6060;

// init express
const app = express();

// use express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static folder
app.use(express.static("public"));

//api routes
app.use("/api/v1", authRouter);

app.use("/api/v1/student", studentRouter);
app.use("/api/v1/book", bookRouter);

//error handler
app.use(errorHandler);

// server listen
app.listen(PORT, () => {
  mongodbConnection();
  console.log(`server is running on port ${PORT}`.bgGreen.black);
});
