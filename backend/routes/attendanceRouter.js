
import express from "express";
import { markAttendance, getAttendance,deleteAttendance } from "../controllers/attendanceController.js";
import { isLogged } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/mark",isLogged, markAttendance);
router.get("/:employeeId",isLogged, getAttendance);
router.delete("/delete/:id",isLogged, deleteAttendance);

export default router;