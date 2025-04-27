import { Router } from "express";
import { createHost, deleteHost, getAccess, getHostById, hostLogout, updateHostPassword } from "../controllers/hostController";
import { verifyToken } from "../middleware/servicio/auth";

// Router protegidos por firma.
const router = Router();
router.get("/", verifyToken, getAccess);
router.get("/:id", verifyToken, getHostById);
router.post('/:id', verifyToken, hostLogout);
router.post("/", verifyToken, createHost);
router.patch("/:id", verifyToken, updateHostPassword);
router.delete("/:id", verifyToken, deleteHost)


export default router;
