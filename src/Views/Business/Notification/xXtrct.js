import { discountCalculator } from "../../../utils/BusinessLogic";

class xXtrct {
  maxify(data = []) {
		let copy = [...data];
		let maxi = [];
		copy.forEach((_item) => {
			if (typeof _item.order_products != "undefined") {
				_item.order_products.forEach((single) => {
					maxi.push({
						DATE: new Date(_item.timestamp).toDateString(),
						EMAIL: _item.customer_email,
						PHONE: _item.customer_phone_number || "N/A",
						ITEM_NAME: single.name,
						QUANTITY: single.quantity,
						STATUS: single.status,
						DISCOUNT: single.discount,
						TOTAL_PRICE: discountCalculator(single.price, single.discount),
					});
				});
			}
		});
		return maxi;
	}
}

export default new xXtrct();
