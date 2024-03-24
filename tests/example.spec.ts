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
    browseProperties.click({ delay: 1000 });
    await testPage.waitForPage("properties");

    const propertyCard = await testPage.locator(".property_card", {
      hasText: "Ski-In/Ski-Out Chalet",
    });
    await propertyCard.locator(".details-btn").click({ delay: 1000 });

    // console.log(propertyCard);

    // expect(await propertyCard.isVisible()).toBe(true);
    await testPage.waitFor(".more-photo");
    await testPage.locator(".more-photo").nth(1).click({ delay: 1000 });

    await testPage.locator(".back-to-properties").click({ delay: 1000 });

    await testPage.waitForPage("");

    await testPage.locator(".view-all-properties").click({ delay: 1000 });

    await testPage.waitForPage("properties");
  });

  test("happy test google login", async ({ page }) => {
    testPage = new PropertyPulse(page);

    await testPage.startWithURL("http://localhost:3000");

    await testPage.waitFor(".browse_properties");

    await testPage.locator(".loginBtn-desktop").click({ delay: 1000 });

    await testPage.waitForPage("sign-in");

    await testPage
      .locator(".cl-main")
      .locator(".cl-formFieldInput")
      .nth(0)
      .type("test@gmail.com", { delay: 100 });

    await testPage
      .locator(".cl-formButtonPrimary", { hasText: "continue" })
      .click({ delay: 1000 });
  });
});
