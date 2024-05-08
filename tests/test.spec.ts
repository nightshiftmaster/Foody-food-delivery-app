// @ts-check
const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { Page } = require("@playwright/test");

let browser;
let page;
test.beforeAll(async () => {
  test.setTimeout(60000);
  browser = await chromium.launch();
  page = await browser.newPage();
});

test.describe("testing application", () => {
  test(
    "testing home page",
    async ({ page }: { page: any }) => {
      await page.goto("/", {
        waitUntil: "networkidle",
      });
      await Promise.all([
        page.waitForSelector('[data-testid="home"]'),
        page.waitForSelector('[data-testid="banner"]'),
        page.waitForSelector('[data-testid="video-content"]'),
        page.waitForSelector('[data-testid="text-content"]'),
        page.waitForSelector('[data-testid="menu-button"]'),
        page.waitForSelector('[data-testid="navbar"]'),
        page.waitForSelector('[data-testid="featured"]'),
        page.waitForSelector('[data-testid="offer"]'),
        page.waitForSelector('[data-testid="offer"]'),
        page.waitForSelector('[data-testid="notification"]'),
        page.waitForSelector('[data-testid="footer"]'),
      ]);

      await Promise.all([
        page.getByRole("button", { name: "Check Out Menu" }).click(),
        page.waitForURL(`/menu`),
        page.waitForSelector('[data-testid="menu"]'),
      ]);
      // await page.goto("/");
      // await page.waitForURL("/"),
      // await Promise.all([
      //   page.getByRole("button", { name: "Find out more here!" }).click(),
      //   page.waitForURL(`/menu/burgers`),
      //   page.waitForSelector('[data-testid="menu-burgers"]'),
      // ]);
    },
    { timeout: 60000 }
  );
  test("testing menu page", async ({ page }: { page: any }) => {
    await page.goto("/menu", {
      waitUntil: "networkidle",
    });
  });
});
