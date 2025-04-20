import { addToCart } from "./utils.js";

const container = document.getElementById("product-detail-container");
const urlParams = new URLSearchParams(window.location.search);
const pid = urlParams.get("pid");

if (!pid) {
	container.innerHTML = "<p>Product not found.</p>";
} else {
	const products = JSON.parse(localStorage.getItem("products") || "[]");
	const product = products.find((p) => p.pid === pid);

	if (!product) {
		container.innerHTML = "<p>Product not found.</p>";
	} else {
		const { name, description, price, images } = product;
		let imageURL = "";

		try {
			const parsedImages = JSON.parse(images || "[]");
			imageURL = parsedImages.length > 0 ? parsedImages[0] : "";
		} catch (err) {
			imageURL = "";
		}

		container.innerHTML = `
      <div class="product-detail">
        <img src="${imageURL}" alt="${name}" class="product-image"/>
        <div class="product-info">
          <h1>${name}</h1>
          <p>${description}</p>
          <p><strong>${price}$</strong></p>
          <button class="add-to-cart" data-id="${pid}">Add to Cart</button>
        </div>
      </div>
    `;

		const addToCartButton = container.querySelector(".add-to-cart");
		addToCartButton.addEventListener("click", () => {
			addToCart(pid);
		});
	}
}
