export type GameContextType = {
  figurePositions: { [key: string]: string };
  setFigurePositions: () => void;
};

export type FigureType =
  | "pawn"
  | "rook"
  | "knight"
  | "bishop"
  | "queen"
  | "king";
export type FigureColor = "white" | "black";
