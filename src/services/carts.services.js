import { CartModel } from "../dao/models/cart.models.js";

export async function getCart() {
  try {
    const carts = await CartModel.find({
      deletedAt: { $exists: false },
    }).populate("products");
    console.log(carts);
    return carts;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function getCartById(idCart) {
  try {
    const cart = await CartModel.findById(idCart).populate("products.product");
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

export async function addProductToCart(idCart, idProduct, quantity) {
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

    return updatedCart;
  } catch (error) {
    throw new Error(error.message);
  }
}


export async function deleteCartProducts(idCart){
  try {
      const updateCart = await CartModel.findById(idCart)
      updateCart.products = []
      updateCart.save()
  }
  catch (error) { throw new Error(error.message) }
}


export async function updateCart(idCart, cartData) {
  try {
      const updatedCart = await CartModel.findByIdAndUpdate(idCart, { products: cartData }, { new: true });
      return updatedCart;
  } catch (error) {
      throw new Error(error.message);
  }
}

export async function updateQuantity(idCart, idProduct, quantity) {
  try {
      const cart = await CartModel.findByIdAndUpdate(
          idCart,
          { $set: {'products.$[elem].quantity': quantity } },
          { arrayFilters: [{ 'elem.product': idProduct }], new: true }
      )
      return cart                
  } catch (error) {
      throw new Error(error.message);
  }
}