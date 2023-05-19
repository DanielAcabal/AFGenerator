const { argv } = require("node:process");
const parser = require("./Grammar/grammar.js");
const { AST } = require("./Generator/AST.js");

//const result = parser.parse("[ a .( a | b )* .b ] #")
//const result = parser.parse("[ ( a.b | a.c )+ .d.a? ] # ");
//const result = parser.parse("[L+|N+|L.(L|N)*|c.(L|N|R)*.c|S+]#")
//const result = parser.parse("[s?.0*.(d+|d*.p.d+)]#")
//const result = parser.parse("[(a+|a+|a.b.c+)+.c*]#")
//const result = parser.parse("[a*.(a.b+).b.a+.(b|a)*.b]#")
//const result = parser.parse("[a.a+.b|c.b*]#[a|b|c?.a+.b*]# [a+.b+.c+|a]#")
const result = parser.parse("[(a+.b|b.a+|a+.a|b.b+)*.c]#")

const ast = new AST(result);
ast.Generate();
//console.log("Treess:",ast.trees[0])
console.log("Follows: ",ast.follows[0])
ast.transitionTables[0].forEach((element,index) => {
  console.log(index,element)
});
argv.forEach((value, index) => {
  console.log(index, value);
});
