import { HTMLAttributes, PropsWithChildren } from "react";

import { makeBEM } from "utils";

const bem = makeBEM("cell");

interface CellProps extends HTMLAttributes<HTMLDivElement> {
  color?: "white" | "black";
  notation?: string;
  state?: "active" | "available" | "selected";
}

export const Cell = ({
  state,
  color = "white",
  notation,
  children,
  ...props
}: PropsWithChildren<CellProps>) => {
  return (
    <div {...props} className={bem(null, [color, state])}>
      <div className={bem("notation")}>{notation}</div>
      {children}
    </div>
  );
};
