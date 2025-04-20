const cartContainer = document.getElementById("cart-items");

function loadCart() {
	const cart = JSON.parse(localStorage.getItem("cart")) || [];

	cart.forEach((item) => {
		fetch(
			`https://api.jotform.com/form/251074062405952/payment-info?apiKey={ee8a7c7fde4d46d8c7f207e95e7eec0f}`
		)
			.then((res) => res.json())
			.then((data) => {
				const product = data.content.products.find((p) => p.pid === item.pid);

				const productElement = document.createElement("div");
				productElement.classList.add("cart-item");
				productElement.innerHTML = `
          <img src="${JSON.parse(product.images)[0]}" alt="${
					product.name
				}" class="cart-item-image" />
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
            <p>Total: <span class="total-price">$${(
							product.price * item.quantity
						).toFixed(2)}</span></p>
          </div>
        `;

				productElement
					.querySelector(".increase-quantity")
					.addEventListener("click", () => {
						item.quantity += 1;
						updateProductQuantity(item.pid, item.quantity);
						productElement.querySelector(".quantity").textContent =
							item.quantity;
						productElement.querySelector(".total-price").textContent = `$${(
							product.price * item.quantity
						).toFixed(2)}`;
					});

				productElement
					.querySelector(".decrease-quantity")
					.addEventListener("click", () => {
						if (item.quantity > 1) {
							item.quantity -= 1;
							updateProductQuantity(item.pid, item.quantity);
							productElement.querySelector(".quantity").textContent =
								item.quantity;
							productElement.querySelector(".total-price").textContent = `$${(
								product.price * item.quantity
							).toFixed(2)}`;
						}
					});

				cartContainer.appendChild(productElement);
			})
			.catch((error) => {
				console.error("Error fetching product data:", error);
			});
	});
}

function updateProductQuantity(pid, quantity) {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];

	const product = cart.find((item) => item.pid === pid);

	if (product) {
		product.quantity = quantity;
		localStorage.setItem("cart", JSON.stringify(cart));
	} else {
		console.error(`Product with pid ${pid} not found in the cart`);
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
