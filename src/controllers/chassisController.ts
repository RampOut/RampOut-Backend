import { RequestHandler, Request,Response } from "express";
import { Chassis } from "../models/Chassis";

export const createChassis: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content can not be empty",
      payload: null,
    });
    return;
  }
  const ChassisData = { ...req.body };
  Chassis.create(ChassisData)
    .then((data: Chassis | null) => {
      res.status(200).json({
        status: "success",
        message: "Chassis successfully created",
        payload: data,
      });
      return;
    })
    .catch((err:Error) => {
       res.status(500).json({
         status: "error",
         message: "Something happened registering the Chassis. " + err.message,
         payload: null,
       });

       return; 
    });
};


export const getALLChassiss: RequestHandler = (req: Request, res: Response) =>{
   Chassis.findAll()
   .then((data: Chassis[]) => {
      return res.status(200).json({
         status: "success",
           message: "Chassiss successfully retrieved",
           payload: data,
      });
    })
    .catch((err) => {
       return res.status(500).json({
       status: "error",
       message: "Something happened retrieving all Chassiss. " + err.message,
       payload: null,
    });
  });
}

export const getChassisById: RequestHandler = (req: Request, res: Response) =>{
    Chassis.findByPk(req.params.id)
  .then((data: Chassis | null) => {
    return res.status(200).json({
      status: "success",
      message: "Chassis successfully retrieved",
      payload: data,
    });
  })
  .catch((err) => {
    return res.status(500).json({
      status: "error",
      message: "Something happened while searching the Chassis. " + err.message,
      payload: null,
    });
  });

}

export const updateChassis = async (req: Request, res: Response) => {
  const ChassisId = parseInt(req.params.id);
  try {
    await Chassis.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Chassis updated' });
  } catch (err) {
    res.status(500).json({ error: `Error updating emlpoyee with id: ${req.params.id}`});
    console.log(`Error updatingChassis with id: ${req.params.id}`)
  }
};

export const deleteChassis: RequestHandler = async(req: Request, res: Response) =>{
    const { id } = req.params;
    try {
      await Chassis.destroy({ where: { id } });
      res.status(200).json({ message: "Chassis deleted" });
      return;
    } catch (error) {
        res.status(500).json({
         message: "Error deleting Chassis",
         error,
        });
        return;
    }   
}