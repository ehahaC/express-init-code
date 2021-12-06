"use strict";
const express = require("express");
const router = express.Router();
var usersRouter = require("./users");

router.get("/", (req, res) => {
    res.json({
        message: "API - 👋🌎🌍🌏",
    });
});

router.use("/users", usersRouter);

module.exports = router;
