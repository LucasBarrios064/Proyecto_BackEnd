import * as CartServices from "../services/carts.services.js";
import { STATUS } from "../constants/constants.js";

export async function getCart(req, res) {
  try {
    const response = await CartServices.getCart();
    res.json({
      carts: response,
      status: STATUS.SUCCES,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}
export async function getCartById(req, res) {
  try {
    const { idCart } = req.params;
    const response = await CartServices.getCartById(idCart);
    res.json({
      products: response,
      status: STATUS.SUCCES,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}

export async function addCart(req, res) {
  try {
    const cartData = req.body;
    const newCart = await CartServices.addCart(cartData);
    res.status(201).json({
      succees: true,
      message: `${
        newCart.products.length > 0
          ? `New cart created with ${newCart.products.length} products.`
          : `New empty cart successfully created.`
      } New cart's ID is ${newCart._id}.`,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}


export async function addProductToCart(req, res) {
  try {
      const { cartID, productID, quantity } = req.params;

      if (quantity <= 0) {
          res.status(400).json({
              success: false,
              message: `Invalid quantity. Must be a positive integer.`
          });
      }

      const cart = await CartServices.addProductToCart(cartID, productID, Number(quantity));
      if (cart) {
          res.status(200).json({
              success: true,
              message: `Product ${productID} added to cart ${cart._id}`,
              data: cart
          });
      } else {
          res.status(404).json({
              success: false,
              message: `Product ${productID} not found.`
          });
      }
  } catch (error) {
      res.status(500).json({ Error: error.message });
  }
}

export async function deleteCartProducts(req,res){
  try {
      const {idCart} = req.params
      await CartServices.deleteCartProducts(idCart)
      res.status(201).json({
          cart: "Cart eliminado",
          status: STATUS.SUCCES
      })
  } catch (error) {
      res.status(400).json({
          error: error.message,
          status: STATUS.FAIL
      })
  }
}

export async function updateCart(req, res) {
  try {
      const { products } = req.body;
      const { cartID } = req.params;
      const updatedCart = await cartsServices.updateCart(cartID, products);
      if (updatedCart) {
          res.status(200).json({
              success: true,
              message: `Cart ${cartID} updated.`,
              data: updatedCart
          });
      } else {
          res.status(404).json({
              success: false,
              message: `Cart ${cartID} not found.`
          });
      }
  } catch (error) {
      res.status(500).json({ Error: error.message });
  }
}

export async function updateQuantity(req, res) {
  try {
      const { cartID, productID} = req.params;
      const { quantity } = req.body;
      const updatedCart = await cartsServices.updateQuantity(cartID, productID, Number(quantity));
      if (updatedCart) {
          res.status(200).json({
              success: true,
              message: `Product ${productID} quantity updated to ${quantity} in cart ${cartID}`,
              data: updatedCart
          });
      } else {
          res.status(404).json({
              success: false,
              message: `Product ${productID} not found in cart ${cartID}. Or cart ${cartID} not found.`
          });
      }
  } catch (error) {
      res.status(500).json({ Error: error.message });
  }
}