import { Router } from "express";
import { getALLChassiss, createChassis, deleteChassis, getChassisById, updateChassis } from "../controllers/chassisController";

const chassisRouter:Router = Router(); 

chassisRouter.get('/', getALLChassiss); 
chassisRouter.get('/:id', getChassisById);
chassisRouter.post('/', createChassis); 
chassisRouter.delete('/:id', deleteChassis); 
chassisRouter.patch('/:id', updateChassis); 

export default chassisRouter; 
