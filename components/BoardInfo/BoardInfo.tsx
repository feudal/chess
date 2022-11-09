import React from "react";
import { Board, Clock } from "../../svg";
import { Title } from "../Title";

export const BoardInfo = () => {
  return (
    <div className="board-info">
      <Title icon={<Board />}>Board info</Title>
      <Clock />
    </div>
  );
};
