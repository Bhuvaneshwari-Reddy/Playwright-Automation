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

test("LocateMultipleElements",async ({page})=>{

    await page.goto("https://demoblaze.com/index.html")

    // const links=await page.$$('a')
    // for(const link of links){
    // const linkText=await link.textContent()
    // console.log(linkText)
    // }

    const products=await page.$$("//div[@id='tbodyid']//div//h4/a")
    for(const product of products){
        const productName=await product.textContent();
        console.log(productName)
    }
    
})
test("Builtin-locators",async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    //page.getByAltText() to locate an element, usually image, by its text alternative.
    const logo=await page.getByAltText('company-branding')
    await expect(logo).toBeVisible()
    
     //page.getByPlaceholder() to locate an input by placeholder.
     await page.getByPlaceholder('Username').fill('Admin');
     await page.getByPlaceholder('password').fill('admin123');
    
     //page.getByRole() to locate by explicit and implicit accessibility attributes.
    await page.getByRole('button',{type:'submit'}).click()
    
    //page.getByText() to locate by text content.
    const name=await page.locator("//p[@class='oxd-userdropdown-name']").textContent()
    await expect(await page.getByText(name)).toBeVisible()
    
    })     