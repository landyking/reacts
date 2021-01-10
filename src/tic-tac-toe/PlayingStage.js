import React, { useCallback, useEffect, useState } from "react";
import { Board } from "./GameBoard";
import GameInfo from "./GameInfo";
import "./TicTacToe.css";
import { calculateWinner, generateStepByAI } from "./utils";

function useMoveHandler({ history, stepNumber, xIsNext, setState }) {
  return useCallback(
    (i) => {
      const newHistory = history.slice(0, stepNumber + 1);
      const current = newHistory[newHistory.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = xIsNext ? "X" : "O";
      setState((old) => ({
        ...old,
        history: [...newHistory, { squares }],
        stepNumber: history.length,
        xIsNext: !xIsNext,
      }));
    },
    [history, stepNumber, xIsNext, setState]
  );
}
function useHandleUserClick({ xIsNext, humanFirst, moveHandler }) {
  return useCallback(
    (i) => {
      if (humanFirst !== xIsNext) {
        return;
      }
      moveHandler(i);
    },
    [moveHandler, humanFirst, xIsNext]
  );
}

function useHandleHistoryJump({ setState, humanFirst }) {
  return useCallback(
    (step) => {
      setState((old) => ({
        ...old,
        xIsNext: step % 2 === 0 && humanFirst,
        stepNumber: step,
      }));
    },
    [setState, humanFirst]
  );
}

function useAIPlayer({ humanFirst, xIsNext, squares, moveHandler }) {
  useEffect(() => {
    if (humanFirst === xIsNext) return;
    const player = humanFirst ? "O" : "X";
    const step = generateStepByAI(squares, player);
    console.log("human first", humanFirst, "xIsNext", xIsNext, player, step);
    moveHandler(step);
  }, [humanFirst, xIsNext, squares, moveHandler]);
}

export default function PlayingStage({ onNextStage, humanFirst }) {
  const [state, setState] = useState({
    history: [{ squares: Array(9).fill(null) }],
    stepNumber: 0,
    xIsNext: true,
  });

  const moveHandler = useMoveHandler({
    history: state.history,
    setState,
    stepNumber: state.stepNumber,
    xIsNext: state.xIsNext,
  });

  const handleHistoryJump = useHandleHistoryJump({ setState, humanFirst });
  const { history, stepNumber, xIsNext } = state;
  const squares = history[stepNumber].squares;

  const handleUserClick = useHandleUserClick({
    xIsNext,
    humanFirst,
    moveHandler,
  });
  useAIPlayer({ humanFirst, xIsNext, squares, moveHandler });

  return (
    <>
      <div className="game-board">
        <Board squares={squares} onUserClick={handleUserClick} />
      </div>
      <div className="game-info">
        <GameInfo
          onHistoryJump={handleHistoryJump}
          history={state.history}
          squares={squares}
          xIsNext={state.xIsNext}
          onRestart={onNextStage}
          humanFirst={humanFirst}
        />
      </div>
    </>
  );
}
