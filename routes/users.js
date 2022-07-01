var express = require("express");
var router = express.Router();
const { login, register } = require("../controllers/userController")
const { expressjwt } = require('express-jwt')
// expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] })

/**
 * @api {POST} /users/login 登录
 * @apiDescription 登录
 * @apiGroup users
 * @apiParam {String} user 用户名
 * @apiParam {String} password 密码
 */
router.post("/login", login);

/**
 * @api {POST} /users/register 注册
 * @apiDescription 注册
 * @apiGroup users
 * @apiParam {String} user 用户名
 * @apiParam {String} password 密码
 */
router.post("/register", register);

module.exports = router;
