class Terminal {
  constructor(value, pos) {
    this.value = value;
    this.id = pos;
  }
  Generate(follows) {
    console.log(this.value,this.id)
    follows.push({value:this.value,id:this.id,follows:[]});
    
    return ({
      left: this.value,
      right: null,
      id: this.id,
      firstPos: [this.id],
      lastPos: [this.id],
      anulable: false,
    });
  }
}
exports.Terminal = Terminal
