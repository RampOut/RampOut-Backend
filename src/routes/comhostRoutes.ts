import { Router } from "express";
import {createHostOnce} from "../controllers/hostController";
import { createToken } from "../middleware/servicio/token";
import { loginLimiter } from "../middleware/servicio/loginLimiter";

// Router base conn bajos privilegios
const router = Router();
router.post("/register", createHostOnce);
router.post("/login", loginLimiter ,createToken);

export default router;
