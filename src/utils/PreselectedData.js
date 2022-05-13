export const PreselectedValues = {
  FILTER_LOCATION: [
    { key: "ac", local: "Accra" },
    { key: "ks", local: "Kumasi" },
    { key: "ta", local: "Tamale" },
    { key: "tk", local: "Takoradi" },
    { key: "sk", local: "Sekondi" },
    { key: "ob", local: "Obuasi" },
    { key: "tm", local: "Tema" },
    { key: "cc", local: "Cape Coast" },
    { key: "kf", local: "Koforidua" },
    { key: "ho", local: "Ho" },
    { key: "wa", local: "Wa" },
    { key: "bw", local: "Bawku" },
    { key: "sy", local: "Sunyani" },
    { key: "bl", local: "Bolgatanga" },
    { key: "af", local: "Aflao" },
    { key: "nk", local: "Nkawkaw" },
    { key: "he", local: "Hohoe" },
    { key: "wn", local: "Winneba" },
    { key: "bk", local: "Berekum" },
    { key: "th", local: "Techiman" },
    { key: "sw", local: "Sefwi Wiawso" },
    { key: "go", local: "Goaso" },
    { key: "dm", local: "Dambai" },
    { key: "na", local: "Nalerigu" },
    { key: "da", local: "Damongo" },
  ],
  PriceMarks: [
    {
      value: 0,
      scaledValue: 1000,
      // label: "0"
    },
    {
      value: 100,
      scaledValue: 5000,
      // label: "1k"
    },
    {
      value: 1000,
      scaledValue: 10000,
      // label: "5k"
    },
    {
      value: 5000,
      scaledValue: 25000,
      // label: "10k"
    },
    {
      value: 10000,
      scaledValue: 50000,
      // label: "25k"
    },
    {
      value: 20000,
      scaledValue: 100000,
      // label: "50k"
    },
    {
      value: 30000,
      scaledValue: 250000,
      // label: "100k"
    },
    {
      value: 50000,
      scaledValue: 500000,
      // label: "250k"
    },
    {
      value: 100000,
      scaledValue: 1000000,
      // label: "500k"
    },
    {
      value: 200000,
      scaledValue: 1000000,
      // label: "1M"
    },
  ],
  PRODUCT_CATEG: [
    { key: "FTF", name: "Fashion, Textiles and Fabrics" },
    { key: "JGP", name: "Jewellery, Gifts and Parcels" },
    { key: "AT", name: "Automobile and Transport" },
    { key: "SSF", name: "Shoes, Sandals and Footwears" },
    { key: "BOS", name: "Books and Office Supplies" },
    { key: "LFD", name: "Lights, Furniture and Decor" },
    { key: "BeL", name: "Beauty and Lifestyle" },
    { key: "BaL", name: "Bags and Luggage" },
    { key: "EGG", name: "Electronics, Gadgets and Garden Equipment" },
    { key: "TBP", name: "Toiletries / Baby Products" },
    { key: "PTC", name: "Phones, Tablets and Computers" },
    { key: "GrP", name: "Groceries and Provisions" },
    { key: "SE", name: "services" },
    { key: "ITM", name: "Industrial Tools and Machinery" },
    { key: "REP", name: "Real Estates and Properties" },
    { key: "HeP", name: "Health and Pharmaceuticals" },
    { key: " PlP", name: "Plastics and Rubbers" },
    { key: "HE", name: "Hardware Equipment" },
    { key: " MI", name: "Musical Instruments" },
    { key: "BCM", name: "Building and Construction Materials" },
    { key: "SFE", name: "Safety Equipment" },
    { key: " FDS", name: "Food, Drinks and Snacks" },
    { key: "UGK", name: "Utensils, Glassware and Kitchenware" },
    { key: "PC", name: "Paints and Chemicals" },
  ],
  REGIONS: [
    { as: "Ashanti" },
    { ba: "Brong Ahafo Region" },
    { be: "Bono-East Region" },
    { ah: "Ahafo Region" },
    { cr: "Central Region" },
    { er: "Eastern Region" },
    { gr: "Greater Accra Region" },
    { nr: "Northern Region" },
    { sa: "Savannah Region" },
    { ne: "North East Region" },
    { ue: "Upper East Region" },
    { uw: "Upper West Region" },
    { ot: "Oti Region" },
    { wr: "Western Region" },
    { wn: "Western-North Region" },
    { vr: "Volta Region" },
  ],
  getRegionDefault() {
    return "- Select your region -";
  },
  getRegionValues() {
    return this.REGIONS.map((e) => Object.entries(e)[0][1]);
  },
  getRegionCode(region) {
    let data = this.REGIONS.filter((e) => {
      return Object.entries(e).find((e) => e[1] === region);
    });
    return [...Object.keys(data[0])][0];
  },
  getRegionValueWithCode(code) {
    let data = this.REGIONS.filter((e) => {
      return Object.entries(e).find((e) => e[0] === code);
    });
    return data[0][code];
  },
  CATEGORY: [
    { "AF&F": "Agriculture, Fishing and Forestry" },
    { "AB&M": "Administration, Business and Management" },
    { "CI&T": "Computing, IT and Telecom" },
    { "C&S": "Consulting and Strategy" },
    { "DA&C": "Design, Arts and Crafts" },
    { "EDU&T": "Education and Training" },
    { ENG: "Engineering" },
    { EES: "Entertainment, Events and Sports" },
    { "F&T": "Fashion and Textiles" },
    { FS: "Financial Services" },
    { "GA&A": "Garage Services, Automotive and Aviation" },
    { "H&B": "Hairdressing and Beauty" },
    { "HP&S": "Health care, Pharmaceuticals and Safety" },
    { "HC&T": "Hospitality, Catering and Tourism" },
    { "L&C": "Legal and Court Services" },
    { "M&P": "Manufacturing and Production" },
    { "M&C": "Media and Communications" },
    { MIN: "Mining" },
    { "NN&C": "NGO, NPO and Charity" },
    { "O&G": "Oil and Gas" },
    { "P&P": "Print and Publishing" },
    { "M&A": "Marketing and Advertising" },
    { "RE&PS": "Real Estates and Property Services" },
    { HR: "Recruitment" },
    { "R&CS": "Retail and Customer Services" },
    { "SU&PS": "Security, Uniformed and Protective Services" },
    { "SW&CS": "Social Work and Caring Services" },
    { "TD&L": "Transport, Distribution and Logistics" },
  ],
  getCategoryDefault() {
    return "- Select category -";
  },
  getCategoriesValues() {
    return this.CATEGORY.map((e) => Object.entries(e)[0][1]);
  },
  getCategoryCode(category) {
    if (category) {
      let data = this.CATEGORY.filter((e) => {
        return Object.entries(e).find((e) => e[1] === category);
      });
      return [...Object.keys(data[0])][0];
    } else {
      return "";
    }
  },
  getCategoryValueWithCode(code) {
    if (code) {
      let data = this.CATEGORY.filter((e) => {
        return Object.entries(e).find((e) => e[0] === code);
      });
      // console.log(data[0][code]);
      return data[0][code];
    } else {
      return "";
    }
  },
  PRODUCT_CATEGORY: [
    { FTF: "Fashion, Textiles and Fabrics" },
    { JGP: "Jewellery, Gifts and Parcels" },
    { SSF: "Shoes, Sandals and Footwears" },
    { AT: "Automobile and Transport" },
    { BOS: "Books and Office Supplies" },
    { LFD: "Lights, Furniture and Decor" },
    { BeL: "Beauty and Lifestyle" },
    { BaL: "Bags and Luggage" },
    { EGG: "Electronics, Gadgets and Garden Equipment" },
    { TBP: "Toiletries / Baby Products" },
    { PTC: "Phones, Tablets and Computers" },
    { GrP: "Groceries and Provisions" },
    { SE: "services" },
    { ITM: "Industrial Tools and Machinery" },
    { REP: "Real Estates and Properties" },
    { HeP: "Health and Pharmaceuticals" },
    { PlP: "Plastics and Rubbers" },
    { HE: "Hardware Equipment" },
    { MI: "Musical Instruments" },
    { BCM: "Building and Construction Materials" },
    { SFE: "Safety Equipment" },
    { FDS: "Food, Drinks and Snacks" },
    { UGK: "Utensils, Glassware and Kitchenware" },
    { PC: "Paints and Chemicals" },
  ],
  getProductCategories() {
    return this.PRODUCT_CATEGORY.map((e) => Object.entries(e)[0][1]);
  },
  getProductCategoryCode(category) {
    if (category) {
      let data = this.PRODUCT_CATEGORY.filter((e) => {
        return Object.entries(e).find((e) => e[1] === category);
      });
      return [...Object.keys(data[0])][0];
    } else {
      return "";
    }
  },
  getProductCategoryValueWithCode(code) {
    if (code) {
      let data = this.PRODUCT_CATEGORY.filter((e) => {
        return Object.entries(e).find((e) => e[0] === code);
      });
      // console.log(data[0][code]);
      return data[0][code];
    } else {
      return "";
    }
  },
  PRODUCT_TYPE: [{ PR: "Product" }, { SE: "Services" }],
  getProductTypes() {
    return this.PRODUCT_TYPE.map((e) => Object.entries(e)[0][1]);
  },
  getProductTypeCode(category) {
    if (category) {
      let data = this.PRODUCT_TYPE.filter((e) => {
        return Object.entries(e).find((e) => e[1] === category);
      });
      return [...Object.keys(data[0])][0];
    } else {
      return "";
    }
  },
  getProductTypeValueWithCode(code) {
    if (code) {
      let data = this.PRODUCT_TYPE.filter((e) => {
        return Object.entries(e).find((e) => e[0] === code);
      });
      // console.log(data[0][code]);
      return data[0][code];
    } else {
      return "";
    }
  },

  LOCATION_CHOICES: [
    { ac: "Accra" },
    { ks: "Kumasi" },
    { ta: "Tamale" },
    { tk: "Takoradi" },
    { sk: "Sekondi" },
    { ob: "Obuasi" },
    { tm: "Tema" },
    { cc: "Cape Coast" },
    { kf: "Koforidua" },
    { ho: "Ho" },
    { wa: "Wa" },
    { bw: "Bawku" },
    { sy: "Sunyani" },
    { bl: "Bolgatanga" },
    { af: "Aflao" },
    { nk: "Nkawkaw" },
    { he: "Hohoe" },
    { wn: "Winneba" },
    { bk: "Berekum" },
    { th: "Techiman" },
    { sw: "Sefwi Wiawso" },
    { go: "Goaso" },
    { dm: "Dambai" },
    { na: "Nalerigu" },
    { da: "Damongo" },
  ],
  getTownDefault() {
    return "- Select your city -";
  },
  getTownValues() {
    return this.LOCATION_CHOICES.map((e) => Object.entries(e)[0][1]);
  },
  getTownCode(city) {
    let data = this.LOCATION_CHOICES.filter((e) => {
      return Object.entries(e).find((e) => e[1] === city);
    });
    return [...Object.keys(data[0])][0];
  },
  getTownValueWithCode(code) {
    let data = this.LOCATION_CHOICES.filter((e) => {
      return Object.entries(e).find((e) => e[0] === code);
    });
    if (data[0]) {
      return data[0][code];
    } else {
      return "";
    }
  },
  TOWNSVSRegions: [
    { "Greater Accra Region": ["Accra", "Tema"] },
    { Ashanti: ["Kumasi", "Obuasi"] },
    { "Northern Region": ["Tamale"] },
    { "Western Region": ["Takoradi", "Sekondi"] },
    { "Western-North Region": ["Sefwi Wiawso"] },
    { "Central Region": ["Cape Coast", "Winneba"] },
    { "Eastern Region": ["Koforidua", "Nkawkaw"] },
    { "Ahafo Region": ["Goaso"] },
    { "Volta Region": ["Ho", "Aflao", "Hohoe"] },
    { "Upper West Region": ["Wa"] },
    { "Upper East Region": ["Bawku", "Bolgatanga"] },
    { "Brong Ahafo Region": ["Sunyani", "Berekum"] },
    { "Bono-East Region": ["Techiman"] },
    { "Oti Region": ["Dambai"] },
    { "North East Region": ["Nalerigu"] },
    { "Savannah Region": ["Damongo"] },
  ],
  getRegionFromTown(town) {
    console.log("town => ", town);
    let region = "";
    this.TOWNSVSRegions.map((current, ridx) => {
      return Object.entries(current).find((e) =>
        e[1].filter((n) => {
          if (n === town) {
            region = Object.keys(this.TOWNSVSRegions[ridx])[0];
          }
        })
      );
    });
    return region;
  },
  getTownFromCode(tCode) {
    console.log("tCode", tCode);
    let data = this.TOWNSVSRegions.filter((e) => {
      return Object.entries(e).find((e) => e[1] === tCode);
    });
    if (data[0]) {
      return [...Object.keys(data[0])][0];
    }
  },
  STATUS_CODE: [
    { o: "ordered" },
    { p: "pending" },
    { c: "cancelled" },
    { d: "delivered" },
  ],
  getStatusCode(city) {
    let data = this.STATUS_CODE.filter((e) => {
      return Object.entries(e).find((e) => e[1] === city);
    });
    if (data[0]) {
      return [...Object.keys(data[0])][0];
    }
  },
  getStatusValueWithCode(code) {
    if (!code) {
      return "";
    }
    let data = this.STATUS_CODE.filter((e) => {
      return Object.entries(e).find((e) => e[0] === code);
    });
    if (data[0]) {
      return data[0][code];
    } else {
      return "";
    }
  },
};
