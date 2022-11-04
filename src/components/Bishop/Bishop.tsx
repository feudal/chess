import { Figure } from "components";

interface BishopProps {
  color?: "white" | "black";
}

export const Bishop = ({ color = "black" }: BishopProps) => {
  return <Figure type="bishop" color={color} />;
};
