import * as UserServices from "../services/usersDAO/users.services.js";
import bcrypt from 'bcrypt'

export async function login(email, password) {
  try {
    const user = await UserServices.getUser(email);
    if (!user) {
      throw new Error("El usuario no existe");
    } else {
      const isValid = bcrypt.compareSync(password,user.password)
      if (isValid) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
}



/* export async function login(email, password){
  try {
      const user = await UserServices.getUser(email)
      if(!user){
          throw new Error("El usuario no existe")
      } else{
          if(password === user.password){
              return true
          }else { return false }
      }
  } catch (error) {
      throw new Error(error.message);
  }
} */