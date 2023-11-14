import express from "express";
import {
  createBook,
  deleteBook,
  getAllBook,
  getSingleBook,
  updateBook,
} from "../controllers/bookController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

// init router
const router = express.Router();

//verify
router.use(verifyToken);

// routes
router.post("/", createBook);
router.get("/", getAllBook);
router.get("/:slug", getSingleBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

// export router
export default router;
