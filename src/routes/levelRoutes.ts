import { Router } from "express";
import { getALLlevels, createlevel, deletelevel, getlevelById, setLevelsPresets } from "../controllers/levelController";

const levelRouter:Router = Router(); 

levelRouter.get('/', getALLlevels); 
levelRouter.get('/:id', getlevelById);
levelRouter.post('/', createlevel); 
levelRouter.delete('/:id', deletelevel); 
levelRouter.patch('/', setLevelsPresets); 

export default levelRouter; 
