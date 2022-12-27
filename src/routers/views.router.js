import { Router } from "express";
 import ProductManager from "../ProductManager.js";

const productManager = new ProductManager() 

const router = Router();

router.get("/", (req, res) => {
  let productsList = productManager.getProducts()
  console.log("views router esta funcionando")
    let productosRender = productsList;
    console.log(productosRender) 
  res.render("home");
});

export default router;