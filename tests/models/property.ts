import { Page } from "@playwright/test";

// extend Page to have more handy functions
export default class PropertyPulse {
  private page: Page;

  private language: string;

  constructor(page: Page, language = "en") {
    this.page = page;
    this.language = language;
  }

  async startWithURL(url: string) {
    await this.page.goto(url);
  }

  async waitForPage(pageName: string) {
    // timeout means response cannot exceed timeout time
    if (!this.page.url().endsWith(pageName)) {
      await this.page.waitForURL(`**/${pageName}`, { timeout: 5000 });
    }
  }

  async click(args: string, options = {}) {
    await this.page.click(args, options);
  }

  async clickSelector(selector: string) {
    await this.click(selector);
  }

  async locateVisible(optionText: string, click = false) {
    if (click) {
      await this.page.locator(`text="${optionText}" >> visible=true`).click();
    } else {
      await this.page.locator(`text="${optionText}" >> visible=true`);
    }
  }

  locator(selector: string, options = {}) {
    // look for the div which className contains selector string
    return this.page.locator(selector, options);
  }

  async waitFor(selector: string) {
    await this.page.waitForSelector(selector, { timeout: 5000 });
  }

  async fillInputField(fieldText: string, input: string) {
    await this.page.click(`text=${fieldText}`);
    await this.page.fill(`text=${fieldText}`, "");
    await this.page.type(`text=${fieldText}`, input, { delay: 500 });
  }

  async fillByLabel(label: string, value: string) {
    await this.page.getByLabel(label).click();
    await this.page.getByLabel(label).fill("");
    await this.page.getByLabel(label).type(value, { delay: 500 });
  }
}
