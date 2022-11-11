import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

import { GameContext } from "../../context";
import { Chat as ChatIcon, Send } from "../../svg";
import { makeBEM } from "../../utils";
import { Title } from "../Title";

const bem = makeBEM("chat");

export const Chat = () => {
  const { room, user } = useContext(GameContext);
  const [text, setText] = useState("");

  const handleMessageSend = async () => {
    if (!text || !room || !user) return;

    await axios
      .post(`/api/message`, {
        room: room?._id,
        user,
        text,
      })
      .catch((err) => toast.error(err));

    setText("");
  };

  return (
    <div className={bem()}>
      <Title icon={<ChatIcon />}>Chat</Title>

      <div className={bem("wrapper")}>
        <ul>
          {room?.messages.map((msg, idx) => (
            <li key={idx} className={bem("item")}>
              <span className={bem("time")}>{new Date(msg.createdAt).toLocaleTimeString()} </span>
              <span className={bem("user")}>
                : {msg.user._id === user?._id ? "You" : msg.user.name}:
              </span>
              <span className={bem("message")}>{msg.text}</span>
            </li>
          ))}
        </ul>

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
    </div>
  );
};
