import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Student from "../models/Student.js";

/**
 * @DESC STUDENT LOGIN SYSTEM
 * @ROUTE /api/v1/login
 * @METHOD POST
 * @ACCESS PUBLIC
 */
export const loginStudent = asyncHandler(async (req, res) => {
  // get form data
  const { roll, password } = req.body;

  // validation
  if (!roll || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // student check
  const loginStudent = await Student.findOne({ roll });

  if (!loginStudent) {
    return res.status(404).json({ message: "Invalid roll number" });
  }

  // password check
  const passCheck = await bcrypt.compare(password, loginStudent.password);

  if (!passCheck) {
    return res.status(400).json({ message: "Wrong Password" });
  }

  // access token
  const accessToken = jwt.sign(
    { email: loginStudent.roll },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN }
  );

  // set token
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.APP_ENV === "Development" ? false : true,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: `Hello ${loginStudent.name}, You are logged In`,
    student: loginStudent,
  });
});

/**
 * @DESC USER LOGOUT SYSTEM
 * @ROUTE /api/v1/logout
 * @METHOD GET
 * @ACCESS PUBLIC
 */
export const logoutStudent = asyncHandler(async (req, res) => {
  // clear auth cookie
  res.clearCookie("accessToken");

  res.status(200).json({
    message: `You are logged Out`,
  });
});
