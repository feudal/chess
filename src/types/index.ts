export type GameContextType = {
  cellInformation: CellInformation[];
  whiteTurn: boolean;
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
}
