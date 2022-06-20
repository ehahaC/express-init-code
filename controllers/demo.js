const puppeteer = require("puppeteer");

function sleep(time = 3000) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

(async function () {
    const browser = await puppeteer.launch({
        headless: false,
        devtools: true,
        defaultViewport: {
            width: 960,
            height: 1050,
        },
        args: ["--start-maximized"],
    });

    const page = await browser.newPage();

    await page.goto(
        "https://docs.opensea.io/reference/retrieving-a-single-contract"
    );
    await page.waitForSelector(".APIRequest-footerXRB0bIisOvDO > .rm-TryIt");
    let button = await page.$(".APIRequest-footerXRB0bIisOvDO > .rm-TryIt");
    await button.click();

    // const data = page.on("response", async function (response) {
    //     if (/api.opensea.io\/api\/v1\/asset_contract/.test(response.url())) {
    //         console.log(response.url());
    //         // console.log(await response.json());
    //         return response.json()
    //     }
    // });

    // console.log(data);

    await page.waitForSelector(".CodeMirror-lines > div > .CodeMirror-code > div");

    const data = await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
        document.querySelector(".CodeMirror-vscrollbar").scrollBy(0, window.innerHeight)
        let preNode = document.querySelector(
            ".CodeMirror-lines > div > .CodeMirror-code"
        );
        preNode.style.height = "100vh"
        console.log(preNode.textContent);
    });
})();
