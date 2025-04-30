import { Router } from 'express';
import { MotorController } from '../controllers/motorController'; // Asegúrate de que el controlador esté correctamente importado.

const motorRouter = Router();

// Crear motor
motorRouter.post('/', MotorController.createMotor);

// Obtener motor por ID
motorRouter.get('/:id', MotorController.getMotorById); // Verifica que esta ruta esté correctamente configurada

// Actualizar motor por ID
motorRouter.put('/:id', MotorController.updateMotor);

// Eliminar motor por ID
motorRouter.delete('/:id', MotorController.deleteMotor);

export default motorRouter;
