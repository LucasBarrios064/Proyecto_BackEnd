export default (error, req, res, next) => {
  console.log(
    "Message: ",
    error.messsage,
    "Path: ",
    req.path,
    "Data: ",
    { query: req.query },
    { params: req.params },
    { body: req.body },
    "User: ",
    { user: req?.user },
    "Error Name:",
    { errorName: error.name },
    "Stack: ",
    { stack: error.stack }
  );
  next();
};
