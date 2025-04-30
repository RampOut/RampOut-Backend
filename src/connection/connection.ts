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

// Permite maneja variables de entorno, las cuales permiten la introduccion de credenciales
// Sin que estas esten plasmadas como tal en el codigo fuente.
dotenv.config();

// Se establecen los credenciales para el utilizamiento del sequelize.
const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "rampout_db",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",//! pon tu contraseña
  models: [Host, Player, Team, Level, Chassis, Match, Tires, Motor, Answer],
});

export default sequelize;