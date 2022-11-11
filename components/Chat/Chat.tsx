import { DefaultEventsMap } from "@socket.io/component-emitter";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { io, Socket } from "Socket.IO-client";
import { SO_EVENTS } from "../../app-const";

import { GameContext } from "../../context";
import { Chat as ChatIcon, Send } from "../../svg";
import { Room } from "../../types";
import { makeBEM } from "../../utils";
import { Title } from "../Title";

const bem = makeBEM("chat");
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export const Chat = () => {
  const bottomRef = useRef<HTMLLIElement>(null);
  const { room, setRoom, user } = useContext(GameContext);
  const [text, setText] = useState("");
  const [needUpdate, setNeedUpdate] = useState(false);

  const socketInitializer = async () => {
    await axios("/api/socket");
    socket = io();

    socket.on("connect", () => console.log("chat connected"));
    socket.on(SO_EVENTS.MESSAGE_SENT, () => setNeedUpdate(true));
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  useEffect(() => {
    const getRoom = async () => {
      const { data } = await axios<Room>(`/api/room/${room?.name}`);
      setRoom(data);
    };
    getRoom();

    setNeedUpdate(false);
  }, [needUpdate]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [room]);

  const handleMessageSend = async () => {
    if (!text || !room || !user) return;

    await axios
      .post(`/api/message`, {
        room: room?._id,
        user,
        text,
      })
      .then(() => {
        socket.emit(SO_EVENTS.MESSAGE_SENT, room?._id);
      })
      .catch((err) => toast.error(err));

    setText("");
  };

  return (
    <div className={bem()}>
      <Title icon={<ChatIcon />}>Chat</Title>

      <div className={bem("wrapper")}>
        <ul className={bem("list")}>
          {room?.messages.map((msg, idx) => (
            <li key={idx} className={bem("item")}>
              <span className={bem("time")}>{new Date(msg.createdAt).toLocaleTimeString()}: </span>
              <span className={bem("user")}>
                {msg.user._id === user?._id ? "You" : msg.user.name}:
              </span>
              <span className={bem("message")}>{msg.text}</span>
            </li>
          ))}
          <li ref={bottomRef}></li>
        </ul>
      </div>

      <div className={bem("input")}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleMessageSend()}
        />
        <Send className={bem("button")} onClick={handleMessageSend} />
        <div className={bem("emoji")} onClick={() => setText((prev) => prev + "👍")}>
          👍
        </div>
      </div>
    </div>
  );
};
