import { useContext, useState } from "react";

import { Figure } from "components/Figure";
import { GameContext } from "context";
import { Cell } from "../Cell";

export const Board = () => {
  // const [selectedCell, setSelectedCell] = useState("");
  const { cellInformation } = useContext(GameContext);

  return (
    <div className="board">
      {Array(64)
        .fill(null)
        .map((_, i) => {
          return (
            <Cell
              key={i}
              color={cellInformation[i].color}
              // onClick={() => isActive && setSelectedCell(BOARD_NOTATION[i])}
              notation={cellInformation[i].notation}
              state={cellInformation[i].state}
            >
              {cellInformation[i]?.figure && (
                <Figure
                  type={cellInformation[i].figure!.type}
                  color={cellInformation[i].figure!.color}
                />
              )}
            </Cell>
          );
        })}
    </div>
  );
};
