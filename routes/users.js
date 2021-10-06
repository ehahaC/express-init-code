var express = require("express");
var router = express.Router();
const { login } = require("../controllers/userController")

/**
 * @api {POST} /users/login API文档事例
 * @apiDescription API文档事例
 * @apiGroup users
 * @apiParam {String} user 用户名
 * @apiParam {String} password 密码
 */
router.post("/login", login);

module.exports = router;
