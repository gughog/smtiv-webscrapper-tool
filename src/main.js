"use strict";

// Constants
const URL = 'https://erikku.github.io/smt4tool/';
const SHOW_ALL_BTN = '#showAllDemonsBtn';
const TABLE_ROW_REF = '#demonList > table > tbody > tr';

const json_builder = require('./helpers/json_builder');
const sql_builder = require('./helpers/sql_builder');

/**
 * Main function that starts the program.
 */
const main = async (puppeteer, clr) => {
  console.log(clr.bold('=== SMTIV Tool (ver. 0.1.0) ===').red().it());
  // 1. Open a new browser:
  console.log(clr.bold('>>> Opening a browser instance...').it())
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true
  })
  try {
    // All logics here:

    // 2. Open up a new page:
    console.log(clr.bold('>>> Opening a new page...').it())
    const page = await browser.newPage();

    // 3. Go to URL:
    await page.goto(URL);

    // 4. Wait for get all data button press:
    console.log(clr.bold('>>> Pressing the button...').it())
    await page.click(SHOW_ALL_BTN);

    // 5. Fetch all demons:
    console.log(clr.bold('>>> Fetching demons...').it())
    let all_demons = await page.$$eval(TABLE_ROW_REF, rows => {
      return Object.freeze(rows.map(row => {
        const table_datas = [...row.querySelectorAll('td')];
        const array_with_rows = table_datas.map(td => td.textContent);
        return {
          lv: array_with_rows[0],
          name: array_with_rows[1],
          hp: array_with_rows[2],
          mp: array_with_rows[3],
          st: array_with_rows[4],
          dx: array_with_rows[5],
          ma: array_with_rows[6],
          ag: array_with_rows[7],
          lu: array_with_rows[8],
          phys: array_with_rows[9],
          gun: array_with_rows[10],
          fire: array_with_rows[11],
          ice: array_with_rows[12],
          elec: array_with_rows[13],
          force: array_with_rows[14],
          light: array_with_rows[15],
          dark: array_with_rows[16]
        };
      }))
    });

    // console.log(all_demons);
    await json_builder('demons', all_demons);
    await sql_builder('insert_demons', 'demons', all_demons)
  } catch (error) {
    throw new Error(error);
  } finally {
    await browser.close();
  }
};

module.exports = main;