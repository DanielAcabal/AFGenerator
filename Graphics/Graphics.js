const { Graph, Digraph } = require("graphviz-node");
const CryptoJs = require("crypto");
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
function followTable(followsT) {
  // Create new graph
  const g = new Digraph("followTable");

  const h1 = g.addHTMLNode("h1", { "shape": "none" });
  h1.setTableAttributes({
    "border": "0",
    "cellborder": "1",
    "cellspacing": "0",
    "cellpadding": "4",
  });
  h1.addRow([{ data: "Terminal", attributes: {} }, {
    data: "ID",
    attributes: {},
  }, { data: "Follow", attributes: {} }]);
  followsT.forEach(({ value, id, follows }) => {
    h1.addRow([{ data: value, attributes: {} }, { data: id, attributes: {} }, {
      data: follows.join(", "),
      attributes: {},
    }]);
  });

  g.render("example2");
}
function tree(tree) {
  const g = new Digraph("Tree");
  const attributes = {
    rankdir: "TB",
    concentrate: true,
  };
  const nodeAttributes = {
    shape: "record",
  };
  g.set(attributes);
  g.setNodesAttributes(nodeAttributes);
  postOrder(tree, g);
  g.render("tree");
}
function postOrder(root, graph) {
  if (!root) return "";
  // Children node
  const left = postOrder(root.left, graph);
  const right = postOrder(root.right, graph);
  // Creating and id for a node
  const hash = CryptoJs.createHash("sha256").update(
    JSON.stringify(root) + left + right,
  ).digest("hex").toString();
  
  const val = root.hasOwnProperty("value") ? root.value : root.id;
  const id = isNaN(root.id) ? "" : `|${root.id}`;
  // Creating node
  const parent = graph.addNode(hash, {
    label: `${root.firstPos.join(",")}|{ ${
      root.anulable ? "A" : "N"
    } |${val}${id}}|${root.lastPos.join(",")}`,
  });
  // Linking nodes
  if (left) {
    graph.addEdge(parent, left);
  }
  if (right) {
    graph.addEdge(parent, right);
  }
  return parent;
}
function Graphic() {
}
exports.AFD = AFD;
exports.transitionTable = transitionTable;
exports.followTable = followTable;
exports.tree = tree;
