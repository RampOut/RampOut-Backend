import { Sequelize } from "sequelize-typescript";
import { hosts } from "../models/hosts";
import dotenv from 'dotenv';

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
  models: [hosts],
});

export default sequelize;
