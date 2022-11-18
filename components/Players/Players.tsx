import { useContext, useEffect, useState } from "react";

import { LOCAL_STORAGE, SO_EVENTS } from "../../app-const";
import { GameContext } from "../../context";
import { makeBEM } from "../../utils";
import { Modal, Title } from "..";
import axios from "axios";

const move = (game_id: string, notation: string) =>
  axios.post(`api/game/${game_id}`, { notation }).then((res) => {
    console.log(res.data);
  });

const bem = makeBEM("players");

export const Players = () => {
  const { socket, game, setGame, user } = useContext(GameContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [time, setTime] = useState(5);

  const whoseTurn = game?.isWhiteTurn ? game?.white?.name ?? "White" : game?.black?.name ?? "Black";

  useEffect(() => {
    socket?.on(SO_EVENTS.GAME_STARTED, (game) => {
      setModalIsOpen(true);
      setGame(game);
      localStorage.setItem(LOCAL_STORAGE.GAME, JSON.stringify(game));
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

  useEffect(() => {
    setGame(JSON.parse(localStorage.getItem(LOCAL_STORAGE.GAME) || "null"));
  }, []);

  return (
    <>
      <div className="players">
        <Title icon={<div className={bem("square", { black: !game?.isWhiteTurn })}></div>}>{`${
          whoseTurn === user?.name ? "Your" : whoseTurn
        } turn`}</Title>
      </div>

      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)} title="Game">
        Game will start in {time} seconds
      </Modal>
    </>
  );
};
