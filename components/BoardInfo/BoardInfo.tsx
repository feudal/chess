import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";

import { Timer } from "..";
import { SO_EVENTS } from "../../app-const";
import { GameContext } from "../../context";
import { Board, Clock } from "../../svg";
import { createNotation, makeBEM } from "../../utils";
import { Players } from "../Players";
import { Title } from "../Title";

const bem = makeBEM("board-info");

export const BoardInfo = () => {
  const { game, setGame, socket } = useContext(GameContext);
  const bottomRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    socket?.on(SO_EVENTS.USER_MOVE, () => {});
  }, [socket]);

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), [game?.notations]);

  // axios.post(`/api/game/${game?._id}`, {
  //   notation: game?.lastMove,
  // });

  return (
    <div className={bem()}>
      <Title icon={<Board />}>Board info</Title>
      <div className={bem("block")}>
        <Title icon={<Clock />}>
          <Timer />
        </Title>

        <Players />
      </div>
      <div className={bem("notation")}>
        <Title>Notation</Title>
        <div className={bem("notation-wrapper")}>
          {game?.notations?.map((notation, index) => (
            <span key={index} className={bem("notation-item")}>
              <span className={bem("notation-order")}>{index + 1}.</span>
              {notation}
            </span>
          ))}
          <span ref={bottomRef}></span>
        </div>
      </div>
    </div>
  );
};
