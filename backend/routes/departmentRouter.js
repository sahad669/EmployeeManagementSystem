import express from "express"
import { getAllDepartment,addDepartment,deleteDepartment } from "../controllers/departmentController.js";
import { isLogged,checkAdmin } from "../middleware/authMiddleware.js";
const router = express.Router()

router.get('/getall',isLogged,checkAdmin,getAllDepartment)
router.post("/add",isLogged,checkAdmin,addDepartment);
router.delete("/delete/:id",isLogged,checkAdmin,deleteDepartment);

export default router