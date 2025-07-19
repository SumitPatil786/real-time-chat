import mongoose from "mongoose";
import Room from "../models/Room.js";

await mongoose.connect("mongodb+srv://sumitpatil0103:z2rC8UuZPAN4CpR6@cluster0.j95zsuw.mongodb.net/chat?retryWrites=true&w=majority");

await Room.create({name:"General"});
await Room.create({name:"Tech Talk"});

console.log("Rooms seeded");
process.exit();