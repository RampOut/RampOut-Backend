import { Router, Request, Response } from "express";
import playerRouter from "./playerRoutes";
import teamRouter from "./teamRoutes";

const apiRouter = Router(); 

apiRouter.use("/player", playerRouter); 
apiRouter.use("/team", teamRouter);
apiRouter.get('/', (req:Request, res:Response)=> {
    res.send("Hello there")
});
export default apiRouter; 