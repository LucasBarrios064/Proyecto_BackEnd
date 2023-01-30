import mongoose from "mongoose";

const schema = mongoose.Schema({
    email:{
        type:String,
        require: true
    },
    message:{}
})

export const MessagesModel = mongoose.model("messages", schema)