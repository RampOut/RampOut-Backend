import { Sequelize } from "sequelize-typescript";
import { Host } from "../models/Host";
import { Player } from "../models/Player";
import { Team } from "../models/Team";
import { Level } from "../models/Level";
import { Match } from "../models/Match";
import { Chassis } from "../models/Chassis";
import dotenv from 'dotenv';
import { Motor } from "../models/Motor";
import { Tires } from "../models/Tires";

// Permite maneja variables de entorno, las cuales permiten la introduccion de credenciales
// Sin que estas esten plasmadas como tal en el codigo fuente.
dotenv.config();

// Se establecen los credenciales para el utilizamiento del sequelize.
const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "rampout",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "1234",//! pon tu contraseña
  models: [Host, Player, Team, Level, Chassis, Match, Motor, Tires],
});

export default sequelize;