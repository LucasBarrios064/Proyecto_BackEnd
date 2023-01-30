const socket = io()

const cartRenderDiv = document.getElementById("cartRenderDiv")


socket.on("ServerSendCarts", (carts)=>{
    let cart = carts
    console.log(cart)
})