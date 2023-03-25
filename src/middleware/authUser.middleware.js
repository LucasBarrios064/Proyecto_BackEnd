export function authUser(req, res, next) {
  const userLogged = req.user || req.session.userLogged;
  console.log(userLogged)
  if (userLogged.role === "user") {
    return next();
  } else {
    throw new Error(
      "Solo el Admin puede ejecutar esa accion"
    );
  }
}
