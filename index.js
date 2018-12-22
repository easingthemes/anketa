const puppeteer = require('puppeteer');

const getBrowserConfig = (isHeadless) => {
  return {
    headless: isHeadless,
    handleSIGINT : false,
    args: [
      '--disable-gpu',
      '--no-sandbox',
    ]
  };
};

const handlePageClose = async (page, i) => {
  try {
    await page.close();
    console.log('PAGE: Page closed', i);
    await browser.close();
    console.log('BROWSER: Browser closed');
  } catch (error) {
    console.error('ERROR: closing page ...', i);
  }

};

const handlePage = async (vote, options, i) => {
  const browser = await puppeteer.launch(options.browserConfig);
  console.log('BROWSER: Browser launched');

  console.log('PAGE: opening ...', i);
  let page;

  try {
    page = await browser.newPage();
  } catch (error) {
    console.error('ERROR: opening url ...', i);
    return;
  }

  try {
    await page.goto(options.url, {
      waitUntil: 'domcontentloaded',
      timeout: options.timeout * 1000,
    });
    console.log('PAGE: loaded', i);
  } catch (error) {
    console.error('ERROR: opening page ...', i);
    await handlePageClose(page, i);
    return;
  }

  try {
    const selector = vote === 'da' ? '.totalpoll-choice:first-child' : '.totalpoll-choice:last-child';
    await page.click(selector);
    console.log('ELEMENT: choice Element clicked', i);
  } catch (error) {
    console.error('ERROR: clicking choice element ...', i);
    await handlePageClose(page, i);
    return;
  }

  try {
    await page.click('.totalpoll-button-vote');
    console.log('ELEMENT: Submit Element clicked', i);
  } catch (error) {
    console.error('ERROR: clicking submit element ...', i);
    await handlePageClose(page, i);
    return;
  }

  try {
    await page.waitForSelector('.totalpoll-choice-votes-text', { timeout: options.response * 1000 });
    console.log('ELEMENT: Response received', i);
  } catch (error) {
    console.error('ERROR: receiving response ...', i);
    await handlePageClose(page, i);
    return;
  }

  try {
    page.deleteCookie({name: options.cookie});
    console.log('COOKIE: Cookie deleted', i);
  } catch (error) {
    console.error('ERROR: deleting cookie ...', i);
    await handlePageClose(page, i);
    return;
  }

  await handlePageClose(page, i);
  return;
};

const init = async (vote, options) => {
  if (!vote || !options) {
    console.log('INPUT options error...');
    process.exit(1);
  }

  options.browserConfig = getBrowserConfig(options.headless);

  process.setMaxListeners(options.limit + 2);
  console.log('NODEJS: ', process.version);

  for (let i = 0; i < options.total; i++) {
    const group = [...Array(options.limit).keys()];
    await Promise.all(group.map(async () => {
      await handlePage(vote, options, i);
    }));
  }
};

module.exports = init;
