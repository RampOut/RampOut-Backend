import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import sequelize from './src/connection/connection'; 
import cors from 'cors';
import apiRouter from './src/routes/index'; 
import { PORT } from './src/config';

const app = express();

declare global {
  namespace Express {
    interface Request {
      username?: string;
    }
  }
}

// Middlewares
app.use(cors({ origin: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', apiRouter);  

// Inicializar sequelize
const connectedSyncDB = async () => {
  try {
    // Autenticación con la base de datos
    await sequelize.authenticate().then(() => {
      console.log("DB connected");
    });

    // Sincronizar los modelos con la base de datos
    await sequelize.sync().then(() => {
      console.log("Models synchronized");
    });
  } catch (error: unknown) {
    console.error("DB connection or synchronization error:", error);
  }
};

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

connectedSyncDB();  
