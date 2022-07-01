const { user } = require("../model/index")
const { sign } = require('jsonwebtoken')

/**
 * 用户登录控制器
 * @param {Object} req 请求对象
 * @param {Object} res 响应对象
 * @param {Function} next 向下函数
 */
exports.login = async function (req, res, next) {
    const { username, password } = req.body;

    /**
     * 发生某个错误
     * 抛出错误给错误处理中间件
     */
    if (!username || !password) {
        return next({
            status: 500,
            message: "用户名或密码不存在",
        });
    }

    /**
     * 正式环境请删除
     */
    const token = sign({ username, password }, process.env.JWT_SECRET_KEY, { expiresIn: "3h" })
        
    return res.send({
        code: 200,
        message: `登录成功`,
        token
    });

    try {
        let data = await user.findOne({ username })
        //TODO: 密码加密比对
        if ( data.password !== password ){
            return next({
                status: 500,
                message: "密码不正确",
            });
        }

        const token = sign({ username, password }, process.env.JWT_SECRET_KEY, { expiresIn: "3h" })
        
        res.send({
            code: 200,
            message: `登录成功`,
            token
        });
    } catch (error) {
        return next({
            status: 500,
            message: error.message,
        });
    }
};

/**
 * 用户注册
 * @param {Object} req 请求对象
 * @param {Object} res 响应对象
 * @param {Function} next 向下函数
 */
exports.register = async function (req, res, next) {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) {
        return next({
            status: 500,
            message: "用户名或密码不存在",
        });
    }

    try {
        await user.create({username, password})

        return res.send({
            code: 200,
            message: `注册成功`,
        });
    } catch (error) {
        return next({
            status: 500,
            message: error.message,
        });
    }
};
