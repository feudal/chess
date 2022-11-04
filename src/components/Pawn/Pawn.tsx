import { Figure } from "components";

interface PawnProps {
  color?: "white" | "black";
}

export const Pawn = ({ color = "black" }: PawnProps) => {
  return <Figure type="pawn" color={color} />;
};
