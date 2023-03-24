import factory from "../services/factory.js";
import { STATUS } from "../constants/constants.js";

export async function getCart(req, res) {
  try {
    const response = await factory.cart.getCart();
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
    const response = await factory.cart.getCartById(idCart);
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
    const newCart = await factory.cart.addCart(cartData);
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
        message: `Invalid quantity. Must be a positive integer.`,
      });
    }

    const cart = await factory.cart.addProductToCart(
      cartID,
      productID,
      Number(quantity)
    );
    if (cart) {
      res.status(200).json({
        success: true,
        message: `Product ${productID} added to cart ${cart._id}`,
        data: cart,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Product ${productID} not found.`,
      });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
}

export async function deleteCartProducts(req, res) {
  try {
    const { idCart } = req.params;
    await factory.cart.deleteCartProducts(idCart);
    res.status(201).json({
      cart: "Cart eliminado",
      status: STATUS.SUCCES,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}

export async function updateCart(req, res) {
  try {
    const { products } = req.body;
    const { cartID } = req.params;
    const updatedCart = await factory.cart.updateCart(cartID, products);
    if (updatedCart) {
      res.status(200).json({
        success: STATUS.SUCCES,
        message: `Cart ${cartID} updated.`,
        data: updatedCart,
      });
    } else {
      res.status(404).json({
        success: STATUS.FAIL,
        message: `Cart ${cartID} not found.`,
      });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
}

export async function updateQuantity(req, res) {
  try {
    const { cartID, productID } = req.params;
    const { quantity } = req.body;
    const updatedCart = await factory.cart.updateQuantity(
      cartID,
      productID,
      Number(quantity)
    );
    if (updatedCart) {
      res.status(200).json({
        success: STATUS.SUCCES,
        message: `Product ${productID} quantity updated to ${quantity} in cart ${cartID}`,
        data: updatedCart,
      });
    } else {
      res.status(404).json({
        success: STATUS.FAIL,
        message: `Product ${productID} not found in cart ${cartID}. Or cart ${cartID} not found.`,
      });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
}

export async function purchase(req, res) {
  try {
    const { cartID } = req.params;
    const cart = await factory.cart.purchase(cartID);
    if(cart){
      res.status(200).json({
        success: STATUS.SUCCES,
        message: `Compra Finalizada: ${cart}`,
        data: cart,
      });
    
    }
    else {
      res.status(404).json({
        success: STATUS.FAIL,
        message: `Ocurrio un error en su compra`,
      });
    }
  } catch {
    res.status(500).json({ Error: error.message });
  }
}
