import { PropsWithChildren } from "react";
import { makeBEM } from "utils";

const bem = makeBEM("cell");

interface CellProps {
  color?: "white" | "black";
}

export const Cell = ({
  color = "white",
  children,
  ...props
}: PropsWithChildren<CellProps>) => {
  return (
    <div {...props} className={bem(null, [color])}>
      {children}
    </div>
  );
};
