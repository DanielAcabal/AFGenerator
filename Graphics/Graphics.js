const { Graph, Digraph } = require("graphviz-node");
function AFD(transitionTable) {
  const graphAttributes = {
    "rankdir": "LR",
  };
  const g = new Digraph("AFD");
  g.set(graphAttributes);
  const nodes = transitionTable.map((item, index) => {
    const state = g.addNode(`S${index}`, {
      shape: item.get("#") ? "doublecircle" : "circle",
    });
    item.forEach((value, index) => {
      if (!value || value === true) return;

      g.addEdge(state, `S${value}`, { label: index });
    });
    return state;
  });
  g.render("example");
}
function transitionTable(transitionTable, terminals) {
  // Create new graph
  const g = new Digraph("TransitionTable");

  const h1 = g.addHTMLNode("h1", { "shape": "none" });
  h1.setTableAttributes({
    "border": "0",
    "cellborder": "1",
    "cellspacing": "0",
    "cellpadding": "4",
  });
  const keys = Array.from(terminals.keys()).map((value, index) => {
    return ({ data: value, attributes: { port: `port${index}` } });
  });
  h1.addRow([{ data: "State", attributes: {} }, ...keys]);
  transitionTable.forEach((value, index) => {
    let finalState = false;
    const transitions = Array.from(value).map(([key, value]) => {
      finalState = value === true;
      return {
        data: value && !finalState ? `S${value}` : "",
        attributes: {},
      };
    });
    h1.addRow([{
      data: `S${index}`,
      attributes: { bgcolor: finalState ? "red" : "white" },
    }, ...transitions]);
  });

  g.render("example1");
}
function Graphic() {
}
exports.AFD = AFD;
exports.transitionTable = transitionTable;
