import React, { useContext, useEffect, useState } from "react";

import { Chat as ChatIcon, Send } from "../../svg";
import { Message } from "../../types";
import { makeBEM } from "../../utils";
import { Title } from "../Title";

const bem = makeBEM("chat");

export const Chat = () => {
  const [text, setText] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  return (
    <div className={bem()}>
      <Title icon={<ChatIcon />}>Chat</Title>

      <div className={bem("wrapper")}>
        <ul>
          {chatMessages.map((chatMessage) => (
            <li key={chatMessage.time} className={bem("item")}>
              <span className={bem("time")}>{chatMessage.time}--</span>
              <span className={bem("user")}>{chatMessage.user.name}:</span>
              <span className={bem("message")}>{chatMessage.text}</span>
            </li>
          ))}
        </ul>

        <div className={bem("input")}>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
          <Send className={bem("button")} onClick={() => {}} />

          <div
            className={bem("emoji")}
            onClick={() => {
              setText((prev) => prev + "👍");
            }}
          >
            👍
          </div>
        </div>
      </div>
    </div>
  );
};
