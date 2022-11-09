import React, { PropsWithChildren } from "react";

import { makeBEM } from "../../utils";

const bem = makeBEM("title");

interface TitleProps {
  icon?: React.ReactNode;
  gap?: string;
}

export const Title = ({ icon, gap = "10px", children }: PropsWithChildren<TitleProps>) => {
  return (
    <h3 className={bem()}>
      {icon}
      <span style={{ width: gap }} />
      {children}
    </h3>
  );
};
