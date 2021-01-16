import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Board } from "./GameBoard";
import "./TicTacToe.css";
import { calculateWinner, generateStepByAI, getNextPlayer } from "./utils";

function useMoveHandler({ state, setState }) {
  const { squares } = state;
  return useCallback(
    (i, player) => {
      if (squares[i]) {
        return;
      }
      const tmp = [...squares];
      tmp[i] = player;
      const winner = calculateWinner(tmp);
      setState((old) => ({
        ...old,
        squares: tmp,
        winner,
        finish: winner != null,
      }));
    },
    [squares, setState]
  );
}
function useHandleUserClick({ userPlayer, nextPlayer, moveHandler, finish }) {
  return useCallback(
    (i) => {
      if (finish) return;
      if (userPlayer !== nextPlayer) return;
      console.log("user player: ", userPlayer, " next step: ", i);
      moveHandler(i, userPlayer);
    },
    [userPlayer, nextPlayer, moveHandler, finish]
  );
}

function useAIPlayer({ finish, aiPlayer, nextPlayer, squares, moveHandler }) {
  useEffect(() => {
    if (finish) return;
    if (aiPlayer !== nextPlayer) return;
    const step = generateStepByAI(squares, aiPlayer);
    console.log("ai player: ", aiPlayer, " next step: ", step);
    moveHandler(step, aiPlayer);
  }, [aiPlayer, nextPlayer, squares, moveHandler, finish]);
}

export default function PlayingStage({ onFinish, userPlayer, aiPlayer }) {
  const [state, setState] = useState(() => ({
    squares: Array(9).fill(null),
    finish: false,
    winner: null,
  }));
  const { squares, finish, winner } = state;
  useEffect(() => {
    if (winner) {
      onFinish(winner);
    }
  }, [winner, onFinish]);
  const nextPlayer = useMemo(() => getNextPlayer(squares), [squares]);
  console.log("next player", nextPlayer);
  const moveHandler = useMoveHandler({
    state,
    setState,
    onFinish,
  });

  const handleUserClick = useHandleUserClick({
    userPlayer,
    nextPlayer,
    moveHandler,
    finish,
  });

  useAIPlayer({ finish, aiPlayer, squares, nextPlayer, moveHandler });

  return (
    <>
      <div className="game-board">
        <Board squares={squares} onUserClick={handleUserClick} />
      </div>
    </>
  );
}
