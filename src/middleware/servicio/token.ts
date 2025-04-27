import Espress, { Request, Response } from "express";
import { hosts } from "../../models/hosts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secretKey } from "../../config";

// Funcion que verifica el inicio de sesion y crea un token de autorizacion con duracion de 2 horas
export const createToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }

    const user = await hosts.findOne({ where: { username } });

    if (!user) {
      res
        .status(401)
        .json({ message: "Authentication failed: User not found" });
      return;
    }

    // Compara las contraseñas encriptadas
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res
        .status(401)
        .json({ message: "Authentication failed: Invalid password" });
      return;
    }

    // Se crea el token, mediante la firma con jsonwebtoken
    const token = jwt.sign({ username: user.username }, secretKey, {
      expiresIn: "2h",
    }); 
    res.status(200).json({ token });
    return;
  } catch (error) {
    console.error("Error during login;", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
