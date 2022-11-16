import { NextApiRequest } from "next";
import { Server } from "Socket.IO";

import { SO_EVENTS } from "../../app-const";

const socketAndUserIds: { [name: string]: string } = {};

const SocketHandler = (req: NextApiRequest, res: any) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("socket with id - " + socket.id + " connected");
      socket.on(SO_EVENTS.USER_CHANGED, () => {
        socket.broadcast.emit(SO_EVENTS.USER_CHANGED);
      });

      socket.on(SO_EVENTS.MESSAGE_SENT, (room_id) => {
        console.log("message sent in room - " + room_id);
        io.in(room_id).emit(SO_EVENTS.MESSAGE_RECEIVED);
      });

      socket.on(SO_EVENTS.JOIN_ROOM, (room_id) => {
        console.log("joining room - " + room_id);
        socket.join(room_id);
      });

      socket.on(SO_EVENTS.LOGIN, (userId?: string) => {
        console.log("user logged in - " + userId);
        if (userId) {
          socketAndUserIds[socket.id] = userId;
          io.emit(SO_EVENTS.USERS_ONLINE, Object.values(socketAndUserIds));
        }
      });
      socket.on("disconnect", () => {
        console.log("socket with id - " + socket.id + " disconnected");
        delete socketAndUserIds[socket.id];
        socket.broadcast.emit(SO_EVENTS.USERS_ONLINE, Object.values(socketAndUserIds));
      });
    });
  }
  res.end();
};

export default SocketHandler;
