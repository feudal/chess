import { createContext, PropsWithChildren } from "react";
import { INITIAL_FIGURE_POSITIONS } from "app-const";
import { GameContextType } from "types";

export const GameContext = createContext<GameContextType | null>(null);

const gameSettings = {
  figurePositions: INITIAL_FIGURE_POSITIONS,
  setFigurePositions: () => {},
};

export const GameProvider = ({ children }: PropsWithChildren) => {
  return (
    <GameContext.Provider value={gameSettings}>{children}</GameContext.Provider>
  );
};
