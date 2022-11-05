import { createContext, PropsWithChildren, useState } from "react";

import { BOARD_CELLS, BOARD_NOTATION, INITIAL_FIGURE_POSITIONS } from "app-const";
import { CellInformation, FigureColor, FigureType, GameContextType } from "types";

const getAvailableMoves = (cellInfo: CellInformation) => {
  return ["4e", "4f", "4g", "4h"];
  // switch (FigureType) {
  //   case "pawn":
  //     return cell.color === "white" ? ["A2", "A3"] : ["A7", "A6"];
  //   case "rook":
  //     return ["A1", "A8", "H1", "H8"];
  //   case "knight":
  //     return ["B1", "G1", "B8", "G8"];
  //   case "bishop":
  //     return ["C1", "F1", "C8", "F8"];
  //   case "queen":
  //     return ["D1", "D8"];
  //   case "king":
  //     return ["E1", "E8"];
  // }
};

const cellsInformation: CellInformation[] = Array(64)
  .fill(null)
  .map((_, i) => {
    const [type, color] = INITIAL_FIGURE_POSITIONS?.[BOARD_NOTATION[i]]?.split("-") || [];
    const figure = type ? { type: type as FigureType, color: color as FigureColor } : undefined;

    return {
      color: BOARD_CELLS[i % 8][Math.floor(i / 8)],
      notation: BOARD_NOTATION[i],
      state: color === "white" ? "active" : undefined,
      figure,
    };
  });

const gameInitialState = {
  whiteTurn: true,
  cellsInformation,
  move: () => undefined,
  selectedCell: undefined,
};

export const GameContext = createContext<GameContextType>(gameInitialState);

export const GameProvider = ({ children }: PropsWithChildren) => {
  const [selectedCell, setSelectedCell] = useState<CellInformation | undefined>(undefined);
  const [cellsInformation, setCellsInformation] = useState(gameInitialState.cellsInformation);
  const [whiteTurn, setWhiteTurn] = useState(gameInitialState.whiteTurn);

  const selectFigure = (cellInfo: CellInformation) => {
    // * If the cell is empty, return or if figure is not of the current player's color
    if (!cellInfo?.figure || cellInfo.figure.color !== (whiteTurn ? "white" : "black")) return;

    setSelectedCell(cellInfo);
    const availableMoves = getAvailableMoves(cellInfo);

    setCellsInformation((prev) => {
      return prev.map((cell) => {
        // * set selected cell in state "selected"
        if (cell.notation === cellInfo.notation) return { ...cell, state: "selected" };
        // * reset previous selected cell to "active"
        if (cell.state === "selected") return { ...cell, state: "active" };
        // * show available cells for selected figure
        if (availableMoves.includes(cell.notation)) return { ...cell, state: "available" };

        return cell;
      });
    });
  };

  const moveFigure = (cellInfo: CellInformation) => {
    setCellsInformation((prev) => {
      return prev.map((cell) => {
        // * change white turn to opposite
        setWhiteTurn(!whiteTurn);
        // * set cell where figure was moved to undefined
        if (selectedCell?.notation === cell.notation)
          return { ...cell, state: undefined, figure: undefined };
        // * set cell with figure to "undefined" state and set there figure from selected cell
        if (cell.notation === cellInfo.notation)
          return { ...cell, state: undefined, figure: selectedCell?.figure };
        // * set cells with figures that have opposite color to "active"
        const oppositeFigureColor = selectedCell?.figure?.color === "white" ? "black" : "white";
        if (cell.figure?.color === oppositeFigureColor) return { ...cell, state: "active" };
        else return { ...cell, state: undefined };
      });
    });
    setSelectedCell(undefined);
  };

  const move = (cellInfo: CellInformation) => {
    const isMoving =
      cellsInformation[BOARD_NOTATION.indexOf(cellInfo.notation)].state === "available";

    if (isMoving) moveFigure(cellInfo);
    else selectFigure(cellInfo);
  };

  return (
    <GameContext.Provider value={{ cellsInformation, whiteTurn, move, selectedCell }}>
      {children}
    </GameContext.Provider>
  );
};
