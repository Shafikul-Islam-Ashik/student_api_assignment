import express from "express";
import { loginStudent, logoutStudent } from "../controllers/authController.js";

// init router
const router = express.Router();

// routes
router.post("/login", loginStudent);
router.get("/logout", logoutStudent);

// export router
export default router;
