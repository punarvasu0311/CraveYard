import { Request,Response } from "express";

export const loginUser=(req:Request,res:Response)=>{
    res.json(req.body)
};