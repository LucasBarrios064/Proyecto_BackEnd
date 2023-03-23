import CartDTO from "./cartsDTO.js";

export class CartRepository {
    
    constructor(dao){
        this.dao = dao
    }

    async getCart(){
        const cart = await this.dao.getCart()
        const cartDTO = new CartDTO(cart)
        return cartDTO
    }

    async getCartById(idCart){
        const cart = await this.dao.getCartById(idCart)
        const cartDTO = new CartDTO(cart)
        return cartDTO
    }

    async addCart(data){
        const cart = await this.dao.addCart(data)
        const cartDTO = new CartDTO(cart)
        return cartDTO
    }

    async addProductToCart(idCart, idProduct, quantity){
        const cart = await this.dao.addProductToCart(idCart, idProduct, quantity)
        const cartDTO = new CartDTO(cart)
        return cartDTO
    }
    
    
    async deleteCartProducts(idCart){
        const cart = await this.dao.deleteCartProducts(idCart)
        const cartDTO = new CartDTO(cart)
        return cartDTO
    }


    async updateCart(idCart, cartData){
        const cart = await this.dao.updateCart(idCart,cartData)
        const cartDTO = new CartDTO(cart)
        return cartDTO
    }

    async updateQuantity(idCart, idProduct, quantity){
        const cart = await this.dao.updateQuantity(idCart, idProduct, quantity)
        const cartDTO = new CartDTO(cart)
        return cartDTO
    }
}