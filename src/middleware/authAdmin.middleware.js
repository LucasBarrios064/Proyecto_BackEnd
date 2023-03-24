export function authAdmin(req, res, next) {
    const userLogged = req.user || req.session.userLogged;
    console.log(userLogged)
    if (userLogged.role === "admin") {
      return next();
    } else {
      throw new Error(
        "Solo los Usuarios pueden ejecutar esa accion"
      );
    }
  }