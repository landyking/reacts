import logo from "./logo.svg";
import "./App.css";
import TicTacToe, { useHelloWorld } from "tic-tac-toe";

function App() {
  const [state, setState] = useHelloWorld();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React {state}
        </a>
        <TicTacToe />
      </header>
    </div>
  );
}

export default App;
