import { RequestHandler, Request,Response } from "express";
import { Level } from "../models/Level";
import { Json } from "sequelize/types/utils";
import sequelize from "../connection/connection";
import { data } from "jquery";
import { Transaction } from "sequelize";


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

export const setLevelsPresets = async (req: Request, res: Response) => {
  let transaction; // <-- Declaración aquí, fuera del try
  try {
    const { levels } = req.body; 
    transaction = await sequelize.transaction(); 

    for (let level of levels) { 
      await Level.update({ ...level }, { where: { id: level.id }, transaction });
    }

    await transaction.commit(); 
    res.json({ status: "success", message: 'Levels updated', payload: levels });

  } catch (err: any) {
    if (transaction) await transaction.rollback(); // <-- Solo si se llegó a crear
    res.status(500).json({
      status: "error",
      message: "Something happened while updating the levels. " + err.message
    });
    console.error("Error setting level presets:", err);
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


