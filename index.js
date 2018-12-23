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

const chunkArray = (arr, chunkSize) => {
  let i = 0;
  const chunks = [];
  const length = arr.length;

  while (i < length) {
    chunks.push(arr.slice(i, i += chunkSize));
  }

  return chunks;
};

const handlePageClose = async (page, browser, i) => {
  try {
    await page.close();
    console.log('PAGE: Page closed', i);
    await browser.close();
    console.log('BROWSER: Browser closed', i);
  } catch (error) {
    console.error('ERROR: closing page', i);
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
    await handlePageClose(page, browser,  i);
    return;
  }

  try {
    const selector = vote === 'da' ? '.totalpoll-choice:first-child' : '.totalpoll-choice:last-child';
    await page.click(selector);
    console.log('ELEMENT: choice Element clicked', i);
  } catch (error) {
    console.error('ERROR: clicking choice element ...', i);
    await handlePageClose(page, browser,  i);
    return;
  }

  try {
    await page.click('.totalpoll-button-vote');
    console.log('ELEMENT: Submit Element clicked', i);
  } catch (error) {
    console.error('ERROR: clicking submit element ...', i);
    await handlePageClose(page, browser,  i);
    return;
  }

  try {
    await page.waitForSelector('.totalpoll-choice-votes-text', { timeout: options.response * 1000 });
    console.log('ELEMENT: Response received', i);
  } catch (error) {
    console.error('ERROR: receiving response ...', i);
    await handlePageClose(page, browser,  i);
    return;
  }

  try {
    page.deleteCookie({name: options.cookie});
    console.log('COOKIE: Cookie deleted', i);
  } catch (error) {
    console.error('ERROR: deleting cookie ...', i);
    await handlePageClose(page, browser,  i);
    return;
  }

  await handlePageClose(page, browser,  i);

  return i;
};

const init = async (vote, options) => {
  if (!vote || !options) {
    console.log('INPUT options error...');
    process.exit(1);
  }

  options.browserConfig = getBrowserConfig(options.headless);

  process.setMaxListeners(options.total + 10);
  console.log('NODEJS: ', process.version);

  const totalArr = [...Array(options.total).keys()];
  const groups = chunkArray(totalArr, options.limit);

  for (const group of groups) {
    await Promise.all(group.map(async (i) => {
      await handlePage(vote, options, i);
    }));
  }
  
  console.log('NODEJS: exiting process ...');
  process.exit(0);
};

module.exports = init;
