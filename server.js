const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", socket => {
  console.log("User connected:", socket.id);

  socket.on("join-room", room => {
    socket.join(room);
  });

  // Receive audio data and broadcast to room
  socket.on("voice", ({ room, audioChunk }) => {
    socket.to(room).emit("voice", audioChunk);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => console.log("Server running on port 3000"));