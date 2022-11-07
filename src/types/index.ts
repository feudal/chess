export type GameContextType = {
  whiteTurn: boolean;
  isCheck: boolean;
  cellsInformation: CellInformation[];
  move: (cellInfo: CellInformation) => void;
  selectedCell?: CellInformation;
};

export type FigureType = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
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
