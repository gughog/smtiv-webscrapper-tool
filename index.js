// Imports
const puppeteer = require('puppeteer');
const clr = require('clr-js');

// Constants
const DATA_PATH = './data';
const URL = 'https://erikku.github.io/smt4tool/';
const SHOW_ALL_BTN = '#showAllDemonsBtn';
const TABLE_INFO = Object.freeze({
  TABLE_ID: '#demonList',
  TABLE_HEADER: 'table tbody tr th th a', // first index
  TBALE_DATA: 'table tbody tr' // from index 1 to beyond
})

/**
 * Starts the program.
 */
const main = async () => {
  console.log(clr.bold('=== SMTIV Tool ===').red().it());
  // 1. Open a new browser:
  console.log('>>> Opening a browser instance...')
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true
  })
  try {
    // All logics here:

    // 2. Open up a new page:
    console.log('>>> Opening a new page...')
    const page = await browser.newPage();

    // 3. Go to URL:
    await page.goto(URL);

    // 4. Wait for get all data button press:
    console.log('>>> Pressing the button...')
    await page.click(SHOW_ALL_BTN);

    // 5. Fetch all table data:
    console.log('>>> Fetching table info...')
    // For testings, it only fetches names:
    const table_data = await page.$$eval('.demonLink', (table) => {
      return table.map(creature => creature.innerHTML)
    });
    console.log(table_data);


  } catch (error) {
    throw new Error(error);
  } finally {
    console.log('>>> Closing the app...')
    await browser.close();
  }
};

main();