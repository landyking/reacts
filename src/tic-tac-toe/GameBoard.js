function Square({ onClick, value }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}
export function Board({ squares, onUserClick }) {
  return (
    <div>
      {[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ].map((row, idx) => (
        <div key={idx} className="board-row">
          {row.map((col) => (
            <Square
              key={col}
              value={squares[col]}
              onClick={() => onUserClick(col)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
