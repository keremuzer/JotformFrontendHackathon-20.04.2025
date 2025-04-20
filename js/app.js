let api_key = "ee8a7c7fde4d46d8c7f207e95e7eec0f";

const api_url = "https://api.jotform.com/form/";

const endpoint =
	"https://api.jotform.com/form/251074062405952/payment-info?apiKey={ee8a7c7fde4d46d8c7f207e95e7eec0f}";

const container = document.getElementById("product-container");

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
			const name = product.name || "Ürün Adı";
			const description = product.description || "Açıklama bulunamadı.";
			const price = product.price ? `${product.price}$` : "Fiyat yok";

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

			container.appendChild(card);
		});
	})
	.catch((error) => {
		console.error("Veri çekme sırasında hata oluştu:", error);
	});
