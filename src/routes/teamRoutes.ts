import { Router } from "express";
import { getALLTeams, getTeamById, createTeam, deleteTeam, updateTeam } from "../controllers/teamController";

const teamRouter:Router = Router(); 

teamRouter.get('/', getALLTeams); 
teamRouter.get('/:id', getTeamById); 
teamRouter.post('/', createTeam); 
teamRouter.delete('/:id', deleteTeam); 
teamRouter.patch('/:id', updateTeam); 

export default teamRouter; 