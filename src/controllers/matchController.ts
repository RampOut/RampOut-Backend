import { RequestHandler, Request,Response } from "express";
import { Match } from "../models/Match";
import { Json } from "sequelize/types/utils";
import sequelize  from "../connection/connection";
import { Team } from "../models/Team";
import { Player } from "../models/Player";
import { Level } from "../models/Level";



export const createMatch: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content can not be empty",
      payload: null,
    });
    return;
  }
  const MatchData = { ...req.body };
  Match.create(MatchData)
    .then((data: Match | null) => {
      res.status(200).json({
        status: "success",
        message: "Match successfully created",
        payload: data,
      });
      return;
    })
    .catch((err:Error) => {
       res.status(500).json({
         status: "error",
         message: "Something happened registering the Match. " + err.message,
         payload: null,
         });

       return; 
    });
};

//Metodo para iniciar una partida, 
export const createMatchWithTeams: RequestHandler = async (req: Request, res: Response) => {
  const { hostId, teams, players, levels } = req.body;
  const transaction = await sequelize.transaction();

  try {
    const match = await Match.create( { hostId } , { transaction });

    const teamsWithMatch = await Promise.all(
      teams.map(async (teamData: any) => {
        const { tempId, ...teamFields } = teamData;  
        const team = await Team.create(
          { ...teamFields, matchId: match.id },
          { transaction }
        );
        return { ...team.get(), tempId };
      })
    );

    const createdPlayers: Player[] = [];
    for (const team of teamsWithMatch) {
      const teamPlayers = players.filter((p: any) => p.teamTempId === team.tempId);
      const playersWithTeamId = teamPlayers.map((p: any) => ({
        matricula: p.matricula,
        teamId: team.id,
      }));

      if (playersWithTeamId.length > 0) {
        const created = await Player.bulkCreate(playersWithTeamId, { transaction });
        createdPlayers.push(...created);
      }
    }


    const createdLevels = await Promise.all(
  levels.map((level:any) => 
    Level.create({ ...level, matchId: match.id }, { transaction })
  )
  );
     

    
    await transaction.commit();

    res.status(201).json({
      status: "success",
      message: "Match, teams and players created",
      payload: {
        match,
        teams: teamsWithMatch.map(({ tempId, ...rest }) => rest), 
        players: createdPlayers,
        levels 
      },
    });
    return;
  } catch (error: any) {
    await transaction.rollback();
    res.status(500).json({
      status: "error",
      message: "Failed to start match",
      error: error.message,
    });
    return;
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


