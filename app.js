var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const { verify } = require("./utils/Token")
const { createWriteStream } = require("fs");
require("./model/connect");

const ENV = process.env.NODE_ENV;

var router = require("./routes/index");

var app = express();

app.use(cors());

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

router(app);

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
    // res.render("error");
    res.send({
        code: err.status,
        message: err.message,
    });
});

module.exports = app;
