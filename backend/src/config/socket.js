import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

const socketUserMap = {};
export const getActiveSocketId = (userId) => {
  return socketUserMap[userId];
};
io.on("connection", (socket) => {
  console.log("A user Connected:", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) socketUserMap[userId] = socket.id;

  io.emit("getAllOnlineUsers", Object.keys(socketUserMap));

  socket.on("disconnect", () => {
    console.log("server disconnected:", socket.id);
    delete socketUserMap[userId];
    io.emit("getAllOnlineUsers", Object.keys(socketUserMap));
  });
});

export { io, server, app };
