import { Figure } from "components";

interface RookProps {
  color?: "white" | "black";
}

export const Rook = ({ color = "black" }: RookProps) => {
  return <Figure type="rook" color={color} />;
};
