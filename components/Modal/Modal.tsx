import { PropsWithChildren, useState } from "react";
import { Cross } from "../../svg";
import { HTMLDivProps } from "../../types";
import { makeBEM } from "../../utils";
import { Button } from "../Button";

const bem = makeBEM("modal");

interface ModalProps extends HTMLDivProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  buttonsName?: string[];
}

export const Modal = ({
  children,
  open = false,
  onClose,
  title,
  buttonsName = ["Accept", "Refuse"],
  ...props
}: PropsWithChildren<ModalProps>) => {
  const [firstButton, secondButton] = buttonsName;
  return (
    <div {...props} className={bem(null, { open })}>
      <div className={bem("overlay")} onClick={() => onClose?.()} />
      <div className={bem("content")}>
        <div className={bem("header")}>
          {title}
          <Cross onClick={() => onClose?.()} />
        </div>
        <div className={bem("body")}>{children}</div>
        <div className={bem("footer")}>
          <Button>{firstButton}</Button>
          <Button color="primary" size="md">
            {secondButton}
          </Button>
        </div>
      </div>
    </div>
  );
};
