const {test, expect, request} = require('@playwright/test');
const loginPayLoad = {userEmail:'playwright1414@gmail.com', userPassword:'Test1414'};
let token;

test.beforeAll( async ()=>
{
const apiContext = await request.newContext();
//Grabbing the token
const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
{ 
    data:loginPayLoad 
});
  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;
  console.log(token);
});


test('Login with token', async({page})=>{


//Setting up the token in local storage
await page.addInitScript(value => {
     window.localStorage.setItem('token', value);
},token);
await page.goto("https://rahulshettyacademy.com/client/");


});