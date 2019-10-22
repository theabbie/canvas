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
    var html = `
    <html>
    <style>
     @font-face {
	font-family: kirvy;
	src: url('https://cdn.jsdelivr.net/gh/theabbie/theabbie.github.io/files/kirvy.otf');
     }
     * {font-family: kirvy; letter-spacing: 6px; word-spacing: 12px; line-height: 125%;}
    </style>
    <h1>
    ${req.query.text}
    </h1>
    <html>
    `
    await page.goto(`data:text/html,${html}`);
    res.end(await page.screenshot());
    await browser.close();
}
catch(err) {
    res.send(err.message);
   }
})

app.listen(process.env.PORT);
