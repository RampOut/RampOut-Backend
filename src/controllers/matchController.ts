import { RequestHandler, Request,Response } from "express";
import { Match } from "../models/Match";
import { Json } from "sequelize/types/utils";


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


export const getALLMatches: RequestHandler = (req: Request, res: Response) =>{
      //Calling the Sequelize findAll method. This is the same that a SELECT * FROM PRODUCT in a SQL query.
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


