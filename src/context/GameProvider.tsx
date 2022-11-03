import { createContext, PropsWithChildren } from "react";
import { GameContextType } from "types";

export const GameContext = createContext<GameContextType | null>(null);

const gameSettings = {
  cells: Array(64).fill(null),
  setCells: () => {},
};

export const GameProvider = ({ children }: PropsWithChildren) => {
  return (
    <GameContext.Provider value={gameSettings}>{children}</GameContext.Provider>
  );
};
