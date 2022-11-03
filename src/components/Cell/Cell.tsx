import { PropsWithChildren } from "react";
import { makeBEM } from "utils";

const bem = makeBEM("cell");

interface CellProps {
  color?: "white" | "black";
  notation?: string;
}

export const Cell = ({
  color = "white",
  notation,
  children,
  ...props
}: PropsWithChildren<CellProps>) => {
  return (
    <div {...props} className={bem(null, [color])}>
      <div className={bem("notation")}>{notation}</div>
      {children}
    </div>
  );
};
