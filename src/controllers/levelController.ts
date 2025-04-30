import { RequestHandler, Request,Response } from "express";
import { Level } from "../models/Level";
import { Json } from "sequelize/types/utils";


export const createlevel: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content can not be empty",
      payload: null,
    });
    return;
  }
  const levelData = { ...req.body };
  Level.create(levelData)
    .then((data: Level | null) => {
      res.status(200).json({
        status: "success",
        message: "level successfully created",
        payload: data,
      });
      return;
    })
    .catch((err:Error) => {
       res.status(500).json({
         status: "error",
         message: "Something happened registering the level. " + err.message,
         payload: null,
       });

       return; 
    });
};


export const getALLlevels: RequestHandler = (req: Request, res: Response) =>{
      //Calling the Sequelize findAll method. This is the same that a SELECT * FROM PRODUCT in a SQL query.
   Level.findAll()
   .then((data: Level[]) => {
      return res.status(200).json({
         status: "success",
           message: "levels successfully retrieved",
           payload: data,
      });
    })
    .catch((err) => {
       return res.status(500).json({
       status: "error",
       message: "Something happened retrieving all levels. " + err.message,
       payload: null,
    });
  });
}

export const getlevelById: RequestHandler = (req: Request, res: Response) =>{
    Level.findByPk(req.params.id)
  .then((data: Level | null) => {
    return res.status(200).json({
      status: "success",
      message: "level successfully retrieved",
      payload: data,
    });
  })
  .catch((err) => {
    return res.status(500).json({
      status: "error",
      message: "Something happened while searching the level. " + err.message,
      payload: null,
    });
  });

}

export const updatelevel = async (req: Request, res: Response) => {
  const levelId = parseInt(req.params.id);
  try {
    await Level.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'level updated' });
  } catch (err) {
    res.status(500).json({ error: `Error updating level with id: ${req.params.id}`});
    console.log(`Error updatinglevel with id: ${req.params.id}`)
  }
};

export const deletelevel: RequestHandler = async(req: Request, res: Response) =>{
    const { id } = req.params;
    try {
      await Level.destroy({ where: { id } });
      res.status(200).json({ message: "level deleted" });
      return;
    } catch (error) {
        res.status(500).json({
         message: "Error deleting level",
         error,
        });
        return;
    }   
}


