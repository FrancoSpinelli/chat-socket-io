const socket = io();


// DOM elements
let message = document.querySelector('#message');
let username = document.querySelector('#username');
let btn = document.querySelector('#send');
let output = document.querySelector('#output');
let actions = document.querySelector('#actions');


// Emit events
btn.addEventListener('click', function () {
    let date = new Date().getHours() + ':' + new Date().getMinutes();
    let newMesage = {
        username: username.value,
        message: message.value,
        date: date
    };
    
    socket.emit('newMessage', newMesage);
});

message.addEventListener('keypress', function () {
    let userName = username.value;
    socket.emit('typing', userName);
});


// Listen for events
socket.on('newMessage', (data) => {
    actions.innerHTML = '';
    message.value = '';
    message.focus();
    output.innerHTML += `<p>${data.date} - <strong>${data.username}</strong>: ${data.message}</p>`;
});

socket.on('typing', (data) => {
    actions.innerHTML = `<p><i class="fa-solid fa-comment-dots"></i> <em>${data} is typing a message...</em></p>`;
});