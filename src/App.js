import "./App.css";
import { Greeting } from "./components/Greeting";
import { LiftState } from "./components/LiftState";
import { ColocateState } from "./components/ColocateState";
import { HookFlow } from "./components/HookFlow";
import { Game } from "./components/Game";
import { RefHook } from "./components/RefHook";
import { Pokemon } from "./components/Pokemon";

function App() {
  return (
    <div className="App">
      <Greeting />
      <hr />
      <LiftState />
      <hr />
      <ColocateState />
      <hr />
      <HookFlow />
      <hr />
      <Game />
      <hr />
      <RefHook />
      <hr />
      <Pokemon />
    </div>
  );
}

export default App;
