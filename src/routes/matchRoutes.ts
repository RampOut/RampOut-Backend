import { Router } from "express";
import { getALLMatches, getMatchById, createMatch, deleteMatch, updateMatch } from "../controllers/matchController";
import { get } from "jquery";

const matchRouter:Router = Router(); 

matchRouter.get('/', getALLMatches); 
matchRouter.get('/:id', getMatchById); 
matchRouter.post('/', createMatch); 
matchRouter.delete('/:id', deleteMatch); 
matchRouter.patch('/:id', updateMatch); 

export default matchRouter; 