import { BOARD_CELLS, BOARD_NOTATION } from "app-const";
import { Cell } from "../Cell";

export const Board = () => {
  return (
    <div className="board">
      {Array(64)
        .fill(null)
        .map((_, i) => (
          <Cell key={i} color={BOARD_CELLS[i % 8][Math.floor(i / 8)]}>
            {BOARD_NOTATION[i]}
          </Cell>
        ))}
    </div>
  );
};
