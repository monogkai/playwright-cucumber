import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  setDefaultTimeout,
  Status,
} from "@cucumber/cucumber";
import {
  Browser,
  BrowserContext,
  chromium,
  expect,
  selectors,
} from "@playwright/test";
import pageFixture from "./pageFixture";
import { login } from "../pages/loginPage";

const iframe = 'id="root"';

let browser: Browser;
let browserContext: BrowserContext;

setDefaultTimeout(300 * 1000);

Before({ timeout: 80000 }, async () => {
  selectors.setTestIdAttribute("data-test");

  browser = await chromium.launch({
    headless: false,
  });

  let page = await browser.newPage();

  let frame = page.frameLocator(`[${iframe}]`);
  pageFixture.page = page;
  pageFixture.frame = frame;

  await login(
    page,
    "standard_user",
    "secret_sauce",
    "https://www.saucedemo.com/",
  );

  await page
    .context()
    .storageState({ path: "storage-state/storageState.json" });

  browserContext = await browser.newContext({
    storageState: "storage-state/storageState.json",
  });

  /*page = await browserContext.newPage();
    await page.goto("https://www.saucedemo.com/");

    frame = page.frameLocator(`[${iframe}]`);
    pageFixture.page = page;
    pageFixture.frame = frame;*/
  pageFixture.context = browserContext;
});

Before({ tags: "@automated" }, async () => {});

After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    const img = await pageFixture.page.screenshot({
      path: `.reports/allure-results/tests/${scenario.pickle.id}.png`,
      type: "png",
    });
    this.attach(img, "image/png");

    if (pageFixture.screenshot !== undefined) {
      this.attach(pageFixture.screenshot, "image/png");
      pageFixture.screenshot = undefined;
    }

    browserContext.close();
    pageFixture.page.close();
  }
});

AfterAll(async () => {
  await browser.close();
});
