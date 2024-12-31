import { test, expect } from '@playwright/test';
import fs from 'fs';

test.setTimeout(150000)
test('Fetch the number of EV stations in Karnataka', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.charzer.com/ev-charging-stations?cityId=625e7e487c9b8e1c018b14a3&cityId=6291bea817496d1b0d20d589&cityId=628c8e4d17496d1b0d20d588&cityId=3&cityId=14&cityId=31&cityId=39&cityId=40&cityId=41&cityId=45&cityId=67&cityId=70&cityId=72&cityId=73&cityId=74&cityId=80&cityId=621f0c44cae2416ede738aab&cityId=62210968cae2416ede738aac&cityId=6260fd977c9b8e1c018b14a4&cityId=6276057f17496d1b0d20d580&cityId=627a617317496d1b0d20d583&cityId=627a61b517496d1b0d20d584&cityId=1&cityId=6448fa0a909c7d70ac3161e3&cityId=63c69f1987586536be8ce269&cityId=64646c915ab85e1b3f56a48b&cityId=65bb8a288f08b154668e938f&cityId=645353f85ab85e1b3f56a486&cityId=632815a8369a1c359bfc172a&cityId=63ef4db192dab32c7631ca3e',{waitUntil: 'load'})
  const maxScrolls = 130; // Set a maximum number of scrolls to avoid infinite loop
  let scrollCount = 0;

  while (scrollCount < maxScrolls) {
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight / 2); // Scroll by half the viewport height
    });
    await page.waitForTimeout(1200); // Wait for 5 seconds

    const currentHeight = await page.evaluate(() => document.body.scrollHeight);
    const previousHeight = await page.evaluate(() => window.scrollY + window.innerHeight);
    if (currentHeight <= previousHeight) break;
    scrollCount++;
  }

//   await page.waitForSelector("//body/div[@id='__next']/main[@id='document-main']/div[@class='container']/section[@class='d-flex position-relative']/main[@class='charging-station-listing_chargerList__2unBm']/div[@class='row']//div[@class='px-2 mb-3 col-lg-4']").click()
const CompanyName=await page.$$("//body/div[@id='__next']/main[@id='document-main']/div[@class='container']/section[@class='d-flex position-relative']/main[@class='charging-station-listing_chargerList__2unBm']/div[@class='row']//div[@class='px-2 mb-3 col-lg-4']//h5")
console.log(CompanyName.length)
const Location=await page.$$("//body/div[@id='__next']/main[@id='document-main']/div[@class='container']/section[@class='d-flex position-relative']/main[@class='charging-station-listing_chargerList__2unBm']/div[@class='row']/div/a/div/small")
await page.waitForTimeout(1000)

    const output = []
        for (let i = 0; i < CompanyName.length; i++) {
            const name = await CompanyName[i].textContent();
            const address = await Location[i].textContent() 
          const productDetails = {
            Name: name.trim(),
            Address: address.trim(),
          };
          output.push(productDetails);
        }
        fs.writeFileSync('evOutput.json', JSON.stringify(output, null, 2), 'utf-8');

});
