import { PropsWithChildren, useState } from "react";
import { Cross } from "../../svg";
import { HTMLDivProps } from "../../types";
import { makeBEM } from "../../utils";
import { Button } from "../Button";

const bem = makeBEM("modal");

interface ModalProps extends HTMLDivProps {
  title?: string;
  open?: boolean;
  onClose?: () => void;
  onAccept?: () => void;
  acceptButtonLabel?: string;
  rejectButtonLabel?: string;
}

export const Modal = ({
  children,
  open = false,
  onClose,
  onAccept,
  title,
  acceptButtonLabel,
  rejectButtonLabel,
  ...props
}: PropsWithChildren<ModalProps>) => {
  return (
    <div {...props} className={bem(null, { open })}>
      <div className={bem("overlay")} onClick={onClose} />
      <div className={bem("content")}>
        <div className={bem("header")}>
          {title}
          <Cross onClick={() => onClose?.()} />
        </div>
        <div className={bem("body")}>{children}</div>

        <div className={bem("footer")}>
          {acceptButtonLabel && <Button onClick={onAccept}>{acceptButtonLabel}</Button>}
          {rejectButtonLabel && (
            <Button color="primary" size="md" onClick={onClose}>
              {rejectButtonLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
