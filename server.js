const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const path = require('path');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {

  console.log(__dirname + '/public');
    
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('A user connected.');

  socket.on('newObject', (data) => {
    // Handle new JSON object here
    console.log('Received new object:', data);
    // Broadcast the new object to all connected clients
    io.emit('newObject', data);
  });

  socket.on('updateObject', (data) => {
    // Handle updated JSON object here
    console.log('Received updated object:', data);
    // Broadcast the updated object to all connected clients
    io.emit('updateObject', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

const port = process.env.PORT || 3333;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
