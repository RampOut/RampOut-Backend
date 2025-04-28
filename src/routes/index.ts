import { Router, Request, Response } from "express";
import playerRouter from "./playerRoutes";
import teamRouter from "./teamRoutes";
import comHostRoutes from "./comhostRoutes";
import hostRoutes from "./hostRoutes"

const apiRouter = Router(); 

apiRouter.use("/player", playerRouter); 
apiRouter.use("/team", teamRouter);
apiRouter.use('/', comHostRoutes);
apiRouter.use('/host', hostRoutes);
apiRouter.get('/hello', (req:Request, res:Response)=> {
    res.send("Hello there")
});



export default apiRouter; 