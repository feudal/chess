import { Figure } from "components";

interface KingProps {
  color?: "white" | "black";
}

export const King = ({ color = "black" }: KingProps) => {
  return <Figure type="king" color={color} />;
};
