class AST {
  constructor(statements) {
    this.statements = statements;
    this.trees = [];
    this.follows = [];
    this.terminals = [];
    this.transitionTables = [];
  }
  Generate() {
    this.statements.forEach((element, index) => {
      const follows = [];
      const terminal = new Map();
      const result = element.Generate(follows, terminal);
      this.trees.push(result);
      this.follows.push(follows);
      this.terminals.push(terminal);
      this.transitionTables.push([]);
      this.createTransitionTable(index);
    });
  }
  createTransitionTable(index) {
    if (index >= this.follows.length) return;
    if (index >= this.trees.length) return;
    if (index >= this.terminals.length) return;
    if (index >= this.transitionTables.length) return;
    const followsTable = this.follows[index];
    const tree = this.trees[index];
    const terminal = this.terminals[index];
    const transitionTable = this.transitionTables[index];

    const X0 = [...tree.firstPos];
    const states = [X0];

    let n = 0;
    while (n < states.length) {
      const reduced = this.reduceStates(states[n], followsTable);
      this.createStates(reduced, states, terminal, transitionTable);
      n++;
    }
  }
  reduceStates(idFollows, followsTable) {
    const reduced = new Map();
    // Reducing States
    idFollows.forEach((element) => {
      // Looking for terminal in followsTable by id
      const { value, follows } = followsTable.find((value) =>
        value.id === element
      );
      if (reduced.has(value)) {
        const previousFollow = reduced.get(value);
        const newFollow =  [...new Set(previousFollow.concat(follows))]
        reduced.set(value, newFollow.sort((a,b)=>a-b));
      } else {
        reduced.set(value, [...follows]);
      }
    });
    return reduced;
  }
  createStates(reduced, states, terminal, transitionTable) {
    // Checking news states
    const newState = new Map(terminal);
    reduced.forEach((element, index) => {
      const has = states.findIndex((value) => compareLists(value, element));
      if (has < 0 && element.length > 0) {
        // Adding new state
        states.push(element);
        // Creating state in transitionTable
        newState.set(index, states.length - 1);
      } else {
        // Pointing state
        newState.set(index, has);
      }
    });
    transitionTable.push(newState);
    
  }
}
function compareLists(list1, list2) {
  if (list1.length != list2.length) return false;
  for (let index = 0; index < list1.length; index++) {
    if (list1[index] !== list2[index]) return false;
  }
  return true;
}
exports.AST = AST;
