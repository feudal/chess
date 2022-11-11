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

const LS_USER_NAME = "USER";

const SO_EVENTS = {
  USER_CHANGED: "user-changed",
  MESSAGE_SENT: "message-sent",
};

export {
  BOARD_CELLS,
  BOARD_NOTATION,
  INITIAL_FIGURE_POSITIONS,
  COLUMN_NUMBER,
  LS_USER_NAME,
  SO_EVENTS,
};
