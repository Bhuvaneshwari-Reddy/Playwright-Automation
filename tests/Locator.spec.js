const {test,expect}=require("@playwright/test")
const exp = require("constants")

test("Locators",async({page})=>{
await page.goto("https://demoblaze.com/index.html")

//click on login button-property
// await page.locator('id="login2"').click()
await page.click('id=login2')


//provide username-CSS
// await page.locator('#loginusername').fill("Bhuvaneshwari")
await page.fill('#loginusername','Bhuvaneshwari')
// await page.type('#loginusername','Bhuvaneshwari')

//provide password-CSS attribute with id
await page.fill("input[id='loginpassword']",'Reddy@24')

//click on login button-xpath
await page.click("//button[normalize-space()='Log in']")

//verify logout link presence-xpath
const logoutLink=await page.locator("//a[normalize-space(text())='Log out']")
await expect(logoutLink).toBeVisible();
await page.close();
})