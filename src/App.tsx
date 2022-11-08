import { Board } from "components";
import { GameProvider } from "context";
import { Layout } from "layout";

import "styles/index.scss";

function App() {
  return (
    <Layout>
      <GameProvider>
        <Board />
      </GameProvider>
    </Layout>
  );
}

export default App;
