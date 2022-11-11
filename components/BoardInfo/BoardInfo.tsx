import React, { useContext } from "react";
import { Timer } from "..";
import { GameContext } from "../../context";
import { Board, Clock } from "../../svg";
import { Title } from "../Title";

export const BoardInfo = () => {
  const { gameStatus } = useContext(GameContext);

  return (
    <div className="board-info">
      <Title icon={<Board />}>Board info</Title>
      <Title icon={<Clock />}>
        <Timer status={gameStatus} />
      </Title>
    </div>
  );
};
