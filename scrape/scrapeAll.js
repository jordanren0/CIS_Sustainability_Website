async function scrapeData(page){
    /*await page.goto('chrome://settings/security?search=data+breach');
    console.log("On chrome page");
    await page.waitForSelector('passwordsLeakToggle');
    console.log("Selected");
    await page.click('passwordsLeakToggle');
    console.log("Clicked");

     */

    await delay(1000);
    await page.goto('http://energy.cis.edu.hk/pages/diagram/diagram1/Diagram1.html');

    //const title = await page.title();
    //const url = await page.url();
    //console.log(title, url);

    await page.waitForSelector('#user');
    await page.type('#user', 'cis', {delay: 50});

    await page.waitForSelector('#password');
    await page.type('#password', 'CISHKSolarPanel', {delay: 50});

    await page.click('.loginBtn');

    await delay(2000);

    await page.goto('http://energy.cis.edu.hk/pages/reports/Reports.html');

    //await delay(1000);
    await page.waitForSelector('#treeDemo_29_span');
    await page.click('#treeDemo_29_span');

    //await delay (1000);

    await page.waitForSelector('#treeDemo_45_switch');
    await page.click('#treeDemo_45_switch');
}

async function scrapeDaily(){
    const puppeteer = require('puppeteer-extra');
    const fs = require('fs');

    puppeteer.use(require('puppeteer-extra-plugin-user-preferences')({
        userPrefs: {
            safebrowsing: {
                enabled: false,
                enhanced: false
            }
        }
    }));
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
        isMobile: false
    });

    await scrapeData(page);

    await page.waitForSelector('#treeDemo_57_check');
    await page.click('#treeDemo_57_check');

    await page.waitForSelector('#selectPeriod');
    await page.click('#selectPeriod');

    await page.type('#selectPeriod', 'D', {delay: 50});

    await page.keyboard.press('Enter');
    //console.log('Selected Period');

    await page.click('#L_generate')
    //console.log('Generated Period');

    await page.waitForSelector("#sumTd_1_2")
    const val = await page.$eval('#sumTd_1_2', el => el.textContent);

    await browser.close();
    return val
}

async function scrapeMonthly(){
    const puppeteer = require('puppeteer-extra');
    puppeteer.use(require('puppeteer-extra-plugin-user-preferences')({
        userPrefs: {
            safebrowsing: {
                enabled: false,
                enhanced: false
            }
        }
    }));
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
        isMobile: false
    });

    await scrapeData(page);

    await page.waitForSelector('#treeDemo_57_check');
    await page.click('#treeDemo_57_check');

    await page.waitForSelector('#selectPeriod');
    await page.click('#selectPeriod');

    await page.type('#selectPeriod', 'M', {delay: 50});

    await page.keyboard.press('Enter');
    //console.log('Selected Period');

    await page.click('#L_generate')
    //console.log('Generated Period');

    await page.waitForSelector("#sumTd_1_2")
    const val = await page.$eval('#sumTd_1_2', el => el.textContent);

    await browser.close();
    return val
}

async function scrapeAccumulate(){
    const puppeteer = require('puppeteer-extra');
    puppeteer.use(require('puppeteer-extra-plugin-user-preferences')({
        userPrefs: {
            safebrowsing: {
                enabled: false,
                enhanced: false
            }
        }
    }));
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
        isMobile: false
    });

    await scrapeData(page);

    await page.waitForSelector('#treeDemo_56_check');
    await page.click('#treeDemo_56_check');

    await page.click('#L_generate')
    //console.log('Generated Period');

    await page.waitForSelector("#sumTd_1_2")
    const val = await page.$eval('#sumTd_1_2', el => el.textContent);

    await browser.close();
    return val
}

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time)
    });
}
