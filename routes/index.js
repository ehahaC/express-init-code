"use strict";
const express = require("express");
const router = express.Router();
var usersRouter = require("./users");
const openseaRouter = require("./opensea");

router.get("/", (req, res) => {
    res.json({
        message: "API - 👋🌎🌍🌏",
    });
});

// router.use("/users", usersRouter);
router.use("/opensea", openseaRouter)

module.exports = router;
