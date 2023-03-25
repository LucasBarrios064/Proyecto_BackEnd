import ProductDTO from "./productsDTO.js";

export class ProductRepository {

    constructor(dao){
        this.dao = dao
    }

    async getProducts(options){
        const products = await this.dao.getProducts(options)
        const productDTO = new ProductDTO(products)
        return productDTO
    }  

    async getProductById(idProduct){
        const products = await this.dao.getProductById(idProduct)
        const productDTO = new ProductDTO(products)
        return productDTO
    }

    async addProduct(data){
        const products = await this.dao.addProduct(data)
        const productDTO = new ProductDTO(products)
        return productDTO
    }

    async updateProduct(idProduct,data){
        const products = await this.dao.updateProduct(idProduct,data)
        const productDTO = new ProductDTO(products)
        return productDTO
    }

    async deleteProduct(idProduct){
        const products = await this.dao.deleteProduct(idProduct)
        const productDTO = new ProductDTO(products)
        return productDTO
    }    


}