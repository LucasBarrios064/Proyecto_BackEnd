import { Router } from "express";
/* import ProductManager from "../ProductManager.js"; 

const productManager3 = new ProductManager() 
*/

/*
 viewsRouter.get("/", (req, res) => {
  let productsList = productManager3.getProducts()
  let productosRender = productsList;
  res.render("home",{productosRender});
});

viewsRouter.get("/realtimeproducts", (req, res) => {
  let productsList = productManager3.getProducts()
  let productosRender = productsList;
  res.render("realTimeProducts",{productosRender});
}); */
const viewsRouter = Router();
viewsRouter.get("/chat", (req, res) => {
  console.log("views router esta funcionando");

  res.render("chat");
});

export default viewsRouter;
