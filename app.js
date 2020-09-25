const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const compression = require("compression");
const sassMiddleware = require("node-sass-middleware");
const minify = require("express-minify");
const fs = require("fs");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

var app = express();

app.set("config", []);

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
		debug: true,
		outputStyle: "compressed",
		//indentedSyntax: true, // true = .sass and false = .scss
		sourceMap: true,
	})
);
app.use(minify({ cache: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
	logs = req.app.get('config');
	logs.push({
		ip: req.ip,
		time: Date.now(),
		url: req.url,
	});
	next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
