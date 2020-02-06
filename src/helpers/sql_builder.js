const fs = require('fs');
const clr = require('clr-js');
const OUTPUT_PATH = '../data/';

/**
 * Creates a dynamic SQL script, based on Postgres dialect. There
 * is no problem here for concatenating strings, because it will not
 * execute the script for queries, it only creates the raw script.
 *
 * @param {*} filename - Optional file name. Default: 'sql_script';
 * @param {*} tablename - Name of the table that script will insert into;
 * @param {*} params - All related data that will be injected.
 */
const sql_builder = (filename = 'sql_script', tablename, params) => {
  let final_sql = `INSERT INTO ${tablename} ( num_index, name ) \nVALUES ${params.indexes.map((el, i) => `("${el}", "${params.names[i]}")`)};`;

  fs.writeFile(`${OUTPUT_PATH}${filename}.sql`, final_sql, 'utf-8', (err) => {
    if (err) {
      console.log(clr.red('Error!').bold().it())
      throw err;
    }

    console.log(clr.green('File created.').bold().it())
  })

  // return is needed ?
  // return final_sql;
};

// Example usage
// sql_builder('mysql', 'tablename01', {
//   indexes: indexes,
//   names: names
// });

module.exports = sql_builder;
