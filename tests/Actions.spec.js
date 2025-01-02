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

test("Handle DropDowns",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")

    //multiple ways to select dropdown
    await page.locator("#country").selectOption({label:'India'});//select by label
    await page.locator("#country").selectOption({index:2});//select by index
    await page.locator("#country").selectOption("India");//select by visible text
    await page.locator("#country").selectOption({value:'india'});//select by value
    await page.waitForTimeout(5000);

    //Assertions
//     //check number of options in dropdown-1
//     const options=await page.locator("#country option");
//     await expect(options).toHaveCount(10);

//     //check number of options in dropdown-2
//     const options1=await page.$$("#country option");
//     console.log("Number of options in dropdown: "+options1.length);
//     expect(options1.length).toBe(10);

//     //check presence of value in dropdown
//   const content=await page.locator("#country").textContent()
// await expect(content.includes("India")).toBeTruthy();

//check presence of value in dropdown-using looping statement
const options=await page.$$("#country option");
let status=false;
for(const option of options)
{
// console.log(await option.textContent())

let value=await option.textContent();
if(value.includes("India"))
{
    status=true;
    break;
}
}
expect(status).toBeTruthy();
})

test("Multiple Select Dropdown",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.selectOption("#colors",[ 'Red', 'Blue', 'Green' ])
await page.waitForTimeout(5000);

//Assertions
//check number of options in dropdown
// const options=await page.locator("#colors option");
// await expect(options).toHaveCount(7);

//check number of options in dropdown using JS array
// const options=await page.$$("#colors option");
// console.log("Number of options in dropdown: "+options.length);
// await expect(options.length).toBe(7);

//check presence of the value in dropdown

const content=await page.locator("#colors").textContent();
await expect(content.includes("Red")).toBeTruthy();
await expect(content.includes("Black")).toBeFalsy();
})

test("Bootstrap dropdown",async({page})=>{
   await page.goto("https://www.jquery-az.com/boots/demo.php?ex=63.0_2")
   await page.locator(".multiselect").click();
   //select multiple options
//    const options=await page.locator("ul>li label input")
//    await expect(options).toHaveCount(11);

  //select multiple options
// const options=await page.$$("ul>li label input");
// await expect(options.length).toBe(11);

//select option from dropdown
// const options=await page.$$("ul>li label input");
// for(let option of options)
// {
//     let text=await option.textContent();
//     if(text.includes ("Angular")||text.includes("CSS"))
//     {
//         await option.click();
//         break;
//     }
// }


//unselect option from dropdown
const options=await page.$$("ul>li label");
for(let option of options)
{
    let text=await option.textContent();
    if(text.includes ("HTML")||text.includes("CSS"))
    {
        await option.click();
        break;
    }
}
await page.waitForTimeout(5000);
})

test("Auto Suggestive Dropdown",async({page})=>{

  await page.goto("https://www.redbus.in/") 
  await page.fill("#src","Bangalore")
  await page.waitForSelector("//li[contains(@class,'sc-iwsKbI jTMXri')]/div/text[1]") // this path also can be used//li[@class='sc-iwsKbI jTMXri']//div//text[1]
  const fromCityOptions=await page.$$("//li[contains(@class,'sc-iwsKbI jTMXri')]/div/text[1]")
for (let option of fromCityOptions)
    
{
    const text=await option.textContent();
    // console.log(text)
    if(text.includes("Bellandur"))
    {
        await option.click();
        break;
    }
}
await page.waitForTimeout(5000);
})


test.only("Hidden dropdown",async({page})=>{
await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

await page.fill("//input[@placeholder='Username']","Admin");
await page.fill("//input[@placeholder='Password']","admin123");
await page.click("//button[normalize-space()='Login']");


await page.locator("//span[normalize-space()='PIM']").click();
await page.locator("//body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[2]/form[1]/div[1]/div[1]/div[6]/div[1]/div[2]/div[1]/div[1]/div[2]/i[1]").click();
//waiting for options
await page.waitForTimeout(3000)
const options=await page.$$("//div[@role='listbox']//span")


for (let option of options){

    const jobTitle=await option.textContent();
    console.log(jobTitle)
    if(jobTitle.includes("Payroll Administrator"))
    {
        await option.click();
        break;
    }
}
await page.waitForTimeout(5000)

})