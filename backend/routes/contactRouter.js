import express from "express";
import { createMessage, getAllMessages,deleteMessage } from "../controllers/contactController.js";

const router = express.Router();

router.post("/sendMessage", createMessage); 
router.get("/allMessage", getAllMessages); 
router.delete("/delete/:id", deleteMessage)

export default router;