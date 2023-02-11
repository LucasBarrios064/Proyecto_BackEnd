import { Router } from "express";
import {auth} from "../middleware/auth.middleware.js"
import * as UserController from "../controllers/users.controllers.js"

const userRouter = new Router()

userRouter.post("/", UserController.createUser)
userRouter.get("/:email", auth , UserController.getUser)
userRouter.put("/updateUser/:email", auth, UserController.updateUser);
userRouter.put("/updatePassword/:email", auth, UserController.updatePassword);

export default userRouter
