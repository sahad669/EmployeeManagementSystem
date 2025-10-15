import express from "express";
import {
  register,
  login,
  createEmployee,
  getAllEmployees,
  deleteEmployee,
  getEmployeeById,
  editEmployee,
} from "../controllers/userController.js";
import { isLogged, checkAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post(
  "/create",
  isLogged,
  checkAdmin,
  upload.single("image"),
  createEmployee
);
router.get("/getall", isLogged, checkAdmin, getAllEmployees);
router.patch("/edit/:id", isLogged, upload.single("image"), editEmployee);
router.delete("/delete/:id", isLogged, checkAdmin, deleteEmployee);
router.get("/byid/:id", isLogged, getEmployeeById);

export default router;
