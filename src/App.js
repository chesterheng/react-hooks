import "./App.css";
import { Greeting } from "./components/Greeting";
import { LiftState } from "./components/LiftState";
import { ColocateState } from "./components/ColocateState";
import { HookFlow } from "./components/HookFlow";
import { Game } from "./components/Game";
import { GameHistory } from "./components/GameHistory";
import { RefHook } from "./components/RefHook";
import { PokemonWithState } from "./components/PokemonWithState";
import { PokemonWithReducer } from "./components/PokemonWithReducer";
import { PokemonWithContext } from "./components/PokemonWithContext";
import { NameInput } from "./components/NameInput";
import { CounterWithState } from "./components/CounterWithState";
import { CounterWithReducer } from "./components/CounterWithReducer";
import { CounterWithContext } from "./components/CounterWithContext";
import { MessageWithLayoutEffect } from "./components/MessageWithLayoutEffect";

function App() {
  return (
    <div className="App">
      <GameHistory />
    </div>
  );
}

export default App;
