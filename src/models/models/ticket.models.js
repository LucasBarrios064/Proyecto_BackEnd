import mongoose from "mongoose";
import { uuid } from 'uuidv4';


const schema = mongoose.Schema({
    code: {
        type: String,
        unique: true,
        require: true,
        default: uuid()
    },
    purchase_datetime: {
        type: Date,
        default: new Date()
    },
    amount: {
        type: Number
    },
    purchaser: {
        type: String,
        require:true
    }
})

export const TicketModel = mongoose.model("tickets", schema);