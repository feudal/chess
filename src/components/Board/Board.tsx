import { useContext, useMemo } from "react";

import { Figure } from "components";
import { GameContext } from "context";

import { Cell } from "../Cell";

export const Board = () => {
  const { cellsInformation, move } = useContext(GameContext);

  return (
    <div className="board">
      {Array(64)
        .fill(null)
        .map((_, i) =>
          useMemo(
            () => (
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
            ),
            [cellsInformation[i]],
          ),
        )}
    </div>
  );
};
