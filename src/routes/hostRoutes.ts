import { Router } from "express";
import { createHost, deleteHost, getAccess, getAllHost, getHostById, hostLogout, updateHost } from "../controllers/hostController";
import { verifyToken, authorizeRole } from "../middleware/servicio/auth";

// Router protegidos por firma.
const hostRoutes:Router = Router();
hostRoutes.get("/admin",verifyToken, authorizeRole("admin"), getAllHost)
hostRoutes.get("/", verifyToken, getAccess);
hostRoutes.get("/:id", verifyToken, getHostById);
hostRoutes.post('/logout', verifyToken, hostLogout);
hostRoutes.post("/", verifyToken, authorizeRole("admin"), createHost);
hostRoutes.patch("/:id", verifyToken,authorizeRole("admin"),  updateHost);
hostRoutes.delete("/:id", verifyToken, authorizeRole("admin") ,deleteHost )


export default hostRoutes;
