let tops = [];
for(let i = 3; i != 0; i--) {
	tops.push(document.getElementById(`top${i}`));
}

fetch("https://dog.ceo/api/breeds/image/random/3", {cors: "cors"})
	.then(response => response.json())
	.then((data) => {
		for(let i in data.message) {
			img = document.createElement("IMG");
			img.setAttribute("src", data.message[i]);
			tops[i].appendChild(img);
		}
	})
