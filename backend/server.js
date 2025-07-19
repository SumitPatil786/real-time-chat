import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import roomRoutes from "./routes/roomRoutes.js";
import Message from "./models/Message.js";
import { text } from "stream/consumers";

const app =express();
app.use(cors());
app.use(express.json());
app.use("/api/rooms",roomRoutes);


const server = http.createServer(app);
const io =new Server(server,{cors :{origin:"*"}});

const online ={};

io.on("connection", (socket) => {
    socket.on("joinRoom",async ({username,roomId})=>{
        socket.join(roomId);
        socket.data = {username,roomId};

        online[roomId] ??={};
        online[roomId][socket.id] = username;
        io.to(roomId).emit("onlineUsers",Object.values(online[roomId]));

        const history =await Message.find({room:roomId}).sort("createdAt").lean();
        socket.emit ("chatHistory",history);

        socket.to(roomId).emit("chatMessage",{
            _id:`sys-${Date.now()}`,
            username:"System",
            text:`${username} joined`,
            createdAt:new Date(),
        });
    });

    socket.on("chatMessage",async(text)=>{
        const {username,roomId} =socket.data;
        if(!text?.trim()) return;
        const msg =await Message.create({room:roomId,username,text});
        io.to(roomId).emit("chatMessage",msg);
    });

    socket.on("typing",(status)=>{
        const {username,roomId} =socket.data;
        socket.to(roomId).emit("typing",{username,status});

    });

    socket.on("disconnect",()=>{
        const {username,roomId} =socket.data || {};
        if(!roomId) return;
        delete online[roomId]?.[socket.id];
        io.to(roomId).emit("onlineUsers",Object.values(online[roomId] || {}));
        socket.to(roomId).emit("chatMessage",{
            _id:`sys-${Date.now()}`,
            username:"System",
            text:`${username} left`,
            createdAt:new Date(),
        });
    });

});

mongoose.connect(process.env.MONGO_URI).then(()=>{
    server.listen(process.env.PORT,()=>console.log(`API & Socket listening on ${process.env.PORT}`));
})
.catch((err)=> console.error("Mongo error",err));