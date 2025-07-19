import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    username:{type: String , required: true, unique : true},
    passwordHash:String
});

export default mongoose.model("User",userSchema)