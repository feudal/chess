import { CellInformation, FigureType, FigureColor } from "./types";
import { getColumnKey } from "./utils";

type CellColor = "white" | "black";

const BOARD_CELLS: CellColor[][] = [
  ["white", "black", "white", "black", "white", "black", "white", "black"],
  ["black", "white", "black", "white", "black", "white", "black", "white"],
  ["white", "black", "white", "black", "white", "black", "white", "black"],
  ["black", "white", "black", "white", "black", "white", "black", "white"],
  ["white", "black", "white", "black", "white", "black", "white", "black"],
  ["black", "white", "black", "white", "black", "white", "black", "white"],
  ["white", "black", "white", "black", "white", "black", "white", "black"],
  ["black", "white", "black", "white", "black", "white", "black", "white"],
];

const BOARD_NOTATION_X = ["8", "7", "6", "5", "4", "3", "2", "1"];
const BOARD_NOTATION_Y = ["a", "b", "c", "d", "e", "f", "g", "h"];
const BOARD_NOTATION = BOARD_NOTATION_X.map((x) => BOARD_NOTATION_Y.map((y) => x + y)).flat();

const INITIAL_FIGURE_POSITIONS: { [key: string]: string } = {
  "1a": "ROOK-white",
  "1b": "KNIGHT-white",
  "1c": "BISHOP-white",
  "1d": "QUEEN-white",
  "1e": "KING-white",
  "1f": "BISHOP-white",
  "1g": "KNIGHT-white",
  "1h": "ROOK-white",
  "2a": "PAWN-white",
  "2b": "PAWN-white",
  "2c": "PAWN-white",
  "2d": "PAWN-white",
  "2e": "PAWN-white",
  "2f": "PAWN-white",
  "2g": "PAWN-white",
  "2h": "PAWN-white",

  "8a": "ROOK-black",
  "8b": "KNIGHT-black",
  "8c": "BISHOP-black",
  "8d": "QUEEN-black",
  "8e": "KING-black",
  "8f": "BISHOP-black",
  "8g": "KNIGHT-black",
  "8h": "ROOK-black",
  "7a": "PAWN-black",
  "7b": "PAWN-black",
  "7c": "PAWN-black",
  "7d": "PAWN-black",
  "7e": "PAWN-black",
  "7f": "PAWN-black",
  "7g": "PAWN-black",
  "7h": "PAWN-black",
};

const COLUMN_NUMBER: Record<string, number> = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 };

const CELLS_INFORMATION: CellInformation[] = Array(64)
  .fill(null)
  .map((_, i) => {
    const [type, color] = INITIAL_FIGURE_POSITIONS?.[BOARD_NOTATION[i]]?.split("-") || [];
    const figure = type ? { type: type as FigureType, color: color as FigureColor } : undefined;

    const [row, column] = BOARD_NOTATION[i].split("");

    const up = (cells: CellInformation[], step = 1) => {
      if (+row + step > 8) return undefined;
      return cells[BOARD_NOTATION.indexOf(`${+row + step}${column}`)];
    };
    const down = (cells: CellInformation[], step = 1) => {
      if (+row - step < 0) return undefined;
      return cells[BOARD_NOTATION.indexOf(`${+row - step}${column}`)];
    };
    const left = (cells: CellInformation[], step = 1) => {
      if (COLUMN_NUMBER[column] - step < 0) return undefined;
      return cells[BOARD_NOTATION.indexOf(`${row}${getColumnKey(column, -step)}`)];
    };
    const right = (cells: CellInformation[], step = 1) => {
      if (COLUMN_NUMBER[column] + step > 8) return undefined;
      return cells[BOARD_NOTATION.indexOf(`${row}${getColumnKey(column, step)}`)];
    };
    const upLeft = (cells: CellInformation[], step = 1) => {
      if (+row + step > 8 || COLUMN_NUMBER[column] - step < 0) return undefined;
      return cells[BOARD_NOTATION.indexOf(`${+row + step}${getColumnKey(column, -step)}`)];
    };
    const upRight = (cells: CellInformation[], step = 1) => {
      if (+row + step > 8 || COLUMN_NUMBER[column] + step > 8) return undefined;
      return cells[BOARD_NOTATION.indexOf(`${+row + step}${getColumnKey(column, step)}`)];
    };
    const downLeft = (cells: CellInformation[], step = 1) => {
      if (+row - step < 0 || COLUMN_NUMBER[column] - step < 0) return undefined;
      return cells[BOARD_NOTATION.indexOf(`${+row - step}${getColumnKey(column, -step)}`)];
    };
    const downRight = (cells: CellInformation[], step = 1) => {
      if (+row - step < 0 || COLUMN_NUMBER[column] + step > 8) return undefined;
      return cells[BOARD_NOTATION.indexOf(`${+row - step}${getColumnKey(column, step)}`)];
    };

    return {
      color: BOARD_CELLS[i % 8][Math.floor(i / 8)],
      notation: BOARD_NOTATION[i],
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

const LOCAL_STORAGE = {
  USER: "USER",
  GAME: "GAME",
};

const SO_EVENTS = {
  LOGIN: "login",
  USERS_ONLINE: "users-online",
  USER_CHANGED: "user-changed",
  MESSAGE_SENT: "message-sent",
  MESSAGE_RECEIVED: "message-received",
  JOIN_ROOM: "join-room",
  INVITE_SENT: "invite-sent",
  INVITE_RECEIVED: "invite-received",
  INITIATE_GAME: "initiate-game",
  GAME_STARTED: "game-started",
};

export {
  BOARD_CELLS,
  BOARD_NOTATION,
  INITIAL_FIGURE_POSITIONS,
  COLUMN_NUMBER,
  LOCAL_STORAGE,
  SO_EVENTS,
  CELLS_INFORMATION,
};
