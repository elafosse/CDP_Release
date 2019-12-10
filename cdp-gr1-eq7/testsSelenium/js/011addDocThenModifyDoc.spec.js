// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('011_addDocThenModifyDoc', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('firefox').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('011_addDocThenModifyDoc', async function() {
    await driver.get("http://localhost:3000/")
    await driver.findElement(By.linkText("Sign In")).click()
    await driver.findElement(By.id("username")).sendKeys("Test")
    await driver.findElement(By.css(".form-group:nth-child(2) > .col-md-6")).click()
    await driver.findElement(By.id("password")).click()
    await driver.findElement(By.id("password")).sendKeys("test")
    await driver.findElement(By.css(".btn-primary")).click()
    await driver.findElement(By.linkText("Details")).click()
    await driver.findElement(By.css(".nav-link:nth-child(4) > .pl-3")).click()
    await driver.findElement(By.linkText("test2 test2")).click()
    await driver.findElement(By.xpath("(//a[contains(text(),\'✎\')])[2]")).click()
    await driver.findElement(By.id("docUrl")).click()
    await driver.findElement(By.id("docUrl")).sendKeys("https://www.youtube.com/ikujhlhlhlh")
    await driver.findElement(By.css(".float-right")).click()
    await driver.findElement(By.name("signout")).click()
  })
})
