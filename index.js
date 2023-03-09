const puppeteer = require('puppeteer');
const fs = require('fs');
const handlebars = require('handlebars');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // const html = fs.readFileSync('main.html', 'utf-8');
    let template = handlebars.compile(fs.readFileSync('main.html', 'utf-8'));
    let html = template({
      date: "09 March 2023",
      name: "ABC XYZ",
      trainingStartDate: "01 January 2020",
      trainingEndDate: "31 March 2020",
      deploymentStartDate: "01 April 2020",
      deploymentEndDate: "31 March 2023",
      company: "MNO Pvt. Ltd"
    })
    await page.setContent(html, { waitUntil: 'networkidle0' });
  
    await page.emulateMediaType('screen');
  
    const pdf = await page.pdf({
      path: 'output/result.pdf',
      margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
      printBackground: true,
      format: 'A4',
    });
  
    await browser.close();
  })();


