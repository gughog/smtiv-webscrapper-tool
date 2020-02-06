const clr = require('clr-js');
const OUTPUT_PATH = '../data/';

/**
 * It creates a json file for objects passed
 * as paramenters.
 * @param {String} filename - Optional name for file output.
 * @param {Object} params - The object with all datas.
 */
const json_builder = (filename = 'db', params) => {
  let final_json = [];

  for (let i = 0; i < params.array.length; i++) {
    final_json.push({
      index: params.index[i],
      name: params.array[i]
    })
  }

  fs.writeFile(`${OUTPUT_PATH}${filename}.json`, JSON.stringify(final_json, null, 2), 'utf-8', (err) => {
    if (err) {
      console.log(clr.red('Error!').bold().it())
      throw err;
    }

    console.log(clr.green('File created.').bold().it())
  })

  // Return will be needed ?
  // return final_json;
};


////// ===========================================================

// >> Function is called, passing data:
// json_builder({
//   index: index,
//   array: arr1
// });

module.exports = json_builder;

/*
== TYPES ==
Lv
Name
HP
MP
St
Dx
Ma
Ag
Lu
Phys
Gun
Fire
Ice
Elec
Force
Light
Dark
*/