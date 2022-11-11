import React, { useContext } from "react";
import { Timer } from "..";
import { GameContext } from "../../context";
import { Board, Clock, King } from "../../svg";
import { makeBEM } from "../../utils";
import { Title } from "../Title";

const bem = makeBEM("board-info");

export const BoardInfo = () => {
  const { gameStatus, whiteTurn } = useContext(GameContext);

  return (
    <div className={bem()}>
      <Title icon={<Board />}>Board info</Title>
      <div className={bem("block")}>
        <Title icon={<Clock />}>
          <Timer status={gameStatus} />
        </Title>

        <Title icon={<div className={bem("square", { black: !whiteTurn })}></div>}>{`${
          whiteTurn ? "White" : "Black"
        } turn`}</Title>
      </div>
    </div>
  );
};
