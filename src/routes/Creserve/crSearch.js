const puppeteer = require("puppeteer");
const { globalResponseSet, resbuilder } = require('../../common/resbuilder');

exports.searchMusinsa = async (req, res, next) => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({    // Viewport 설정 가로의 경우 일반적으로 최대 1920, 새로의 경우 예상되는 최대 px를 지정해주면됨
            width: 1920,
            height: 6000
        });
        await page.goto("https://www.musinsa.com/search/musinsa/goods?q=" + req.body.keyword, {
            waitUntil: 'networkidle2'
        });
        await page.click("body > div > div > div > div > a.modal__btn.modal__btn--secondary");
        let eh = await page.$("div.list-box");
        let title, brand, imgURL;
        do {
            title = await eh.$eval("p.list_info", function (el) {
                return el.innerText;
            });
            brand = await eh.$eval("p.item_title", function (el) {
                return el.innerText;
            });
            imgURL = await eh.$eval("div.list_img a img", function (el) {
                return el.src;
            });
        } while (imgURL == 'https://image.msscdn.net/images/no_image_125.png')

        result = {
            name: title,
            brand_name: brand,
            src: imgURL
        };
        await browser.close();
        res.send(resbuilder(globalResponseSet.API_SUCCESS, result));
        return;
    } catch (err) {
        console.log('MusinsaSearch error' + err);
        res.send(resbuilder(globalResponseSet.PRODUCT_DOESNT_EXIST));
        return;
    }
}