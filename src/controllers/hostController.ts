import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  username?: string;
  role?: string;
}
import { Host } from "../models/Host";
import { tokenBlackList } from "../blacklist";

//Muestra los datos de los hosts registrados
export const getAllHost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const hosts = await Host.findAll({
      attributes: ['id', 'username', 'role'],
    });
    res.status(200).json({ status: 'success', data: hosts });
  } catch (error) {
    next(error);
  }
};

// Muestra los datos de los host.
export const getHostById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const hostId = req.params.id;

    const host = await Host.findByPk(hostId, {
      attributes: ['id', 'username', 'role']
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
    const { username, password, role } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }

    if (role !== "admin" && role !== "user") {
      res.status(400).json({ message: "Role not found" });
    }

    const existingHost = await Host.findOne({ where: { username } });
    if (existingHost) {
      res.status(409).json({ message: "Host already exists" });
      return;
    }

    const newUser = await Host.create({ username, password, role });

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
export const createHostAdminOnce = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;

    const role = "admin";

    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }
    
    const totalUsers = await Host.count();
    if (totalUsers > 0) {
      res.status(409).json({ message: "A user already exists in the database" });
      return;
    }

    const newUser = await Host.create({ username, password, role });

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
export const getAccess = (req: CustomRequest, res: Response): void => {
  const hasAccess = !!req.username && !!req.role;
  res.status(200).json({ acceso: hasAccess, role:req.role });
};

// Permite modificar la contraseña del propio host.
export const updateHost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { newPassword, newRole } = req.body;

    // Validar que al menos uno de los campos (newPassword o newRole) esté presente
    if (!newPassword && !newRole) {
      res.status(400).json({ message: "At least one of newPassword or newRole is required" });
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

    // Actualizar la contraseña si se proporciona
    if (newPassword) {
      existingHost.password = newPassword;
    }

    // Actualizar el rol si se proporciona
    if (newRole) {
      if (newRole !== "admin" && newRole !== "user") {
        res.status(400).json({ message: "Invalid role. Role must be 'admin' or 'user'" });
        return;
      }
      existingHost.role = newRole;
    }

    await existingHost.save();

    res.status(200).json({ message: "Host updated successfully" });
  } catch (error) {
    console.error("Error updating host:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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

    res.json({ message: "Host successfully deleted" });
    return;

  }catch (err){
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Error deleting product"});
  }
};
