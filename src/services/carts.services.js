import { CartModel } from "../dao/models/cart.models.js";

export async function getCart() {
  try {
    const cart = await CartModel.find({ deletedAt: { $exists: false } });
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCartById(idCart) {
  try {
    const cart = await CartModel.findById(idCart);
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addCart(data) {
  try {
    const cart = await CartModel.create(data);
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateCart(idCart, data) {
  try {
    const newCart = await CartModel.findByIdAndUpdate(idCart, data, {
      new: true,
    });
    return newCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteCart(idCart) {
  try {
    await CartModel.delete({ _id: idCart });
  } catch (error) {
    throw new Error(error.message);
  }
}
