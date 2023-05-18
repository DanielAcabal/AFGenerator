class DoubleOperators {
  constructor(exp1, type, exp2) {
    this.exp1 = exp1;
    this.exp2 = exp2;
    this.type = type;
  }
  Generate(followsTable) {
    // Generating children nodes
    const left = this.exp1.Generate(followsTable);
    const right = this.exp2.Generate(followsTable);
    let anulable = undefined;
    let firstPos = [];
    let lastPos = [];
    // Anulable, first and last id position of parent node
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
        // Creating follows table
        left.lastPos.forEach((followId) => { // For every lastPos of left
          for (let index = 0; index < followsTable.length; index++) {
            const { id, follows } = followsTable[index];
            if (id == followId) { // Looking for id in follows table
              const newFollows = follows.concat(right.firstPos); //  the follows are firstPos of right 
              followsTable[index].follows = newFollows;
              break;
            }
          }
        });
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
      id: this.type,
      firstPos,
      lastPos,
      anulable,
    });
  }
}
exports.DoubleOperators = DoubleOperators;
