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
        body.push({ ...item, uuid: item.uuid });
      }
    });

    likeArr.push({
      head: date,
      body: body,
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
          bo_ = item.order_products.map((pducts) => {
              if (pducts.status === look) {
                return pducts;
              }
            });
            bo_= bo_.filter((res) => typeof res != "undefined");
          body.push({ ...item, order_products: bo_ });
        } else {
          body.push({ ...item });
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

// function minify(body = []) {
//   let getEmails = [];
//   let newData = [];
//   body.map((item) => {
//     if (!getEmails.includes(item.customer_email)) {
//       getEmails.push(item.customer_email);
//     }
//   });
//   getEmails.map((email) => {
//     let pduts = [];
//     let phone = "";
//     body.map((item) => {
//       if (email === item.customer_email) {
//         phone = item.customer_phone_number;
//         item.order_products.forEach((it) => {
//           pduts.push({
//             ...it,
//             status: PreselectedValues.getStatusValueWithCode(item.status),
//           });
//         });
//       }
//     });
//     newData.push({ email, phone, pduts: pduts });
//   });
//   return newData;
// }
