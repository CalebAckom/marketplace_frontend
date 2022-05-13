import { PreselectedValues } from "../../../utils/PreselectedData";

function getDates(data) {
  let dates = [];
  data?.forEach((item) => {
    dates.push(new Date(item.timestamp).toDateString());
  });
  
  dates = [...new Set(dates)]
  return dates
    .map((date) => new Date(date))
    .sort((a, b) => b - a)
    .map((dat) => new Date(dat).toDateString());
}

export function getLikedDates(sampler) {
  const likeArr = [];
  for (let date of getDates(sampler)) {
    let body = [];
    sampler.forEach((item) => {
      if (date === new Date(item.timestamp).toDateString()) {
        body.push({ ...item });
      }
    });
    // console.log("ee", minify(body));
    likeArr.push({
      head: date,
      // body: body.map((item) => item.order_products),
      body: minify(body),
    });
  }
  return likeArr;
}

export function getLikedOfLook(sampler = [], look = "all") {
  look = PreselectedValues.getStatusCode(look);
  const likeArr = [];
  for (let date of getDates(sampler)) {
    let body = [];
    sampler.forEach((item) => {      
      let bo_ = [];
      if (date === new Date(item.timestamp).toDateString()) {
        if (typeof look != "undefined") {
         
          bo_ = item?.order_products
            .map((pducts) => {
              if (pducts.status === look) {                
                return pducts;
              }
            }).filter((res) => typeof res != "undefined");
                      
          body.push({ ...item, order_products: bo_ }); 
        } else {
          body.push({ ...item });   
          console.log('push',2)
        }
      }
      
    });
    
    likeArr.push({
      head: date,
      body: body,
    });
   
  }
  return likeArr;
}

function minify(body = []) {
  let getEmails = [];
  let newData = [];
  body.forEach((item) => {
    item.order_products.forEach((d_item) => {
      if (!getEmails.includes(d_item.owner_email)) {
        getEmails.push(d_item.owner_email);
      }
    });
  });
  getEmails.forEach((email) => {
    let pduts = [];
    let phone = "";
    body.forEach((item) => {
      item.order_products.forEach((d_item) => {
        if (email === d_item.owner_email) {
          phone = d_item.owner_phone;
          pduts.push({ ...d_item });
        }
      });
    });
    newData.push({ email, phone, order_products: pduts });
  });
  return newData;
}
