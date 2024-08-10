//PedroTech

//setInterval(main, 1000);

async function returnDaily() {
   let dailyVal = await scrapeDaily();
   let outsideDailyVal = dailyVal;
   return outsideDailyVal;
}

async function returnMonthly() {
   let monthlyVal = await scrapeMonthly();
   let outsideMonthlyVal = monthlyVal;
   return outsideMonthlyVal;
}

async function returnAccumulated() {
   let accumulatedVal = await scrapeAccumulate();
   let outsideAccumulatedVal = accumulatedVal;
   return outsideAccumulatedVal;
}

/*
function main() {
   returnDaily().then((daily) => {
      console.log("Daily energy output:", daily);
      document.getElementById("daily-output").innerHTML = "Daily energy output: " + daily;
   });

   returnMonthly().then((monthly) => {
      console.log("Monthly energy output:", monthly);
      document.getElementById("monthly-output").innerHTML = "Monthly energy output: " + monthly;
   });

   returnAccumulated().then((accumulated) => {
      console.log("Accumulated energy output:", accumulated);
      document.getElementById("accumulated-output").innerHTML = "Accumulated energy output: " + accumulated;
   });
}

main();

 */
setInterval(displayDaily, 1000);
function displayDaily(){
   scrapeDaily().then((daily) => {
      console.log("Daily energy output:", daily);
      document.getElementById("daily-output").innerText = "Daily energy output: " + daily;
   });
}

displayDaily();


/*async function main(){
   //let dailyVal = await scrapeDaily();
   let dailyVal = returnDaily();
   document.getElementById("daily-output").innerHTML = "Daily energy output: " + dailyVal;

   //let monthlyVal = await scrapeMonthly();
   let monthlyVal = returnMonthly();
   document.getElementById("monthly-output").innerHTML = "Monthly energy output: " + monthlyVal;

   //let accumulateVal = await scrapeAccumulate();
   let accumulateVal = returnAccumulated();
   document.getElementById("accumulated-output").innerHTML = "Accumulated energy output: " + accumulateVal;
}

main();

 */

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
