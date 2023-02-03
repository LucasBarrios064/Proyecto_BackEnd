const socket = io();

socket.on("listChange", (data) => {
    updateList(data);
})

const listProducts = document.getElementById("list-products");

const updateList = (list) => {
    listProducts.innerHTML = "";
    list.forEach((item )=> {
        const newProduct = document.createElement("li")
        newProduct.innerHTML = `
        <h3>${item.title}</h3>
          <p>Id: ${item.id} </p>
          <p>Description: ${item.description}} </p>
          <p>Code: ${item.code}</p>
          <p>Price: $${item.price} </p>
          <p>Status: ${item.status} </p>
          <p>Category: ${item.category} </p>
          <p>Thumbnail: ${item.thumbnail} </p>
        `
        listProducts.appendChild(newProduct)
    });
}

socket.on("ServerSendProducts", (enviarProducto)=>{
    let productos = enviarProducto
    console.log("Productos recibidos del server: ", productos)
    productosRenderDiv.innerHTML = ""
    productos.docs.forEach(productos => {
        let productoUl = document.createElement("ul")
        productoUl.innerHTML = 
        `${productos.title}
            <li>Id: ${productos._id}</li>
            <li>Description: ${productos.description}</li>
            <li>Code: ${productos.code}</li>
            <li>Price: $${productos.price}</li>
            <li>Status: ${productos.status}</li>
            <li>Stock: ${productos.stock}</li>
            <li>Category: ${productos.category}</li>
            <li>Thumbnail: ${productos.thumbnail}</li>
            <button>Add to cart</button>
        `
        productosRenderDiv.appendChild(productoUl)
    });
    
})