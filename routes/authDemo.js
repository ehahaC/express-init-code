var express = require("express");
var router = express.Router();
const { authDemo } = require("../controllers/authDemoController")
const { expressjwt } = require('express-jwt')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

/**
 * @api {POST} /auth 鉴权demo接口
 * @apiDescription 鉴权demo接口
 * @apiGroup auth
 */
router.get("/", expressjwt({ secret: JWT_SECRET_KEY, algorithms: ["HS256"] }), authDemo);

module.exports = router;
