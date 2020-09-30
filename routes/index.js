const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
/* GET home page. */
router.get("/", function (req, res, next) {
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

router.get("/home", function (req, res, next) {
	res.redirect("/");
});

router.get("/dogs", function (req, res, next) {
	res.render("dogs", { pageName: "Dogs" });
});

router.get("/top", function (req, res, next) {
	res.render("top", { pageName: "Top 3" });
});

router.get("/about", function (req, res, next) {
	res.render("about", { pageName: "About" });
});

module.exports = router;
