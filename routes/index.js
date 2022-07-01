"use strict";
const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const authDemoRouter = require("./authDemo");

router.get("/", (req, res) => {
    res.json({
        message: "API - 👋🌎🌍🌏",
    });
});

router.use("/user", usersRouter);
router.use("/auth", authDemoRouter)

module.exports = router;
