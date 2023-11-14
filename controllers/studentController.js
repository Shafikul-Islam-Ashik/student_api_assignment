import Student from "../models/Student.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

/**
 * @DESC create student
 * @ROUTE /api/v1/student
 * @METHOD POST
 * @ACCESS PUBLIC
 */
export const createStudent = asyncHandler(async (req, res) => {
  // get data
  const { name, roll, password } = req.body;

  // validate data
  if (!name || !roll || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // password hash
  const hashPass = await bcrypt.hash(password, 10);

  //create new student
  const data = await Student.create({
    ...req.body,
    password: hashPass,
  });

  //  create jwt
  const token = jwt.sign({ name, roll }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
  });

  res
    .status(200)
    .json({ message: "Student created successful", student: data, token });
});

/**
 * @DESC get all student
 * @ROUTE /api/v1/student
 * @METHOD GET
 * @ACCESS PUBLIC
 */
export const getAllStudent = asyncHandler(async (req, res) => {
  //   const data = await Student.find().populate("books").populate("team");
  const data = await Student.find().populate("books");

  // check student count
  if (data.length === 0) {
    return res
      .status(404)
      .json({ message: "Students data not found", users: data });
  }

  res
    .status(200)
    .json({ message: " All students data", studentCount: data.length, data });
});

/**
 * @DESC get single student
 * @ROUTE /api/v1/student/:id
 * @METHOD DELETE
 * @ACCESS PUBLIC
 */
export const getSingleStudent = asyncHandler(async (req, res) => {
  // get params
  const { id } = req.params;

  // get single student
  const data = await Student.findById(id).populate("books");

  //check student count
  if (!data) {
    return res
      .status(404)
      .json({ message: "Student data not found", student: data });
  }

  res.status(200).json({ message: "Student data", student: data });
});

/**
 * @DESC update student
 * @ROUTE /api/v1/student/:id
 * @METHOD PUT/PATCH
 * @ACCESS PUBLIC
 */
export const updateStudent = asyncHandler(async (req, res) => {
  // get params
  const { id } = req.params;

  // get data
  const { name, roll, department, location, gender, age } = req.body;

  //get books id from body
  const { bookId } = req.body;

  // update student
  const data = await Student.findByIdAndUpdate(
    id,
    {
      $set: {
        name,
        roll,
        department,
        location,
        gender,
        age,
      },
    },
    { new: true }
  );

  /**
   * push,pull single data
   */
  // const data = await Student.findByIdAndUpdate(
  //   id,
  //   {
  //     $push: { books: bookId }, // Using $push to add bookId to the 'books' array field
  //   },
  //   { new: true }
  // );

  /**
   *  set empty
   */
  // const data = await Student.findByIdAndUpdate(
  //   id,
  //   {
  //     $set: { books: [] },
  //   },
  //   { new: true }
  // );

  /**
   * push multiple data
   */
  // const data = await Student.findByIdAndUpdate(
  //   id,
  //   {
  //     $push: {
  //       books: {
  //         $each: ["653619c90033adda3044fc5c", "653619b80033adda3044fc5a"],
  //       },
  //     },
  //   },
  //   { new: true }
  // );

  /**
   * pull multiple data
   */
  // const data = await Student.findByIdAndUpdate(
  //   id,
  //   {
  //     $pull: {
  //       books: {
  //         $in: ["653619c90033adda3044fc5c", "653619d50033adda3044fc5e"],
  //       },
  //     },
  //   },
  //   { new: true }
  // );

  res.status(200).json({ message: "Updated successfully", data });
});

/**
 * @DESC delete student
 * @ROUTE /api/v1/student/:id
 * @METHOD DELETE
 * @ACCESS PUBLIC
 */
export const deleteStudent = asyncHandler(async (req, res) => {
  // get params
  const { id } = req.params;

  // delete student
  const data = await Student.findByIdAndDelete(id);

  res.status(200).json({ message: "Student deleted successful", data });
});
