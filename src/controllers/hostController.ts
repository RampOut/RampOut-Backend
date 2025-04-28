import { Request, Response, NextFunction } from "express";
import { Host } from "../models/Host";
import { tokenBlackList } from "../blacklist";

interface host{
  username?: string;
  password?: string;
  token?: string;
}

// Muestra los datos de los host.
export const getHostById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const hostId = req.params.id;

    const host = await Host.findByPk(hostId, {
      attributes: ['id', 'username']
    });

    if (!host){
      res.status(404).json({ message: "Host no found"});
      return;
    }

    res.json(host);
  }catch (err){
    next(err);
  }
};


// Permite que un host, cree otro host.
export const createHost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }

    const existingHost = await Host.findOne({ where: { username } });
    if (existingHost) {
      res.status(409).json({ message: "Host already exists" });
      return;
    }

    const newUser = await Host.create({ username, password });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
    return;
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

// Funcion la que permite crear un host, solamente si la base de datos no tiene ninguno
export const createHostOnce = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }
    
    const totalUsers = await Host.count();
    if (totalUsers > 0) {
      res.status(409).json({ message: "A user already exists in the database" });
      return;
    }

    const existingHost = await Host.findOne({ where: { username } });
    if (existingHost) {
      res.status(409).json({ message: "Host already exists" });
      return;
    }

    const newUser = await Host.create({ username, password });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
    return;
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Unicamente dice que tiene acceso.
export const getAccess = (req: Request, res: Response): void => {
  res.status(200).json({ message: "You have access", username: req.username });
};

// Permite modificar la contraseña del propio host.
export const updateHostPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { newPassword } = req.body;

    if (!newPassword) {
      res.status(400).json({ message: "New password are required" });
      return;
    }

    const hostId = req.params?.id;
    if (!hostId) {
      res.status(400).json({ message: "Bad Request: Host ID is missing in the request parameters" });
      return;
    }

    const existingHost = await Host.findOne({ where: { id: hostId } });
    if (!existingHost) {
      res.status(404).json({ message: "Host not found" });
      return;
    }

    existingHost.password = newPassword;
    await existingHost.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Permite cerrar la seccion del host
export const hostLogout = (req: Request, res: Response): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader){
    res.status(400).json({ message: 'Token not found'});
    return;
  }

  const token = authHeader.split(' ')[1];

  tokenBlackList.push(token);

  res.status(200).json({ message: "Session successfully closed"});
  return; 

};

// Opcion por si el host quiere eliminar su cuenta.
export const deleteHost = async (req: Request, res: Response) => {
  try{
    const hostId = req.params.id;

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(400).json({ message: "Authorization header is missing" });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(400).json({ message: "Token not provided" });
      return;
    }

    const deleted = await Host.destroy({
      where: {id: hostId}
    });

    if (deleted === 0){
      res.status(404).json({ message: " host no found"})
      return;
    }

    tokenBlackList.push(token);

    res.json({ message: "Host successfully deleted and session terminated" });
    return;

  }catch (err){
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Error deleting product"});
  }
};
