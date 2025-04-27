// Se importan dependencias necesarias
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import sequelize from "./connection/connection";
import cors from "cors";
import hostRoutes from './routes/hostRoutes'
import comHostRoutes from './routes/comhostRoutes'

// Definicion de constantes
const app = express();
const port = 3000;

// Se establecen como variables globales, para el buen manejo de las variables en todo el proyecto.
declare global {
  namespace Express {
    interface Request {
      username?: string;
      password?: string;
      token?: string;
    }
  }
}

// Middlewares
app.use(cors({ origin: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', comHostRoutes);
app.use('/host', hostRoutes);

// Se inicializa sequilize
sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("DB connection error:", error);
  });