import type { AppProps } from "next/app";
import { GameProvider } from "../context";

import "../styles/index.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GameProvider>
      <Component {...pageProps} />
    </GameProvider>
  );
}
