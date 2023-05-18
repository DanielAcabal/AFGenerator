class AST {
  constructor(statements) {
    this.statements = statements;
    this.trees = []
    this.follows = []
  }
  Generate() {
    this.statements.forEach((element) => {
      const follows = []
      const result = element.Generate(follows);
      this.trees.push(result)
      this.follows.push(follows)
    });
  }
}
exports.AST = AST
