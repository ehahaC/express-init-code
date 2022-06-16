const puppeteer = require("puppeteer");

/**
 * 获取opensea数据控制器
 * @param {Object} req 请求对象
 * @param {Object} res 响应对象
 * @param {Function} next 向下函数
 */
exports.getData = async function (req, res, next) {
    const { contractAddress } = req.params;
    console.log("contractAddress", contractAddress);

    try {
        let data = await getData(contractAddress)

        res.send({
            code: 200,
            data: data,
        });
    } catch (error) {
        return next({
            status: 500,
            message: error.message,
        });
    }
};

function getData(contractAddress) {
    return new Promise( async (resovle, reject) => {
        // 打开浏览器，打开新页面
        const browser = await puppeteer.launch({
            headless: false,
            devtools: true
        });

        const page = await browser.newPage();

        try {
            let result = await page.evaluate(async (contractAddress) => {
                try {
                    let response = await fetch(`https://api.opensea.io/api/v1/asset_contract/${ contractAddress }`)

                    if ( response.status !== 200 ){
                        return Promise.reject("请求失败")
                    }
                    return Promise.resolve(await response.json());
                } catch (error) {
                    return Promise.reject(error)
                }
            }, contractAddress);
            resovle(result)
        } catch (error) {
            reject(error)
        }

        // 开始浏览
        // await page.goto("https://api.opensea.io/api/v1/asset_contract/0x06012c8cf97bead5deae237070f9587f8e7a266d")
        await browser.close();
    } )
}