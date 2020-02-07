"use strict";

const fs = require('fs');
const clr = require('clr-js');
const OUTPUT_PATH = 'src/data/';

/**
 * Creates a dynamic SQL script, based on Postgres dialect. There
 * is no problem here for concatenating strings, because it will not
 * execute the script for queries, it only creates the raw script.
 *
 * @param {String} filename - Optional file name. Default: 'sql_script';
 * @param {String} tablename - Name of the table that script will insert into;
 * @param {Array} params_array - All related data array of objects that will be used to mount sql script.
 */
const sql_builder = async (filename = 'sql_script', tablename, params_array) => {

  let final_sql =
`INSERT INTO ${tablename}
  ( lv, name, hp, mp, st, dx, ma, ag, lu, phys, gun, fire, ice, elec, force, light, dark )
VALUES
  ${ params_array.map(item => {
    return `("${item["lv"]}", "${item["name"]}", "${item["hp"]}", "${item["mp"]}", "${item["st"]}", "${item["dx"]}", "${item["ma"]}", "${item["ag"]}", "${item["lu"]}", "${item["phys"]}", "${item["gun"]}", "${item["fire"]}", "${item["ice"]}", "${item["elec"]}", "${item["force"]}", "${item["light"]}", "${item["dark"]}")\n`
  }) };`.trim();

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
