import { useContext } from "react";
import { GameContext } from "../../context";

import { Cell } from "../Cell";
import { Figure } from "../Figure";

export const Board = () => {
  const { cellsInformation, move } = useContext(GameContext);

  return (
    <div className="board">
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
