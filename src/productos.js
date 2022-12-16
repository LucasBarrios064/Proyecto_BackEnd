import ProductManager from "./ProductManager.js";

const productManager = new ProductManager();
export default productManager

 productManager.addProduct("Peras", "Peras verdes del arbol", 30, "IMG", 45);

 productManager.addProduct(
  "Manzanas",
  "Manzanas rojas del arbol",
  20,
  "IMG",
  50
);


 productManager.addProduct(
  "Limones",
  "Limones amarillos del arbol",
  15,
  "IMG",
  80
);

 productManager.addProduct(
  "Sandias",
  "Sandias verdes de la planta",
  50,
  "IMG",
  10
);

 productManager.addProduct(
  "Frutillas",
  "Frutillas rojas de la planta",
  10,
  "IMG",
  120
);

 productManager.addProduct(
  "Durazno",
  "Durazno Naranja del arbol",
  53,
  "IMG",
  86
);

 productManager.addProduct(
  "Uvas",
  "Uvas Violetas de la planta",
  14,
  "IMG",
  150
);

 productManager.addProduct(
  "Bananas",
  "Bananas Amarillas de la planta",
  24,
  "IMG",
  90
);

 productManager.addProduct(
  "Naranjas",
  "Naranjas Naranjas del arbol",
  70,
  "IMG",
  50
);

 productManager.addProduct(
  "Piña",
  "Piña Amarilla de la planta",
  140,
  "IMG",
  30
);

 productManager.addProduct(
  "Manzana Verde",
  "Manzana Verde del arbol",
  22,
  "IMG",
  60
);
/*
console.log("------------FUNCION GET PRODUCTS------------");
console.log( productManager.getProducts());

console.log("------------FUNCION GET PRODUCTS BY ID------------");
 productManager.getProductsById(2);
 productManager.getProductsById(7);

console.log("------------FUNCION UPDATE PRODUCT------------");
 productManager.updateProduct(1, "arm", "SOPA", 500, "IMG", 2);
console.log( productManager.getProducts());

console.log("------------FUNCION REMOVE PRODUCT------------");
 productManager.removeProduct(3);
console.log( productManager.getProducts()); */
