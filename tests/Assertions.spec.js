const {test,expect}=require("@playwright/test");
test("Assertions",async({page})=>{
await page.goto("https://demo.nopcommerce.com/register")
//assertion to verify 
await expect(page).toHaveURL("https://demo.nopcommerce.com/register");
await expect(page).toHaveTitle("nopCommerce demo store. Register");
const logoElement=await page.locator(".header-logo");
await expect(logoElement).toBeVisible();
const searchBox=await page.locator("#small-searchterms");
await expect(searchBox).toBeEnabled();
const radioButton=await page.locator("#gender-male");
await radioButton.check();
await expect(radioButton).toBeChecked();
const checkBox=await page.locator("#Newsletter");
await checkBox.uncheck();
await expect(checkBox).not.toBeChecked();
const regButton=await page.locator("#register-button")
await expect(regButton).toHaveAttribute("type","submit");
await expect(await page.locator(".page-title h1")).toHaveText("Register")//pass full text
await expect(await page.locator(".page-title h1")).toContainText("Reg")//pass partial text
const emailInput=await page.locator("#Email")
await emailInput.fill("test@gmail.com")
await expect(emailInput).toHaveValue("test@gmail.com");

const options =await page.locator("select[name='DateOfBirthMonth'] option")
await expect(options).toHaveCount(13);
})

test.only("Soft assertions",async({page})=>{
    await page.goto("https://demoblaze.com/index.html");

    //hard assertions
    await expect.soft(page).toHaveTitle("STORE1");
    await expect.soft (page).toHaveURL("https://demoblaze.com/index.html");
    await expect.soft(page.locator(".navbar-brand")).toBeVisible();


})

