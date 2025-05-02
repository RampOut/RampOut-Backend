import { RequestHandler, Request,Response } from "express";
import { Tires } from "../models/Tires";

// Se crean llantas
export const createTires: RequestHandler = (req: Request, res: Response) => {
    if (!req.body){
        res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null
        });
        return;
    }

    const tiresData = {...req.body};
    Tires.create(tiresData)
    .then((data: Tires | null) =>{
        res.status(200).json({
            status: "success",
            message: "Tires successfully created",
            payload: data
        });
        return;
    })
    .catch((err: Error) => {
        res.status(500).json({
            status: "error",
            message: "Something happened registering the tires. " + err.message,
            payload: null
        });
        return;
    });
}

export const getAllTires: RequestHandler = (req: Request, res: Response) => {
    Tires.findAll()
    .then((data: Tires[]) => {
        return res.status(200).json({
            status: "success",
            message: "Tires successfull retrieved",
            payload: data
        });
    })
    .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "Something happened retrieving all tires " + err.message,
            payload: null
        });
    });
}

// Obtiene los datos de una llanta con un id
export const getTireById: RequestHandler = (req: Request, res: Response) => {
    Tires.findByPk(req.params.id)
    .then((data: Tires | null) =>{
        return res.status(200).json({
            status: "success",
            message: "Tires successfully retrieved",
            payload: data
        });
    })
    .catch((err)=> {
        return res.status(500).json({
            status: "error",
            message: "Something happened while searching the tires. " + err.message,
            payload: null
        });
    });
}

// Se actualizan los valores de las llantas
export const updateTires = async(req: Request, res: Response) => {
    const tiresId = parseInt(req.params.id);
    try{
        await Tires.update(req.body, {where: { id: req.params.id}});
        res.json({message: "Tires updated"});
    }catch(error){
        res.status(500).json({ error: `Error updating tires with id: ${req.params.id}`});
        console.log(`Error updating tires with id: ${req.params.id}`)
    }
}

// Se elimina una llanta
export const deleteTires: RequestHandler = async(req: Request, res: Response) => {
    const {id} = req.params;
    try{
        await Tires.destroy({ where: {id}});
        res.status(200).json({
            message: "Tires deleted"
        });
        return;
    } catch (error) {
        res.status(500).json({
            message: "Error deleting tires",
            error,
        });
        return;
    }
}

