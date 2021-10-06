/**
 * 用户登录控制器
 * @param {Object} req 请求对象
 * @param {Object} res 响应对象
 * @param {Function} next 向下函数
 */
exports.login = function (req, res, next) {
    const { user, password } = req.body;

    /**
     * 发生某个错误
     * 抛出错误给错误处理中间件
     */
    if (!user || !password) {
        return next({
            status: 500,
            message: "用户名或密码不存在",
        });
    }
    res.send({
        code: 200,
        message: `用户名: ${user}, 密码: ${password}`,
    });
};
