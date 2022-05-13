class Paginator {
  data = [];
  sml = 0;
  digest(data, length) {
    const rdata = [...data];
    const newData = [];
    while (rdata.length > 0) {
      const chunk = rdata.splice(0, length);
      newData.push(chunk);
    }
    this.data = [...newData];
    return this.data[this.sml];
  }
  prev() {
    if (!(this.sml == 0)) {
      this.sml -= 1;
      return this.data[this.sml];
    } else {
      this.sml = this.data.length - 1;
      return this.data[this.sml];
    }
  }
  forward() {
    if (!(this.sml == this.data.length - 1)) {
      this.sml += 1;
      return this.data[this.sml];
    } else {
      this.sml = 0;
      return this.data[this.sml];
    }
  }
}

export default new Paginator();
