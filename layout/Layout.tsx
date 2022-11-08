import { PropsWithChildren } from "react";
import { Knight } from "svg";

import { makeBEM } from "utils";

const bem = makeBEM("layout");
export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={bem()}>
      <div className={bem("top-bar")}>
        <div className={bem("logo")}>
          <Knight />
          <span>Chess</span>
          <Knight className="mirror" />
        </div>
        player info
      </div>
      <main className={bem("main")}>
        {children}
        <div className={bem("side-bar")}>
          <div className={bem("info")}>
            board info <br />
            notations
          </div>
          <div className={bem("players")}>players online</div>
          <div className={bem("chat")}>chat</div>
        </div>
      </main>
    </div>
  );
};
