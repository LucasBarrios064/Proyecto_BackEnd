import express from "express";
import productManager from "./productos.js";
import ProductManager from "./ProductManager.js";
const app = express();
let productosMuestra = [];

productosMuestra = productManager.products;

const productManager2 = new ProductManager();
productManager2.getProducts()

const PORT = 8081;

app.listen(PORT, () => {
  console.log(`🔥 LISTENING ON PORT ${PORT}!`);
}); 

await app.get("/products/:pid", (req, res) => {
  console.log(req);
  const { pid } = req.params;
  console.log(pid);
  const productID = productManager2.getProductsById(pid)
  console.log(productID)
  res.json(productID)
});

 app.get("/products", (req, res) => {
  const { limit } = req.query;
  console.log(limit);
  const productList = productManager2.products
  const producto = productList.slice(0, limit);
  console.log(productList)
  res.json(producto);
});
