import { Bishop, King, Knight, Pawn, Queen, Rook } from "svg";
import { makeBEM } from "utils";

const bem = makeBEM("figure");

interface FigureProps {
  type: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
  color: "white" | "black";
}

export const Figure = ({ type, color = "black", ...props }: FigureProps) => {
  return (
    <div {...props} className={bem(null, [color])}>
      {type === "pawn" && <Pawn />}
      {type === "rook" && <Rook />}
      {type === "knight" && <Knight />}
      {type === "bishop" && <Bishop />}
      {type === "queen" && <Queen />}
      {type === "king" && <King />}
    </div>
  );
};
