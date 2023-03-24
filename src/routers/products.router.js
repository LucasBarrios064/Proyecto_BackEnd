import { Router } from "express";
import * as ProductController from "../controllers/products.controllers.js";
import { authAdmin } from "../middleware/authAdmin.middleware.js";

const productsRouter = Router();

productsRouter.get("/", ProductController.getProducts);

productsRouter.get("/:idProduct", ProductController.getProductById);

productsRouter.post("/",authAdmin ,ProductController.addProduct);

productsRouter.put("/:idProduct",authAdmin, ProductController.updateProduct);

productsRouter.delete("/:idProduct", ProductController.deleteProduct);

export { productsRouter };

/* import { Router } from "express";
import ProductManager from "../ProductManager.js";

const productsRouter = Router();

export const productManager2 = new ProductManager();

productsRouter.get("/", (req, res) => {
  const { limit } = req.query;
  let productsList = productManager2.getProducts();
  if (limit) {
    const producto = productsList.slice(0, limit);
    res.json(producto);
  } else {
    res.json(productsList);
  }
});

productsRouter.get("/:pid", (req, res) => {
  const { pid } = req.params;
  const id = parseInt(pid);
  let productID = productManager2.getProductsById(id);
  res.json(productID);
});

productsRouter.post("/", async (req, res) => {
  const newData = req.body;
  console.log(req.body);
  console.log(newData);
  productManager2.addProduct(
    newData.title,
    newData.description,
    newData.price,
    newData.stock,
    newData.category,
    newData.thumbnail
  );

  res.status(201).json("Producto Añadido");
});

productsRouter.put("/:pid", (req, res) => {
  const { pid } = req.params;
  const id = parseInt(pid);
  const { body } = req;
  let newData = body;
  console.log(req.body);
  productManager2.updateProduct(
    id,
    newData.title,
    newData.description,
    newData.price,
    newData.stock,
    newData.category,
    newData.thumbnail
  );
  res.status(201).json(newData);
});

productsRouter.delete("/:pid", (req, res) => {
  const { pid } = req.params;
  const id = parseInt(pid);
  productManager2.removeProduct(id);
  res.json("Producto eliminado");
});

export default productsRouter; */
