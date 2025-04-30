import { Request, Response } from 'express';
import { Motor } from '../models/Motor';

export class MotorController {
  // Crear motor
  static async createMotor(req: Request, res: Response): Promise<any> {
    const { power, rpmMax, weight, levelId } = req.body; // Asegúrate de que levelId esté en el body

    try {
      // Crea el motor sin levelId y con un array vacío para 'assets'
      const motor = await Motor.create({
        power: power,
        rpmMax: rpmMax,
        weight: weight,
        levelId: levelId,  // Pasa el levelId correctamente
        assets: []  // Agrega un valor vacío para 'assets'
      });

      res.status(201).json(motor); // Devuelve el motor creado
    } catch (error) {
      res.status(500).json({ message: 'Error creating motor', error });
    }
  }

// Método para obtener un motor por su ID
static async getMotorById(req: Request, res: Response): Promise<any> {
  const motorId = req.params.id; // Obtenemos el ID del motor desde los parámetros de la URL

  try {
    const motor = await Motor.findByPk(motorId);

    if (!motor) {
      return res.status(404).json({ message: 'Motor not found' }); // Si no se encuentra el motor, devuelve 404
    }

    res.status(200).json(motor); // Retorna el motor encontrado
  } catch (error) {
    res.status(500).json({ message: 'Error fetching motor', error }); // Error en la búsqueda
  }
}
  // Actualizar motor por ID
static async updateMotor(req: Request, res: Response): Promise<any> {
  const motorId = req.params.id;
  const { power, rpmMax, weight } = req.body;
  try {
    const motor = await Motor.findByPk(motorId);
    if (!motor) {
      return res.status(404).json({ message: 'Motor not found' });
    }

    motor.power = power;
    motor.rpmMax = rpmMax;
    motor.weight = weight;
    motor.assets = [] as string[]; // Asegúrate de asignar un arreglo de strings vacío

    await motor.save();
    res.status(200).json(motor); // Devuelve el motor actualizado
  } catch (error) {
    res.status(500).json({ message: 'Error updating motor', error });
  }
}


  // Eliminar motor por ID
  static async deleteMotor(req: Request, res: Response): Promise<any> {
    const motorId = req.params.id;
    try {
      const motor = await Motor.findByPk(motorId);
      if (!motor) {
        return res.status(404).json({ message: 'Motor not found' });
      }

      await motor.destroy(); // Elimina el motor
      res.status(200).json({ message: 'Motor deleted successfully' }); // Respuesta de éxito
    } catch (error) {
      res.status(500).json({ message: 'Error deleting motor', error });
    }
  }
}
