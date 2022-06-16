var express = require("express");
var router = express.Router();
const { getData } = require("../controllers/openseaController")

/**
 * @api {GET} /opensea/:id 获取NFT数据
 * @apiDescription 获取NFT数据
 * @apiGroup opensea
 * @apiParam {String} contractAddress 合约地址
 */
router.get("/:contractAddress", getData);

module.exports = router;
