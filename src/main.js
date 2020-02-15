"use strict";

/* Constants */
require('dotenv').config()
const URL = process.env.SCRAP_SITE_01;
const URL2 = process.env.SCRAP_SITE_02;
const DEMON_TABLE_ROW_REF = '#demonList > table > tbody > tr';
const SKILL_TABLE_ROW_REF = '#skillList > table > tbody > tr';
const APPS_TABLE_ROW_REF = '#appList > table > tbody > tr';
const SPECIALS_TABLE_ROW_REF = '.smt4 > tbody > tr'

/* helpers */
const json_builder = require('./helpers/json_builder');
const sql_builder = require('./helpers/sql_builder');

/* Steps */
const {
  goToPage,
  browserOpening,
  fetchDemons,
  fetchSkills,
  fetchApps,
  fetchSpecialFusions
} = require('./steps/index')

/**
 * Main function that starts the program.
 */
const main = async (puppeteer, clr) => {
  console.log(clr.bold('=== SMTIV Tool (ver. 0.1.0) ===').red().it());
  const browser = await browserOpening(puppeteer, clr); // 1. Opens the browser;

  try {
    console.log(clr.bold('>>> Opening a new page...').it());

    // 2. Open up a new page;
    const page = await browser.newPage();

    // 3. Go to URL:
    await goToPage(page, URL, clr);

    // 4.1. Wait for 'get all demons data' button get press;
    console.log(clr.bold('>>> Pressing the demons button...').it());
    await page.evaluate(() => {
      return document.getElementById('showAllDemonsBtn').click()
    });

    // 4.2. Fetch demons and return a JSON object;
    const all_demons = await fetchDemons({ page, clr, DEMON_TABLE_ROW_REF });

    // 4.3. Build the JSON and the SQL file:
    await json_builder('demons', all_demons);
    await sql_builder({
      filename: 'AllDemons',
      tablename: 'demons',
      params_array: all_demons,
      fields: ['lv','name','hp','mp','st','dx','ma','ag','lu','phys','gun','fire','ice','elec','force','light','dark']
    });

    // 5.1. Wait for get all skills data button press:
    console.log(clr.bold('>>> Pressing the skills button...').it());
    await page.evaluate(() => {
      return document.getElementById('showAllSkillsBtn').click();
    });

    // 5.2. Fetch and build json and sql with all skills for demons:
    const all_skills = await fetchSkills({ page, clr, SKILL_TABLE_ROW_REF })

    // 5.3. Build the JSON and the SQL file for skills:
    await json_builder('skills', all_skills);
    await sql_builder({
      filename: 'AllSkills',
      tablename: 'skills',
      params_array: all_skills,
      fields: ['name', 'mp', 'type', 'effect']
    });

    // 6.1. Wait for 'get all apps data' button press:
    console.log(clr.bold('>>> Pressing the apps button...').it());
    await page.evaluate(() => document.getElementById('appButton').click());

    // 6.2. Fetch and build json and sql with all apps:
    const all_apps = await fetchApps({ page, clr, APPS_TABLE_ROW_REF });

    // 6.3. Build the JSON and the SQL file for apps:
    await json_builder('apps', all_apps);
    await sql_builder({
      filename: 'AllApps',
      tablename: 'apps',
      params_array: all_apps,
      fields: ['name', 'points', 'requirements', 'description']
    });

    // 7.1. Wait to go for other website (waiting 2s for 2 times to be sure that page loads correctly):
    page.waitFor(2000);
    console.log(clr.bold('>>> Going to specials demons web page...').it());
    await page.goto(URL2);
    page.waitFor(2000);

    // 7.2.Fetch and build json and sql with all special fusions:
    const all_special_fusions = await fetchSpecialFusions({ page, clr, SPECIALS_TABLE_ROW_REF });

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