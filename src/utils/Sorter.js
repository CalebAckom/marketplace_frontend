
class Sorter {
  data = [
    {
      customer_email: "sohn3@visieonl.com",
      timestamp: "2022-02-22T09:47:06.351073Z",
      order_products: [
        {
          category: "FTF",
          description: "you can get",
          discount: 6,
          img: "https://community-product-media.s3.eu-west-1.amazonaws.com/media/products/yyew_PpBswD8.jpg",
          name: "Fashion",
          owner_email: "business1@mail.com",
          owner_phone: "",
          price: "300.00",
          product: 141,
          product_type: "PR",
          quantity: 1,
          uuid: "a6e45af2e8eb4dcab84aef6c792639c0",
        },
        {
          category: "FTF",
          description: "you can get",
          discount: 6,
          img: "https://community-product-media.s3.eu-west-1.amazonaws.com/media/products/yyew_PpBswD8.jpg",
          name: "Fashion",
          owner_email: "business1@mail.com",
          owner_phone: "",
          price: "300.00",
          product: 141,
          product_type: "PR",
          quantity: 1,
          uuid: "a6e45af2e8eb4dcab84aef6c792639c0",
        },
      ],
    },
  ];
  sortDate() {
    const newData = [];
    let chunk = [];
    for (let item of this.data) {
      this.data.forEach((i) => {
        if (
          new Date(item.timestamp).toDateString() ==
          new Date(i.timestamp).toDateString()
        ) {
        }
      });
    }
  }
  sortName() {}
  sortByWorth() {}
}
