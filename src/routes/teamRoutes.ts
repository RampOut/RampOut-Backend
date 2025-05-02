import { Router } from "express";
import { getALLTeams, getTeamById, createTeam, deleteTeam, updateTeam, updateTeamScore} from "../controllers/teamController";

const teamRouter:Router = Router(); 

teamRouter.get('/', getALLTeams); 
teamRouter.get('/:id', getTeamById); 
teamRouter.post('/', createTeam); 
teamRouter.delete('/:id', deleteTeam); 
teamRouter.patch('/:id', updateTeam); 
teamRouter.patch('/:id/score', updateTeamScore);

export default teamRouter; 