import express from "express";
import productManager from "./productos.js";

const app = express();
let productosMuestra = [];

productosMuestra = productManager.products;

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`🔥 LISTENING ON PORT ${PORT}!`);
});

/* app.get("/saludo", (req, res) => {
  res.send("Hola coderhouse desde express");
});

app.get("/bienvenida", (req, res) => {
  res.send('<h1 style="color:blue">Bienvenido!</h1>');
}); 

 app.get("/products", (req, res) => {
  res.json({
    productosMuestra,
  });
}); */

app.get("/products/:pid", (req, res) => {
  console.log(req);
  const { pid } = req.params;
  console.log(pid);
  const product1 = productosMuestra.find((product1) => product1.id == pid);
  if (product1){
    res.json(product1);
  }else{
    res.send('<h1 style="color:red">El producto no existe</h1>')
  }
});

app.get("/products", (req, res) => {
  const { limit } = req.query;
  console.log(limit);
  const producto = productosMuestra.slice(0, limit);
  res.json(producto);
});
