import { NextApiRequest } from "next";
import { Server } from "Socket.IO";

import { SO_EVENTS } from "../../app-const";

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
    });
  }
  res.end();
};

export default SocketHandler;
