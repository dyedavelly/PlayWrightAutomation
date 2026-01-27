const { test, expect} = require('@playwright/test');

test.only('Client App Login', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client");
    const username = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginButton = page.locator("#login");
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";

    await username.fill("playwright1414@gmail.com");
    await password.fill("Test1414");
    
    await Promise.all([
        page.waitForURL(/dashboard/),
        loginButton.click()
    ]);
    
    await page.locator(".card-body b").first().waitFor();

    const productCount = await products.count();

    for(let i = 0; i < productCount; i++){
        if (await products.nth(i).locator("b").textContent() === productName)
        {
           await products.nth(i).locator("text= Add To Cart").click();
           break;
        }
    }
    await page.locator("[routerlink*='cart']").click();

    const cartItems = page.locator(".cartSection h3");
    await cartItems.first().waitFor();
    await expect(cartItems.first()).toHaveText(productName);
    const checkoutButton = page.locator(".totalRow button");
    await checkoutButton.click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i = 0; i < optionsCount; i++){
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text.trim() === "India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    const placeOrderButton = page.locator(".actions a");
    await placeOrderButton.click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    //await page.pause();

});