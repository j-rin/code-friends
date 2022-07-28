const socket = io()
let name;
let unique;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Please enter your name: ')
    unique = prompt('Please enter your room id: ')

} while(!name)
let uuid={
    room:unique
}
socket.emit('chat',uuid )

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendChat(e.target.value)
    }
})

function sendChat(message) {
    let msg = {
        room:unique,
        user: name,
        message: message.trim()
    }
    // Append 
    appendChat(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('chat', msg)

}

function appendChat(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('chat', (msg) => {
    appendChat(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}



