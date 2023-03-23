import {MessagesModel} from "./../models/models/messages.models.js"

// OBTENER MENSAJES
export async function getMessages(){
    try {
      const messages = await MessagesModel.find()
      return messages  
    } catch (error) { throw new Error(error.message) }
}

// AGREGAR MENSAJES
export async function addMessages(email,message){
  try {
    const msg = await MessagesModel.create(email, message)
    return msg
  } catch (error) { throw new Error(error.message) }
}