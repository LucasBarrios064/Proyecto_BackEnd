import { Router } from "express";
import * as CartController from "../controllers/carts.controllers.js"
import { getGeneratedProducts } from "../faker.js";
import { authUser } from "../middleware/authUser.middleware.js";

const cartsRouter = Router();
cartsRouter.get("/", CartController.getCart)
cartsRouter.get("/:idCart",CartController.getCartById)
cartsRouter.post("/",CartController.addCart)
cartsRouter.post('/:idCart/product/:idProduct/:quantity',authUser, CartController.addProductToCart)
cartsRouter.delete("/:idCart",authUser,CartController.deleteCartProducts)
cartsRouter.put("/:idCart",authUser, CartController.updateCart)
cartsRouter.put('/:idCart/product/:idProduct',authUser, CartController.updateQuantity)
cartsRouter.post("/current/:idCart",CartController.purchase)

cartsRouter.get("/mockingproducts",getGeneratedProducts)

export { cartsRouter }




/* import { Router } from "express";
import { CartManager } from "../CartManager.js";

const cartsRouter = Router();
const cartManager = new CartManager();

cartsRouter.post("/", (req, res) => {
  let cartData = req.body;
  cartManager.addCart(cartData);
  res.status(201).json("Carrito agregado");
});

cartsRouter.post("/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;

  let idCart = parseInt(cid);
  let idProduct = parseInt(pid);

  let productToAdd = {
    id: idProduct,
    quantity: 1,
  };

  let found = false;

  let productsInCart = cartManager.getCartById(idCart).products;

  productsInCart.forEach((obj) => {
    if (obj.id === idProduct) {
      obj.quantity += 1;
      found = true;
    }
  });

  if (!found) {
    productsInCart.push(productToAdd);
  }

  cartManager.updateCart(idCart, productsInCart);
  res.send(productsInCart);
});

cartsRouter.get("/:cid", (req, res) => {
  const { cid } = req.params;
  const id = parseInt(cid);

  let cart = cartManager.getCartById(id);
  let productsInCart = cart.products;
  let products = [];
  productsInCart.forEach((obj) => {
    products.push(Object.values(obj));
  });
  res.send(products);
});

export default cartsRouter ;
 */