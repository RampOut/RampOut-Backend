import express, { Request, Response } from 'express';
import { Player } from '../models/Player';
import { Level } from '../models/Level';
import { calculateScore } from '../utils/Evaluator';

const router = express.Router();

// Definir el tipo para req.body
interface AnswerRequestBody {
  playerId: number;
  levelId: number;
  answer: number;
}

router.post('/submit', async (req: Request<{}, {}, AnswerRequestBody>, res: Response) => {
  const { playerId, levelId, answer } = req.body;

  try {
    // Buscar el jugador por ID
    const player = await Player.findByPk(playerId);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Buscar el nivel por ID
    const level = await Level.findByPk(levelId);
    if (!level) {
      return res.status(404).json({ message: 'Level not found' });
    }

    // Obtener la respuesta correcta
    const correctAnswer = level.expectedAnswer;

    // Calcular el puntaje
    const score = calculateScore(answer, correctAnswer);

    // Actualizar el puntaje del jugador
    await player.update({ score });

    // Responder con el puntaje y la respuesta actualizada
    res.json({
      player,
      score,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing the request' });
  }
});

export default router;
