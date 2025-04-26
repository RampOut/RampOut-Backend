import express, { Request, Response } from 'express';
import { Level } from '../models/Level'; // Ajusta la ruta si es necesario
import { StudentAnswer } from '../models/StudentAnswer';
import { calculateScore } from '../utils/Evaluator';

const router = express.Router();

// Ruta para procesar la respuesta del estudiante
router.post('/submit', async (req: Request, res: Response) => {
  const { studentId, levelId, answer } = req.body;

  try {
    // Buscar el nivel por ID
    const level = await Level.findByPk(levelId);
    if (!level) {
      return res.status(404).json({ message: 'Level not found' });
    }

    // Si la propiedad `expectedAnswer` no está definida en el modelo, agrégala o usa la propiedad correcta
    const correctAnswer = level['expectedAnswer']; // Asegúrate de que esto esté bien definido en tu modelo

    // Calcular el puntaje
    const score = calculateScore(answer, correctAnswer);

    // Guardar la respuesta del estudiante
    const studentAnswer = await StudentAnswer.create({
      studentId,
      levelId,
      answer,
      score,
    });

    // Responder con el puntaje y la respuesta guardada
    res.json({
      studentAnswer,
      score,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing the request' });
  }
});

export default router;
