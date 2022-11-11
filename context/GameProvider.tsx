import axios from "axios";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

import {
  BOARD_CELLS as B_CELLS,
  BOARD_NOTATION as B_NOTATION,
  COLUMN_NUMBER as COL_NUM,
  INITIAL_FIGURE_POSITIONS,
  LS_USER_NAME,
} from "../app-const";
import {
  CellInformation,
  FigureColor,
  FigureType,
  GameContextType,
  GameStatusEnum,
  Room,
  User,
} from "../types";
import { checkIfCheck, createNotation, getAvailableMoves, getColumnKey } from "../utils";

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
  gameStatus: GameStatusEnum.NOT_STARTED,
  whiteTurn: true,
  isCheck: false,
  cellsInformation: CELLS_INFORMATION,
  move: () => undefined,
  selectedCell: undefined,

  room: undefined,
  setRoom: () => undefined,
  notations: [],
  setNotations: () => undefined,
};

export const GameContext = createContext<GameContextType>(gameInitialState);

export const GameProvider = ({ children }: PropsWithChildren) => {
  const [gameStatus, setGameStatus] = useState(GameStatusEnum.NOT_STARTED);
  const [whiteTurn, setWhiteTurn] = useState(gameInitialState.whiteTurn);
  const [isCheck, setIsCheck] = useState(false);
  const [cellsInformation, setCellsInformation] = useState(gameInitialState.cellsInformation);
  const [selectedCell, setSelectedCell] = useState<CellInformation | undefined>(undefined);
  const [room, setRoom] = useState<Room>();
  const [user, setUser] = useState<User>();
  const [notations, setNotations] = useState<string[]>([]);

  useEffect(() => {
    const handleChangeStorage = () => {
      const userName = localStorage.getItem(LS_USER_NAME);
      if (userName) {
        axios(`/api/user/${userName}`).then((res) => setUser(res.data));
      }
    };
    handleChangeStorage();

    window.addEventListener("storage", handleChangeStorage);
    return () => window.removeEventListener("storage", handleChangeStorage);
  }, []);

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
    // ! Need to call this function only once after the move
    // TODO: fix this
    setGameStatus(GameStatusEnum.PLAYING);

    // ! isCheck is not working properly
    // TODO: fix isCheck
    setNotations((prev) => [...prev, createNotation(whiteTurn, selectedCell!, cellInfo, isCheck)]);

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
        gameStatus,
        whiteTurn,
        isCheck,
        cellsInformation,
        move,
        selectedCell,

        room,
        setRoom,
        user,
        notations,
        setNotations,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
