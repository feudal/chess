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
  "1a": "rook-white",
  "1b": "knight-white",
  "1c": "bishop-white",
  "1d": "queen-white",
  "1e": "king-white",
  "1f": "bishop-white",
  "1g": "knight-white",
  "1h": "rook-white",
  "2a": "pawn-white",
  "2b": "pawn-white",
  "2c": "pawn-white",
  "2d": "pawn-white",
  "2e": "pawn-white",
  "2f": "pawn-white",
  "2g": "pawn-white",
  "2h": "pawn-white",

  "8a": "rook-black",
  "8b": "knight-black",
  "8c": "bishop-black",
  "8d": "queen-black",
  "8e": "king-black",
  "8f": "bishop-black",
  "8g": "knight-black",
  "8h": "rook-black",
  "7a": "pawn-black",
  "7b": "pawn-black",
  "7c": "pawn-black",
  "7d": "pawn-black",
  "7e": "pawn-black",
  "7f": "pawn-black",
  "7g": "pawn-black",
  "7h": "pawn-black",
};

export { BOARD_CELLS, BOARD_NOTATION, INITIAL_FIGURE_POSITIONS };
