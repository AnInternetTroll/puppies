const express = require("express");
const router = express.Router();

const pageName = "Top";
router.get("/", function (req, res, next) {
	res.render(pageName.toLowerCase(), { pageName: pageName });
});

module.exports = router;
