import { RequestHandler, Request, Response, request } from "express";
import { Player } from "../models/Player";
import { data } from "jquery";

export const createPlayer: RequestHandler = (req: Request, res: Response) => {
    //First it validates the request 
    if (!req.body){
        res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null, 
        })
        return; 
    }
    const player = { ...req.body };
    Player.create(player)
        .then((data: Player | null) => {
            res.status(200).json({
                status: "success", 
                message: "Player succesfully created", 
                payload: data,
            });
            return
        })
        .catch((err) => {
            res.status(500).json({
                status: "error", 
                message: "Error creating a new player",
                payload: null, 
            })
            return;
        });
};

export const getPlayerById: RequestHandler = (req: Request, res: Response) => {
    Player.findByPk(req.params.id)
    .then((data: Player | null) => {
        return res.status(200).json({
            status: "Succes", 
            message: "Player successfully retrieved",
            payload: data,
        })
    })
    .catch((e) =>{
        return res.status(500).json({
            status: "Error", 
            message: "Player not found"+ e.message, 
            payload: null
        })
    })
}
export const deletePlayer: RequestHandler = async(req: Request, res: Response) => {
    const { id } = req.params; 
    try { 
        await Player.destroy({ where: { id } });
        res.status(200).json({ message: "Player deleted"});
        return; 
    }   catch (error) {
            res.status(500).json({
                message: "Error deleting the player", 
                error, 
            });
            return; 
    }
}