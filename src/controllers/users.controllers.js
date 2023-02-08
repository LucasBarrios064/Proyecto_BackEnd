import * as UserServices from "../services/users.services.js";
import {STATUS} from "../constants/constants.js"

export async function createUser(req, res) {
  try {
    const user = await UserServices.createUser(req.body);
    if (!user) {
      throw new Error("Usuario no creado");
    }
    delete user.password;
    res.status(201).redirect('/views/realtimeproducts');
  } catch (error) {
    res.status(400).send(error.message);
  }
}


export async function getUser(req, res) {
    try {
      const { email } =  req.params;
      const user = await UserServices.getUser(email);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      delete user.password;
      res.status(200).json({
        status: STATUS.SUCCES,
        user,
      });
    } catch (error) {
        res.status(400).send(error.message);
    }
  }