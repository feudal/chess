import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";

import { Knight } from "../svg";
import { makeBEM } from "../utils";
import "react-toastify/dist/ReactToastify.css";
import { UserInfo, WindowSplitter } from "../components";

interface LayoutProps extends PropsWithChildren<{}> {
  user?: string | null;
  users?: string[] | null;
  sideBar?: JSX.Element;
}

const bem = makeBEM("layout");
export const Layout = ({ children, sideBar }: LayoutProps) => {
  return (
    <>
      <div className={bem()}>
        <div className={bem("top-bar")}>
          <div className={bem("logo")}>
            <Knight height="40" className="mirror" />
            <span>Chess</span>
            <Knight height="40" />
          </div>
          <UserInfo />
        </div>
        <main className={bem("main")}>
          <WindowSplitter
            left={children}
            right={<div className={bem("side-bar")}>{sideBar}</div>}
          />
        </main>
      </div>

      <ToastContainer position="top-center" limit={1} />
    </>
  );
};
