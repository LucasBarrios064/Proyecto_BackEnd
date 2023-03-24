import { CartModel } from "../../models/models/cart.models.js";
/* import CartDTO from "./cartsDTO.js"; */

class CartServices {
  async getCart() {
    try {
      const carts = await CartModel.find({
        deletedAt: { $exists: false },
      }).populate("products");
      /*       const cartDTO = new CartDTO(carts);
      return cartDTO; */
      return carts;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCartById(idCart) {
    try {
      const cart = await CartModel.findById(idCart).populate("products");
      /*       const cartDTO = new CartDTO(cart);
      return cartDTO; */
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addCart(data) {
    try {
      const cart = await CartModel.create(data);
      /*       const cartDTO = new CartDTO(cart);
      return cartDTO; */
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProductToCart(idCart, idProduct, quantity) {
    try {
      const cart = await CartModel.findById(idCart);
      if (!cart) {
        throw new Error("Cart not found");
      }
      const productIsInCart = cart.products.some((prod) =>
        prod.product.equals(idProduct)
      );

      let updatedCart = {};

      if (productIsInCart) {
        const cart = await CartModel.findOneAndUpdate(
          { _id: idCart, "products.product": idProduct },
          { $inc: { "products.$.quantity": quantity } },
          { new: true }
        ).lean();
        updatedCart = { ...cart };
      } else {
        const cart = await CartModel.findOneAndUpdate(
          { _id: idCart },
          { $push: { products: { product: idProduct, quantity } } },
          { new: true }
        ).lean();
        updatedCart = { ...cart };
      }

      /* const cartDTO = new CartDTO(updatedCart);
      return cartDTO; */
      return updatedCart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteCartProducts(idCart) {
    try {
      const updateCart = await CartModel.findById(idCart);
      updateCart.products = [];
      updateCart.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateCart(idCart, cartData) {
    try {
      const updatedCart = await CartModel.findByIdAndUpdate(
        idCart,
        { products: cartData },
        { new: true }
      );
      /* const cartDTO = new CartDTO(updatedCart);
      return cartDTO; */
      return updatedCart;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async updateQuantity(idCart, idProduct, quantity) {
    try {
      const cart = await CartModel.findByIdAndUpdate(
        idCart,
        { $set: { "products.$[elem].quantity": quantity } },
        { arrayFilters: [{ "elem.product": idProduct }], new: true }
      );
      /* const cartDTO = new CartDTO(cart);
      return cartDTO; */
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async purchase(idCart) {
    try {
    } catch (error) {}
  }
}

const cartsServices = new CartServices();
export default cartsServices;
