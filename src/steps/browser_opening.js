const browserOpening = async (puppeteer, clr) => {
  console.log(clr.bold('>>> Opening a browser instance...').it());
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true
  })

  return browser;
}

module.exports = browserOpening;