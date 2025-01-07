const {test,expect}=require("@playwright/test");
const exp = require("constants");

test("Login 2k dev portal",async({page})=>{


    await page.goto("https://dev.portal.2k.com/");
    await page.locator("//input[@id='email']").fill("bhuvanareddy2524@gmail.com");
    await page.locator("//input[@id='password']").fill("Bhuvana@242");
    await page.locator("//span[@class='Button_t2gp-button-cover__KuVoN']").click();
    await page.waitForURL("https://dev.portal.2k.com/en/2k/portal/account-detail");
//    const currentUrl=page.url();
//    console.log("Current URL is :"+currentUrl);
//    expect(currentUrl).toBe("https://portal.2k.com/en/2k/portal/account-detail");
   const logoElement=await page.locator(".h-20.w-20").textContent();
   console.log("Logo element is: "+logoElement);
   await expect(logoElement).toBeVisible();
    await page.waitForTimeout(5000);
})