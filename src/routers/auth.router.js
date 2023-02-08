import { Router } from "express";
import * as AuthController from "../controllers/auth.controllers.js"

const authRouter = new Router()

authRouter.post("/login", AuthController.login)
authRouter.get("/logout", AuthController.logout)

export default authRouter