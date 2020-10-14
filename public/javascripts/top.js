const tops = [];
for (let i = 3; i != 0; i--) {
	tops.push(document.getElementById(`top${i}`));
}

fetch("https://dog.ceo/api/breeds/image/random/3", { cors: "cors" })
	.then((response) => response.json())
	.then((data) => {
		for (const i in data.message) {
			const img = document.createElement("IMG");
			img.setAttribute("src", data.message[i]);
			const a = document.createElement("A");
			a.setAttribute("href", data.message[i])
			a.appendChild(img)
			tops[i].appendChild(a);
		}
	});
