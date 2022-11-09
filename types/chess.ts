export type GameContextType = {
  whiteTurn: boolean;
  isCheck: boolean;
  cellsInformation: CellInformation[];
  move: (cellInfo: CellInformation) => void;
  selectedCell?: CellInformation;
};

export enum FIGURE_TYPE {
  KING = "KING",
  QUEEN = "QUEEN",
  ROOK = "ROOK",
  BISHOP = "BISHOP",
  KNIGHT = "KNIGHT",
  PAWN = "PAWN",
}

export type FigureType =
  | FIGURE_TYPE.KING
  | FIGURE_TYPE.QUEEN
  | FIGURE_TYPE.ROOK
  | FIGURE_TYPE.BISHOP
  | FIGURE_TYPE.KNIGHT
  | FIGURE_TYPE.PAWN;

export type FigureColor = "white" | "black";

export interface FigureInfo {
  type: FigureType;
  color: FigureColor;
}

export interface CellInformation {
  notation: string;
  color: "white" | "black";
  state?: "active" | "selected" | "available";
  figure?: FigureInfo;
  up: (cells: CellInformation[], step?: number) => CellInformation | undefined;
  down: (cells: CellInformation[], step?: number) => CellInformation | undefined;
  left: (cells: CellInformation[], step?: number) => CellInformation | undefined;
  right: (cells: CellInformation[], step?: number) => CellInformation | undefined;
  upLeft: (cells: CellInformation[], step?: number) => CellInformation | undefined;
  upRight: (cells: CellInformation[], step?: number) => CellInformation | undefined;
  downLeft: (cells: CellInformation[], step?: number) => CellInformation | undefined;
  downRight: (cells: CellInformation[], step?: number) => CellInformation | undefined;
}