// src/controllers/historialController.ts
import { Request, Response } from 'express';
import { Historial } from '../models/Historial';
import { Team } from '../models/Team';

export async function getAllHistorial(req: Request, res: Response) {
  try {
    const historiales = await Historial.findAll();
    res.json(historiales);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching historiales' });
  }
}

export async function getByIdHistorial(req: Request, res: Response) {
  try {
    const historial = await Historial.findByPk(req.params.id);
    if (!historial) return res.status(404).json({ error: 'Historial not found' });
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching historial' });
  }
}

export async function createHistorial(req: Request, res: Response) {
  try {
    const historial = await Historial.create(req.body);
    res.status(201).json(historial);
  } catch (error) {
    res.status(400).json({ error: 'Error creating historial', details: error });
  }
}

export async function updateHistorial(req: Request, res: Response) {
  try {
    const historial = await Historial.findByPk(req.params.id);
    if (!historial) return res.status(404).json({ error: 'Historial not found' });

    await historial.update(req.body);
    res.json(historial);
  } catch (error) {
    res.status(400).json({ error: 'Error updating historial' });
  }
}

export async function deleteHistorial(req: Request, res: Response) {
  try {
    const historial = await Historial.findByPk(req.params.id);
    if (!historial) return res.status(404).json({ error: 'Historial not found' });

    await historial.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting historial' });
  }
}

export async function createAndUpdateTeamScore(req: Request, res: Response) {
  const t = await Historial.sequelize!.transaction();
  try {
    const { teamId, roundScore, levelId, ...rest } = req.body;

    const team = await Team.findByPk(teamId, { transaction: t });
    if (!team) {
      await t.rollback();
      return res.status(404).json({ error: 'Team not found' });
    }

    const historial = await Historial.create({
      teamId,
      roundScore,
      scoreTotal: team.scoreTotal + roundScore,
      levelId,
      ...rest
    }, { transaction: t });

    team.scoreTotal += roundScore;
    await team.save({ transaction: t });
    await t.commit();

    res.status(201).json({ historial, updatedScore: team.scoreTotal });
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: 'Error creating historial and updating team score', details: error });
  }
}
