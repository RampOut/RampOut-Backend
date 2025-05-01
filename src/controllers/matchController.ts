import { RequestHandler, Request,Response } from "express";
import { Match } from "../models/Match";
import { Json } from "sequelize/types/utils";
import sequelize  from "../connection/connection";
import { Team } from "../models/Team";
import { Player } from "../models/Player";
import { Level } from "../models/Level";
import { Answer } from "../models/Answer";
import { Motor } from "../models/Motor";
import { Tires } from "../models/Tires";
import { Chassis } from "../models/Chassis";


//Metodo para iniciar una partida, 
export const createMatchWithTeams: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { hostId, teams, levels } = req.body;

  if (!hostId || !Array.isArray(teams) || !Array.isArray(levels)) {
    res.status(400).json({
      status: "error",
      message: "Missing or invalid required fields: hostId, teams, levels",
    });
    return;
  }

  const transaction = await sequelize.transaction();

  try {
    const match = await Match.create({ hostId }, { transaction });

    const teamsWithMatch = await Promise.all(
      (teams || []).map(async (teamData: any) => {
        const { tempId, ...teamFields } = teamData;
        const team = await Team.create(
          { ...teamFields, matchId: match.id },
          { transaction }
        );
        return { ...team.get(), tempId };
      })
    );

    const createdLevels = await Promise.all(
      (levels || []).map((level: any) =>
        Level.create({ ...level, matchId: match.id }, { transaction })
      )
    );

    await transaction.commit();

    res.status(201).json({
      status: "success",
      message: "Match, teams, and levels created successfully",
      payload: {
        match,
        teams: teamsWithMatch.map(({ tempId, ...rest }) => rest),
        levels: createdLevels,
      },
    });
  } catch (error: any) {
    await transaction.rollback();
    res.status(500).json({
      status: "error",
      message: "Failed to start match",
      error: error.message,
    });
  }
};


export const getALLMatches: RequestHandler = (req: Request, res: Response) =>{
   Match.findAll()
   .then((data: Match[]) => {
      return res.status(200).json({
         status: "success",
           message: "Matchs successfully retrieved",
           payload: data,
      });
    })
    .catch((err) => {
       return res.status(500).json({
       status: "error",
       message: "Something happened retrieving all Matchs. " + err.message,
       payload: null,
    });
  });
}

export const getMatchById: RequestHandler = (req: Request, res: Response) =>{
    Match.findByPk(req.params.id)
  .then((data: Match | null) => {
    return res.status(200).json({
      status: "success",
      message: "Match successfully retrieved",
      payload: data,
    });
  })
  .catch((err) => {
    return res.status(500).json({
      status: "error",
      message: "Something happened while searching the Match. " + err.message,
      payload: null,
    });
  });

}

export const updateMatch = async (req: Request, res: Response) => {
  const MatchId = parseInt(req.params.id);
  try {
    await Match.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Match updated' });
  } catch (err) {
    res.status(500).json({ error: `Error updating emlpoyee with id: ${req.params.id}`});
    console.log(`Error updatingMatch with id: ${req.params.id}`)
  }
};

export const deleteMatch: RequestHandler = async(req: Request, res: Response) =>{
    const { id } = req.params;
    try {
      await Match.destroy({ where: { id } });
      res.status(200).json({ message: "Match deleted" });
      return;
    } catch (error) {
        res.status(500).json({
         message: "Error deleting Match",
         error,
        });
        return;
    }   
}


export const startRound: RequestHandler = async(req: Request, res: Response): Promise<void> =>{
  const {matchId, levelId, playerId,status} = req.body;
  
  if (!matchId || !levelId || !playerId || !status) {
    res.status(400).json({
      status: "error",
      message: "Missing required fields: matchId, levelId, playerId, or status",
    });
    return;
  }


  const transaction = await sequelize.transaction();

  try{

    const match = await Match.findByPk(matchId, { transaction });

    if (!match) {
      throw new Error(`Match with Id ${matchId} does not exist (findByPk)`);
    }

    // Actualiza el estado del Mach
    const [affectedRows] = await Match.update(
      { status: status },
      { where: {id: matchId}, transaction}
    );

    

    if (affectedRows === 0){
      throw new Error(`Match with Id ${matchId} not found or not updated`);
    }
    const motor = await Motor.findOne({ where: { id: 1 } as any }); // Replace '1' with the actual default motor ID
    const tires = await Tires.findOne({ where: { id: 1 } as any }); // Replace '1' with the actual default tires ID
    const chassis = await Chassis.findOne({ where: { id: 1 } as any }); // Replace '1' with the actual default chassis ID
    const team = await Team.findOne({ where: { id: 1 } as any });
    
    // Validar que existan
    if (!motor || !tires || !chassis || !team) {
      throw new Error("Default components (motor, tires, chassis, team) not found");
    }
    
    const emptyAnswer = {
      levelId: Number(levelId),
      playerId: Number(playerId),
      motorId: motor.id,
      tiresId: tires.id,
      chassisId: chassis.id,
      totalWeight: 0,
      teamId: team.id,
      score: 0,
    };
    

    const newAnswer = await Answer.create(emptyAnswer, { transaction });

    // 3. Confirmar la transacción
    await transaction.commit();

    // 4. Responder al cliente
    res.status(200).json({
      status: "success",
      message: "Round started successfully",
      payload: {
        levelId,
        answer: newAnswer,
      },
    });
  } catch (error: any) {
    await transaction.rollback();
    res.status(500).json({
      status: "error",
      message: "Failed to start round",
      error: error.message,
    });
  }
}

