import * as common from "./Common";

export const login = async (page, username, password, baseUrl) => {
  if (baseUrl) {
    await page.goto(baseUrl);
  }
  await common.GetElement("username").fill(username);
  await common.GetElement("password").fill(password);
  await common.GetElement("loginButton").click();
};
