import { Router } from "express";
 import ProductManager from "../ProductManager.js";

const productManager3 = new ProductManager() 

const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {
  let productsList = productManager3.getProducts()
  let productosRender = productsList;
  res.render("home",{productosRender});
});

viewsRouter.get("/realtimeproducts", (req, res) => {
  let productsList = productManager3.getProducts()
  let productosRender = productsList;
  res.render("realTimeProducts",{productosRender});
});

export default viewsRouter;