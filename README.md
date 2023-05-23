# AFGenerator

This project generates deterministic finite automata from a defined pattern using the tree method. It generates images of the structures used by this method:
- Binary tree
- Follows table
- Transition table
- Deterministic automaton
## Requirements
- [NodeJs](https://nodejs.org/en)
- [Graphviz](https://www.graphviz.org/)
- [pnpm](https://pnpm.io/es/)
## Local Setup
```bash
pnpm install
```
## Pattern
The patterns can be sequences of characters similar to regular expressions. The syntax is [\<pattern\>]#, where the symbol # is a separator, allowing the creation of a pattern list. The patterns use operators and operands, which are:
| Operator | Symbol  | Description | example |
| -------- | ------- | ----------- | ------- |
| Concatenation | . |  It combines two automata to form a new one in which the second automaton runs immediately after the first.| a.b |
| Union | \| | It creates an automaton that accepts any string accepted by at least one of the two input automata. | a\|b |
| Kleene Closure | * | It allows repeating an automaton zero or more times. | a* |
| Positive Closure | + | It allows repeating an automaton one or more times. | a+ |
| Optional | ? | It makes an automaton optional, meaning it can appear zero or one time. | a? |

[Check Examples](./examples/examples.txt)

## Usage
### Generate function
This function applies the tree method to each pattern and takes 2 parameters:
- Patterns : Sequences of ids, digits and operators
- Options : Specifies the generated outputs
  - path: Specifies the path where the images will be saved.
  - index: Indicates the pattern to be used from the pattern list
  - graphics: List of graphs to generate; -t [binary tree], -f [follows table], -s [transition table], -a [deterministic finite automaton]
## Example of usage
```js
Generate("[a]# [(b|a)+.c*]#", {
  path: "./examples/outputs",
  index: 1,
  graphics: ["-t", "-f", "-s", "-a"],
});
```
Generated outputs
- [Binary tree](./examples/outputs/tree1.svg)
- [Follows table](./examples/outputs/FollowTable1.svg)
- [Transition table](./examples/outputs/TransitionTable1.svg)
- [DFA](./examples/outputs/fda1.svg)
## TO DO 
- [ ] Add docString for further development
- [ ] Improve the grammar to allow more operands
- [ ] Generate outputs with different extensions (dot, png, jpg)
- [ ] Add option to generate all the structures for each pattern 
- [ ] Add option to return the dot structure
- [ ] _*Dream*_ Convert it into a Node.js package that can be executed in the console or module
