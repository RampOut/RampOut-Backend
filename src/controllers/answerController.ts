import { RequestHandler, Request,Response } from "express";
import { Answer } from "../models/Answer";
import { Json } from "sequelize/types/utils";


export const createAnswer: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content can not be empty",
      payload: null,
    });
    return;
  }
  const answerData = { ...req.body };
  Answer.create(answerData)
    .then((data: Answer | null) => {
      res.status(200).json({
        status: "success",
        message: "answer successfully created",
        payload: data,
      });
      return;
    })
    .catch((err:Error) => {
       res.status(500).json({
         status: "error",
         message: "Something happened registering the answer. " + err.message,
         payload: null,
       });

       return; 
    });
};


export const getALLAnswers: RequestHandler = (req: Request, res: Response) =>{
      //Calling the Sequelize findAll method. This is the same that a SELECT * FROM PRODUCT in a SQL query.
   Answer.findAll()
   .then((data: Answer[]) => {
      return res.status(200).json({
         status: "success",
           message: "answers successfully retrieved",
           payload: data,
      });
    })
    .catch((err) => {
       return res.status(500).json({
       status: "error",
       message: "Something happened retrieving all answers. " + err.message,
       payload: null,
    });
  });
}

export const getAnswerById: RequestHandler = (req: Request, res: Response) =>{
    Answer.findByPk(req.params.id)
  .then((data: Answer | null) => {
    return res.status(200).json({
      status: "success",
      message: "answer successfully retrieved",
      payload: data,
    });
  })
  .catch((err) => {
    return res.status(500).json({
      status: "error",
      message: "Something happened while searching the answer. " + err.message,
      payload: null,
    });
  });

}

export const updateAnswer = async (req: Request, res: Response) => {
  const answerId = parseInt(req.params.id);
  try {
    await Answer.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'answer updated' });
  } catch (err) {
    res.status(500).json({ error: `Error updating emlpoyee with id: ${req.params.id}`});
    console.log(`Error updatinganswer with id: ${req.params.id}`)
  }
};

export const deleteAnswer: RequestHandler = async(req: Request, res: Response) =>{
    const { id } = req.params;
    try {
      await Answer.destroy({ where: { id } });
      res.status(200).json({ message: "answer deleted" });
      return;
    } catch (error) {
        res.status(500).json({
         message: "Error deleting answer",
         error,
        });
        return;
    }   
}


