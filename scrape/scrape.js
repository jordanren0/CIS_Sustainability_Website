const puppeteer = require('puppeteer-extra');
const fs = require('fs/promises');

puppeteer.use(require('puppeteer-extra-plugin-user-preferences')({
    userPrefs: {
        safebrowsing: {
            enabled: false,
            enhanced: false
        }
    }
}));

async function scrapeDaily() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
        isMobile: false
    });

    await page.goto('http://energy.cis.edu.hk/pages/diagram/diagram1/Diagram1.html');

    await page.waitForSelector('#user');
    await page.type('#user', 'cis', {delay: 50});

    await page.waitForSelector('#password');
    await page.type('#password', 'CISHKSolarPanel', {delay: 50});

    await page.click('.loginBtn');

    await page.goto('http://energy.cis.edu.hk/pages/reports/Reports.html');

//await delay(1000);
    await page.waitForSelector('#treeDemo_29_span');
    await page.click('#treeDemo_29_span');

//await delay (1000);

    await page.waitForSelector('#treeDemo_45_switch');
    await page.click('#treeDemo_45_switch');

    await page.waitForSelector('#treeDemo_57_check');
    await page.click('#treeDemo_57_check');

    await page.waitForSelector('#selectPeriod');
    await page.click('#selectPeriod');

    await page.type('#selectPeriod', 'D', {delay: 50});

    await page.keyboard.press('Enter');

    await page.click('#L_generate')

    await page.waitForSelector("#sumTd_1_2")
    const val = await page.$eval('#sumTd_1_2', el => el.textContent);

    /*
    console.log(val);

    const filePath = '/Users/jordan_ren/WebstormProjects/CIS_Sustainability_Website/main.html';
    const html = await fs.readFile(filePath, 'utf8');
    const newHtml = html.replace('{{dailyOutput}}', val);

    await fs.writeFile(filePath, newHtml);

    await browser.close();

     */

    await browser.close();
    await fs.writeFile('dailyScrapedVal.txt', val);
}

async function scrapeMonthly() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
        isMobile: false
    });

    await page.goto('http://energy.cis.edu.hk/pages/diagram/diagram1/Diagram1.html');

    await page.waitForSelector('#user');
    await page.type('#user', 'cis', {delay: 50});

    await page.waitForSelector('#password');
    await page.type('#password', 'CISHKSolarPanel', {delay: 50});

    await page.click('.loginBtn');

    await page.goto('http://energy.cis.edu.hk/pages/reports/Reports.html');

//await delay(1000);
    await page.waitForSelector('#treeDemo_29_span');
    await page.click('#treeDemo_29_span');

//await delay (1000);

    await page.waitForSelector('#treeDemo_45_switch');
    await page.click('#treeDemo_45_switch');

    await page.waitForSelector('#treeDemo_57_check');
    await page.click('#treeDemo_57_check');

    await page.waitForSelector('#selectPeriod');
    await page.click('#selectPeriod');

    await page.type('#selectPeriod', 'M', {delay: 50});

    await page.keyboard.press('Enter');

    await page.click('#L_generate')

    await page.waitForSelector("#sumTd_1_2")
    const val = await page.$eval('#sumTd_1_2', el => el.textContent);

    /*
    console.log(val);

    const filePath = '/Users/jordan_ren/WebstormProjects/CIS_Sustainability_Website/main.html';
    const html = await fs.readFile(filePath, 'utf8');
    const newHtml = html.replace('{{monthlyOutput}}', val);

    await fs.writeFile(filePath, newHtml);

    await browser.close();

     */

    await browser.close();
    await fs.writeFile('monthlyScrapedVal.txt', val);
}

async function scrapeAccumulated() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
        isMobile: false
    });

    await page.goto('http://energy.cis.edu.hk/pages/diagram/diagram1/Diagram1.html');

    await page.waitForSelector('#user');
    await page.type('#user', 'cis', {delay: 50});

    await page.waitForSelector('#password');
    await page.type('#password', 'CISHKSolarPanel', {delay: 50});

    await page.click('.loginBtn');

    await page.goto('http://energy.cis.edu.hk/pages/reports/Reports.html');

    await page.waitForSelector('#treeDemo_29_span');
    await page.click('#treeDemo_29_span');

    await page.waitForSelector('#treeDemo_45_switch');
    await page.click('#treeDemo_45_switch');

    await page.waitForSelector('#treeDemo_56_check');
    await page.click('#treeDemo_56_check');

    await page.click('#L_generate')

    await page.waitForSelector("#sumTd_1_2")
    const val = await page.$eval('#sumTd_1_2', el => el.textContent);

    /*
    const filePath = '/Users/jordan_ren/WebstormProjects/CIS_Sustainability_Website/main.html';
    const html = await fs.readFile(filePath, 'utf8');
    const newHtml = html.replace('{{accumulatedOutput}}', val);
    await fs.writeFile(filePath, newHtml);

     */

    /*const filePath = '/Users/jordan_ren/WebstormProjects/CIS_Sustainability_Website/main.html';
    const html = fs.readFileSync(filePath, 'utf8');
    const accumulatedOutputElementId = 'accumulated-output';
    const placeholderString = `id="${accumulatedOutputElementId}">{{${accumulatedOutputElementId}}}</`;
    const newHtml = html.replace(placeholderString, `id="${accumulatedOutputElementId}">${val}</`);
    await fs.writeFile(filePath, newHtml)

     */

    await browser.close();
    await fs.writeFile('accumulatedScrapedVal.txt', val);
}

scrapeDaily().then(() => {
    scrapeMonthly().then(() => {
        scrapeAccumulated();
    });
});