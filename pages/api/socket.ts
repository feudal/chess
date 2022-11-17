import { NextApiRequest } from "next";
import { Server } from "Socket.IO";

import { SO_EVENTS } from "../../app-const";
import { Game } from "../../models";
import { db } from "../../utils";

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
          socketAndUserIds[userId] = socket.id;
          io.emit(SO_EVENTS.USERS_ONLINE, Object.keys(socketAndUserIds));
        }
      });
      socket.on("disconnect", () => {
        console.log("socket with id - " + socket.id + " disconnected");
        const userId = Object.keys(socketAndUserIds).find(
          (key) => socketAndUserIds[key] === socket.id,
        );
        if (userId) {
          delete socketAndUserIds[userId];
          io.emit(SO_EVENTS.USERS_ONLINE, Object.keys(socketAndUserIds));
        }
      });

      socket.on(SO_EVENTS.INVITE_SENT, (fromUser, toUser) => {
        console.log("invite sent to user - " + toUser?._id);
        const socketId = Object.entries(socketAndUserIds)
          .find(([key, value]) => key === toUser?._id)
          ?.pop();
        if (socketId) io.in(socketId).emit(SO_EVENTS.INVITE_RECEIVED, fromUser);
      });

      socket.on(SO_EVENTS.INITIATE_GAME, async (fromUser, toUser) => {
        console.log("game initiated to user - " + toUser?._id);

        await db.connect();
        const game = await Game.create({
          white: fromUser,
          black: toUser,
          notation: "start",
        });
        await game.save();
        await game.populate("white");
        await game.populate("black");
        await db.disconnect();

        // * get players sockets id join them to the game room and emit the game id
        const socketsId = Object.entries(socketAndUserIds)
          .filter(([key, value]) => key === fromUser?._id || key === toUser?._id)
          .map(([, value]) => value);
        socketsId.forEach((socketId) => {
          socket.join(game._id);
          io.in(socketId).emit(SO_EVENTS.GAME_STARTED, game);
        });
      });
    });
  }
  res.end();
};

export default SocketHandler;
