const{test,expect}=require("@playwright/test")

test("Alert with Ok",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")

    //Enable dialog window handler
    page.on('dialog', async dialog => {
      expect(dialog.type()).toContain("alert");
      expect(dialog.message()).toContain("I am an alert box!");
      await dialog.accept();

    })
    await page.click("//button[normalize-space()='Simple Alert']")
    await page.waitForTimeout(5000);
})

test("Confirmation alert with ok and cancel",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")

    //Enable dialog window handler
    page.on('dialog', async dialog => {
      expect(dialog.type()).toContain("confirm");
      expect(dialog.message()).toContain("Press a button!");
      await dialog.accept();

    })
    await page.click("//button[normalize-space()='Confirmation Alert']")
    await expect(page.locator("//p[@id='demo']")).toHaveText("You pressed OK!");
    await page.waitForTimeout(5000);


})

test("Prompt Alert",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")

    //Enable dialog window handler
    page.on('dialog', async dialog => {
      expect(dialog.type()).toContain("prompt");
      expect(dialog.message()).toContain("Please enter your name:");
      expect(dialog.defaultValue()).toContain("Harry Potter")
      await dialog.accept("Bhuvi"); //close by ok button

    })
    await page.click("//button[normalize-space()='Prompt Alert']")
    await expect(page.locator("//p[@id='demo']")).toHaveText("Hello Bhuvi! How are you today?");
    await page.waitForTimeout(5000);


})

//frames
test("Handle Frames",async({page})=>{
  await page.goto("https://ui.vision/demo/webtest/frames/");
  //total frames
  const allFrames=await page.frames();
  console.log("Total frames: "+allFrames.length)


  //using name or url
  //const frame1=await page.frame(name)//if name is there
  //  const frame1=await page.frame({url:"https://ui.vision/demo/webtest/frames/frame_1.html"})

  //  await frame1.fill("//input[@name='mytext1']","Hello")
  //  await page.waitForTimeout(5000);

   //using frame locator
   const inputBox=await page.frameLocator("frame[src='frame_1.html']").locator("//input[@name='mytext1']")
   inputBox.fill("Hello")
   await page.waitForTimeout(5000);
})

test("Handle Nested Frames",async({page})=>{

await page.goto("https://ui.vision/demo/webtest/frames/")

//using frame object
const frame3=await page.frame({url:"https://ui.vision/demo/webtest/frames/frame_3.html"});
 //frame3.locator("//input[@name='mytext3']").fill("Welcome ");
 //nested frame
 const childFrames=await frame3.childFrames();
 await childFrames[0].locator("//*[@id='i6']/div[3]/div").check()
await page.waitForTimeout(5000);

})

test.only ("Web tables and pagination",async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/")
 const table=await page.locator("#productTable")
//total number of rows and columns
const columns=await table.locator("thead tr th")
console.log("Number of columns: ",await columns.count())
expect(await columns.count()).toBe(4)
const rows=await table.locator("tbody tr")
console.log("Number of rows: ",await rows.count())
expect(await rows.count()).toBe(5)
await page.waitForTimeout(5000);
 })