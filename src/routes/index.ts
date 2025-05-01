import { Router, Request, Response } from "express";
import playerRouter from "./playerRoutes";
import teamRouter from "./teamRoutes";
import comHostRoutes from "./comhostRoutes";
import hostRoutes from "./hostRoutes"
import matchRouter from "./matchRoutes";
import levelRouter from "./levelRoutes";
import motorRouter from './motorRoutes';
import tiresRouter from "./tiresRoutes";
import answerRouter from "./answerRoutes";
import chassisRouter from "./chassisRoutes";
import historialRouter from "./historialRoutes";

const apiRouter = Router(); 

apiRouter.use("/player", playerRouter); //Validated ß
apiRouter.use("/team", teamRouter); // Validated
apiRouter.use('/', comHostRoutes); // Verificated by TulKasTer
apiRouter.use('/host', hostRoutes); // Verificated by TulKasTer
apiRouter.use('/match', matchRouter); // Validated
apiRouter.use('/level', levelRouter); // Verificated by TulKasTer
apiRouter.use('/motors', motorRouter);
apiRouter.use('/tires', tiresRouter); // Verificated by TulKasTer
apiRouter.use('/answers', answerRouter);
apiRouter.use('/chassis', chassisRouter);
apiRouter.use('/historial', historialRouter);



// ToDO 
// The total score is updated after each round
// Maybe we need to add a status of played to level
// We certainly need a team/player history of answers and if were correct or not
// When a match is created, we need either to create all the teams that will play or a way for teams to join the match and the match notices and updates by itself. 
// 

export default apiRouter; 