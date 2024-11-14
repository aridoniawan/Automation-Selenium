const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

async function start() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    for (let i = 0; i < 3; i++) {
      console.log(`Running Test #${i + 1}`);
      await driver.get(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
      );
      await driver.wait(until.elementLocated(By.name("username")), 10000);
      await driver.findElement(By.name("username")).sendKeys("admin");
      await driver.wait(until.elementLocated(By.name("password")), 10000);
      await driver.findElement(By.name("password")).sendKeys("admin123");
      await driver.wait(
        until.elementLocated(By.className("oxd-button")),
        10000
      );
      await driver.findElement(By.className("oxd-button")).click();

      await driver.wait(
        until.elementLocated(By.className("oxd-userdropdown-tab")),
        10000
      );
      await driver.findElement(By.className("oxd-userdropdown-tab")).click();

      await driver.wait(
        until.elementLocated(
          By.xpath("//a[@href='/web/index.php/auth/logout']")
        ),
        10000
      );
      await driver
        .findElement(By.xpath("//a[@href='/web/index.php/auth/logout']"))
        .click();
      await driver.wait(
        until.elementLocated(By.className("orangehrm-login-form")),
        10000
      );
      let formLogin = await driver
        .findElement(By.className("orangehrm-login-form"))
        .isDisplayed();
      if (formLogin) {
        console.log(`Test #${i + 1} Passed`);
      } else {
        console.log(`Test #${i + 1} Failed`);
      }
      console.count(formLogin);

      await driver.sleep(1000); // Jeda 1 detik
    }
  } catch (error) {
    console.error("Test Failed:", error);
  } finally {
    await driver.quit();
  }
}

start();
