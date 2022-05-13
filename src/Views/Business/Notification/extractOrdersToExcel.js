import { discountCalculator } from "../../../utils/BusinessLogic";

const extractOrdersToExcel = (data) => {
	let orderDetails = [];
	console.dir(data)
	data.forEach((item) => {
		const itemDetails = item.order_products[0];
		const customerDetails = item.body[0];
		const customerContact = item.customer_phone_number
			? item.customer_phone_number
			: "not provided";

		console.log(itemDetails)
		const itemPrice = discountCalculator(itemDetails?.price,itemDetails?.discount)
			
		orderDetails.push({
			PURCHASE_DATE: item.head,
			CUSTOMER_EMAIL: item.customer_email,
			CUSTOMER_CONTACT: customerContact,
			PRODUCT_NAME: itemDetails?.name,
			QUANTITY: itemDetails?.quantity,
			ITEM_PRICE: itemPrice,
			TOTAL_PRICE: itemDetails?.quantity * itemPrice,
		});
	});

	return orderDetails;
};

export default extractOrdersToExcel;
