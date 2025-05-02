import { Router } from 'express';
import { createMotor, deleteMotor, getAllMotors, getMotorById, updateMotor } from '../controllers/motorController';

const motorRouter: Router = Router();

motorRouter.post("/", createMotor);
motorRouter.get("/:id", getMotorById);
motorRouter.put("/:id", updateMotor);
motorRouter.delete("/:id", deleteMotor);
motorRouter.get("/", getAllMotors);

export default motorRouter;
