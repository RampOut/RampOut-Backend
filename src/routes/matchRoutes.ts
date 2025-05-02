import { Router } from "express";
import { getALLMatches, getMatchById, deleteMatch, updateMatch, createMatchWithTeams, startRound } from "../controllers/matchController";
import { get } from "jquery";

const matchRouter:Router = Router(); 

matchRouter.get('/', getALLMatches); 
matchRouter.get('/:id', getMatchById); 
matchRouter.post('/', createMatchWithTeams); 
matchRouter.delete('/:id', deleteMatch); 
matchRouter.patch('/:id', updateMatch); 
matchRouter.post('/start-round', startRound);

export default matchRouter; 