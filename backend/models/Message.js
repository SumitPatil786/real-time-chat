import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  text: String,
  roomId: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.model("Message" ,messageSchema)