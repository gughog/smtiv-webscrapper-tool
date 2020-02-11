"use strict";
require('dotenv').config()

// Constants
const URL = process.env.SCRAP_SITE_02;
const URL2 = process.env.SCRAP_SITE_03;
const DEMON_TABLE_ROW_REF = '#demonList > table > tbody > tr';
const SKILL_TABLE_ROW_REF = '#skillList > table > tbody > tr';
const APPS_TABLE_ROW_REF = '#appList > table > tbody > tr';
const SPECIALS_TABLE_ROW_REF = '.smt4 > tbody > tr'

// helpers
const json_builder = require('./helpers/json_builder');
const sql_builder = require('./helpers/sql_builder');
const preventUnexpecteds = require('./helpers/prevent_unexpecteds');

/**
 * Main function that starts the program.
 */
const main = async (puppeteer, clr) => {
  console.log(clr.bold('=== SMTIV Tool (ver. 0.1.0) ===').red().it());
  // 1. Open a new browser:
  console.log(clr.bold('>>> Opening a browser instance...').it());
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true
  })
  try {
    // All logics here:

    // ===== 2. Open up a new page:
    console.log(clr.bold('>>> Opening a new page...').it());
    const page = await browser.newPage();

    // ===== 3. Go to URL:
    await page.goto(URL);

    // ===== 4.1. Wait for get all demons data button press:
    console.log(clr.bold('>>> Pressing the demons button...').it());
    await page.evaluate(() => document.getElementById('showAllDemonsBtn').click());

    // 4.2. Fetch and build json and sql with all demons:
    console.log(clr.bold('>>> Fetching demons...').it());
    const all_demons_raw = await page.$$eval(DEMON_TABLE_ROW_REF, rows => {
      return Object.freeze(rows.map(row => {
        const table_datas = [...row.querySelectorAll('td')];
        const array_with_rows = table_datas.map(td => td.textContent.replace(/\r?\n|\r/g, '').replace(/"/g, "'"));
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
    const all_demons = all_demons_raw.splice(1)

    // 4.3. Build the JSON and the SQL file:
    await json_builder('demons', all_demons);
    await sql_builder({
      filename: 'AllDemons',
      tablename: 'demons',
      params_array: all_demons,
      fields: ['lv','name','hp','mp','st','dx','ma','ag','lu','phys','gun','fire','ice','elec','force','light','dark']
    })

    // ===== 5.1. Wait for get all skills data button press:
    console.log(clr.bold('>>> Pressing the skills button...').it());
    await page.evaluate(() => document.getElementById('showAllSkillsBtn').click());

    // 5.2. Fetch and build json and sql with all skills for demons:
    console.log(clr.bold('>>> Fetching skills...').it());
    const all_skills_raw = await page.$$eval(SKILL_TABLE_ROW_REF, rows => {
      return Object.freeze(rows.map(row => {
        const table_datas = [...row.querySelectorAll('td')];
        const array_with_rows = table_datas.map(td => td.textContent.replace(/\r?\n|\r/g, '').replace(/"/g, "'"));
        return {
          name: array_with_rows[0],
          mp: array_with_rows[1],
          type: array_with_rows[2],
          effect: array_with_rows[3],
        };
      }));
    });
    const all_skills = all_skills_raw.splice(1)

    // 5.3. Build the JSON and the SQL file for skills:
    await json_builder('skills', all_skills);
    await sql_builder({
      filename: 'AllSkills',
      tablename: 'skills',
      params_array: all_skills,
      fields: ['name', 'mp', 'type', 'effect']
    });

    // 6.1. ===== Wait for 'get all apps data' button press:
    console.log(clr.bold('>>> Pressing the apps button...').it());
    await page.evaluate(() => document.getElementById('appButton').click());

    // 6.2. Fetch and build json and sql with all apps:
    console.log(clr.bold('>>> Fetching apps...').it());
    const all_apps_raw = await page.$$eval(APPS_TABLE_ROW_REF, rows => {
      return Object.freeze(rows.map(row => {
        const table_datas = [...row.querySelectorAll('td')];
        const array_with_rows = table_datas.map(td => td.textContent.replace(/\r?\n|\r/g, '').replace(/"/g, "'"));
        return {
          name: array_with_rows[0],
          points: array_with_rows[1],
          requirements: array_with_rows[2],
          description: array_with_rows[3],
        };
      }));
    })
    const all_apps = all_apps_raw.splice(1);

    // 6.3. Build the JSON and the SQL file for apps:
    await json_builder('apps', all_apps);
    await sql_builder({
      filename: 'AllApps',
      tablename: 'apps',
      params_array: all_apps,
      fields: ['name', 'points', 'requirements', 'description']
    });

    // 7.1. ===== Wait to go for other website:
    page.waitFor(2000);
    console.log(clr.bold('>>> Going to specials demons web page...').it());
    await page.goto(URL2);

    // 7.2.Fetch and build json and sql with all special fusions:
    console.log(clr.bold('>>> Fetching special fusions...').it());
    const all_special_fusions_raw = await page.$$eval(SPECIALS_TABLE_ROW_REF, rows => {
      return Object.freeze(rows.map(row => {
        const table_datas = [...row.querySelectorAll('td')];
        const array_with_rows = table_datas.map(td => td.textContent.replace(/\r?\n|\r/g, '').replace(/"/g, "'"));
        return {
          demon_result: array_with_rows[0],
          lvl: array_with_rows[1],
          ingredient01: array_with_rows[2],
          ingredient02: array_with_rows[3],
          ingredient03: array_with_rows[4],
          ingredient04: array_with_rows[5],
          unlock_requirements: array_with_rows[6]
        };
      }));
    });
    const all_special_fusions = all_special_fusions_raw.splice(1);

    // 7.3. Build the JSON and the SQL file for special fusions:
    await json_builder('special_fusions', all_special_fusions);
    await sql_builder({
      filename: 'AllSpecialFusions',
      tablename: 'special_fusions',
      params_array: all_special_fusions,
      fields: ['demon_result', 'lvl', 'ingredient01', 'ingredient02', 'ingredient03', 'ingredient04', 'unlock_requirements']
    });

  } catch (error) {
    throw new Error(error);
  } finally {
    await browser.close();
  }
};

module.exports = main;