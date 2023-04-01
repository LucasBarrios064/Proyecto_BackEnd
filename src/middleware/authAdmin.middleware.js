import logger from "../utils/logger.js"

export function authAdmin(req, res, next) {
    const userLogged = req.user || req.session.userLogged;
    logger.info(userLogged)
    if (userLogged.role === "admin") {
      return next();
    } else {
      throw new Error(
        "Solo los Usuarios pueden ejecutar esa accion"
      );
    }
  }