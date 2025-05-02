// src/controllers/rankingController.ts
import { Request, Response } from 'express';
import sequelize  from "../connection/connection";

export async function getAllRankings(req: Request, res: Response) {
  try {
    const [results] = await sequelize.query(`SELECT * FROM rankings`);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error loading rankings', details: error });
  }
}

export async function getDailyRankings(req: Request, res: Response) {
  try {
    const [results] = await sequelize.query(`SELECT * FROM daily_ranking`);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error loading daily rankings', details: error });
  }
}
