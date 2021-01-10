import { calculateWinner } from "./utils";

export default function GameInfo({
  history,
  xIsNext,
  squares,
  onHistoryJump,
  onRestart,
  humanFirst,
}) {
  const full = squares.filter((e) => e === null).length === 0;
  const winner = calculateWinner(squares);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (full) {
    status = "Draw!!!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => onHistoryJump(move)}>{desc}</button>
      </li>
    );
  });
  return (
    <>
      <button onClick={onRestart}>Restart</button>
      <hr />
      <div className="status">
        {"You are: " + (humanFirst ? "X" : "O")}
        <br />
        {status}
      </div>
      <ol>{moves}</ol>
    </>
  );
}
