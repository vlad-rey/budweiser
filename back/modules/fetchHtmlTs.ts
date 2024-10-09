import puppeteer from 'puppeteer';

export async function fetchHtmlContent(url: string): Promise<string> {
  const browser = await puppeteer.launch({
    executablePath: process.env.EDGE_BROWSER_PATH,
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });

  const htmlContent = await page.content();
  await browser.close();

  return htmlContent;
}