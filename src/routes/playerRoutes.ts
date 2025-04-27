import { Router } from "express";
import { getALLPlayers, getPlayerById, createPlayer, deletePlayer, updatePlayer } from "../controllers/playerController";

const playerRouter:Router = Router(); 

playerRouter.get('/', getALLPlayers); 
playerRouter.get('/:id', getPlayerById); 
playerRouter.post('/', createPlayer); 
playerRouter.delete('/:id', deletePlayer); 
playerRouter.patch('/:id', updatePlayer); 

export default playerRouter; 