const endpoint =
	"https://api.jotform.com/form/251074062405952/payment-info?apiKey={ee8a7c7fde4d46d8c7f207e95e7eec0f}";
const container = document.getElementById("product-detail-container");

const urlParams = new URLSearchParams(window.location.search);
const pid = urlParams.get("pid");

import { addToCart } from "./utils.js";

if (!pid) {
	container.innerHTML = "<p>Product not found.</p>";
} else {
	fetch(endpoint)
		.then((res) => res.json())
		.then((data) => {
			const product = data.content.products.find((p) => p.pid === pid);

			if (!product) {
				container.innerHTML = "<p>Product not found.</p>";
				return;
			}

			const name = product.name;
			const desc = product.description;
			const price = product.price + "$";
			const images = JSON.parse(product.images || "[]");
			const imageURL = images[0] || "";

			container.innerHTML = `
        <div class="product-detail">
          <img src="${imageURL}" alt="${name}" class="product-image"/>
          <div class="product-info">
            <h1>${name}</h1>
            <p>${desc}</p>
            <p><strong>${price}</strong></p>
            <button class="add-to-cart" data-id="${pid}">Add to Cart</button>
          </div>
        </div>
      `;

			const addToCartButton = container.querySelector(".add-to-cart");
			addToCartButton.addEventListener("click", () => {
				const pid = addToCartButton.getAttribute("data-id");
				addToCart(pid);
			});
		})
		.catch((err) => {
			container.innerHTML = "<p>Error: " + err.message + "</p>";
		});
}
