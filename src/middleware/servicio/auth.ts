import {Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { secretKey } from "../../config";
import { tokenBlackList } from "../../blacklist";

// Funcion con la que se verifica si el token es autentico
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    res.status(401).json({ message: "Authorization header is missing" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token not provided" });
    return;
  }

  if (tokenBlackList.includes(token)){
    res.status(401).json({ message: "Invalid token. You must log in again."})
  }

  try {
    const payload = jwt.verify(token, secretKey) as { username: string };
    req.username = payload.username; 
    next(); 
  } catch (error) {
    res.status(403).json({ message: "Token not valid" });
    return;
  }
};