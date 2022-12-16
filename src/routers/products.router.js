import { Router } from "express";
import ProductManager from "../ProductManager.js";

const productsRouter = Router();

const productManager2 = new ProductManager();

productsRouter.get("/products", (req, res) => {
  const { limit } = req.query;
  let productsList = productManager2.getProducts();
  if (limit) {
    const producto = productsList.slice(0, limit);
    res.json(producto);
  } else {
    res.json(productsList);
  }
});

productsRouter.get("/products/:pid", (req, res) => {
  const { pid } = req.params;
  const id = parseInt(pid);
  let productID = productManager2.getProductsById(id);
  res.json(productID);
});

productsRouter.post("/", (res, req) => {
  let newData = req.body;
  console.log(req.body);

  productManager2.addProduct(
    newData.title,
    newData.description,
    newData.code,
    newData.price,
    newData.status,
    newData.stock,
    newData.category,
    newData.thumbnail
  );
  res.status(201).json("Producto Añadido");
});

productsRouter.put("/:pid", (req, res) => {
  const { pid } = req.params;
  const id = parseInt(pid);

  let newData = req.body;
  productManager2.updateProduct(
    id,
    newData.title,
    newData.description,
    newData.code,
    newData.price,
    newData.status,
    newData.stock,
    newData.category,
    newData.thumbnail
  );
  res.status(201).json("Producto actualizado");
});

productsRouter.delete("/:pid", (req, res) => {
  const { pid } = req.params;
  const id = parseInt(pid);
  productManager2.removeProduct(id);
  res.json("Producto eliminado");
});

export default productsRouter;
