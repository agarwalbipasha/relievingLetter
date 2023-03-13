const puppeteer = require('puppeteer');
const fs = require('fs');
const handlebars = require('handlebars');
const csvtojson = require('csvtojson');

(async () => {
    let template = handlebars.compile(fs.readFileSync('main.html', 'utf-8'));

    let cands = await csvtojson().fromFile("candidates.csv");
      
    cands.forEach(async(cand) => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      let html = template(cand);
      let name = cand.name;
    
      await page.setContent(html, { waitUntil: 'networkidle0' });
  
      await page.emulateMediaType('screen');

      const pdf = await page.pdf({
        path: `output/${name}.pdf`,
        margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
        printBackground: true,
        format: 'A4',
      });

      await browser.close();
    })

  })();


