import express from "express";
import {
  createStudent,
  deleteStudent,
  getAllStudent,
  getSingleStudent,
  updateStudent,
} from "../controllers/studentController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

// init router
const router = express.Router();

// verify
router.use(verifyToken);

// routes
router.post("/", createStudent);
router.get("/", getAllStudent);
router.get("/:id", getSingleStudent);
router.patch("/:id", updateStudent);
router.delete("/:id", deleteStudent);

// export router
export default router;
