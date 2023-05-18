class UnaryOperators {
  constructor(exp, type) {
    this.exp = exp;
    this.type = type;
  }
  Generate(followsTable) {
    const left = this.exp.Generate(followsTable); // Generating child node
    console.log(this.exp, this.type);
    let firstPos = [];
    let lastPos = [];
    let anulable = undefined;
    // Anulable of parent node
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
    // Creating first and last id positions
    firstPos = left.firstPos;
    lastPos = left.lastPos;
    // Creating follows table
    if (this.type === "*" || this.type === "+") {
      lastPos.forEach((followId) => { // For every lastPos of left
        for (let index = 0; index < followsTable.length; index++) {
          const { id, follows } = followsTable[index];
          if (id == followId) { // Looking for id in follows table
            const newFollows = follows.concat(firstPos); //  the follows are firstPos of left
            followsTable[index].follows = newFollows;
            break;
          }
        }
      });
    }
    return ({
      left,
      right: null,
      id: this.type,
      firstPos,
      lastPos,
      anulable,
    });
  }
}
exports.UnaryOperators = UnaryOperators;
