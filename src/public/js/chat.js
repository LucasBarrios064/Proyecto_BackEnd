const socket = io()
let messageRender = document.getElementById("messageRender")
let sumbitButton = document.getElementById("sumbitEmail")
let inputEmail = document.getElementById("inputEmail")
let messageInput = document.getElementById("inputMessage")




 sumbitButton.addEventListener("click", (e)=>{
    e.preventDefault()
    let emailUser = inputEmail.value
    let messageText = messageInput.value
    let Message = {
        email: emailUser,
        message: messageText
      }
    socket.emit("addMessage", Message)

    messageInput.value = ""
})


socket.on("ServerSendMessages", (msg)=>{
    let messages = msg
    messageRender.innerHTML = ""
    messages.forEach(message => {
        let line = document.createElement("p")
        line.innerHTML = `
        <strong>${message.email}</strong>: ${message.message} <br>
        `
        messageRender.appendChild(line)
    });  

}) 