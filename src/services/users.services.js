import { UserModel } from "../dao/models/users.models.js";

export async function createUser(data) {
  try {
    const user = await UserModel.create(data);
    if (!user) {
      throw new Error("El Usuario no se pudo Crear");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUser(email) {
  try {
    const user = await UserModel.find({ email }).lean();
    if (!user) {
      throw new Error("Usuario no encontrado");
    } else {
      return user[0];
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
