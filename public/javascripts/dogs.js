// This function will be called on the like button
function like(button) {
	const key = button.getAttribute("id");
	// This is the api that is used to save the likes
	// Either sessionStorage
	// Or localStorage
	const storageApi = sessionStorage;
	// If there is nothing saved for this image save it as 1 like
	if (!storageApi.getItem(key)) {
		storageApi.setItem(key, 1);
		button.parentElement
			.getElementsByTagName("span")
			.item("").innerText = storageApi.getItem(key);
	} else {
		// If there is something saved for this image add 1 to it
		storageApi.setItem(key, parseInt(storageApi.getItem(key)) + 1);
		button.parentElement
			.getElementsByTagName("span")
			.item("").innerText = storageApi.getItem(key);
	}
}
const article = document.getElementById("article");
fetch("https://dog.ceo/api/breeds/image/random/10")
	.then((response) => response.json())
	.then(function (data) {
		// For each image of a dog
		// Make a new div with an image
		// And a like button
		for (const imgUrl in data.message) {
			const div = document.createElement("DIV");
			div.setAttribute("class", "card");
			const img = document.createElement("IMG");
			img.setAttribute("src", data.message[imgUrl]);
			div.appendChild(img);
			const button = document.createElement("BUTTON");
			button.setAttribute("id", data.message[imgUrl]);
			button.setAttribute("onclick", "like(this);");
			button.innerText = "👍";
			div.appendChild(button);
			const span = document.createElement("SPAN");
			div.appendChild(span);
			like(button);
			article.appendChild(div);
		}
	});
