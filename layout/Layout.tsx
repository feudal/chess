import { PropsWithChildren } from "react";
import { UserInfo } from "../components/UserInfo";

import { Knight } from "../svg";
import { makeBEM } from "../utils";

interface LayoutProps extends PropsWithChildren<{}> {
  user?: string | null;
  users?: string[] | null;
  sideBar?: JSX.Element;
}

const bem = makeBEM("layout");
export const Layout = ({ children, sideBar }: LayoutProps) => {
  return (
    <div className={bem()}>
      <div className={bem("top-bar")}>
        <div className={bem("logo")}>
          <Knight height="40" />
          <span>Chess</span>
          <Knight height="40" className="mirror" />
        </div>
        <UserInfo />
      </div>
      <main className={bem("main")}>
        {children}
        <div className={bem("side-bar")}>{sideBar}</div>
      </main>
    </div>
  );
};
