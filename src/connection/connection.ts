import { Sequelize } from "sequelize-typescript";
import { Host } from "../models/Host";
import { Player } from "../models/Player";
import { Team } from "../models/Team";
import { Level } from "../models/Level";
import { Match } from "../models/Match";
import dotenv from 'dotenv';
import { Answer } from "../models/Answer";
import { Motor } from "../models/Motor";
import { Tires } from '../models/Tires'; 
import { Chassis } from '../models/Chassis'; 
import { Historial } from '../models/Historial';
import { DataBase } from "../config";

// Permite maneja variables de entorno, las cuales permiten la introduccion de credenciales
// Sin que estas esten plasmadas como tal en el codigo fuente.
dotenv.config();

// Se establecen los credenciales para el utilizamiento del sequelize.
if (!DataBase) {
  throw new Error("Database connection string is not defined in the environment variables.");
}

const sequelize = new Sequelize(DataBase, {
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  models: [Host, Player, Team, Level, Chassis, Match, Tires, Motor, Answer, Historial],
});

export default sequelize;