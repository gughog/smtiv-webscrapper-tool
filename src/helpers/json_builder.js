"use strict";

const fs = require('fs');
const clr = require('clr-js');
const OUTPUT_PATH = 'src/data/';

/**
 * It creates a json file for objects passed
 * as paramenters.
 * @param {String} filename - Optional name for file output.
 * @param {Array} params_array - The array of objects with all needed data.
 */
const json_builder = async (filename = 'db', params_array) => {

  fs.writeFile(`${OUTPUT_PATH}${filename}.json`, JSON.stringify(params_array, null, 2), 'utf-8', (err) => {
    if (err) {
      console.log(clr.red('Some error has occured!').bold().it())
      throw err;
    }

    console.log(
      clr.green(`✔ File ${clr.bold(filename + '.json').cyan().it()} was created at: ${OUTPUT_PATH}${filename}.json`)
         .bold()
         .it()
    );
  });

  // Return will be needed ?
  // return final_json;
};

module.exports = json_builder;
