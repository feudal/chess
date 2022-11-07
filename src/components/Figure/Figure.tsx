import { HTMLAttributes } from "react";

import { Bishop, King, Knight, Pawn, Queen, Rook } from "svg";
import { FIGURE_TYPE, FigureColor, FigureType } from "types";
import { makeBEM } from "utils";

const bem = makeBEM("figure");

interface FigureProps extends HTMLAttributes<HTMLDivElement> {
  type: FigureType;
  color?: FigureColor;
}

export const Figure = ({ type, color = "black", ...props }: FigureProps) => {
  return (
    <div {...props} className={bem(null, [color])}>
      {type === FIGURE_TYPE.PAWN && <Pawn />}
      {type === FIGURE_TYPE.KNIGHT && <Knight />}
      {type === FIGURE_TYPE.BISHOP && <Bishop />}
      {type === FIGURE_TYPE.ROOK && <Rook />}
      {type === FIGURE_TYPE.QUEEN && <Queen />}
      {type === FIGURE_TYPE.KING && <King />}
    </div>
  );
};
