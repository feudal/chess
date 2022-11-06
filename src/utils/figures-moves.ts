import { CellInformation } from "types";

export const getPawnAvailableMoves = (cellsInfo: CellInformation[], cell: CellInformation) => {
  const availableMoves: string[] = [];
  const figureColor = cell.figure?.color;

  if (figureColor === "white") {
    // * 1. Check if there is a figure in front of the pawn
    if (!cell.up(cellsInfo)?.figure) {
      availableMoves.push(cell.up(cellsInfo)!.notation);
    }
    // * 2. Check if in the first move the pawn can move 2 cells
    if (cell.notation[0] === "2" && !cell.up(cellsInfo)?.figure && !cell.up(cellsInfo, 2)?.figure) {
      availableMoves.push(cell.up(cellsInfo, 2)!.notation);
    }
    // * 3. Check if there is a figure in front of the pawn and on the left or right
    if (cell.upLeft(cellsInfo)?.figure?.color === "black") {
      availableMoves.push(cell.upLeft(cellsInfo)!.notation);
    }
    if (cell.upRight(cellsInfo)?.figure?.color === "black") {
      availableMoves.push(cell.upRight(cellsInfo)!.notation);
    }
  } else {
    // * for black
    if (!cell.down(cellsInfo)?.figure) {
      availableMoves.push(cell.down(cellsInfo)!.notation);
    }
    if (
      cell.notation[0] === "7" &&
      !cell.down(cellsInfo)?.figure &&
      !cell.down(cellsInfo, 2)?.figure
    ) {
      availableMoves.push(cell.down(cellsInfo, 2)!.notation);
    }
    if (cell.downLeft(cellsInfo)?.figure?.color === "white") {
      availableMoves.push(cell.downLeft(cellsInfo)!.notation);
    }
    if (cell.downRight(cellsInfo)?.figure?.color === "white") {
      availableMoves.push(cell.downRight(cellsInfo)!.notation);
    }
  }

  return availableMoves;
};
