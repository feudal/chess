import { Room, User } from ".";

export enum GameStatusEnum {
  NOT_STARTED = "NOT_STARTED",
  PLAYING = "PLAYING",
  DRAW = "DRAW",
  WHITE_WON = "WHITE_WON",
  BLACK_WON = "BLACK_WON",
}

export type GameContextType = {
  gameStatus: keyof typeof GameStatusEnum;
  whiteTurn: boolean;
  isCheck: boolean;
  cellsInformation: CellInformation[];
  move: (cellInfo: CellInformation) => void;
  selectedCell?: CellInformation;

  room?: Room;
  setRoom: (room: Room) => void;
  user?: User;
  notations: string[];
  setNotations: (notation: string[]) => void;
};

export enum FIGURE_TYPE {
  KING = "KING",
  QUEEN = "QUEEN",
  ROOK = "ROOK",
  BISHOP = "BISHOP",
  KNIGHT = "KNIGHT",
  PAWN = "PAWN",
}

export enum WHITE_FIGURE_TYPE_NOTATION {
  KING = "♔",
  QUEEN = "♕",
  ROOK = "♖",
  BISHOP = "♗",
  KNIGHT = "♘",
  PAWN = "♙",
}

export enum BLACK_FIGURE_TYPE_NOTATION {
  KING = "♚",
  QUEEN = "♛",
  ROOK = "♜",
  BISHOP = "♝",
  KNIGHT = "♞",
  PAWN = "♟",
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
