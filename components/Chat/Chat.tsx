import React from "react";
import { Chat as ChatIcon } from "../../svg";
import { Title } from "../Title";

export const Chat = () => {
  return (
    <div className="chat">
      <Title icon={<ChatIcon />}>Chat</Title>
    </div>
  );
};
