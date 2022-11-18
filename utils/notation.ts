import {
  BLACK_FIGURE_TYPE_NOTATION,
  CellInformation,
  FIGURE_TYPE,
  WHITE_FIGURE_TYPE_NOTATION,
} from "../types";

export const createNotation = (
  isWhiteTurn?: boolean,
  firstCell?: CellInformation,
  nextCell?: CellInformation,
  isCheck?: boolean,
) => {
  const figureNotation = isWhiteTurn
    ? WHITE_FIGURE_TYPE_NOTATION[firstCell?.figure?.type || FIGURE_TYPE.PAWN]
    : BLACK_FIGURE_TYPE_NOTATION[firstCell?.figure?.type || FIGURE_TYPE.PAWN];
  const isEaten = nextCell?.figure ? ":" : "-";
  const isCheckNotation = isCheck ? "+" : "";

  return `${figureNotation}${firstCell?.notation}${isEaten}${nextCell?.notation}${isCheckNotation}`;
};
