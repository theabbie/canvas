var app = require('express')();
const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const axios = require("axios");
const $ = require("cheerio");
const fs = require("fs");

app.get("/*", async function(req,res) {
try {
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
    });
   const page = browser.newPage();
    const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
  'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
    await page.setUserAgent(userAgent);
    await page.setViewport({
      'width': 375,
      'height': 812,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    });
    await page.goto("https://google.com/");
    res.end(await page.screenshot());
    await browser.close();
}
catch(err) {
    res.send(err.message);
   }
})

app.listen(process.env.PORT);
