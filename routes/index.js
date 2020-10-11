const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
/* GET home page. */
router.get("/", (req, res) => {
	// This gets a random dog image before sending it to the user
	fetch("https://dog.ceo/api/breeds/image/random")
		.then((response) => response.json())
		.then((data) => data.message)
		.then((img) => {
			res.render("index", {
				background_image: `url(${img})`,
				pageName: "Home",
			});
		});
});

router.get("/home", (req, res) => {
	res.redirect("/");
});

router.get("/dogs", (req, res) => {
	// This finds `dogs.pug` from the views/ folder
	// And pieces it together and converts to html
	res.render("dogs", {
		// This tells the website it's on the dogs page
		// Mostly used for the navbar
		pageName: "Dogs",
	});
});

router.get("/top", (req, res) => {
	res.render("top", { pageName: "Top 3" });
});

router.get("/about", (req, res) => {
	res.render("about", { pageName: "About" });
});

module.exports = router;
