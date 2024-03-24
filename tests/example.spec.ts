import { test, expect } from "@playwright/test";
import PropertyPulse from "./models/property";

const rootURL = "http://localhost:3000";

test.describe("basic flow", () => {
  let testPage: PropertyPulse;

  test("happy test", async ({ page }) => {
    testPage = new PropertyPulse(page);

    // const {userName, password } = process.env.PROD
    await testPage.startWithURL("http://localhost:3000");

    await testPage.waitFor(".browse_properties");

    const browseProperties = await testPage.locator(".browse_properties", {
      hasText: "Browse Properties",
    });
    expect(await browseProperties.isVisible()).toBe(true);
    browseProperties.click();
    await testPage.waitForPage("properties");
  });
});
