class Terminal {
  constructor(value, pos) {
    this.value = value;
    this.id = pos;
  }
  Generate() {
    console.log(this.value,this.id)
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
