import { Router, Request, Response } from "express";
import playerRouter from "./playerRoutes";
import teamRouter from "./teamRoutes";
import comHostRoutes from "./comhostRoutes";
import hostRoutes from "./hostRoutes"
import matchRouter from "./matchRoutes";
import levelRouter from "./levelRoutes";

const apiRouter = Router(); 

apiRouter.use("/player", playerRouter); 
apiRouter.use("/team", teamRouter);
apiRouter.use('/', comHostRoutes);
apiRouter.use('/host', hostRoutes);
apiRouter.use('/match', matchRouter); 
apiRouter.use('/level', levelRouter);


export default apiRouter; 