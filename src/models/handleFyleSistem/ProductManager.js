import fs from "fs";
import logger from "../utils/logger.js"

export default class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./Productos.json";
  }

  addProduct(title, description, price, thumbnail, stock, category) {
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
        this.#leerProductos();
      }

      let productadd = this.#getTitle(title);
      if (productadd) {
        logger.info(` El producto (${title}) ya se encuentra en el arreglo`);
      } else {
        if ((title, description, price, thumbnail, stock, category)) {
          this.products.push(product);
        } else {
          logger.warn("Falta ingresar datos");
        }
      }
      fs.writeFileSync(this.path, JSON.stringify(this.products, "utf-8"));
    } catch (error) {
      logger.error(error);
      throw new Error(error);
    }
  }

  getProducts() {
    try {
      this.#leerProductos();
      return this.products;
    } catch {
      logger.error(error);
      throw new Error(error);
    }
  }

  getProductsById(idProduct) {
    try {
      this.#leerProductos();
      const product = this.#getId(idProduct);
      if (product) {
        logger.info(product);
        return product;
      } else {
        logger.warn("Not Found");
      }
    } catch {
      logger.error(error);
      throw new Error(error);
    }
  }

  removeProduct(idProduct) {
    let newCart = this.products.filter((producto) => producto.id !== idProduct);
    this.products = newCart;
    fs.promises.writeFile(this.path, JSON.stringify(this.products));
  }

  updateProduct(
    idProduct,
    title,
    description,
    price,
    thumbnail,
    stock,
    category
  ) {
    this.#leerProductos();

    let newProduct = {
      title,
      description,
      price,
      thumbnail,
      stock,
      category,
    };

    this.products.find((product) => {
      if (product.id === idProduct) {
        product.title = newProduct.title;
        product.description = newProduct.description;
        product.price = newProduct.price;
        product.thumbnail = newProduct.thumbnail;
        product.stock = newProduct.stock;
        product.category = newProduct.category;
      }
      fs.promises.writeFile(this.path, JSON.stringify(this.products));
    });
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
      await fs.promises.readFile(this.path, "utf-8")
    );
    this.products = productos;
    return this.products;
  }
}
