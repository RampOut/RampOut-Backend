import { Router } from "express";
import {createHostOnce} from "../controllers/hostController";
import { createToken } from "../middleware/servicio/token"

// Router base conn bajos privilegios
const router = Router();
router.post("/register", createHostOnce);
router.post("/login", createToken);

export default router;
