class DoubleOperators {
  constructor(exp1, type, exp2) {
    this.exp1 = exp1;
    this.exp2 = exp2;
    this.type = type;
  }
  Generate() {
    const left = this.exp1.Generate();
    const right = this.exp2.Generate();
    let anulable = undefined;
    let firstPos = [];
    let lastPos = [];

    switch (this.type) {
      case "AND":
        anulable = left.anulable && right.anulable;
        firstPos = left.firstPos;
        if (left.anulable) {
          firstPos = firstPos.concat(right.firstPos);
        }
        lastPos = right.lastPos;
        if (right.anulable) {
          lastPos = lastPos.concat(left.lastPos);
        }
        break;
      case "OR":
        anulable = left.anulable || right.anulable;
        firstPos = left.firstPos.concat(right.firstPos);
        lastPos = left.lastPos.concat(right.lastPos);
        break;
      default:
        break;
    }
    return ({
      left,
      right,
      id: -2,
      firstPos,
      lastPos,
      anulable,
    });
  }
}
exports.DoubleOperators = DoubleOperators;
