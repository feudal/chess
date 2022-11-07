import { CellInformation, FIGURE_TYPE } from "types";

const getPawnAvailableMoves = (cellsInfo: CellInformation[], cell: CellInformation) => {
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

const getRookAvailableMoves = (cellsInfo: CellInformation[], cell: CellInformation) => {
  const availableMoves: string[] = [];
  const figureColor = cell.figure?.color;

  // * 1. Check if there is a figure in front of the rook
  let currentCell = cell.up(cellsInfo);
  while (currentCell && !currentCell.figure) {
    availableMoves.push(currentCell.notation);
    currentCell = currentCell.up(cellsInfo);
  }
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  // * 2. Check if there is a figure on the right of the rook
  currentCell = cell.right(cellsInfo);
  while (currentCell && !currentCell.figure) {
    availableMoves.push(currentCell.notation);
    currentCell = currentCell.right(cellsInfo);
  }
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  // * 3. Check if there is a figure behind the rook
  currentCell = cell.down(cellsInfo);
  while (currentCell && !currentCell.figure) {
    availableMoves.push(currentCell.notation);
    currentCell = currentCell.down(cellsInfo);
  }
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  // * 4. Check if there is a figure on the left of the rook
  currentCell = cell.left(cellsInfo);
  while (currentCell && !currentCell.figure) {
    availableMoves.push(currentCell.notation);
    currentCell = currentCell.left(cellsInfo);
  }
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  return availableMoves;
};

const getKnightAvailableMoves = (cellsInfo: CellInformation[], cell: CellInformation) => {
  const availableMoves: string[] = [];
  const figureColor = cell.figure?.color;

  // * 1. Check if there is a figure in front/left of the knight
  let currentCell = cell.up(cellsInfo, 2)?.left(cellsInfo);

  if (currentCell && currentCell?.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }
  // * 2. Check if there is a figure in the front/right of the knight
  currentCell = cell.up(cellsInfo, 2)?.right(cellsInfo);
  if (currentCell && currentCell?.figure?.color !== figureColor) {
    availableMoves.push(currentCell!.notation);
  }
  // * 3. Check if there is a figure in the right/front of the knight
  currentCell = cell.right(cellsInfo, 2)?.up(cellsInfo);
  if (currentCell && currentCell?.figure?.color !== figureColor) {
    availableMoves.push(currentCell!.notation);
  }
  // * 4. Check if there is a figure in the right/back of the knight
  currentCell = cell.right(cellsInfo, 2)?.down(cellsInfo);
  if (currentCell && currentCell?.figure?.color !== figureColor) {
    availableMoves.push(currentCell!.notation);
  }
  // * 5. Check if there is a figure in the back/right of the knight
  currentCell = cell.down(cellsInfo, 2)?.right(cellsInfo);
  if (currentCell && currentCell?.figure?.color !== figureColor) {
    availableMoves.push(currentCell!.notation);
  }
  // * 6. Check if there is a figure in the back/left of the knight
  currentCell = cell.down(cellsInfo, 2)?.left(cellsInfo);
  if (currentCell && currentCell?.figure?.color !== figureColor) {
    availableMoves.push(currentCell!.notation);
  }
  // * 7. Check if there is a figure in the left/back of the knight
  currentCell = cell.left(cellsInfo, 2)?.down(cellsInfo);
  if (currentCell && currentCell?.figure?.color !== figureColor) {
    availableMoves.push(currentCell!.notation);
  }
  // * 8. Check if there is a figure in the left/front of the knight
  currentCell = cell.left(cellsInfo, 2)?.up(cellsInfo);
  if (currentCell && currentCell?.figure?.color !== figureColor) {
    availableMoves.push(currentCell!.notation);
  }

  return availableMoves;
};

const getBishopAvailableMoves = (cellsInfo: CellInformation[], cell: CellInformation) => {
  const availableMoves: string[] = [];
  const figureColor = cell.figure?.color;

  // * 1. Check if there is a figure on the top right of the bishop
  let currentCell = cell.upRight(cellsInfo);
  while (currentCell && !currentCell.figure) {
    availableMoves.push(currentCell.notation);
    currentCell = currentCell.upRight(cellsInfo);
  }
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  // * 2. Check if there is a figure on the bottom right of the bishop
  currentCell = cell.downRight(cellsInfo);
  while (currentCell && !currentCell.figure) {
    availableMoves.push(currentCell.notation);
    currentCell = currentCell.downRight(cellsInfo);
  }
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  // * 3. Check if there is a figure on the bottom left of the bishop
  currentCell = cell.downLeft(cellsInfo);
  while (currentCell && !currentCell.figure) {
    availableMoves.push(currentCell.notation);
    currentCell = currentCell.downLeft(cellsInfo);
  }
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  // * 4. Check if there is a figure on the top left of the bishop
  currentCell = cell.upLeft(cellsInfo);
  while (currentCell && !currentCell.figure) {
    availableMoves.push(currentCell.notation);
    currentCell = currentCell.upLeft(cellsInfo);
  }
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  return availableMoves;
};

const getQueenAvailableMoves = (cellsInfo: CellInformation[], cell: CellInformation) => {
  const availableMoves: string[] = [];
  const figureColor = cell.figure?.color;

  // * 1. Check if there is a figure in front of the queen
  let currentCell = cell.up(cellsInfo);
  while (currentCell && !currentCell.figure) {
    availableMoves.push(currentCell.notation);
    currentCell = currentCell.up(cellsInfo);
  }
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  // * 2. Check if there is a figure on the right of the queen
  currentCell = cell.right(cellsInfo);
  while (currentCell && !currentCell.figure) {
    availableMoves.push(currentCell.notation);
    currentCell = currentCell.right(cellsInfo);
  }
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  // * 3. Check if there is a figure behind the queen
  currentCell = cell.down(cellsInfo);
  while (currentCell && !currentCell.figure) {
    availableMoves.push(currentCell.notation);
    currentCell = currentCell.down(cellsInfo);
  }
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  // * 4. Check if there is a figure on the left of the queen
  currentCell = cell.left(cellsInfo);
  while (currentCell && !currentCell.figure) {
    availableMoves.push(currentCell.notation);
    currentCell = currentCell.left(cellsInfo);
  }
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  // * 5. Check if there is a figure on the top right of the queen
  currentCell = cell.upRight(cellsInfo);
  while (currentCell && !currentCell.figure) {
    availableMoves.push(currentCell.notation);
    currentCell = currentCell.upRight(cellsInfo);
  }
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  // * 6. Check if there is a figure on the bottom right of the queen
  currentCell = cell.downRight(cellsInfo);
  while (currentCell && !currentCell.figure) {
    availableMoves.push(currentCell.notation);
    currentCell = currentCell.downRight(cellsInfo);
  }
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  // * 7. Check if there is a figure on the bottom left of the queen
  currentCell = cell.downLeft(cellsInfo);
  while (currentCell && !currentCell.figure) {
    availableMoves.push(currentCell.notation);
    currentCell = currentCell.downLeft(cellsInfo);
  }
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  // * 8. Check if there is a figure on the top left of the queen
  currentCell = cell.upLeft(cellsInfo);
  while (currentCell && !currentCell.figure) {
    availableMoves.push(currentCell.notation);
    currentCell = currentCell.upLeft(cellsInfo);
  }
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  return availableMoves;
};

// ! 2. Get available moves for the king
export const getKingAvailableMoves = (cellsInfo: CellInformation[], cell: CellInformation) => {
  const availableMoves: string[] = [];
  const figureColor = cell.figure?.color;

  // * 1. Check if there is a figure in front of the king
  let currentCell = cell.up(cellsInfo);
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  // * 2. Check if there is a figure on the right of the king
  currentCell = cell.right(cellsInfo);
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  // * 3. Check if there is a figure behind the king
  currentCell = cell.down(cellsInfo);
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  // * 4. Check if there is a figure on the left of the king
  currentCell = cell.left(cellsInfo);
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  // * 5. Check if there is a figure on the top right of the king
  currentCell = cell.upRight(cellsInfo);
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  // * 6. Check if there is a figure on the bottom right of the king
  currentCell = cell.downRight(cellsInfo);
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  // * 7. Check if there is a figure on the bottom left of the king
  currentCell = cell.downLeft(cellsInfo);
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  // * 8. Check if there is a figure on the top left of the king
  currentCell = cell.upLeft(cellsInfo);
  if (currentCell && currentCell.figure?.color !== figureColor) {
    availableMoves.push(currentCell.notation);
  }

  return availableMoves;
};

export const getAvailableMoves = (cellsInfo: CellInformation[], cell: CellInformation) => {
  switch (cell.figure?.type) {
    case FIGURE_TYPE.PAWN:
      return getPawnAvailableMoves(cellsInfo, cell);
    case FIGURE_TYPE.ROOK:
      return getRookAvailableMoves(cellsInfo, cell);
    case FIGURE_TYPE.KNIGHT:
      return getKnightAvailableMoves(cellsInfo, cell);
    case FIGURE_TYPE.BISHOP:
      return getBishopAvailableMoves(cellsInfo, cell);
    case FIGURE_TYPE.QUEEN:
      return getQueenAvailableMoves(cellsInfo, cell);
    case FIGURE_TYPE.KING:
      return getKingAvailableMoves(cellsInfo, cell);
    default:
      throw new Error("Figure type is not defined");
  }
};
