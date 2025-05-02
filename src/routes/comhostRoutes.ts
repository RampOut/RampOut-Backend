import { Router } from "express";
import {createHostAdminOnce} from "../controllers/hostController";
import { createToken } from "../middleware/servicio/token";
import { loginLimiter } from "../middleware/servicio/loginLimiter";

const comHostRoutes:Router = Router();
comHostRoutes.post("/register", createHostAdminOnce);
comHostRoutes.post("/login", loginLimiter ,createToken);

export default comHostRoutes;
