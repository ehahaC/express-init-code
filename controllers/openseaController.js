const puppeteer = require("puppeteer");

puppeteer
    .launch({
        headless: false,
        devtools: true,
        // executablePath: '/usr/bin/chromium',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
        // args: ['--no-sandbox']
    })
    .then((browser) => {
        global.browser = browser;

        browser.newPage().then((page) => {
            global.page = page;
        });
    });

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
        let data = await getData(contractAddress);

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
    return new Promise(async (resovle, reject) => {
        // 打开浏览器，打开新页面
        // const browser = await puppeteer.launch({
        //     headless: false,
        //     devtools: true
        // });

        // const page = await browser.newPage();

        try {
            // let result = await global.page.evaluate(async (contractAddress) => {
            //     try {
            //         let response = await fetch(
            //             `https://api.opensea.io/api/v1/asset_contract/${contractAddress}`
            //         );

            //         if (response.status !== 200) {
            //             return Promise.reject("请求失败");
            //         }
            //         return Promise.resolve(await response.json());
            //     } catch (error) {
            //         return Promise.reject(error);
            //     }
            // }, contractAddress);
            // resovle(result);

            await global.page.goto("https://api.opensea.io/api/v1/asset_contract/0x06012c8cf97bead5deae237070f9587f8e7a266d")
            await global.page.waitForSelector('.response-info > .prettyprint')

            const data = await global.page.evaluate(() => {
                // 删除不必要节点
                document.querySelector(".response-info > .prettyprint > span.meta.nocode").remove()
                let preNode = document.querySelector(".response-info > .prettyprint");
                const JSON_TEXT = preNode.textContent
                return JSON.parse(JSON_TEXT)
            })
            console.log("data", data);
            resovle(data)
        } catch (error) {
            reject(error);
        }

        // 开始浏览
        // await page.goto("https://api.opensea.io/api/v1/asset_contract/0x06012c8cf97bead5deae237070f9587f8e7a266d")
        // await browser.close();
    });
}
