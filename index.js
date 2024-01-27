const fs = require("fs");
const path = require("path");
const parser = require("./Grammar/grammar.js");
const { AST } = require("./Generator/AST.js");
const { graph } = require(
  "./Graphics/Graphics.js",
);
/**
 * Create the graphs 
 * @param  {String} patterns List of pattern like [<Pattern>]# , ... 
 * @param  {Object} options  Required {path} Optionals { index,graphics}
 */
function Generate(patterns, options) {
  const result = parser.parse(patterns);
  const ast = new AST(result);
  ast.Generate();
  const { trees, follows, transitionTables, terminals } = ast;
  if (!options.path) return;
  createDirectory(options.path).then(() => {
    if (options.hasOwnProperty("index") && options.hasOwnProperty("graphics")) {
      graph({ trees, follows, transitionTables, terminals }, options);
    }
  }).catch((err) => console.log(err));
}
function createDirectory(userPath) {
  const directories = path.extname(userPath)
    ? path.dirname(userPath)
    : userPath;
  return new Promise((resolve, reject) => {
    fs.mkdir(directories, { recursive: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
// Main function
Generate("[L+|N+|L.(L|N)*|c.(L|N|R)*.c|S+]#", {
  path: "./examples/outputs3",
  index: 0,
  graphics: ["-t", "-f", "-s", "-a"],
});
