const createError = require("http-errors");
const express = require("express");
const minify = require("express-minify");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const logger = require("morgan");
const sassMiddleware = require("node-sass-middleware");
const path = require("path");
const fs = require("fs");

try {
	global.users = require("./data/users.json");
} catch (e) {
	global.users = [];
}
var app = express();
app.set("config", global.users);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());
app.use(
	sassMiddleware({
		src: path.join(__dirname, "public"),
		dest: path.join(__dirname, "public"),
		debug: false,
		outputStyle: "compressed",
		//indentedSyntax: true, // true = .sass and false = .scss
		sourceMap: true,
	})
);
app.use(minify({ cache: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100, // limit each IP to 100 requests per windowMs
	})
);
app.use((req, res, next) => {
	const logs = req.app.get("config");
	logs.push({
		ip: req.ip,
		time: Date.now(),
		url: req.url,
	});
	try {
		fs.writeFile(
			"./data/users.json",
			JSON.stringify(logs, null, "\t"),
			(err) => {
				if (err) throw err;
				console.log("It's saved!");
			}
		);
	} catch (e) {
		console.error(e);
	}
	next();
});

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
