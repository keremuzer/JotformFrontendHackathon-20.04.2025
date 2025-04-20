let api_key = "ee8a7c7fde4d46d8c7f207e95e7eec0f";

const api_url = "https://api.jotform.com/form/";

const endpoint =
	"https://api.jotform.com/form/251074062405952/payment-info?apiKey={ee8a7c7fde4d46d8c7f207e95e7eec0f}";

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
