import { BrowserContext, Page, FrameLocator } from "@playwright/test";

export default {
  page: undefined as unknown as Page,
  frame: undefined as unknown as FrameLocator,
  context: undefined as unknown as BrowserContext,
  screenshot: undefined as unknown as Buffer,
};
