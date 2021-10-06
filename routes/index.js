"use strict";

var usersRouter = require("./users");

module.exports = function router(app) {
	app.use("/users", usersRouter);
};
