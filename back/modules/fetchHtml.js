const puppeteer = require("puppeteer");

async function fetchHtmlContent(url) {
	const browser = await puppeteer.launch({
		executablePath: process.env.EDGE_BROWSER_PATH,
		headless: true,
	});
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: "networkidle0" });

	const htmlContent = await page.content();
	await browser.close();

	return htmlContent;
}

module.exports = { fetchHtmlContent };
