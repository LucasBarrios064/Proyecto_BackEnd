import fs from "fs";

class ProductManager {
  constructor() {
    this.products = [];
  }

  async addProduct(title, description, price, thumbnail, stock) {
    try {
      const product = {
        id: this.#getMaxID() + 1,
        title,
        description,
        price,
        thumbnail,
        code: this.#getMaxID() + 1,
        stock,
      };

      if (fs.existsSync("Productos.json")) {
        this.#leerProductos;
      }

      const productadd = this.#getTitle(title);
      if (productadd) {
        console.log(` El producto (${title}) ya se encuentra en el arreglo`);
      } else {
        if ((title, description, price, thumbnail, stock)) {
          this.products.push(product);
        } else {
          console.log("Falta ingresar datos");
        }
      }
      fs.promises.writeFile("Productos.json", JSON.stringify(this.products));
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getProducts() {
    await this.#leerProductos();
    return this.products;
  }

  async getProductsById(idProduct) {
    await this.#leerProductos();
    const product = this.#getId(idProduct);
    if (product) {
      console.log(product);
    } else {
      console.log("Not Found");
    }
  }

  async removeProduct(idProduct) {
    let newCart = this.products.filter(producto => producto.id !== idProduct)
    this.products = newCart
    fs.promises.writeFile("Productos.json", JSON.stringify(this.products))
  }

  async updateProduct(idProduct, title, description, price, thumbnail, stock) {
    await this.#leerProductos();
    const product = this.#getId(idProduct);
    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      stock,
    };
    product.title = newProduct.title;
    product.description = newProduct.description;
    product.price = newProduct.price;
    product.thumbnail = newProduct.thumbnail;
    product.stock = newProduct.stock;
    fs.promises.writeFile("Productos.json", JSON.stringify(this.products));
  }

  #getMaxID() {
    let maxId = 0;
    this.products.map((product) => {
      if (product.id > maxId) maxId = product.id;
    });
    return maxId;
  }
  #getId(idProduct) {
    return this.products.find((product) => product.id === idProduct);
  }

  #getTitle(titleProduct) {
    return this.products.find((product) => product.title === titleProduct);
  }

  async #leerProductos() {
    const productos = JSON.parse(
      await fs.promises.readFile("Productos.json", "utf-8")
    );
    this.products = productos;
  }
}

const productManager = new ProductManager();

productManager.addProduct("Peras", "Peras verdes del arbol", 30, "IMG", 45);

productManager.addProduct(
  "Manzanas",
  "Manzanas rojas del arbol",
  20,
  "IMG",
  50
);
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

console.log("------------FUNCION GET PRODUCTS------------");
console.log(await productManager.getProducts());

console.log("------------FUNCION GET PRODUCTS BY ID------------");
await productManager.getProductsById(2);
await productManager.getProductsById(7);

console.log("------------FUNCION UPDATE PRODUCT------------");
await productManager.updateProduct(1, "arm", "SOPA", 500, "IMG", 2);
console.log(await productManager.getProducts());

console.log("------------FUNCION REMOVE PRODUCT------------");
await productManager.removeProduct(3);
console.log(await productManager.getProducts());
