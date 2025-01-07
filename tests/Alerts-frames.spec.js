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

test ("Web tables and pagination",async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/")
 const table=await page.locator("#productTable")
//1.total number of rows and columns
const columns=await table.locator("thead tr th")
console.log("Number of columns: ",await columns.count())
expect(await columns.count()).toBe(4)
const rows=await table.locator("tbody tr")
console.log("Number of rows: ",await rows.count())
expect(await rows.count()).toBe(5)

//2.select the checkbox in the table
// const matchedRow=rows.filter({
// has:page.locator("td"),
// hasText:"Smartwatch"
// })
// await matchedRow.locator("input").check()

//3.select multiple products by reusable function
await selectProduct(rows,page,"Smartwatch")
await selectProduct(rows,page,"Laptop")
await selectProduct(rows,page,"Smartphone")
 
//4.print  all product details
 
for(let i=0;i<await rows.count();i++){
const row=rows.nth(i);
const tds=row.locator("td");
  for(let j=0;j<await tds.count()-1;j++){
    console.log(await tds.nth(j).textContent());
  }
  //5.read the data for all pages
  const pages=await page.locator(".pagination li a")
  console.log("Number of pages: "+await pages.count())
  for(let p=0;p<await pages.count();p++){
if(p>0){
await pages.nth(p).click();
}
for(let i=0;i<await rows.count();i++){
  const row=rows.nth(i);
  const tds=row.locator("td");
    for(let j=0;j<await tds.count()-1;j++){
      console.log(await tds.nth(j).textContent());
    }
  }
  }
}
await page.waitForTimeout(5000);

async function selectProduct(rows,page,name){
  const matchedRow=rows.filter({
    has:page.locator("td"),
    hasText:name
    })
    await matchedRow.locator("input").check()
 }
 })


test("Date Picker",async({page})=>{

await page.goto("https://testautomationpractice.blogspot.com/")
await page.fill("//input[@id='datepicker']","01/01/2024")

//date picker
const year="2024"
const month="January"
const date="15"

await page.click("//input[@id='datepicker']")

while(true){

  const currentYear=await page.locator('ui-datepicker-year').textContent();
  const currentMonth=await page.locator("ui-datepicker-month").textContent();

  if(currentYear==year && currentMonth==month){
break;
  }
await page.locator("//a[@title='Next']").click();//Next
await page.locator("//a[@title='Prev']").click();//Previous
}
// const dates=await page.$$("//a[@class='ui-state-default']")
// for(const dt of dates){
//   if(await dt.textContent()==date){
//     await dt.click();
//     break;
// }
// }

//date selection -without loop
await page.click(`//a[@class='ui-state-default'][text()='${date}']`)

await page.waitForTimeout(5000);

 })

test("Mouse hover actions",async({page})=>{

await page.goto("https://www.opencart.com/")

const desktop=await page.locator("//a[normalize-space()='Desktops']")
const mac=await page.locator("//a[normalize-space()='Mac (1)']")

//mouse hover

await desktop.hover()
await mac.click()
await page.waitForTimeout(5000);
 })

test("Mouse Right click",async({page})=>{

  await page.goto("https://swisnl.github.io/jQuery-contextMenu/demo.html")
const button=await page.locator("//span[normalize-space()='right click me']")

//right click

await button.click({button:"right"})
await page.waitForTimeout(5000);

 })

 test("Mouse double click action",async({page})=>{

await page.goto("https://testautomationpractice.blogspot.com/")

const btnCopy=await page.locator("//button[normalize-space()='Copy Text']")
await btnCopy.dblclick()
const f2=await page.locator("#field2")

await expect(f2).toHaveValue("Hello World!");
await page.waitForTimeout(5000);
 })

test("Mouse Drag and drop",async({page})=>{
await page.goto("http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html")
const sourceElement=await page.locator("//div[@id='box5']")
const targetElement=await page.locator("//div[@id='box107']")
//approach 1
// await sourceElement.hover()
// await page.mouse.down()
// await targetElement.hover()
// await page.mouse.up()

//approach 2
await sourceElement.dragTo(targetElement)

await page.waitForTimeout(5000);
  })

  test("Keyboard actions",async({page})=>{

    await page.goto("https://gotranscript.com/text-compare")
    await page.locator('[name="text1"]').fill("Welcome to automation")

    //Ctrl + A
    await page.keyboard.press("Control+A")
    //Ctrl + C
    await page.keyboard.press("Control+C")
    //Tab
    await page.keyboard.down("Tab")
    await page.keyboard.up("Tab")
    //Ctrl + V
    await page.keyboard.press("Control+V")
  })

  test.only("Upload single files",async({page})=>{
await page.goto("https://www.foundit.in/upload")
await page.waitForSelector("//i[@class='mqfihd-upload']")
await page.locator("//i[@class='mqfihd-upload']").click()
await page.locator("//input[@id='file-upload']").setInputFiles("tests-examples/demo-todo-app.spec.js")
await page.waitForTimeout(5000);

 })
 test("Upload multiple files",async({page})=>{
  await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php")
  // await page.locator("//input[@id='filesToUpload']").click()
  await page.locator("//input[@id='filesToUpload']").setInputFiles(["tests-examples/demo-todo-app.spec.js","tests-examples/Assertions.spec.js"])
  await page.waitForTimeout(5000);
  
   })
  






