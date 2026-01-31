const {test, expect} = require("@playwright/test");

test("Calendar Test", async({page})=>{
  const month = "11";
  const date = "14";
  const year = "1990";
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

});