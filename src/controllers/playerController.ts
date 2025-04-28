import { RequestHandler, Request,Response } from "express";
import { Player } from "../models/Player";
import { Json } from "sequelize/types/utils";


export const createPlayer: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content can not be empty",
      payload: null,
    });
    return;
  }
  const PlayerData = { ...req.body };
  Player.create(PlayerData)
    .then((data: Player | null) => {
      res.status(200).json({
        status: "success",
        message: "Player successfully created",
        payload: data,
      });
      return;
    })
    .catch((err:Error) => {
       res.status(500).json({
         status: "error",
         message: "Something happened registering the Player. " + err.message,
         payload: null,
       });

       return; 
    });
};


export const getALLPlayers: RequestHandler = (req: Request, res: Response) =>{
      //Calling the Sequelize findAll method. This is the same that a SELECT * FROM PRODUCT in a SQL query.
   Player.findAll()
   .then((data: Player[]) => {
      return res.status(200).json({
         status: "success",
           message: "Players successfully retrieved",
           payload: data,
      });
    })
    .catch((err) => {
       return res.status(500).json({
       status: "error",
       message: "Something happened retrieving all Players. " + err.message,
       payload: null,
    });
  });
}

export const getPlayerById: RequestHandler = (req: Request, res: Response) =>{
    Player.findByPk(req.params.id)
  .then((data: Player | null) => {
    return res.status(200).json({
      status: "success",
      message: "Player successfully retrieved",
      payload: data,
    });
  })
  .catch((err) => {
    return res.status(500).json({
      status: "error",
      message: "Something happened while searching the Player. " + err.message,
      payload: null,
    });
  });

}

export const updatePlayer = async (req: Request, res: Response) => {
  const PlayerId = parseInt(req.params.id);
  try {
    await Player.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Player updated' });
  } catch (err) {
    res.status(500).json({ error: `Error updating emlpoyee with id: ${req.params.id}`});
    console.log(`Error updatingPlayer with id: ${req.params.id}`)
  }
};

export const deletePlayer: RequestHandler = async(req: Request, res: Response) =>{
    const { id } = req.params;
    try {
      await Player.destroy({ where: { id } });
      res.status(200).json({ message: "Player deleted" });
      return;
    } catch (error) {
        res.status(500).json({
         message: "Error deleting Player",
         error,
        });
        return;
    }   
}


