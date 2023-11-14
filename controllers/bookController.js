import { createSlug } from "../helpers/helpers.js";
import Book from "../models/Book.js";
import asyncHandler from "express-async-handler";

/**
 * @DESC create book
 * @ROUTE api/v1/book
 * @METHOD POST
 * @ACCESS PUBLIC
 */

export const createBook = asyncHandler(async (req, res) => {
  // get data
  const { name } = req.body;

  // validate data
  if (!name) {
    return res.status(400).json({ message: "Book name is required" });
  }

  //create book
  const data = await Book.create({
    name: name,
    slug: createSlug(name),
  });

  res.status(200).json({ message: "Book created successful", book: data });
});

/**
 * @DESC get all book
 * @ROUTE /api/v1/book
 * @METHOD GET
 * @ACCESS PUBLIC
 */
export const getAllBook = asyncHandler(async (req, res) => {
  //   const data = await Student.find().populate("books").populate("team");
  const data = await Book.find();

  // check book count
  if (data.length === 0) {
    return res.status(404).json({ message: "No books found", books: data });
  }

  res.status(200).json({ message: "All books", booksCount: data.length, data });
});

/**
 * @DESC get single book
 * @ROUTE /api/v1/book/:slug
 * @METHOD GET
 * @ACCESS PUBLIC
 */
export const getSingleBook = asyncHandler(async (req, res) => {
  // get params
  const { slug } = req.params;

  // get single book
  const data = await Book.findOne({ slug });

  // // get params
  // const { id } = req.params;

  // // get single book
  // const data = await Book.findById(id);

  //check book count
  if (!data) {
    return res.status(404).json({ message: "No book found", book: data });
  }

  res.status(200).json({ message: "Book data", book: data });
});

/**
 * @DESC update book
 * @ROUTE /api/v1/book/:id
 * @METHOD PUT/PATCH
 * @ACCESS PUBLIC
 */
export const updateBook = asyncHandler(async (req, res) => {
  //get params
  const { id } = req.params;
  const { name } = req.body;

  // update book
  const data = await Book.findByIdAndUpdate(
    id,
    { name, slug: createSlug(name) },
    { new: true }
  );

  res.status(200).json({ message: "Book updated successful", data });
});

/**
 * @DESC delete book
 * @ROUTE /api/v1/book/:id
 * @METHOD DELETE
 * @ACCESS PUBLIC
 */
export const deleteBook = asyncHandler(async (req, res) => {
  // get params
  const { id } = req.params;

  // delete student
  const data = await Book.findByIdAndDelete(id);

  res.status(200).json({ message: "Book deleted successful", data });
});
