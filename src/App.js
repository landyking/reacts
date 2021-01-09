import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./home/Home";
import TicTacToe from "./tic-tac-toe";
import TicTacToeImage from "./tic-tac-toe/image.jpg";

const games = [
  {
    id: "tic-tac-toe",
    image: TicTacToeImage,
    title: "Tic-Tac-Toe",
    imageTitle: "Tic-Tac-Toe",
    description: "A Tic-Tac-Toe game with AI written by React JS.",
    path: "/tic-tac-toe",
    render: () => <TicTacToe />,
  },
];
function App() {
  return (
    <Router>
      <Switch>
        {games.map((e) => (
          <Route key={e.id} path={e.path}>
            {e.render()}
          </Route>
        ))}
        <Route path="/">
          <Home games={games} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
