const fetchSpecialFusions = async (params) => {
  const { page, clr, SPECIALS_TABLE_ROW_REF } = params;

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
        unlock_requirements: array_with_rows[6] || ' - '
      };
    }));
  });

  const all_special_fusions = all_special_fusions_raw.splice(1);
  return all_special_fusions;
}

module.exports = fetchSpecialFusions;