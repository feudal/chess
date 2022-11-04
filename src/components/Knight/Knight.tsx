import { Figure } from "components";

interface KnightProps {
  color?: "white" | "black";
}

export const Knight = ({ color = "black" }: KnightProps) => {
  return <Figure type="knight" color={color} />;
};
