const {test,expect}=require("@playwright/test")

test("Handle InputBox",async({page})=>{


    await page.goto("https://testautomationpractice.blogspot.com/")
    await expect (await page.locator("//input[@id='name']")).toBeVisible();
    await expect (await page.locator("//input[@id='name']")).toBeEmpty();
    await expect(await page.locator("//input[@id='name']")).toBeEditable();
    await expect(await page.locator("//input[@id='name']")).toBeEnabled();
    await page.locator("//input[@id='name']").fill("Bhuvi")
    await page.waitForTimeout(5000);

})

test("Handle Radio buttons",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    // await expect(await page.locator("//input[@value='male']")).toBeVisible();
    await page.locator("//input[@id='male']").check()
    await expect(await page.locator("//input[@value='male']")).toBeChecked();
    await expect(await page.locator("//input[@value='male']").isChecked()).toBeTruthy();
    await page.waitForTimeout(5000);
    await expect(await page.locator("//input[@value='female']").isChecked()).toBeFalsy();
})

test("Handle Checkboxes",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.locator("//input[@id='sunday' and @type='checkbox']").check();
    expect(await page.locator("//input[@id='sunday' and @type='checkbox']")).toBeChecked();
    await expect(await page.locator("//input[@id='sunday' and @type='checkbox']").isChecked()).toBeTruthy();
    await expect(await page.locator("//input[@id='monday' and @type='checkbox']").isChecked()).toBeFalsy();
    await page.waitForTimeout(5000);

    //multiple checkboxes
    const checkboxLocators=["//input[@id='sunday' and @type='checkbox']",
    "//input[@id='monday' and @type='checkbox']",
    "//input[@id='tuesday' and @type='checkbox']",
    "//input[@id='wednesday' and @type='checkbox']",
    "//input[@id='saturday' and @type='checkbox']",
    ]
    for(const locator of checkboxLocators) //select multiple checkboxes
        {
        await page.locator(locator).check();  
    }
    await page.waitForTimeout(3000);
    for(const locator of checkboxLocators) //unselect multiple checkboxes
    {
        if(await page.locator(locator).isChecked())
        {
            await page.locator(locator).uncheck();  
        }
    }
    await page.waitForTimeout(3000);
})

test.only("Handle DropDowns",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")

    //multiple ways to select dropdown
    await page.locator("#country").selectOption({label:'India'});//select by label
    // await page.locator("#country").selectOption({index:2});//select by index
    // await page.locator("#country").selectOption("India");//select by visible text
    // await page.locator("#country").selectOption({value:'india'});//select by value
    await page.waitForTimeout(5000);

    //Assertions
    //check number of options in dropdown-1
    const options=await page.locator("#country option");
    await expect(options).toHaveCount(10);

    //check number of options in dropdown-2
    const options1=await page.$$("#country option");
    console.log("Number of options in dropdown: "+options1.length);
    expect(options1.length).toBe(10);
})