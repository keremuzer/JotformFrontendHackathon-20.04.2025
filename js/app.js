import { addToCart } from "./utils.js";

const api_key = "ee8a7c7fde4d46d8c7f207e95e7eec0f";
const api_url = "https://api.jotform.com/form/";
const endpoint =
	"https://api.jotform.com/form/251074062405952/payment-info?apiKey={ee8a7c7fde4d46d8c7f207e95e7eec0f}";

const container = document.getElementById("product-container");

// log the response to the console
fetch(endpoint, {
	method: "GET",
})
	.then((response) => {
		if (!response.ok) {
			throw new Error("Network response was not ok " + response.statusText);
		}
		return response.json();
	})
	.then((data) => {
		console.log(data);
	})
	.catch((error) => {
		console.error("There was a problem with the fetch operation:", error);
	});

fetch(endpoint)
	.then((response) => {
		if (!response.ok) {
			throw new Error("Network response was not ok " + response.statusText);
		}
		return response.json();
	})
	.then((data) => {
		const products = data.content.products;

		products.forEach((product) => {
			const name = product.name;
			const description = product.description;
			const price = product.price ? `${product.price}$` : "0$";
			const pid = product.pid;

			let imageURL = "";
			try {
				const parsedImages = JSON.parse(product.images);
				imageURL = parsedImages.length > 0 ? parsedImages[0] : "";
			} catch (err) {
				imageURL = "";
			}

			const card = document.createElement("div");
			card.className = "product-card";

			card.innerHTML = `
          <img src="${imageURL}" alt="${name}" class="product-image" />
          <div class="product-info">
            <h2 class="product-name">${name}</h2>
            <p class="product-description">${description}</p>
            <p class="product-price">${price}</p>
            <button class="add-to-cart" data-id="${product.pid}">Add to Cart</button>
          </div>
        `;

			card.addEventListener("click", (e) => {
				if (!e.target.classList.contains("add-to-cart")) {
					window.location.href = `product.html?pid=${pid}`;
				}
			});

			const addToCartBtn = card.querySelector(".add-to-cart");

			addToCartBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				addToCart(product.pid);

				// log the cart to the console
				const cart = JSON.parse(localStorage.getItem("cart")) || [];
				console.log("Cart updated:", cart);
			});

			container.appendChild(card);
		});
	})
	.catch((error) => {
		console.error("Veri çekme sırasında hata oluştu:", error);
	});
