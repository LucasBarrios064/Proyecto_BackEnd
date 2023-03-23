import { Router } from "express";
import { STATUS } from "../constants/constants.js";
import * as ProductServices from "../services/productsDAO/products.services.js"
/* import ProductManager from "../ProductManager.js"; 

const productManager3 = new ProductManager()  */


/*
 viewsRouter.get("/", (req, res) => {
  let productsList = productManager3.getProducts()
  let productosRender = productsList;
  res.render("home",{productosRender});
});
*/
const viewsRouter = Router();

viewsRouter.get("/", (req,res)=>{
  res.render("login")
})

viewsRouter.get("/register", (req,res)=>{
  res.render("register")
})


viewsRouter.get("/realtimeproducts", async (req, res) => {
  const {limit,page} = req.query
  const userLogged = req.session.userLogged
    
  let limitQuery = parseInt(limit)
  let pageQuery = parseInt(page)
  
  if(!limit){limitQuery=10}
  if(!page){pageQuery=1}
  
  let options = {
      page: pageQuery,
      limit: limitQuery,
      lean: true
  }
  try {
      console.log(options.page, options.limit)
      const response = await ProductServices.getProducts(options)
      
      res.render("realTimeProducts", {userLogged, ...response });
      
  } catch (error) {
      res.status(400).json({
          error: error.message,
          status: STATUS.FAIL
      })
  }
  
})


viewsRouter.get("/chat", (req, res) => {
  console.log("views router esta funcionando");

  res.render("chat");
});

export default viewsRouter;

