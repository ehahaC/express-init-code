"use strict";

const mongoose = require("mongoose");

// 连接数据库
mongoose.connect(process.env.MOONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
});

const db = mongoose.connection;

db.once("open", () => {
    console.log("success connect database");
});

db.on("error", function (error) {
    console.error("Error in MongoDb connection: " + error);
    mongoose.disconnect();
});

db.on("close", function () {
    console.log("数据库断开，重新连接数据库");
    mongoose.connect(process.env.MOONGOOSE_URL, { server: { auto_reconnect: true } });
});
