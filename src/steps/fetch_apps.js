const fetchApps = async (params) => {
  const { page, clr, APPS_TABLE_ROW_REF } = params;

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
  return all_apps;
}

module.exports = fetchApps;