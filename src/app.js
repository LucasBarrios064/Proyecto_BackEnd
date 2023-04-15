import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";

import { productsRouter } from "./routers/products.router.js";
import { cartsRouter } from "./routers/cart.router.js";
import viewsRouter from "./routers/views.router.js";
import userRouter from "./routers/users.router.js";
import authRouter from "./routers/auth.router.js";
import PassportLocalRouter from "./routers/passportLocal.router.js";
import GithubRouter from "./routers/github.router.js";

import cookie from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import passport from "passport";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

import dotenv from "dotenv";
import "./config/db.js";
import * as MessageServices from "./services/messages.services.js";
import * as ProductServices from "./services/productsDAO/products.services.js";

import errorHandlerMiddleware from "./middleware/errorHandler.middleware.js";
import loggerMiddleware from "./middleware/logger.middleware.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));

app.use(cookie());

app.use(
  session({
    store: new mongoStore({
      mongoUrl: process.env.MONGO_URI,
      options: {
        userNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 },
  })
);

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion de las APIS",
      description: "API de Ecommerce para los swaggers",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const spec = swaggerJsDoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);
app.use("/views/", viewsRouter);

app.use("/api/users/", userRouter);
app.use("/api/auth/", authRouter);
app.use("/api/passportLocal", PassportLocalRouter);
app.use("/api/github", GithubRouter);

app.use(errorHandlerMiddleware);

app.use(loggerMiddleware);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`)
);
server.on("error", (err) => console.log(err));

import logger from "./utils/logger.js";
app.get("/loggerTest", (req, res) => {
  logger.debug("Logger Mensaje (debug)");
  logger.http("Logger Mensaje (http)");
  logger.info("Logger Mensaje (info)");
  logger.warning("Logger Mensaje (warnign)");
  logger.error("Logger Mensaje (error)");
  logger.fatal("Logger Mensaje (fatal)");
  res.send("Todos");
});

const socketServer = new Server(server);

socketServer.on("connection", (socket) => {
  console.log("Nueva conexión");
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  async function conseguirProductos() {
    let products = await ProductServices.getProducts();
    socketServer.emit("ServerSendProducts", products);
  }
  conseguirProductos();

  async function conseguirMensajes() {
    let messages = await MessageServices.getMessages();
    socketServer.emit("ServerSendMessages", messages);
  }
  conseguirMensajes();

  socket.on("addMessage", (newMessage) => {
    MessageServices.addMessages(newMessage);
    conseguirMensajes();
  });
});
