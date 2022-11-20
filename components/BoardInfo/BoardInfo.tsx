import React, { useContext, useEffect, useRef } from "react";

import { Timer } from "..";
import { LOCAL_STORAGE, SO_EVENTS } from "../../app-const";
import { GameContext } from "../../context";
import { Board, Clock } from "../../svg";
import { makeBEM } from "../../utils";
import { Players } from "../Players";
import { Title } from "../Title";

const bem = makeBEM("board-info");

export const BoardInfo = () => {
  const { game, setGame, socket } = useContext(GameContext);
  const bottomRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    socket?.emit(SO_EVENTS.JOIN_GAME, game?._id);
    socket?.on(SO_EVENTS.GAME_UPDATED, (game) => {
      setGame(game);
      localStorage.setItem(LOCAL_STORAGE.GAME, JSON.stringify(game));
    });
  }, [socket]);

  useEffect(() => {
    socket?.emit(SO_EVENTS.JOIN_GAME, game?._id);
  }, [game?._id]);

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), [game?.notation]);

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
          {game?.notation?.split(",")?.map((item, index) => {
            if (!index) return null;
            const numeration = `${index % 2 ? Math.ceil(index / 2) : ""}`;
            return (
              <span key={index} className={bem("notation-item")}>
                <span className={bem("notation-order")}>{numeration && `${numeration}.`}</span>
                {item}
              </span>
            );
          })}
          <span ref={bottomRef}></span>
        </div>
      </div>
    </div>
  );
};
