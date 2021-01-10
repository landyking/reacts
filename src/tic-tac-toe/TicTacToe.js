import React, { useState } from "react";
import PlayingStage from "./PlayingStage";
import "./TicTacToe.css";

function BeginStage({ onNextStage }) {
  return (
    <div className="begin-select">
      <button onClick={() => onNextStage(true)}>Start - Human first</button>
      <button onClick={() => onNextStage(false)}>Start - Computer first</button>
    </div>
  );
}
export default function TicTacToe(props) {
  const [state, setState] = useState({ stage: 0, humanFirst: true });
  const { stage, humanFirst } = state;
  const stages = [
    () => (
      <BeginStage
        onNextStage={(humanFirst) =>
          setState({
            stage: 1,
            humanFirst,
          })
        }
      />
    ),
    (humanFirst) => (
      <PlayingStage
        humanFirst={humanFirst}
        onNextStage={() =>
          setState({
            stage: 0,
            humanFirst: null,
          })
        }
      />
    ),
  ];
  return (
    <div id="tic-tac-toe">
      <div className="game">{stages[stage](humanFirst)}</div>
    </div>
  );
}
