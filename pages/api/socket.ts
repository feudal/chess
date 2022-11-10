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
      console.log("server connected");
      socket.on(SO_EVENTS.USER_CHANGED, () => {
        socket.broadcast.emit(SO_EVENTS.USER_CHANGED);
      });
    });
  }
  res.end();
};

export default SocketHandler;
