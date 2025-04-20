function addToCart(pid) {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];

	const existingProduct = cart.find((item) => item.pid === pid);

	if (existingProduct) {
		existingProduct.quantity += 1;
	} else {
		cart.push({ pid: pid, quantity: 1 });
	}

	localStorage.setItem("cart", JSON.stringify(cart));
	console.log("Cart updated:", cart);
}

export { addToCart };
