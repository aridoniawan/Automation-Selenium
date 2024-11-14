const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const fs = require("fs");

async function loadCookies(driver) {
  const cookiesData = JSON.parse(fs.readFileSync("cookies.json", "utf8")).data;
  for (let cookie of cookiesData) {
    await driver.manage().addCookie({
      name: cookie.userName,
      value: cookie.employee.employeeId,
      domain: "opensource-demo.orangehrmlive.com/web/index.php/dashboard/index", // Ganti dengan domain yang sesuai
    });
  }
}
async function start() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    // for (let i = 0; i < 3; i++) {
    // console.log(`Running Test #${i + 1}`);
    await loadCookies(driver);
    await driver.get(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
    );

    // await driver.wait(
    //   until.elementLocated(By.xpath("//button[text()='Add']")),
    //   10000
    // );

    // await driver.findElement(By.xpath("//button[text()='Add']")).click();

    await driver.sleep(1000);
    // }
  } catch (error) {
    console.log(error);
  } finally {
    await driver.quit();
  }
}

start();
