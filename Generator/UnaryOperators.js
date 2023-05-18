class UnaryOperators {
  constructor(exp, type) {
    this.exp = exp;
    this.type = type;
  }
  Generate() {
    const left = this.exp.Generate();
    console.log(this.exp, this.type);
    let firstPos = [];
    let lastPos = [];
    let anulable = undefined;
    switch (this.type) {
      case "?":
      case "*":
        anulable = true;
        break;
      case "+":
        anulable = left.anulable;
        break;

      default:
        break;
    }
    firstPos = left.firstPos;
    lastPos = left.lastPos;
    return ({
      left,
      right: null,
      id: -1,
      firstPos,
      lastPos,
      anulable,
    });
  }
}
exports.UnaryOperators = UnaryOperators;
