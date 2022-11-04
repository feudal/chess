import { Figure } from "components";

interface QueenProps {
  color?: "white" | "black";
}

export const Queen = ({ color = "black" }: QueenProps) => {
  return <Figure type="queen" color={color} />;
};
