import { BOARD_CELLS, BOARD_NOTATION } from "app-const";
import { Figure } from "components/Figure";
import { Cell } from "../Cell";

export const Board = () => {
  return (
    <div className="board">
      {Array(64)
        .fill(null)
        .map((_, i) => (
          <Cell
            key={i}
            color={BOARD_CELLS[i % 8][Math.floor(i / 8)]}
            notation={BOARD_NOTATION[i]}
          >
            <Figure type="bishop" color="white" />
          </Cell>
        ))}
    </div>
  );
};
