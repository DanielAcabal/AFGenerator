const { argv } = require("node:process");
const parser = require("./Grammar/grammar.js");
const { AST } = require("./Generator/AST.js");

//const result = parser.parse("[ ( a.b | a.c )+ .d.a? ] # [a|b]#");
//const result = parser.parse("[L+|N+|L.(L|N)*|c.(L|N|R)*.c|S+]#")
const result = parser.parse("[s?.0*.(d+|d*.p.d+)]#")
const ast = new AST(result);
ast.Generate();
//console.log(ast.trees[0])
//console.log("Follows: ",ast.follows[0])

argv.forEach((value, index) => {
  console.log(index, value);
});
