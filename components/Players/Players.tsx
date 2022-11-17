import { useContext, useEffect, useState } from "react";

import { SO_EVENTS } from "../../app-const";
import { GameContext } from "../../context";
import { makeBEM } from "../../utils";
import { Modal, Title } from "..";

const bem = makeBEM("players");

export const Players = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { socket, whiteTurn } = useContext(GameContext);

  useEffect(() => {
    socket?.on(SO_EVENTS.INITIATE_GAME, (fromUser, toUser) => {
      setModalIsOpen(true);
      // socket?.emit(SO_EVENTS.INITIATE_GAME, fromUser, toUser);
    });
  }, [socket]);

  const handleGameStart = () => {
    setModalIsOpen(false);
    socket?.emit(SO_EVENTS.GAME_STARTED);
  };

  return (
    <>
      <div className="players">
        <Title icon={<div className={bem("square", { black: !whiteTurn })}></div>}>{`${
          whiteTurn ? "White" : "Black"
        } turn`}</Title>
      </div>

      <Modal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onAccept={() => handleGameStart()}
        title="Game start"
      >
        Game will start in 10 seconds
      </Modal>
    </>
  );
};
