import { Router } from "express";
import { getALLAnswers, createAnswer, deleteAnswer, getAnswerById, updateAnswer ,endRound} from "../controllers/answerController";

const answerRouter:Router = Router(); 

answerRouter.get('/', getALLAnswers); 
answerRouter.get('/:id', getAnswerById);
answerRouter.post('/', createAnswer); 
answerRouter.delete('/:id', deleteAnswer); 
answerRouter.patch('/:id', updateAnswer); 
answerRouter.patch('/levelend/:levelId', endRound);


export default answerRouter; 
















