import { RequestHandler, Request,Response } from "express";
import { Player } from "../models/Player";
import { Json } from "sequelize/types/utils";


// crear un jugador, con un idtemporal
export const createPlayer: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content can not be empty",
      payload: null,
    });
    return;
  }

  // Crear un identificador temporal único (puedes cambiarlo si lo necesitas)
  const idTemporal = Math.floor(Math.random() * 10000); // Generar un ID temporal simple (entre 0 y 9999)

  // Crear los datos del jugador
  const PlayerData = { 
    ...req.body,
    idTemporal, // Incluir el idTemporal en los datos del jugador
  };

  // Crear el jugador con el ID temporal
  Player.create(PlayerData)
    .then((data: Player | null) => {
      res.status(200).json({
        status: "success",
        message: "Player successfully created",
        payload: data,
      });
      return;
    })
    .catch((err: Error) => {
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

export const getPlayerById: RequestHandler = (req: Request, res: Response) => {
  const playerId = req.params.id;

  Player.findByPk(playerId)
    .then((data: Player | null) => {
      if (!data) {
        return res.status(404).json({
          status: "error",
          message: "Player not found",
          payload: null,
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Player successfully retrieved",
        payload: data,
      });
    })
    .catch((err: Error) => {
      return res.status(500).json({
        status: "error",
        message: `Something happened while searching the Player: ${err.message}`,
        payload: null,
      });
    });
};


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


export const deletePlayer: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  const playerId = req.params.id;

  try {
    // Buscar el jugador
    const player = await Player.findByPk(playerId);

    if (!player) {
      return res.status(404).json({
        status: "error",
        message: `Player with id ${playerId} not found.`,
        payload: null,
      });
    }

    // Eliminar jugador
    await Player.destroy({ where: { id: playerId } });

    return res.status(200).json({
      status: "success",
      message: "Player successfully deleted",
      payload: null,
    });
  } catch (err: unknown) {
    // Manejo de errores
    if (err instanceof Error) {
      return res.status(500).json({
        status: "error",
        message: `Error deleting player with id ${playerId}: ${err.message}`,
        payload: null,
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: "An unknown error occurred while deleting the player.",
        payload: null,
      });
    }
  }
};
