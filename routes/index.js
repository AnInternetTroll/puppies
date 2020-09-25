const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express", pageName: "Home" });
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
