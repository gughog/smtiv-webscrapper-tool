const goToPage = async (page, URL, clr) => {
  console.log(clr.bold('>>> Going to page ' + URL + '...').green().it())
  await page.goto(URL);
  return page;
}

module.exports = goToPage;