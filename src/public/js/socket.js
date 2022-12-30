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