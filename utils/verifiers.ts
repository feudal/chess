import { CellInformation, FIGURE_TYPE } from "../types";
import { getAvailableMoves } from "./figures-moves";

export const checkIfCheck = (cells: CellInformation[], opponentColor: "white" | "black") => {
  const color = opponentColor === "white" ? "black" : "white";
  const opponentKingLocation = cells.find(
    (cell) => cell.figure?.type === FIGURE_TYPE.KING && cell.figure?.color === opponentColor,
  )?.notation;
  if (!opponentKingLocation) return false;

  const figures = cells.filter((cell) => cell.figure?.color === color);
  const availableMoves = figures.map((cell) => getAvailableMoves(cells, cell));

  return availableMoves.some((moves) => moves.some((move) => move === opponentKingLocation));
};
