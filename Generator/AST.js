class AST {
  constructor(statements) {
    this.statements = statements;
  }
  Generate() {
    this.statements.forEach((element) => {
      const result = element.Generate();
      console.log(result)
    });
  }
}
exports.AST = AST
