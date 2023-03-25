import { productModel } from "../../models/models/products.models.js";
/* import ProductsDTO from "./productsDTO.js"; */

class ProductsServices {
  async getProducts(options) {
    try {
      const products = await productModel.paginate({ deleted: false }, options);
      /* const productsDTO = new ProductsDTO(products);
      return productsDTO; */
      return products
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductById(idProduct) {
    try {
      const product = await productModel.findById(idProduct);
      /* const productsDTO = new ProductsDTO(product);
      return productsDTO; */
      return product
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProduct(data) {
    try {
      const product = await productModel.create(data);
      /* const productsDTO = new ProductsDTO(product);
      return productsDTO; */
      return product
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProduct(idProduct, data) {
    try {
      const newProduct = await productModel.findByIdAndUpdate(idProduct, data, {
        new: true,
      });
      /* const productsDTO = new ProductsDTO(newProduct);
      return productsDTO; */
      return newProduct
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProduct(idProduct) {
    try {
      await productModel.delete({ _id: idProduct });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const productsServices = new ProductsServices();
export default productsServices;
