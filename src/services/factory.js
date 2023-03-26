import config from "../config/config.js";
import { PERSISTENCIA } from "../constants/constants.js";

import { UserRepository } from "./usersDAO/users.repository.js";
import { ProductRepository } from "./productsDAO/products.repository.js";
import { CartRepository } from "./cartsDAO/carts.repository.js";
import { ticketRepository } from "./ticketDAO/ticket.repository.js";

let factory;
switch (config.persistencia) {
  case PERSISTENCIA.MONGO:
    console.log("🧨 Persistencia MONGO");

    await import("../config/db.js");

    const { default: userMongo } = await import(
      "../services/usersDAO/users.services.js"
    );
    const { default: cartMongo } = await import("./cartsDAO/carts.services.js");
    const { default: productMongo } = await import(
      "../services/productsDAO/products.services.js"
    );
    const { default: ticketMongo } = await import(
      "./ticketDAO/ticket.services.js"
    );

    factory = {
      user: new UserRepository(userMongo),
      cart: new CartRepository(cartMongo),
      product: new ProductRepository(productMongo),
      ticket: new ticketRepository(ticketMongo),
    };
    break;

  case PERSISTENCIA.FILE:
    console.log("🧨 Persistencia FILE SYSTEM");
    break;

  case PERSISTENCIA.MEMORY:
    console.log("🧨 Persistencia MEMORY");
    break;
}

export default factory;
