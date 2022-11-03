import { Board } from "components";
import { GameProvider } from "context";

import "styles/index.scss";

function App() {
  return (
    <GameProvider>
      <Board />
    </GameProvider>
  );
}

export default App;
