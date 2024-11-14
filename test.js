const { Builder, By, until } = require("selenium-webdriver");

async function start() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    for (let i = 0; i < 3; i++) {
      // Ulangi 10 kali
      console.log(`Running Test #${i + 1}`);

      // Buka halaman login
      await driver.get(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
      );

      // Tunggu hingga elemen input username muncul
      await driver.wait(until.elementLocated(By.name("username")), 10000);

      // Masukkan username
      await driver.findElement(By.name("username")).sendKeys("admin");

      // Tunggu hingga elemen input password muncul
      await driver.wait(until.elementLocated(By.name("password")), 10000);

      // Masukkan password
      await driver.findElement(By.name("password")).sendKeys("admin123");

      // Tunggu hingga tombol login muncul, lalu klik
      await driver.wait(
        until.elementLocated(By.className("oxd-button")),
        10000
      );
      await driver.findElement(By.className("oxd-button")).click();

      // Tunggu hingga elemen dropdown user muncul, lalu klik untuk logout
      await driver.wait(
        until.elementLocated(By.className("oxd-userdropdown-tab")),
        10000
      );
      await driver.findElement(By.className("oxd-userdropdown-tab")).click();

      // Tunggu hingga tombol logout muncul, lalu klik
      await driver.wait(
        until.elementLocated(
          By.xpath("//a[@href='/web/index.php/auth/logout']")
        ),
        10000
      );
      await driver
        .findElement(By.xpath("//a[@href='/web/index.php/auth/logout']"))
        .click();

      // Tunggu hingga halaman login muncul kembali untuk memastikan logout berhasil
      await driver.wait(
        until.elementLocated(By.className("orangehrm-login-form")),
        10000
      );

      // Verifikasi login berhasil dengan memastikan halaman login ditampilkan kembali
      let formLogin = await driver
        .findElement(By.className("orangehrm-login-form"))
        .isDisplayed();
      if (formLogin) {
        console.log(`Test #${i + 1} Passed: Login & Logout Successful`);
      } else {
        console.log(`Test #${i + 1} Failed: Login & Logout Unsuccessful`);
      }

      // Tambahkan jeda antar ulangan jika diperlukan
      await driver.sleep(1000); // Jeda 1 detik
    }
  } catch (error) {
    console.error("Test Failed:", error);
  } finally {
    // Tutup browser setelah semua ulangan selesai
    await driver.quit();
  }
}

start();
