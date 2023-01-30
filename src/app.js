import express from "express";
import {productsRouter} from "./routers/products.router.js";
import {cartsRouter} from "./routers/cart.router.js"; 
import { engine } from "express-handlebars";
import viewsRouter from "./routers/views.router.js"; 
import { Server } from "socket.io";
import __dirname from './utils.js';

import dotenv from "dotenv";
import "./config/db.js"
import * as MessageServices from "./services/messages.services.js"

const app = express();
dotenv.config()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

const PORT = 8080;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`)
);
server.on("error", (err) => console.log(err));

app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter); 
app.use("/", viewsRouter);

const socketServer = new Server(server);

socketServer.on("connection", (socket) => {
  console.log("Nueva conexión");
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
    
  });

  async function conseguirMensajes(){
    let messages = await MessageServices.getMessages()
    socketServer.emit("ServerSendMessages", messages)
  }
  conseguirMensajes()

  socket.on("addMessage", newMessage=>{
    MessageServices.addMessages(newMessage)
    conseguirMensajes()
  })
  
});
