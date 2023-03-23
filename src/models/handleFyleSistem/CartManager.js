import fs from "fs";

export class CartManager {
  constructor() {
    this.cart = [];
    this.path = "Cart.json";
  }

  addCart(products) {
    const cart = {
      id: this.#getMaxId() + 1,
      products,
    };
    if (fs.existsSync("Cart.json")) {
      this.#getCart();
    }
    if (this.cart.includes(cart.id)) {
      console.error("Ya se encuentra un carrito con ese ID");
    } else {
      let products = [];

      products.push(cart.products);
      let cartMuestra = {
        id: cart.id,
        products,
      };
      this.cart.push(cartMuestra);
      fs.promises.writeFile(this.path, JSON.stringify(this.cart), "utf-8");
    }
  }

  getCart() {
    this.#getCart();
    console.log(this.cart);
    return this.cart;
  }

  getCartById(idCart) {
    this.#getCart();
    const cart = this.#getId(idCart);
    if (cart) {
      console.log(cart);
      return cart;
    } else {
      console.log("No Cart Found");
    }
  }

  updateCart(id, products) {
    this.#getCart();
    this.cart.find((cart) => {
      if (cart.id === id) {
        cart.products = products;
      }
    });
    fs.promises.writeFile(this.path, JSON.stringify(this.cart), "utf-8");
  }

  async #getCart() {
    const cart = JSON.parse(await fs.promises.readFile("Cart.json", "utf-8"));
    this.cart = cart;
    return this.cart;
  }

  #getMaxId() {
    this.#getCart();
    let maxId = 0;
    this.cart.map((cart) => {
      if (cart.id > maxId) maxId = cart.id;
    });
    return maxId;
  }

  #getId(idCart) {
    const cart1 = this.cart.find((cart1) => cart1.id == idCart);
    return cart1;
  }
}

const cartManager = new CartManager();
