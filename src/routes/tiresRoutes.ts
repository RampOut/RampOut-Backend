import { Router } from 'express';
import { createTires, deleteTires, getAllTires, getTireById, updateTires } from "../controllers/tiresController";

const tiresRouter: Router = Router();

tiresRouter.get("/", getAllTires);
tiresRouter.get("/:id", getTireById);
tiresRouter.post("/",createTires);
tiresRouter.patch("/:id", updateTires);
tiresRouter.delete("/:id", deleteTires);

export default tiresRouter;