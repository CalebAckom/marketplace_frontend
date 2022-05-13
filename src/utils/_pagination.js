const data =  [
  { key:"ac", local:"Accra" },
  { key:"ks", local:"Kumasi" },
  { key:"ta", local:"Tamale" },
  { key:"tk", local:"Takoradi" },
  { key:"sk", local:"Sekondi" },
  { key:"ob", local:"Obuasi" },
  { key:"tm", local:"Tema" },
  { key:"cc", local:"Cape Coast" },
  { key:"kf", local:"Koforidua" },
  { key:"ho", local:"Ho" },
  { key:"wa", local:"Wa" },
  { key:"bw", local:"Bawku"},
  { key:"sy", local:"Sunyani" },
  { key:"bl", local:"Bolgatanga" },
  { key:"af", local:"Aflao" },
  { key:"nk", local:"Nkawkaw" },
  { key:"he", local:"Hohoe" },
  { key:"wn", local:"Winneba" },
  { key:"bk", local:"Berekum" },
  { key:"th", local:"Techiman" },
  { key:"sw", local:"Sefwi Wiawso" },
  { key:"go", local:"Goaso" },
  { key:"dm", local:"Dambai" },
  { key:"na", local:"Nalerigu" },
  { key:"da", local:"Damongo" },
]
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

// const pgt = new Paginator();

// console.log(pgt.digest(data,10));
// console.log(pgt.forward(data,10));
// console.log(pgt.forward(data,10));
// console.log(pgt.forward(data,10));