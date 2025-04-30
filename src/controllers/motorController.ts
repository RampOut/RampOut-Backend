import { RequestHandler, Request, Response } from "express";

import { Motor } from "../models/Motor";

  

interface MotorAttributes {

power: number;

rpmMax: number;

weight: number;

assets: string[];

levelId: number;

}

  

// Crear un motor

export const createMotor = async (req: Request, res: Response<any>): Promise<any> => {

if (!req.body) {

return res.status(400).json({

status: 'error',

message: 'Content cannot be empty',

payload: null

});

}

  

// Desestructuramos la solicitud

const { power, rpmMax, weight, levelId, assets } = req.body;

  

const motorData = { power, rpmMax, weight, levelId, assets };

  

try {

// Creación del motor

const motor = await Motor.create(motorData);

res.status(200).json({

status: 'success',

message: 'Motor successfully created',

payload: motor

});

} catch (err: unknown) { // Usamos 'unknown' para el tipo de error

if (err instanceof Error) { // Verificamos si 'err' es una instancia de 'Error'

res.status(500).json({

status: 'error',

message: 'Something happened registering the motor. ' + err.message,

payload: null

});

} else {

res.status(500).json({

status: 'error',

message: 'An unexpected error occurred',

payload: null

});

}

}

};

  

// Devuelve todos los motores

export const getAllMotors: RequestHandler = (req: Request, res: Response) => {

Motor.findAll()

.then((data: Motor[]) => {

return res.status(200).json({

status: "success",

message: "Motors successfully retrieved",

payload: data

});

})

.catch((err) => {

return res.status(500).json({

status: "error",

message: "Something happened retrieving all motors " + err.message,

payload: null

});

});

}

  

// Obtiene los datos de un motor por su ID

export const getMotorById: RequestHandler = (req: Request, res: Response) => {

Motor.findByPk(req.params.id)

.then((data: Motor | null) => {

return res.status(200).json({

status: "success",

message: "Motor successfully retrieved",

payload: data

});

})

.catch((err) => {

return res.status(500).json({

status: "error",

message: "Something happened while searching for the motor. " + err.message,

payload: null

});

});

}

  

// Se actualizan los valores de un motor

export const updateMotor = async (req: Request, res: Response): Promise<any> => {

const motorId = req.params.id; // Obtener el id desde los parámetros

try {

const motor = await Motor.findByPk(motorId); // Buscar el motor por ID

  

if (!motor) {

return res.status(404).json({ message: "Motor not found" }); // Si no se encuentra el motor

}

  

// Verifica que req.body contenga los datos necesarios

const { power, rpmMax, weight, assets } = req.body;

  

// Actualiza los valores del motor

const result = await motor.update({

power,

rpmMax,

weight,

assets

});

  

// Verifica si la actualización fue exitosa

return res.status(200).json({ message: "Motor successfully updated", payload: result });

  

} catch (error) {

res.status(500).json({ error: `Error updating motor with id: ${motorId}` });

console.log(`Error updating motor with id: ${motorId}`);

}

};

  
  

// Se elimina un motor

export const deleteMotor = async (req: Request, res: Response): Promise<any> => {

const { id } = req.params;

try {

const motor = await Motor.findByPk(id);

  

if (!motor) {

return res.status(404).json({ message: "Motor not found" });

}

  

await motor.destroy(); // Eliminar el motor

  

return res.status(200).json({ message: "Motor successfully deleted" });

} catch (error) {

res.status(500).json({ message: "Error deleting motor", error });

}

}