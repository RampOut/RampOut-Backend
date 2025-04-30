import { RequestHandler, Request,Response } from "express";
import { Match } from "../models/Match";
import { Json } from "sequelize/types/utils";
import sequelize  from "../connection/connection";
import { Team } from "../models/Team";
import { Player } from "../models/Player";
import { Level } from "../models/Level";

//Metodo para iniciar una partida, 
export const createMatchWithTeams: RequestHandler = async (req: Request, res: Response) => {
  //Segmentamos las partes del request
  const { hostId, teams, players, levels } = req.body;
  //Iniciamos la transacción para poder realizar todos los cambios sin conflictos
  const transaction = await sequelize.transaction();

  try {
    //Creamos un match con el id del host. 
    const match = await Match.create( { hostId } , { transaction });

    /*Mediante promesas, mapeamos todos los equipos que vienen en la petición
    usando el id del match (para evitar conflictos con las foreign key es que se usa 
    una transacción) y regresamos en la última linea los ids temporales de los equipos para referenciarlos bien. 
    */
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

    /*Creamos el array de jugadores a crear, y procedemos a iterar sobre los equipos para asignarles a estos
    los integrantes que les corresponden con la id de la db. 
    */
    const createdPlayers: Player[] = [];
    for (const team of teamsWithMatch) {
      const teamPlayers = players.filter((p: any) => p.teamTempId === team.tempId);
      const playersWithTeamId = teamPlayers.map((p: any) => ({
        matricula: p.matricula,
        teamId: team.id,
      }));

      //Aparte de validar que estamos haciendo algo, se crea con el metodo bulkCreate porque esto permite 
      //generar multiples registros simultaneamente
      
      if (playersWithTeamId.length > 0) {
        const created = await Player.bulkCreate(playersWithTeamId, { transaction });
        createdPlayers.push(...created);
      }
    }

    //Y finalmente, tenemos los niveles que se resuelven con promesas y les pegamos el id del match a los que sus resultados
    //serán referenciados. 
    const createdLevels = await Promise.all(
  levels.map((level:any) => 
    Level.create({ ...level, matchId: match.id }, { transaction })
  )
  );
     
    //Una vez todas las promesas se resuelven, se hace commit y se crea un match/lobby con todos sus atributos mediante
    //una sola petición bien armada. (En el payload es buena practica manear los estados de todas las entidades)
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
    //En caso de error, se hace rollback y no se realizan cambios en la db. 
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