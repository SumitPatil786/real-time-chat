import express, { Router } from "express";
import Room from "../models/Room.js";



const router =express.Router();

router.get("/",async(_req,res)=>{
    const rooms = await Room.find().sort({name:1});
    res.json(rooms);
});

router.post("/",async(req,res)=>{
    if(!req.body.name) return res.status(400).json({error:"Name is required"});

    try{
        const room = await Room.create({name:res.body.name});
        res.status(201).json(room);
    } catch(err){
        res.status(409).json({error:"Room already exist"});
    }
});

export default router;

