const jwt = require("jsonwebtoken");
const privateKey = "privateKey you wish"

const TokenUtil = {
    /**
     * 加密
     * @param {Obejct} userInfo 用户信息
     * @return {String} token
     */
    sign: function (userInfo) {
        const payload = userInfo;

        var token = jwt.sign(
            {
                payload,
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
            },
            privateKey
        );

        return token;
    },
    /**
     * 解密
     * @param {string} token 加密后的token
     * @return {Object} 解密信息
     */
    verify: function (token) {
        try {
            return jwt.verify(token, privateKey);
        } catch (error) {
            return error;
        }
    },
};

module.exports = TokenUtil;
