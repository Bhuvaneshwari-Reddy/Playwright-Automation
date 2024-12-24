const {test,expect}=require("@playwright/test");

test("Compare the price of iphone in Amazon and Flipkart",async({browser})=>{
    // Create browser contexts for Amazon and Flipkart
  const amazonContext=await browser.newContext();
  const flipkartContext=await browser.newContext();
  
  
    // Create pages for each context
    const amazonPage = await amazonContext.newPage();
    const flipkartPage = await flipkartContext.newPage();
  
  //search in Amazon
  await amazonPage.goto('https://www.amazon.in/');
  await amazonPage.fill("//input[@id='twotabsearchtextbox']", 'iphone');
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