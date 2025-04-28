import { RequestHandler, Request,Response } from "express";
import { Team } from "../models/Team";
import { Json } from "sequelize/types/utils";


export const createTeam: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content can not be empty",
      payload: null,
    });
    return;
  }
  const teamData = { ...req.body };
  Team.create(teamData)
    .then((data: Team | null) => {
      res.status(200).json({
        status: "success",
        message: "Team successfully created",
        payload: data,
      });
      return;
    })
    .catch((err:Error) => {
       res.status(500).json({
         status: "error",
         message: "Something happened registering the Team. " + err.message,
         payload: null,
       });

       return; 
    });
};


export const getALLTeams: RequestHandler = (req: Request, res: Response) =>{
      //Calling the Sequelize findAll method. This is the same that a SELECT * FROM PRODUCT in a SQL query.
   Team.findAll()
   .then((data: Team[]) => {
      return res.status(200).json({
         status: "success",
           message: "Teams successfully retrieved",
           payload: data,
      });
    })
    .catch((err) => {
       return res.status(500).json({
       status: "error",
       message: "Something happened retrieving all Teams. " + err.message,
       payload: null,
    });
  });
}

export const getTeamById: RequestHandler = (req: Request, res: Response) =>{
    Team.findByPk(req.params.id)
  .then((data: Team | null) => {
    return res.status(200).json({
      status: "success",
      message: "Team successfully retrieved",
      payload: data,
    });
  })
  .catch((err) => {
    return res.status(500).json({
      status: "error",
      message: "Something happened while searching the Team. " + err.message,
      payload: null,
    });
  });

}

export const updateTeam = async (req: Request, res: Response) => {
  const TeamId = parseInt(req.params.id);
  try {
    await Team.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Team updated' });
  } catch (err) {
    res.status(500).json({ error: `Error updating emlpoyee with id: ${req.params.id}`});
    console.log(`Error updatingTeam with id: ${req.params.id}`)
  }
};

export const deleteTeam: RequestHandler = async(req: Request, res: Response) =>{
    const { id } = req.params;
    try {
      await Team.destroy({ where: { id } });
      res.status(200).json({ message: "Team deleted" });
      return;
    } catch (error) {
        res.status(500).json({
         message: "Error deleting Team",
         error,
        });
        return;
    }   
}


