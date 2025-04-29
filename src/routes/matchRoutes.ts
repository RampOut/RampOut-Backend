import { Router } from "express";
import { getALLMatches, getMatchById, deleteMatch, updateMatch, createMatchWithTeams } from "../controllers/matchController";
import { get } from "jquery";

const matchRouter:Router = Router(); 

matchRouter.get('/', getALLMatches); 
matchRouter.get('/:id', getMatchById); 
matchRouter.post('/', createMatchWithTeams); 
matchRouter.delete('/:id', deleteMatch); 
matchRouter.patch('/:id', updateMatch); 

export default matchRouter; 