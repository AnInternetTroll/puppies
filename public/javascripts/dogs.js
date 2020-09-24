function like(button) {
	let key = button.getAttribute("id");
	const storageApi = sessionStorage;
	if (!storageApi.getItem(key)) {
		storageApi.setItem(key, 1);
		button.parentElement
			.getElementsByTagName("span")
			.item("").innerText = storageApi.getItem(key);
	} else {
		storageApi.setItem(key, parseInt(storageApi.getItem(key)) + 1);
		button.parentElement
			.getElementsByTagName("span")
			.item("").innerText = storageApi.getItem(key);
	}
}
let article = document.getElementById("article");
fetch("https://dog.ceo/api/breeds/image/random/10")
	.then((response) => response.json())
	.then(function (data) {
		for (let imgUrl in data.message) {
			let div = document.createElement("DIV");
			div.setAttribute("class", "card");
			let img = document.createElement("IMG");
			img.setAttribute("src", data.message[imgUrl]);
			div.appendChild(img);
			let button = document.createElement("BUTTON");
			button.setAttribute("id", data.message[imgUrl]);
			button.setAttribute("onclick", "like(this);");
			button.innerText = "👍";
			div.appendChild(button);
			let span = document.createElement("SPAN");
			div.appendChild(span);
			like(button);
			article.appendChild(div);
		}
	});
