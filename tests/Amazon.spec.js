import { test, expect } from '@playwright/test';
import fs from 'fs';

test.only('Amazon login and fetch products', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByLabel('email').fill('7899756761');
  await page.locator("//input[@id='continue']").click()
  await page.getByLabel('password').fill('Bhuvana@242');
  await page.locator("//input[@id='signInSubmit']").click();
  await page.getByPlaceholder('Search Amazon.in').fill("shoe for men");
  await page.getByRole('button', { name: 'Go', exact: true }).click();

  
    await page.waitForSelector("//div[@class='s-main-slot s-result-list s-search-results sg-row']"); 
    await page.waitForTimeout(1000); // Wait for new products to load
 
     const products=await page.$$("//div[@class='sg-col-20-of-24 s-matching-dir sg-col-16-of-20 sg-col sg-col-8-of-12 sg-col-12-of-16']//span[@class='a-size-base-plus a-color-base']")
     const prices = await page.$$("//div[@class='sg-col-20-of-24 s-matching-dir sg-col-16-of-20 sg-col sg-col-8-of-12 sg-col-12-of-16']//span[@class='a-price-whole']");
     const label = await page.$$("//div[@class='sg-col-20-of-24 s-matching-dir sg-col-16-of-20 sg-col sg-col-8-of-12 sg-col-12-of-16']//div//span//a//h2");
    // for (const product of products) {
    // const productName = await product.textContent(); 
    //     console.log("Product name: " + productName);
    //     // console.log('Number of products:', products.length);
    // }
    const output = []
    for (let i = 0; i < products.length; i++) {
      const productName = await products[i].textContent();
      const productPrice = await prices[i].textContent() ;
      const productLabel = await label[i].textContent();
      // console.log(`Product: ${productName}`);
      // console.log(`Price: ₹${productPrice}`);
      // console.log(`Type of product: ${productLabel}`);
      // console.log();
      const productDetails = {
        name: productName.trim(),
        price: `₹${productPrice.trim()}`,
        label: productLabel.trim(),
      };
      output.push(productDetails);
    }
    fs.writeFileSync('amazonOutput.json', JSON.stringify(output, null, 2), 'utf-8');

  console.log('Product details have been saved to output.json');

  
    

});

test("Flipkart login",async({page})=>{
  await page.goto('https://www.flipkart.com/');
  await page.locator("//span[normalize-space()='Login']").click();
  await page.locator("//input[@class='r4vIwl BV+Dqf']").fill('7899756761')
  await page.locator("//button[normalize-space()='Request OTP']").click();
  await page.getByPlaceholder('Search for products, brands and more').fill("shoe for men");

})
test("Compare prices of shoes on Amazon and Flipkart",async({browser})=>{
  // Create browser contexts for Amazon and Flipkart
const amazonContext=await browser.newContext();
const flipkartContext=await browser.newContext();


  // Create pages for each context
  const amazonPage = await amazonContext.newPage();
  const flipkartPage = await flipkartContext.newPage();

//search in Amazon
await amazonPage.goto('https://www.amazon.in/');
await amazonPage.fill("//input[@id='twotabsearchtextbox']", 'shoes for men');
await amazonPage.click("//input[@id='nav-search-submit-button']");
await amazonPage.waitForSelector("//div[@class='s-widget-container s-spacing-small s-widget-container-height-small celwidget slot=MAIN template=SEARCH_RESULTS widgetId=search-results_1']"); 
//const amazonPriceText=await amazonPage.$("//div[@class='s-widget-container s-spacing-small s-widget-container-height-small celwidget slot=MAIN template=SEARCH_RESULTS widgetId=search-results_1']//span[@class='a-price-whole'][1]")
const amazonPriceText=await amazonPage.$("div[class='s-widget-container s-spacing-small s-widget-container-height-small celwidget slot=MAIN template=SEARCH_RESULTS widgetId=search-results_2'] span[class='a-price'] span[class='a-offscreen']")
let amazonPrice = await amazonPriceText.textContent();
console.log("Price of shoe in Amazon: " + amazonPrice.trim());
  

//search in Flipkart
await flipkartPage.goto('https://www.flipkart.com/');
await flipkartPage.getByPlaceholder("Search for products, brands and more").fill("shoe for men");
await flipkartPage.locator("//button[@type='submit']//*[name()='svg']").click();
await flipkartPage.waitForSelector("//div[@class='DOjaWF gdgoEp']//div[@class='_1sdMkc LFEi7Z']")
const flipkartPriceText=await flipkartPage.$("//div[@class='DOjaWF gdgoEp']//div[@class='_1sdMkc LFEi7Z']//div[@class='Nx9bqj']")
let flipkartPrice = await flipkartPriceText.textContent();
console.log("Price of shoe in Flipkart: " + flipkartPrice.trim());

//compare
if (amazonPrice && flipkartPrice) {
  if (amazonPrice < flipkartPrice) {
    console.log('Amazon has the cheaper price for the first shoe.');
  } else if (amazonPrice > flipkartPrice) {
    console.log('Flipkart has the cheaper price for the first shoe.');
  } else {
    console.log('Both Amazon and Flipkart have the same price for the first shoe.');
  }
} else {
  console.log('Could not compare prices as one or both prices were not found.');
}

})


