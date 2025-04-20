import { addToCart } from "./utils.js";

const api_key = "ee8a7c7fde4d46d8c7f207e95e7eec0f";
const api_url = "https://api.jotform.com/form/";
const endpoint =
	"https://api.jotform.com/form/251074062405952/payment-info?apiKey={ee8a7c7fde4d46d8c7f207e95e7eec0f}";

const container = document.getElementById("product-container");
const sortSelect = document.getElementById("sort-options-select");
const searchInput = document.getElementById("search-input");

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

async function loadProducts() {
	const localProducts = localStorage.getItem("products");

	let products;

	if (localProducts) {
		products = JSON.parse(localProducts);
	} else {
		const endpoint =
			"https://api.jotform.com/form/251074062405952/payment-info?apiKey=ee8a7c7fde4d46d8c7f207e95e7eec0f";

		try {
			const response = await fetch(endpoint);
			if (!response.ok)
				throw new Error("Network response was not ok " + response.statusText);
			const data = await response.json();
			products = data.content.products;
			localStorage.setItem("products", JSON.stringify(products));
		} catch (error) {
			console.error("Veri çekme sırasında hata oluştu:", error);
			return;
		}
	}

	function sortProducts(products, sortBy) {
		if (sortBy === "alphabetical") {
			return products.sort((a, b) => a.name.localeCompare(b.name));
		} else if (sortBy === "price-asc") {
			return products.sort((a, b) => a.price - b.price);
		} else if (sortBy === "price-desc") {
			return products.sort((a, b) => b.price - a.price);
		}
		return products;
	}

	function searchProducts(products, searchTerm) {
		return products.filter((product) => {
			return product.name.toLowerCase().includes(searchTerm.toLowerCase());
		});
	}
	sortSelect.addEventListener("change", () => {
		const sortedProducts = sortProducts(products, sortSelect.value);
		const searchTerm = searchInput.value;
		const filteredProducts = searchProducts(sortedProducts, searchTerm);
		renderProducts(filteredProducts);
	});

	searchInput.addEventListener("input", () => {
		const searchTerm = searchInput.value;
		const filteredProducts = searchProducts(products, searchTerm);
		const sortedProducts = sortProducts(filteredProducts, sortSelect.value);
		renderProducts(sortedProducts);
	});

	function renderProducts(products) {
		container.innerHTML = "";

		products.forEach((product) => {
			const { name, description, price = 0, pid } = product;

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
					<p class="product-price">${price}$</p>
					<button class="add-to-cart" data-id="${pid}">Add to Cart</button>
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
				addToCart(pid);
			});

			container.appendChild(card);
		});
	}
	renderProducts(products);
}

document.addEventListener("DOMContentLoaded", loadProducts);
