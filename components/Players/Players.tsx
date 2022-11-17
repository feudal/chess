import { useContext, useEffect, useState } from "react";

import { SO_EVENTS } from "../../app-const";
import { GameContext } from "../../context";
import { makeBEM } from "../../utils";
import { Modal, Title } from "..";
import { Game, GameStatusEnum } from "../../types";

const bem = makeBEM("players");

export const Players = () => {
  const { socket, whiteTurn, setGameStatus } = useContext(GameContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [time, setTime] = useState(5);
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    socket?.on(SO_EVENTS.GAME_STARTED, (game) => {
      setModalIsOpen(true);
      setGame(game);
      setGameStatus(GameStatusEnum.PLAYING);

      console.log({ game });
    });
  }, [socket]);

  useEffect(() => {
    if (time > 0) {
      setTimeout(() => setTime(time - 1), 1000);
    } else {
      setModalIsOpen(false);
      setTime(5);
    }
  }, [time]);

  return (
    <>
      <div className="players">
        <Title icon={<div className={bem("square", { black: !whiteTurn })}></div>}>{`${
          whiteTurn ? game?.white.name ?? "White" : game?.black.name ?? "Black"
        } turn`}</Title>
      </div>

      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)} title="Game">
        Game will start in {time} seconds
      </Modal>
    </>
  );
};
