var app = require('express')();
const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const axios = require("axios");
const $ = require("cheerio");
const fs = require("fs");

app.get("/*", async function(req,res) {
try {
    const browser = await puppeteer.launch({
        args: [...chrome.args,'--disable-web-security'],
        executablePath: await chrome.executablePath,
        headless: chrome.headless
    });
   const page = await browser.newPage();
   await page.setUserAgent('Mozilla/5.0 (Linux; Android 9; Redmi Note 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.116 Mobile Safari/537.36');
    await page.setViewport({
      'width': 375,
      'height': 812,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    });
    var js = Buffer.from((await axios("https://api.github.com/repos/theabbie/theabbie.github.io/contents/server.js")).data.content,"base64").toString();
    await page.goto(`data:text/html,<html></html>`);
    await page.evaluate(function(js) {eval(js)},js);
    res.type("text/html").end(await page.content());
    await browser.close();
}
catch(err) {
    res.send(err.message);
   }
})

app.listen(process.env.PORT);
