class Terminal {
  constructor(value, pos) {
    this.value = value;
    this.id = pos;
  }
  Generate(follows,terminal) {
    // console.log(this.value,this.id)
    follows.push({value:this.value,id:this.id,follows:[]});
    terminal.set(this.value,null)
    
    return ({
      left: null,
      right: null,
      value: this.value,
      id: this.id,
      firstPos: [this.id],
      lastPos: [this.id],
      anulable: false,
    });
  }
}
exports.Terminal = Terminal
