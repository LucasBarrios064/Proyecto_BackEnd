import { productModel } from "../dao/models/products.models.js";

export async function getProducts(){
    try {
        const products = await productModel.find({ deletedAt: { $exists: false } })
        return products
    }
    catch (error) { throw new Error(error.message) }
}

export async function getProductById(idProduct){
    try {
        const product = await productModel.findById(idProduct)
        return product
    }
    catch (error) { throw new Error(error.message) }
}

export async function addProduct(data){
    try {
        const product = await productModel.create(data)
        return product
    }
    catch (error) { throw new Error(error.message) }
}

export async function updateProduct(idProduct,data){
    try {
        const updateProduct = await productModel.findByIdAndUpdate(idProduct, data, {new:true})
        return updateProduct
    }
    catch (error) { throw new Error(error.message) }
}

export async function deleteProduct(idProduct){
    try {
        await productModel.delete({_id: idProduct})
    }
    catch (error) { throw new Error(error.message) }
}