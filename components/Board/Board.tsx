import { useContext } from "react";
import { GameContext } from "../../context";
import { makeBEM } from "../../utils";

import { Cell } from "../Cell";
import { Figure } from "../Figure";

const bem = makeBEM("board");

export const Board = () => {
  const { cellsInformation, move, whiteTurn, game, user } = useContext(GameContext);
  const isUserTurn = whiteTurn
    ? game?.white?.name === user?.name
    : game?.black?.name === user?.name;

  const playerColor = game?.white?.name === user?.name ? "white" : "black";

  return (
    <div
      className={bem(null, {
        inactive: !isUserTurn,
        "is-turned": playerColor === "black",
      })}
    >
      {Array(64)
        .fill(null)
        .map((_, i) => (
          <Cell
            key={i}
            color={cellsInformation[i].color}
            onClick={() => move(cellsInformation[i])}
            notation={cellsInformation[i].notation}
            state={cellsInformation[i].state}
          >
            {cellsInformation[i]?.figure && (
              <Figure
                type={cellsInformation[i].figure!.type}
                color={cellsInformation[i].figure?.color}
              />
            )}
          </Cell>
        ))}
    </div>
  );
};
