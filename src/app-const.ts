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
const BOARD_NOTATION = BOARD_NOTATION_X.map((x) =>
  BOARD_NOTATION_Y.map((y) => x + y)
).flat();

export { BOARD_CELLS, BOARD_NOTATION };
