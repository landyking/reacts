import { selectStep } from "../algorithm/MinMax";
const winLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
export function calculateWinner(squares) {
  for (let i = 0; i < winLines.length; i++) {
    const [a, b, c] = winLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  if (squares.filter((e) => e === null).length === 0) {
    return "draw";
  }
  return null;
}
function evaluateScore(squares, player, isEnd) {
  if (isEnd) {
    const winner = calculateWinner(squares);
    if (winner === null) {
      return 100;
    } else if (winner === player) {
      return 1000;
    } else {
      return 0;
    }
  }
  return 0;
}
function evaluateStop(deep) {
  return deep > 10;
}
export function generateStepByAI(squares, player: "O" | "X") {
  return selectStep(squares, player, evaluateScore, evaluateStop);
}
export function playerNot(player) {
  if (player === "O") return "X";
  return "O";
}
export function getNextPlayer(squares) {
  return squares.filter((e) => e === null).length % 2 === 0 ? "X" : "O";
}
