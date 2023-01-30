import { CartModel } from "../dao/models/cart.models.js";


export async function getCart(){
  try {
      const carts = await CartModel.find({ deletedAt: { $exists: false } }).populate("cart")
      console.log(carts)
      return carts
  }
  catch (error) { throw new Error(error.message) }
}
export async function getCartById(idCart){
  try {
      const cart = await CartModel.findById(idCart).populate("cart")
      return cart
  }
  catch (error) { throw new Error(error.message) }
}

export async function addCart(data){
  try {
      const cart = await CartModel.create(data)
      return cart
  }
  catch (error) { throw new Error(error.message) }
}

export async function updateCart(idCart, data){
  try {
      const updateCart = await CartModel.findById(idCart)
      let productToPush = {
          product:data.product,
          quantity:data.quantity
      }
      updateCart.cart.push(productToPush)
      updateCart.save()
      
      return updateCart

  }
  catch (error) { throw new Error(error.message) }
}