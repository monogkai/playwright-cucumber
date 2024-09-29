import pageFixture from "../hooks/pageFixture";
import { dataTest } from "../utils/dataTest";

export const GetElement = (elementName: string) =>
  pageFixture.page.locator(`[data-test='${dataTest[elementName]}']`);
