import dotenv from "dotenv";

dotenv.config();

// Se define la constante secretKey, la cual establece un complemento importante para el reforzamiento de la firma.

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en las variables de entorno.");
}

export const secretKey = process.env.JWT_SECRET;

// Se declaran las variables globales para el buen funcionamiento de Host
declare global {
  namespace Express {
    interface Request {
      username?: string;
      password?: string;
      token?: string;
    }
  }
}
