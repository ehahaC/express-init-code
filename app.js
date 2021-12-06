var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const helmet = require('helmet');
const { verify } = require("./utils/Token")
const { createWriteStream } = require("fs");
const middlewares = require('./middlewares');

const ENV = process.env.NODE_ENV;

require('dotenv').config();
require('dotenv').config({
    path: `./.env.${ENV === "development" ? "development" : "production"}`,
});

require("./model/connect");

var router = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

if (ENV == "development") {
    app.use(logger("dev"));
} 
else {
    const logFileName = path.join(__dirname, "log", "access.log");
    const writeStream = createWriteStream(logFileName, {
        flags: "a",
    });
    // 把输出流改成写入流；就可以写入文件了
    app.use(
        logger("combined", {
            stream: writeStream,
        })
    );
}
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * token鉴权，在所有中间件之前
 */
app.use(function (req, res, next) {
    if (ENV === "development") {
        next();
    } 
    else if (
        !req.url.includes("/api/user/login") &&
        !req.url.includes("/api/user/register")
    ) {
        let token = req.headers["x-token"];
        if ( !token ){
            return res.send({ code: 403, msg: "token不存在" });
        }
        let result = verify(token);
        let { message } = result

        // 如果存在错误信息
        if ( message ){
            return res.send({ code: 403, msg: message });
        }
        next()
    } 
    else {
        next();
    }
});

app.use('/api/v1', router);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
