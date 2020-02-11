"use strict";

const fs = require('fs');
const clr = require('clr-js');
const OUTPUT_PATH = 'src/data/';
const preventUnexpecteds = require('./prevent_unexpecteds');

/**
 * Creates a dynamic SQL script, based on Postgres dialect. There
 * is no problem here for concatenating strings, because it will not
 * execute the script for queries, it only creates the raw script.
 *
 * @param {Object} params - Object with all paramenters to build the sql file. 
 * @param {String} params.filename - Optional file name. Default: 'sql_script';
 * @param {String} params.tablename - Name of the table that script will insert into;
 * @param {Array} params.params_array - All related data array of objects that will be used to mount sql script.
 * @param {Array} params.fields - The field column names that will be inserted on.
 */
const sql_builder = async (params) => {
  const {
    filename = `sqlfile_${Math.floor(Math.random()) * 100}.sql`,
    tablename,
    params_array,
    fields
  } = params;

  let final_sql =
`INSERT INTO ${tablename}
  ( ${fields.map(field => field)} )
VALUES
  ${params_array.map((item, index) => {
    return `(${fields.map( field => `"${preventUnexpecteds(item[field])}"` )})${(index + 1) === params_array.length ? '' : ',\n'}`
  }).join('')};`

  fs.writeFile(`${OUTPUT_PATH}${filename}.sql`, final_sql, 'utf-8', (err) => {
    if (err) {
      console.log(clr.red('Error!').bold().it())
      throw err;
    }

    console.log(
      clr.green(`✔ File ${clr.bold(filename + '.sql').cyan().it()} was created at: ${OUTPUT_PATH}${filename}.sql`)
         .bold()
         .it()
    );
  })
};

module.exports = sql_builder;
