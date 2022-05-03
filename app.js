const express = require('express');
const path = require('path');
const app = express();

const SocketIO = require('socket.io');

// Server running
const server = app.listen(process.env.PORT || 3000, () => console.log('Server is running...'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.sendFile('index.html'));


// Socket.io server
const io = SocketIO(server);

// Listen for connection and emit events
io.on('connection', (socket) => {
    console.log(`New user connected: ${socket.id}`);
    socket.on('disconnect', () => console.log(`User disconnected: ${socket.id}`));

    socket.on('newMessage', (data) => {
        io.sockets.emit('newMessage', data);
    })
    
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
});