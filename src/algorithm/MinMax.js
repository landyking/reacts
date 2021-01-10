const TYPE_MIN = "min";
const TYPE_MAX = "max";

class Node {
  deep;
  step;
  score;
  type;
  constructor(deep, step, score, type) {
    this.deep = deep;
    this.score = score;
    this.step = step;
    this.type = type;
  }
}

export function selectStep(squares, player, evaluateScore, evaluateStop) {
  const maxStep = findAvailableSteps(squares)
    .map((e) => {
      return {
        step: e,
        score: computeScore({
          squares,
          position: e,
          deep: 1,
          player,
          type: TYPE_MIN,
          evaluateScore,
          evaluateStop,
        }),
      };
    })
    .reduce((acc, cur) => (acc.score > cur.score ? acc : cur), {
      step: -1,
      score: -999999,
    });
  return maxStep.step;
}

function max(arr) {
  return arr.reduce((acc, cur) => {
    return acc > cur ? acc : cur;
  }, -999999);
}

function min(arr) {
  return arr.reduce((acc, cur) => {
    return acc < cur ? acc : cur;
  }, 999999);
}
function notType(type) {
  if (type === TYPE_MAX) return TYPE_MIN;
  return TYPE_MAX;
}
function type2func(type) {
  if (type === TYPE_MAX) return max;
  return min;
}

function computeScore({
  squares,
  position,
  player,
  type,
  deep,
  evaluateScore,
  evaluateStop,
}) {
  const dump = [...squares];
  dump[position] = player;
  const isEnd = dump.filter((e) => e === null) === 0;
  if (isEnd) {
    return evaluateScore(dump, player, isEnd);
  }
  const isStop = evaluateStop(deep);
  if (isStop) {
    return evaluateScore(dump, player, isEnd);
  }
  const steps = findAvailableSteps(dump, player);
  const score = type2func(type)(
    steps.map((e) =>
      computeScore({
        squares: dump,
        position: e,
        player,
        type: notType(type),
        deep: deep + 1,
        evaluateScore,
        evaluateStop,
      })
    )
  );
  return score;
}

function findAvailableSteps(squares, player) {
  return squares.map((e, idx) => (e === null ? idx : -1)).filter((e) => e > -1);
}
