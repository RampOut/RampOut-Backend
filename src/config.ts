import dotenv from 'dotenv';

dotenv.config();

// Se define la constante secretKey, la cual establece un complemento importante para el reforzamiento de la firma.

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno.");
}

export const secretKey = process.env.JWT_SECRET;

