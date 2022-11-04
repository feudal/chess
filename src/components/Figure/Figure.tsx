import { Bishop, King, Knight, Pawn, Queen, Rook } from "svg";
import { FigureType, FigureColor } from "types";
import { makeBEM } from "utils";

const bem = makeBEM("figure");

interface FigureProps {
  type: FigureType;
  color?: FigureColor;
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
