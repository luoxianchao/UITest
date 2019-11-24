const puppeteer = require('puppeteer');
const {getUITestData} = require('./read-xlsx');

(async () => {
    let data = getUITestData();
    if (!data.length) {
        console.error('no test data');
    }
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 200,
        devtools: false,
        defaultViewport: {width: 1200, height: 800}
    });
    const page = await browser.newPage();
    await page.deleteCookie({
        name: 'cookiename',
        url: '访问路径',
        domain: '域名'
    });
    let dataLength = data.length;
    for (let j = 0; j < dataLength; j++) {
        let item = data[j];
        const seq = item[0];
        const eventName = item[1];
        const content = item[2];
        const out = item[3];
        const value = item[4];
        if (eventName === 'open') {
            await page.goto(content);
        } else if (eventName === 'click') {
            await page.waitForSelector(content, {visible: true});
            await page.click(content);
        } else if (eventName === 'clear') {
            await page.type(content, '', {
                delay: 200
            });
        } else if (eventName === 'input') {
            await page.type(content, value, {delay: 200});
        }
        if (out === '是') {
            await setTimeout(async () => {
                await page.screenshot({path: seq + '.png', fullPage: true});
            });
        }
    }
    console.log('end');
    // await browser.close();
})();
