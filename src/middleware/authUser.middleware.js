import logger from "../utils/logger.js"

export function authUser(req, res, next) {
  const userLogged = req.user || req.session.userLogged;
  logger.info(userLogged)
  if (userLogged.role === "user") {
    return next();
  } else {
    throw new Error(
      "Solo el Admin puede ejecutar esa accion"
    );
  }
}
