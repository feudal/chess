import axios from "axios";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { BOARD_NOTATION as B_NOTATION, CELLS_INFORMATION, LS_USER_NAME } from "../app-const";
import { CellInformation, GameContextType, GameStatusEnum, Room, User } from "../types";
import { checkIfCheck, createNotation, getAvailableMoves, getError } from "../utils";

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
    // * Get user
    const handleChangeStorage = () => {
      const userName = localStorage.getItem(LS_USER_NAME);
      if (userName) {
        axios(`/api/user/${userName}`)
          .then((res) => setUser(res.data))
          .catch((err) => toast.error(getError(err)));
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
