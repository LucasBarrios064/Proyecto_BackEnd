import * as CartServices from "../services/carts.services.js";
import { STATUS } from "../constants/constants.js";

export async function getCart(req, res) {
  try {
    const response = await CartServices.getCart();
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
    const { body } = req;
    const response = await CartServices.addCart(body);
    res.status(201).json({
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

export async function updateCart(req, res) {
  try {
    const { idCart } = req.params;
    const { body } = req;
    const response = await CartServices.updateCart(idCart, body);
    res.status(201).json({
      cart: response,
      status: STATUS.SUCCES,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}

export async function deleteCart(req, res) {
  try {
    const { idCart } = req.params;
    await CartServices.deleteCart(idCart);
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
