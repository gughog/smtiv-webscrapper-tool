const fetchSkills = async (params) => {
  const { page, clr, SKILL_TABLE_ROW_REF } = params;

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
  return all_skills;
};

module.exports = fetchSkills;