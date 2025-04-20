document.addEventListener("DOMContentLoaded", () => {
	const cartContainer = document.getElementById("cart-items");
	const totalAmountEl = document.getElementById("total-amount");

	const cart = JSON.parse(localStorage.getItem("cart")) || [];
	const products = JSON.parse(localStorage.getItem("products")) || [];

	if (cart.length === 0) {
		cartContainer.innerHTML = "<p>Your cart is empty.</p>";
		totalAmountEl.textContent = "0.00";
		return;
	}

	cartContainer.innerHTML = "";

	let total = 0;

	cart.forEach((item) => {
		const product = products.find((p) => p.pid === item.pid);
		if (!product) return;

		let imageURL = "";
		try {
			const parsedImages = JSON.parse(product.images || "[]");
			imageURL = parsedImages.length > 0 ? parsedImages[0] : "";
		} catch (err) {
			imageURL = "";
		}

		const itemTotal = product.price * item.quantity;
		total += itemTotal;

		const productElement = document.createElement("div");
		productElement.classList.add("cart-item");

		productElement.innerHTML = `
      <img src="${imageURL}" alt="${product.name}" class="cart-item-image" />
      <div class="cart-item-info">
        <h2 class="cart-item-name">${product.name}</h2>
        <p class="cart-item-description">${product.description}</p>
        <p class="cart-item-price">$${product.price}</p>
      </div>
      <div class="cart-item-quantity">
        <p>Quantity:</p>
        <span class="quantity">${item.quantity}</span>
      </div>
      <div class="cart-item-total-price">
        <p>Total: <span class="total-price">$${itemTotal.toFixed(2)}</span></p>
      </div>
    `;

		cartContainer.appendChild(productElement);
	});

	totalAmountEl.textContent = total.toFixed(2);
});
