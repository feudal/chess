import { useContext } from "react";

import { BOARD_CELLS, BOARD_NOTATION } from "app-const";
import { Figure } from "components/Figure";
import { GameContext } from "context";

import { Cell } from "../Cell";
import { FigureColor, FigureType } from "types";

export const Board = () => {
  const game = useContext(GameContext);

  return (
    <div className="board">
      {Array(64)
        .fill(null)
        .map((_, i) => {
          const [type, color] =
            game?.figurePositions?.[BOARD_NOTATION[i]]?.split("-") || [];

          return (
            <Cell
              key={i}
              color={BOARD_CELLS[i % 8][Math.floor(i / 8)]}
              notation={BOARD_NOTATION[i]}
            >
              {type && (
                <Figure
                  type={type as FigureType}
                  color={color as FigureColor}
                />
              )}
            </Cell>
          );
        })}
    </div>
  );
};
