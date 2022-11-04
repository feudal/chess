import { createContext, PropsWithChildren } from "react";
import { BOARD_CELLS, BOARD_NOTATION, INITIAL_FIGURE_POSITIONS } from "app-const";
import { CellInformation, FigureColor, FigureType, GameContextType } from "types";

const cellInformation: CellInformation[] = Array(64)
  .fill(null)
  .map((_, i) => {
    const [type, color] = INITIAL_FIGURE_POSITIONS?.[BOARD_NOTATION[i]]?.split("-") || [];

    return {
      color: BOARD_CELLS[i % 8][Math.floor(i / 8)],
      notation: BOARD_NOTATION[i],
      state: color === "white" ? "active" : undefined,
      figure: { type: type as FigureType, color: color as FigureColor },
    };
  });

const gameInitialState = {
  cellInformation,
  whiteTurn: true,
};

export const GameContext = createContext<GameContextType>(gameInitialState);

export const GameProvider = ({ children }: PropsWithChildren) => {
  return <GameContext.Provider value={gameInitialState}>{children}</GameContext.Provider>;
};
