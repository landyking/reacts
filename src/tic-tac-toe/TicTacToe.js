import React, { useCallback, useState } from "react";
import PlayingStage from "./PlayingStage";
import "./TicTacToe.css";

function BeginStage({ onNextStage, disabled }) {
  return (
    <div className="begin-select">
      <button disabled={disabled} onClick={() => onNextStage(true)}>
        Start - Human first
      </button>
      <button disabled={disabled} onClick={() => onNextStage(false)}>
        Start - Computer first
      </button>
    </div>
  );
}
export default function TicTacToe(props) {
  const [state, setState] = useState({
    stage: 0,
    times: 0,
    humanFirst: true,
    latestWinner: null,
  });
  const { stage, humanFirst, latestWinner, times } = state;
  const onFinish = useCallback(
    (winner) => setState((old) => ({ ...old, stage: 0, latestWinner: winner })),
    [setState]
  );
  return (
    <div id="tic-tac-toe">
      <div className="game">
        <BeginStage
          disabled={stage !== 0}
          onNextStage={(humanFirst) =>
            setState((old) => ({
              ...old,
              stage: 1,
              humanFirst,
              times: old.times + 1,
            }))
          }
        />
        <div style={{ position: "relative" }}>
          <PlayingStage
            key={times}
            userPlayer={humanFirst ? "O" : "X"}
            aiPlayer={humanFirst ? "X" : "O"}
            onFinish={onFinish}
          />
          {stage === 0 && (
            <div className="mask">
              {latestWinner ? (
                <div>Winner is {latestWinner}. Click button to restart!</div>
              ) : (
                <div>Click button to start!</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
