class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct = (title, description, price, thumbnail, stock) => {
    const product = {
      id: this.#getMaxID() + 1,
      title,
      description,
      price,
      thumbnail,
      code: this.#getMaxID() + 1,
      stock,
    };
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
  };

  getProducts() {
    console.log(this.products);
  }

  getProductsById(idProduct) {
    const product = this.#getId(idProduct);
    if (product) {
      console.log(product);
    } else {
      console.log("Not Found");
    }
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

/* //PRODUCTO SIN TODOS LOS DATOS
productManager.addProduct("uvas", 23);

////CONSEGUIR UN PRODUCTO POR ID
productManager.getProductsById(4);
//CONSEGUIR UN PRODUCTO POR ID INEXISTENTE
productManager.getProductsById(10);

//Todos los productos
productManager.getProducts(); */
