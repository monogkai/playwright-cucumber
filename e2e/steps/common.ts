import { expect } from "@playwright/test";
import * as common from "../pages/Common";
import { Given } from "@cucumber/cucumber";
import pageFixture from "../hooks/pageFixture";
import fs from "fs";

//VISIBLE
Given("the {string} is visible", async (elementName: string) => {
  await expect(common.GetElement(elementName)).toBeVisible();
});

//HAVE TEXT
Given(
  "the {string} element have {string} text",
  async (elementName: string, text: string) => {
    await expect(common.GetElement(elementName)).toHaveText(text);
  },
);

//WAIT
Given("I wait a little bit", async () => {
  await pageFixture.page.waitForLoadState("load");
  await pageFixture.page.waitForTimeout(5000);
});

//HOVER
Given("I hover {string}", async (elementName: string) => {
  await common.GetElement(elementName).hover();
});

//CLICK
Given("I press {string}", async (elementName: string) => {
  await common.GetElement(elementName).click();
});

//FILL
Given(
  "I fill {string} with the {string}",
  async (elementName: string, text: string) => {
    await common.GetElement(elementName).fill(text);
  },
);

//COUNT
Given(
  "there are {string} elements of {string}",
  async (elementNumber: string, elementName: string) => {
    expect(await common.GetElement(elementName).count()).toBe(
      Number(elementNumber),
    );
  },
);

//UPLOAD
Given(
  "I upload file {string} of {string}",
  async (fileName: string, elementName: string) => {
    await common.GetElement(elementName).setInputFiles(fileName);
  },
);

//VISUAL TESTING
Given(
  "{string} element visual matches {string} image saved",
  async (dataTest: string, imageName: string) => {
    const threshold = 0.1;
    const screenshot = await common.GetElement(dataTest).screenshot();

    pageFixture.screenshot = screenshot;

    const savedImage = fs.readFileSync(imageName);

    expect(screenshot.length).toBe(savedImage.length);

    const totalPixels = screenshot.length / 4;
    const maxDifferentPixels = totalPixels * threshold;

    let differentPixels = 0;
    for (let i = 0; i < screenshot.length; i += 4) {
      if (
        Math.abs(screenshot[i] - savedImage[i]) > 10 ||
        Math.abs(screenshot[i + 1] - savedImage[i + 1]) > 10 ||
        Math.abs(screenshot[i + 2] - savedImage[i + 2]) > 10
      ) {
        differentPixels++;
      }
    }
    expect(maxDifferentPixels).toBeGreaterThanOrEqual(differentPixels);
  },
);
