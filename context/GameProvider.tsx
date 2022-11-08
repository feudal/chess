import { createContext, PropsWithChildren, useEffect, useState } from "react";

import {
  BOARD_CELLS as B_CELLS,
  BOARD_NOTATION as B_NOTATION,
  COLUMN_NUMBER as COL_NUM,
  INITIAL_FIGURE_POSITIONS,
} from "../app-const";
import { CellInformation, FigureType, FigureColor, GameContextType } from "../types";
import { getColumnKey, getAvailableMoves, checkIfCheck } from "../utils";

const CELLS_INFORMATION: CellInformation[] = Array(64)
  .fill(null)
  .map((_, i) => {
    const [type, color] = INITIAL_FIGURE_POSITIONS?.[B_NOTATION[i]]?.split("-") || [];
    const figure = type ? { type: type as FigureType, color: color as FigureColor } : undefined;

    const [row, column] = B_NOTATION[i].split("");

    const up = (cells: CellInformation[], step = 1) => {
      if (+row + step > 8) return undefined;
      return cells[B_NOTATION.indexOf(`${+row + step}${column}`)];
    };
    const down = (cells: CellInformation[], step = 1) => {
      if (+row - step < 0) return undefined;
      return cells[B_NOTATION.indexOf(`${+row - step}${column}`)];
    };
    const left = (cells: CellInformation[], step = 1) => {
      if (COL_NUM[column] - step < 0) return undefined;
      return cells[B_NOTATION.indexOf(`${row}${getColumnKey(column, -step)}`)];
    };
    const right = (cells: CellInformation[], step = 1) => {
      if (COL_NUM[column] + step > 8) return undefined;
      return cells[B_NOTATION.indexOf(`${row}${getColumnKey(column, step)}`)];
    };
    const upLeft = (cells: CellInformation[], step = 1) => {
      if (+row + step > 8 || COL_NUM[column] - step < 0) return undefined;
      return cells[B_NOTATION.indexOf(`${+row + step}${getColumnKey(column, -step)}`)];
    };
    const upRight = (cells: CellInformation[], step = 1) => {
      if (+row + step > 8 || COL_NUM[column] + step > 8) return undefined;
      return cells[B_NOTATION.indexOf(`${+row + step}${getColumnKey(column, step)}`)];
    };
    const downLeft = (cells: CellInformation[], step = 1) => {
      if (+row - step < 0 || COL_NUM[column] - step < 0) return undefined;
      return cells[B_NOTATION.indexOf(`${+row - step}${getColumnKey(column, -step)}`)];
    };
    const downRight = (cells: CellInformation[], step = 1) => {
      if (+row - step < 0 || COL_NUM[column] + step > 8) return undefined;
      return cells[B_NOTATION.indexOf(`${+row - step}${getColumnKey(column, step)}`)];
    };

    return {
      color: B_CELLS[i % 8][Math.floor(i / 8)],
      notation: B_NOTATION[i],
      state: color === "white" ? "active" : undefined,
      figure,
      up,
      down,
      left,
      right,
      upLeft,
      upRight,
      downLeft,
      downRight,
    };
  });

const gameInitialState = {
  whiteTurn: true,
  isCheck: false,
  cellsInformation: CELLS_INFORMATION,
  move: () => undefined,
  selectedCell: undefined,
};

export const GameContext = createContext<GameContextType>(gameInitialState);

export const GameProvider = ({ children }: PropsWithChildren) => {
  const [whiteTurn, setWhiteTurn] = useState(gameInitialState.whiteTurn);
  const [isCheck, setIsCheck] = useState(false);
  const [cellsInformation, setCellsInformation] = useState(gameInitialState.cellsInformation);
  const [selectedCell, setSelectedCell] = useState<CellInformation | undefined>(undefined);

  const selectFigure = (cellInfo: CellInformation) => {
    // * If the cell is empty, return or if figure is not of the current player's color
    if (!cellInfo?.figure || cellInfo.figure.color !== (whiteTurn ? "white" : "black")) return;

    setSelectedCell(cellInfo);
    const availableMoves = getAvailableMoves(cellsInformation, cellInfo);

    setCellsInformation((prev) => {
      return prev.map((cell) => {
        // * set selected cell in state "selected"
        if (cell.notation === cellInfo.notation) return { ...cell, state: "selected" };
        // * reset previous selected cell to "active"
        if (cell.state === "selected") return { ...cell, state: "active" };
        // * show available cells for selected figure
        if (availableMoves.includes(cell.notation)) return { ...cell, state: "available" };
        // * set available cells to "undefined"
        if (cell.state === "available") return { ...cell, state: undefined };

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
    console.log("move");
    const isMoving = cellsInformation[B_NOTATION.indexOf(cellInfo.notation)].state === "available";

    if (isMoving) {
      moveFigure(cellInfo);
    } else selectFigure(cellInfo);
  };

  useEffect(() => {
    setIsCheck(checkIfCheck(cellsInformation, whiteTurn ? "white" : "black"));
  }, [cellsInformation]);

  return (
    <GameContext.Provider
      value={{
        whiteTurn,
        isCheck,
        cellsInformation,
        move,
        selectedCell,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
