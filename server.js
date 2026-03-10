// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // allow all origins (for testing)
  }
});

const PORT = 3000;

// Serve static files if needed
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for chat messages
  socket.on('chat message', (msg) => {
    console.log('Message:', msg);
    // Broadcast the message to all clients
    io.emit('chat message', msg);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});