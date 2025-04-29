import express, { Request, Response } from 'express';
import { Player } from '../models/Player';
import { Level } from '../models/Level';
import { calculateScore } from '../utils/Evaluator';

// Define la interfaz para el cuerpo de la solicitud
interface AnswerRequestBody {
    playerId: number;
    levelId: number;
    answer: number;
}

const router = express.Router();

router.post('/submit', async (req: Request<any, any, AnswerRequestBody>, res: Response): Promise<void> => {
    // Extraer los valores de req.body
    const { playerId, levelId, answer } = req.body;

    try {
        // Buscar el jugador por ID
        const player = await Player.findByPk(playerId);
        if (!player) {
            res.status(404).json({ message: 'Player not found' });
            return;
        }

        // Buscar el nivel por ID
        const level = await Level.findByPk(levelId);
        if (!level) {
            res.status(404).json({ message: 'Level not found' });
            return;
        }

        // Obtener la respuesta correcta
        const correctAnswer = level.expectedAnswer;

        // Calcular el puntaje usando la función de Evaluator
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
