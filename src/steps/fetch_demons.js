const fetchDemons = async (params) => {
  const { page, clr, DEMON_TABLE_ROW_REF } = params;

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

  return all_demons;
}

module.exports = fetchDemons;