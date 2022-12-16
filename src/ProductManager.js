import fs from "fs";

export default class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./Productos.json";
  }

  addProduct(title, description, price, thumbnail, stock) {
    try {
      const product = {
        id: this.#getMaxID() + 1,
        title,
        description,
        price,
        thumbnail,
        code: this.#getMaxID() + 1,
        stock,
        status: true,
        category,
      };

      if (fs.existsSync("Productos.json")) {
        this.#leerProductos;
      }

      const productadd = this.#getTitle(title);
      if (productadd) {
        console.log(` El producto (${title}) ya se encuentra en el arreglo`);
      } else {
        if ((title, description, price, thumbnail, stock, category)) {
          this.products.push(product);
        } else {
          console.log("Falta ingresar datos");
        }
      }
      fs.promises.writeFile(this.path, JSON.stringify(this.products));
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  getProducts() {
    this.#leerProductos();
    return this.products;
  }

  getProductsById(idProduct) {
    this.#leerProductos();
    const product = this.#getId(idProduct);
    if (product) {
      console.log(product);
      return product;
    } else {
      console.log("Not Found");
    }
  }

  removeProduct(idProduct) {
    let newCart = this.products.filter((producto) => producto.id !== idProduct);
    this.products = newCart;
    fs.promises.writeFile("Productos.json", JSON.stringify(this.products));
  }

  updateProduct(idProduct, title, description, price, thumbnail, stock) {
    this.#leerProductos();
    const product = this.#getId(idProduct);
    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      stock,
      category,
    };
    product.title = newProduct.title;
    product.description = newProduct.description;
    product.price = newProduct.price;
    product.thumbnail = newProduct.thumbnail;
    product.stock = newProduct.stock;
    product.category = newProduct.category;
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
    const product1 = this.products.find((product1) => product1.id == idProduct);
    return product1;
  }

  #getTitle(titleProduct) {
    return this.products.find((product) => product.title === titleProduct);
  }

  async #leerProductos() {
    const productos = JSON.parse(
      await fs.promises.readFile("Productos.json", "utf-8")
    );
    this.products = productos;
    return this.products;
  }
}
