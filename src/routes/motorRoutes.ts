import { Router } from 'express';

import { createMotor, deleteMotor, getAllMotors, getMotorById, updateMotor } from '../controllers/motorController';

  

const motorRouter: Router = Router();

  

// Crear motor

motorRouter.post("/", createMotor);

  

// Obtener motor por ID

motorRouter.get("/:id", getMotorById);

  

// Actualizar motor por ID

motorRouter.put("/:id", updateMotor);

  

// Eliminar motor por ID

motorRouter.delete("/:id", deleteMotor);

  

// Obtener todos los motores

motorRouter.get("/", getAllMotors);

  

export default motorRouter;