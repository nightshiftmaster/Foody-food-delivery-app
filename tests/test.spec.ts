// @ts-check
import { test, expect, type Page } from "@playwright/test";

test.beforeAll(async () => {
  test.setTimeout(100000);
});

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

    // await page.waitForTimeout(6000);
    // expect(await page.screenshot()).toMatchSnapshot();

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

  test("testing navbar", async ({
    page,
    browserName,
  }: {
    page: Page;
    browserName: string;
  }) => {
    test.skip(browserName === "webkit", "Still working on it");
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/", {
      waitUntil: "networkidle",
    });

    await Promise.all([
      page.getByRole("link", { name: "Homepage" }).click(),
      page.waitForURL(`/`),
      page.waitForSelector('[data-testid="home"]'),
    ]);

    await Promise.all([
      page.getByRole("link", { name: "Menu" }).click(),
      page.waitForURL(`/menu`),
      page.waitForSelector('[data-testid="menu"]'),
    ]);

    await Promise.all([
      page.getByRole("link", { name: "Contact" }).click(),
      page.waitForURL(`/contact`),
      page.waitForSelector('[data-testid="contact"]'),
    ]);

    await Promise.all([
      page.locator('h1:has-text("Foody")').click(),
      page.waitForURL(`/`),
      page.waitForSelector('[data-testid="home"]'),
    ]);

    await Promise.all([
      page.getByRole("link", { name: "Login" }).click(),
      page.waitForURL(`/login`),
      page.waitForSelector('[data-testid="login"]'),
    ]);
    await Promise.all([
      page.getByTestId("cartIcon").last().click(),
      page.waitForURL(`/cart`),
      page.waitForSelector('[data-testid="cart"]'),
    ]);
  });

  test("testing menu page", async ({ page }: { page: any }) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/menu", {
      waitUntil: "networkidle",
    });
    await page.waitForSelector('[data-testid="menu"]');
    // await page.waitForTimeout(6000);
    // expect(await page.screenshot()).toMatchSnapshot();
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
    // await page.waitForTimeout(6000);
    // expect(await page.screenshot()).toMatchSnapshot();
    await page.getByRole("link", { name: "Back to Menu" }).click(),
      await Promise.all([
        page.getByRole("link", { name: "Juicy burgers" }).click(),
        page.waitForURL(`/menu/burgers`),
        page.waitForSelector('[data-testid="menu-burgers"]'),
      ]);
    // await page.waitForTimeout(6000);
    // expect(await page.screenshot()).toMatchSnapshot();
    await page.getByRole("link", { name: "Back to Menu" }).click(),
      await Promise.all([
        page.getByRole("link", { name: "Italian pastas" }).click(),
        page.waitForURL(`/menu/pastas`),
        page.waitForSelector('[data-testid="menu-pastas"]'),
      ]);
    // await page.waitForTimeout(6000);
    // expect(await page.screenshot()).toMatchSnapshot();
  });
  test("testing contact page", async ({ page }: { page: any }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/contact", {
      waitUntil: "networkidle",
    });
    await page.waitForSelector('[data-testid="contact"]');
    // await page.waitForTimeout(6000);
    // expect(await page.screenshot()).toMatchSnapshot();

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
    // expect(await page.screenshot()).toMatchSnapshot();
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
    browserName,
    page,
  }: {
    browserName: string;
    page: any;
  }) => {
    test.setTimeout(100000);

    test.skip(browserName === "firefox", "Still working on it");
    test.skip(browserName === "webkit", "Still working on it");
    await page.goto("/", {
      waitUntil: "networkidle",
    });

    await page.getByTestId("cartIcon").last().click(),
      await expect(page.getByText("Cart is Empty")).toBeVisible();
    await page.getByRole("link", { name: "<<Back to menu" }).click();
    await page.waitForURL(`/menu`);
    await page.goto("/", {
      waitUntil: "networkidle",
    });
    await page.getByText("sicilian").click();
    // await page.waitForTimeout(6000);
    // expect(await page.screenshot()).toMatchSnapshot();
    await Promise.all([
      page.waitForSelector('[data-testid="product-Sicilian"]'),
      page.waitForSelector('[data-testid="product-image"]'),
      page.waitForSelector('[data-testid="product-body"]'),
      page.waitForSelector('[data-testid="product-price"]'),
      page.waitForSelector('[data-testid="product-options"]'),
      page.waitForSelector('[data-testid="product-quantity"]'),
    ]);
    //testing counter//
    await expect(page.getByTestId("quantity-count")).toHaveText("1");
    await page.getByText(">").click();
    await expect(page.getByTestId("quantity-count")).toHaveText("2");
    await page.getByRole("button", { name: "Add to cart" }).click();
    await expect(page.getByTestId("cart-counter").first()).toHaveText("2");
    //testing cart //
    await page.getByRole("button", { name: "Go to cart" }).click();
    await page.waitForURL(`/cart`);
    await page.waitForSelector('[data-testid="cart"]');
    await expect(page.getByTestId("cart-item")).toBeVisible();
    await expect(page.getByTestId("cart-items-container")).toBeVisible();
    await expect(page.getByTestId("cart-totals-container")).toBeVisible();
    await page.getByRole("button", { name: "CHECKOUT" }).click();
    await page.waitForURL(`/login`);
    await page.getByRole("button", { name: "Sign in with Facebook" }).click();
    await page.waitForURL(`/cart`);
    await page.getByRole("button", { name: "CHECKOUT" }).click();
    await page.waitForURL("**/pay/**");

    //payment process
    await page.waitForSelector('[data-testid="payment-page"]');
    await page.waitForSelector('[id="payment-form"]');
    await page.waitForSelector('[data-testid="address-form"]');
    //address element
    const addressElementiframe = await page.waitForSelector(
      "#address-element iframe"
    );
    const addressElement = await addressElementiframe.contentFrame();
    await addressElement.getByText("Full name").fill("Vlad Medvedev");
    await addressElement.getByText("Address line 1").fill("Knaanim 3");
    await addressElement.getByText("Country or region").selectOption("Israel");
    await addressElement.getByText("City").last().fill("Eilat");
    await addressElement.getByText("Postal code").fill("8810000");

    // pay element
    const payElementiframe = await page.waitForSelector(
      "#payment-element iframe"
    );
    const payElement = await payElementiframe.contentFrame();
    await payElement
      .getByPlaceholder("1234 1234 1234 1234")
      .fill("4242424242424242");
    await payElement.getByPlaceholder("MM / YY").fill("1234");
    await payElement.getByPlaceholder("CVC").fill("424");
    await page.getByRole("button", { name: "Pay now" }).click();
    await page.waitForSelector('[data-testid="success-page"]');
    await expect(page.getByText(`Your payment was successful.`)).toBeVisible();
    await expect(
      page.getByText(`You are redirected to the Order Tracking page. Plesase don't close the
    page`)
    ).toBeVisible();

    await page.waitForURL("**/tracking/**", {
      timeout: 100000,
    });

    await page.waitForSelector('[data-testid="loader"]');

    await Promise.all([
      page.waitForSelector('[data-testid="tracking-page"]'),
      page.waitForSelector('[data-testid="tracking-page-header"]'),
      page.waitForSelector('[data-testid="stepper"]'),
      page.waitForSelector('[data-testid="map"]'),
      page.waitForSelector('[data-testid="counter"]'),
    ]);
  });
});
