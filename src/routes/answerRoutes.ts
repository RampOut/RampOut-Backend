import { Router } from "express";
import { getALLAnswers, createAnswer, deleteAnswer, getAnswerById, updateAnswer } from "../controllers/answerController";

const answerRouter:Router = Router(); 

answerRouter.get('/', getALLAnswers); 
answerRouter.get('/:id', getAnswerById);
answerRouter.post('/', createAnswer); 
answerRouter.delete('/:id', deleteAnswer); 
answerRouter.patch('/:id', updateAnswer); 

export default answerRouter; 
















