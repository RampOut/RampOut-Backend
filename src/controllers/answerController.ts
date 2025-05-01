import { RequestHandler, Request,Response } from "express";
import { Answer } from "../models/Answer";
import sequelize from "../connection/connection";
import { Json } from "sequelize/types/utils";
import { Player } from '../models/Player';
import { Match } from '../models/Match';
import { Level } from '../models/Level';
import { Motor } from '../models/Motor';
import { Tires } from '../models/Tires';
import { Chassis } from '../models/Chassis';
import { Team } from '../models/Team';
import { updateTeam } from './teamController';



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


// Definición del tipo para los atributos del carro
interface CarAttributes {
  motor: Motor;
  tires: Tires;
  chassis: Chassis;
}

// Función para obtener el puntaje de la ronda y los atributos del carro por nivel
export const endRound = async (req: Request, res: Response): Promise<any> => {
  const levelId = req.params.levelId;

  try {
      // Obtener todas las respuestas para el nivel (round) específico
      const answers = await Answer.findAll({
          where: { levelId: levelId },
          include: [
              {
                  model: Motor,
                  as: 'motor',
              },
              {
                  model: Tires,
                  as: 'tires',
              },
              {
                  model: Chassis,
                  as: 'chassis',
              },
          ],
      });

      if (!answers || answers.length === 0) {
          return res.status(404).json({
              status: "error",
              message: "No answers found for this level",
              payload: null,
          });
      }

      let roundScore = 0;
      let teamScore = 0;
      const carAttributes: CarAttributes[] = [];

      // Iterar sobre las respuestas para calcular el puntaje y obtener los atributos
      answers.forEach((answer: Answer) => {
          const motor = answer.motor;
          const tires = answer.tires;
          const chassis = answer.chassis;

          // Usar el puntaje guardado en la respuesta
          roundScore = answer.score;
          teamScore += roundScore; // Acumulando el puntaje total del equipo

          // Guardar atributos del carro
          carAttributes.push({
              motor: motor,
              tires: tires,
              chassis: chassis,
          });
      });

      // Devolver el puntaje total acumulado por la ronda y los atributos de los carros
      return res.status(200).json({
          status: "success",
          message: "Round score and car attributes retrieved successfully",
          payload: {
              roundScore,
              teamScore,  // Puntaje total del equipo
              carAttributes,
          },
      });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({
        status: "error",
        message: "Something went wrong fetching round score and car attributes: " + err.message,
        payload: null,
      });
    } else {
      // Si el error no es una instancia de Error, se maneja de manera general
      return res.status(500).json({
        status: "error",
        message: "An unknown error occurred.",
        payload: null,
      });
    }
  }
} 