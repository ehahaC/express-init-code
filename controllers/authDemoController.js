/**
 * 需要鉴权的demo接口
 * @param {Object} req 请求对象
 * @param {Object} res 响应对象
 * @param {Function} next 向下函数
 */
exports.authDemo = function (req, res, next) {
    res.send({
        code: 200,
        message: `鉴权成功`,
    });
};
