const cartContainer = document.getElementById("cart-items");

function loadCart() {
	const cart = JSON.parse(localStorage.getItem("cart")) || [];
	const products = JSON.parse(localStorage.getItem("products")) || [];

	let totalAmount = 0;

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
		totalAmount += itemTotal;

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
        <button class="decrease-quantity">-</button>
        <span class="quantity">${item.quantity}</span>
        <button class="increase-quantity">+</button>
      </div>
      <div class="cart-item-total-price">
        <p>Total: <span class="total-price">$${itemTotal.toFixed(2)}</span></p>
      </div>
    `;

		productElement
			.querySelector(".increase-quantity")
			.addEventListener("click", () => {
				item.quantity += 1;
				updateProductQuantity(item.pid, item.quantity);
				productElement.querySelector(".quantity").textContent = item.quantity;
				productElement.querySelector(".total-price").textContent = `$${(
					product.price * item.quantity
				).toFixed(2)}`;
				updateCartTotal();
			});

		productElement
			.querySelector(".decrease-quantity")
			.addEventListener("click", () => {
				if (item.quantity > 1) {
					item.quantity -= 1;
					updateProductQuantity(item.pid, item.quantity);
					productElement.querySelector(".quantity").textContent = item.quantity;
					productElement.querySelector(".total-price").textContent = `$${(
						product.price * item.quantity
					).toFixed(2)}`;
					updateCartTotal();
				}
			});

		cartContainer.appendChild(productElement);
	});

	updateCartTotal();
}

function updateProductQuantity(pid, quantity) {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	const product = cart.find((item) => item.pid === pid);
	if (product) {
		product.quantity = quantity;
		localStorage.setItem("cart", JSON.stringify(cart));
	}
}

function updateCartTotal() {
	const cart = JSON.parse(localStorage.getItem("cart")) || [];
	const products = JSON.parse(localStorage.getItem("products")) || [];

	let total = 0;
	cart.forEach((item) => {
		const product = products.find((p) => p.pid === item.pid);
		if (product) {
			total += product.price * item.quantity;
		}
	});

	const totalAmountElement = document.getElementById("total-amount");
	if (totalAmountElement) {
		totalAmountElement.textContent = total.toFixed(2);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const cart = JSON.parse(localStorage.getItem("cart")) || [];

	if (cart.length === 0) {
		cartContainer.innerHTML = "<p>Your cart is empty.</p>";
	} else {
		loadCart();
	}
});
