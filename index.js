const { argv } = require("node:process");
const parser = require("./Grammar/grammar.js");
const { AST } = require("./Generator/AST.js");

const result = parser.parse("[a.x]#");
const ast = new AST(result);
ast.Generate();

argv.forEach((value, index) => {
  console.log(index, value);
});
