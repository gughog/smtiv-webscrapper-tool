/**
 * Helper function to handle unexpected line breaks and changes double quotes to single.
 * @param {String} item - String to handle.
 */
const preventUnexpecteds = (item) => {
  const replaced = item.replace(/\r?\n|\r/g, '').replace(/"/g, "'");
  return replaced;
};

module.exports = preventUnexpecteds;