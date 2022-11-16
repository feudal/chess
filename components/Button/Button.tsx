import { PropsWithChildren } from "react";
import { HTMLButtonProps } from "../../types";
import { makeBEM } from "../../utils";

const bem = makeBEM("button");

interface ButtonProps extends HTMLButtonProps {
  color?: "primary" | "secondary";
  shape?: "pill";
  size?: "md";
}

export const Button = ({
  children,
  color = "primary",
  shape,
  size,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button {...props} className={bem(null, [color, shape, size])}>
      {children}
    </button>
  );
};
