const sql_builder = (params) => {
  let final_sql = `
    INSERT INTO $1 (
      ...table_values_here
    ) VALUES (
      ...iteration_here
    );
  `;

  return final_sql;
};

module.exports = sql_builder;