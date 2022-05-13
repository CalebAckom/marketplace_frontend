export function checkPassword(string) {
	let checkSpecial = /[*@!#%&()^~{}]+/.test(string),
		checkUpper = /[A-Z]+/.test(string),
		checkLower = /[a-z]+/.test(string),
		checkNum = /[0-9]+/.test(string),
		r = false;

	if (string.length >= 8) {
		if (checkSpecial) {
			r = true;
		}
	}

	return r;
}

function getTotal() {
	// let total = 0;
	// const drp = ro_items.map((ro) =>
	//   ro.body
	//     .map((pds) =>
	//       pds.pduts.map(
	//         (prc) => discountCalculator(prc.price, prc.discount) * prc.quantity
	//       )
	//     )
	//     .reduce((a, b) => {
	//       return Number(a) + Number(b);
	//     })
	// );
	// console.log(drp)
	// drp.map((e)=>{
	//   if(typeof e === 'object'){
	//     e.map((p)=> total+=p)
	//   }else {
	//     if(e != NaN){
	//       total += e;
	//     }
	//   }
	// })
	// return total;
}
