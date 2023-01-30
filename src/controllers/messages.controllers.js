import * as MessagesServices from "../services/carts.services.js"
import { STATUS } from "../constants/constants.js"

export async function getMessages(req, res){
    try {
        const response = await MessagesServices.getMessages()
        res.json({
            message: response,
            status: STATUS.SUCCES
        })
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: STATUS.FAIL
        })
    }
}

export async function addMessages(req,res){
    try {
        const {body} = req
        const response = await MessagesServices.addMessages(body)
        console.log("body de addMessage de controller: ", body)
        res.json({
            message: response,
            status: STATUS.SUCCES
        })
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: STATUS.FAIL
        })
    }
}