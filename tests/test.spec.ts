// @ts-check
import { test, expect, type Page } from "@playwright/test";

test.describe("testing application", () => {
  test("testing home page", async ({ page }: { page: Page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
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

    await page.waitForTimeout(5000);
    expect(await page.screenshot()).toMatchSnapshot();

    await Promise.all([
      page.getByRole("button", { name: "Check Out Menu" }).click(),
      page.waitForURL(`/menu`),
      page.waitForSelector('[data-testid="menu"]'),
    ]);

    await page.goto("/", {
      waitUntil: "networkidle",
    });
    await page.waitForURL(`/`);

    await Promise.all([
      page.getByRole("button", { name: "Find out more here!" }).click(),
      page.waitForURL(`/menu/burgers`),
      page.waitForSelector('[data-testid="menu-burgers"]'),
    ]);
  });

  test("testing menu page", async ({ page }: { page: any }) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/menu", {
      waitUntil: "networkidle",
    });
    await page.waitForSelector('[data-testid="menu"]');
    await page.waitForTimeout(5000);
    expect(await page.screenshot()).toMatchSnapshot();
    await Promise.all([
      page.waitForSelector('[data-testid="pizzas"]'),
      page.waitForSelector('[data-testid="pastas"]'),
      page.waitForSelector('[data-testid="burgers"]'),
    ]);
    await Promise.all([
      page.getByRole("link", { name: "Cheesy pizzas" }).click(),
      page.waitForURL(`/menu/pizzas`),
      page.waitForSelector('[data-testid="menu-pizzas"]'),
    ]);
    await page.waitForTimeout(5000);
    expect(await page.screenshot()).toMatchSnapshot();
    await page.getByRole("link", { name: "Back to Menu" }).click(),
      await Promise.all([
        page.getByRole("link", { name: "Juicy burgers" }).click(),
        page.waitForURL(`/menu/burgers`),
        page.waitForSelector('[data-testid="menu-burgers"]'),
      ]);
    await page.waitForTimeout(5000);
    expect(await page.screenshot()).toMatchSnapshot();
    await page.getByRole("link", { name: "Back to Menu" }).click(),
      await Promise.all([
        page.getByRole("link", { name: "Italian pastas" }).click(),
        page.waitForURL(`/menu/pastas`),
        page.waitForSelector('[data-testid="menu-pastas"]'),
      ]);
    await page.waitForTimeout(5000);
    expect(await page.screenshot()).toMatchSnapshot();
  });
  test("testing contact page", async ({ page }: { page: any }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/contact", {
      waitUntil: "networkidle",
    });
    await page.waitForSelector('[data-testid="contact"]');
    await page.waitForTimeout(5000);
    expect(await page.screenshot()).toMatchSnapshot();

    await expect(page.getByText("CONTACT US")).toBeVisible();
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText("Please fill the name field")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Message is required")).toBeVisible();

    const name = page.getByPlaceholder("name");
    const email = page.getByPlaceholder("email");
    const message = page.getByPlaceholder("message");

    await name.fill("vlad");
    await email.fill("nightshift@gmail.com");
    await message.fill("Hello");

    await expect(name).toHaveValue("vlad");
    await expect(email).toHaveValue("nightshift@gmail.com");
    await expect(message).toHaveValue("Hello");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText("Email sent successfully!")).toBeVisible();
  });

  test("testing login page", async ({ page }: { page: any }) => {
    await page.goto("/login", {
      waitUntil: "networkidle",
    });
    expect(await page.screenshot()).toMatchSnapshot();
    await Promise.all([
      page.waitForSelector('[data-testid="login"]'),
      page.waitForSelector('[data-testid="login-image"]'),
      page.waitForSelector('[data-testid="login-form"]'),
    ]);

    const facebookButton = await page.getByRole("button", {
      name: "Sign in with Facebook",
    });
    const googleButton = await page.getByRole("button", {
      name: "Sign in with Google",
    });

    const contactUs = await page.getByRole("link", { name: "Contact us" });
    await expect(page.getByText("Welcome")).toBeVisible();
    await expect(page.getByText("Have a problem")).toBeVisible();
    await expect(
      page.getByText("Please login to purchase products")
    ).toBeVisible();
    await expect(facebookButton).toBeVisible();
    await expect(googleButton).toBeVisible();
    await expect(contactUs).toBeVisible();
    await Promise.all([
      contactUs.click(),
      page.waitForURL(`/contact`),
      page.waitForSelector('[data-testid="contact"]'),
    ]);
    await page.goto("/login", {
      waitUntil: "networkidle",
    });
    await Promise.all([
      facebookButton.click(),
      page.waitForURL(`/`),
      page.waitForSelector('[data-testid="home"]'),
    ]);
  });
  test("testing cart, product page and purchasing product", async ({
    page,
  }: {
    page: any;
  }) => {
    await page.goto("/", {
      waitUntil: "networkidle",
    });
    await page.getByText("sicilian").click();
    await page.waitForTimeout(5000);
    expect(await page.screenshot()).toMatchSnapshot();
    await Promise.all([
      page.waitForSelector('[data-testid="product-Sicilian"]'),
      page.waitForSelector('[data-testid="product-image"]'),
      page.waitForSelector('[data-testid="product-body"]'),
      page.waitForSelector('[data-testid="product-price"]'),
      page.waitForSelector('[data-testid="product-options"]'),
      page.waitForSelector('[data-testid="product-quantity"]'),
    ]);
  });
});
