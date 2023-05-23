const cmd = require("node:child_process");
const { Digraph } = require("graphviz-node");
const CryptoJs = require("crypto");
function AFD(transitionTable, name) {
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
  render(g.toDot(), name);
}
function transitionTable(transitionTable, terminals, name) {
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

  render(g.toDot(), name);
}
function followTable(followsT, name) {
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

  render(g.toDot(), name);
}
function tree(tree, name) {
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
  render(g.toDot(), name);
}
function render(content, name) {
  cmd.exec(`echo '${content}'| dot -Tsvg > ${name}.svg`, (err, out) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`PNG generated on ${name}`,out);
  });
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
function graph({ trees, follows, transitionTables, terminals }, options) {
  const { path, index, graphics } = options;
  for (const graphic of graphics) {
    switch (graphic) {
      case "-t":
        tree(trees[index], `${path}/tree${index}`);
        break;
      case "-f":
        followTable(follows[index], `${path}/FollowTable${index}`);
        break;
      case "-s":
        transitionTable(
          transitionTables[index],
          terminals[index],
          `${path}/TransitionTable${index}`,
        );
        break;
      default:
        AFD(transitionTables[index], `${path}/dfa${index}`);
        break;
    }
  }
}
exports.graph = graph;
exports.AFD = AFD;
exports.transitionTable = transitionTable;
exports.followTable = followTable;
exports.tree = tree;
