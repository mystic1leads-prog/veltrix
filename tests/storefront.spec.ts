import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import catalog from "../src/data/catalog.json" with { type: "json" };
import { categories } from "../src/data/categories";

const product = catalog.find((product) => product.name.startsWith("BPC-157"))!;

test.beforeEach(async ({ page }) => {
  // External font availability should not determine whether application flows pass.
  await page.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) =>
    route.abort(),
  );
});

test("homepage displays the collection and loaded local imagery", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Small molecules.",
  );
  await expect(
    page.getByRole("heading", { name: "Find your research focus." }),
  ).toBeVisible();
  await page
    .getByRole("heading", { name: "Your next discovery starts here." })
    .scrollIntoViewIfNeeded();
  const images = page.locator("main article img");
  await expect(images).toHaveCount(4);
  for (const image of await images.all())
    await expect(image).toHaveJSProperty("naturalWidth", 600);
  expect(errors).toEqual([]);
});

test.describe("specified routes", () => {
  const catalogPaths = [
    "/shop/",
    ...Array.from({ length: 6 }, (_, index) => `/shop/page/${index + 2}/`),
    ...categories.map((category) => `/product-category/${category.slug}/`),
    ...categories
      .slice(0, 2)
      .map((category) => `/product-category/${category.slug}/page/2/`),
  ];
  const corePaths = [
    "/about-us/",
    "/contact-us/",
    "/my-account/",
    "/cart/",
    "/checkout/",
    "/privacy/",
    "/terms/",
  ];
  for (const path of [...catalogPaths, ...corePaths]) {
    test(`${path} resolves with page content`, async ({ page }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      if (catalogPaths.includes(path))
        await expect(page.locator("main article").first()).toBeVisible();
    });
  }
});

test("search suggestions support keyboard selection", async ({ page }) => {
  await page.goto("/");
  const search = page
    .getByRole("combobox", { name: "Search products" })
    .first();
  await search.fill("BPC-157");
  await expect(page.getByRole("listbox")).toBeVisible();
  await search.press("ArrowDown");
  await search.press("Enter");
  await expect(page).toHaveURL(`/product/${product.slug}/`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    product.name,
  );
});

test("cart totals, quantity changes, persistence and removal", async ({
  page,
}) => {
  await page.goto(`/product/${product.slug}/`);
  await page
    .getByRole("button", { name: "Increase Quantity", exact: true })
    .click();
  await page.getByRole("button", { name: /Add to cart/ }).click();
  const dialog = page.getByRole("dialog", { name: "Your cart (2)" });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByText(`$${(product.price * 2).toFixed(2)}`, { exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "Open cart, 2 items" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "View your cart" })
    .click();
  await page
    .getByRole("button", { name: `Increase ${product.name}`, exact: true })
    .click();
  await expect(
    page
      .getByText(`$${(product.price * 3).toFixed(2)}`, { exact: true })
      .first(),
  ).toBeVisible();
  await page.getByRole("button", { name: `Remove ${product.name}` }).click();
  await expect(
    page.getByRole("heading", {
      name: "Your cart is waiting for a discovery.",
    }),
  ).toBeVisible();
});

test("search, price filters, sort and empty results", async ({ page }) => {
  await page.goto("/shop/?q=BPC");
  await expect(page.locator("main article")).toHaveCount(
    catalog.filter((product) => product.name.toLowerCase().includes("bpc"))
      .length,
  );
  await page.goto("/shop/?min=50&max=100&stock=in&sort=price-asc");
  const results = catalog
    .filter(
      (product) =>
        product.price >= 50 && product.price <= 100 && product.inStock,
    )
    .sort((a, b) => a.price - b.price);
  await expect(page.locator("main article").first()).toContainText(
    results[0].name,
  );
  await page
    .getByRole("combobox", { name: "Sort products" })
    .selectOption("price-desc");
  await expect(page.locator("main article").first()).toContainText(
    results.at(-1)!.name,
  );
  await page.goto("/shop/?q=not-a-real-compound");
  await expect(
    page.getByRole("heading", { name: "A different direction, perhaps?" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.locator("main article")).toHaveCount(8);
});

test("invalid persisted carts recover without a crash", async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem("veltrix.cart.v1", "{invalid-json"),
  );
  await page.goto("/cart/");
  await expect(
    page.getByRole("heading", {
      name: "Your cart is waiting for a discovery.",
    }),
  ).toBeVisible();
});

test("checkout validates fields and never fabricates an order", async ({
  page,
}) => {
  await page.addInitScript(
    (item) =>
      localStorage.setItem(
        "veltrix.cart.v1",
        JSON.stringify([{ productId: item.id, quantity: 1 }]),
      ),
    product,
  );
  await page.goto("/checkout/");
  await page.getByRole("button", { name: "Continue to payment" }).click();
  await expect(
    page.getByText("Checkout is temporarily unavailable.", { exact: false }),
  ).not.toBeVisible();
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("research@example.com");
  await page.getByRole("textbox", { name: "First name" }).fill("Alex");
  await page.getByRole("textbox", { name: "Last name" }).fill("Researcher");
  await page
    .getByRole("combobox", { name: "Country / region" })
    .selectOption("SG");
  await page
    .getByRole("textbox", { name: "Street address" })
    .fill("1 Research Road");
  await page
    .getByRole("textbox", { name: "City", exact: false })
    .fill("Singapore");
  await page.getByRole("textbox", { name: "Postal code" }).fill("123456");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Continue to payment" }).click();
  await expect(page.getByRole("status")).toContainText(
    "no order has been placed",
  );
  const saved = await page.evaluate(() =>
    localStorage.getItem("veltrix.cart.v1"),
  );
  expect(JSON.parse(saved!)).toEqual([{ productId: product.id, quantity: 1 }]);
});

test("contact and account actions report service availability", async ({
  page,
}) => {
  await page.goto("/contact-us/");
  await page
    .getByRole("textbox", { name: "Your name" })
    .fill("Alex Researcher");
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("research@example.com");
  await page
    .getByRole("combobox", { name: "What can we help with?" })
    .selectOption("Certificates of analysis");
  await page
    .getByRole("textbox", { name: "Your message" })
    .fill("Could you share batch documentation for this compound?");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText("has not been sent");
  await page.goto("/my-account/");
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("research@example.com");
  await page.getByLabel(/^Password/).fill("not-a-real-password");
  await page
    .getByRole("button", { name: "Sign in", exact: true })
    .last()
    .click();
  await expect(page.getByRole("status")).toContainText(
    "Account access is temporarily unavailable",
  );
  const storage = await page.evaluate(() => JSON.stringify(localStorage));
  expect(storage).not.toContain("not-a-real-password");
});

test("mobile navigation, filters, dialog focus and layout", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("dialog", { name: "Veltrix" });
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "Shop all compounds" }).click();
  await expect(menu).not.toBeVisible();
  await page.getByRole("button", { name: "Filters", exact: true }).click();
  const filters = page.getByRole("dialog", { name: "Filter the collection" });
  await expect(filters).toBeVisible();
  for (let index = 0; index < 18; index++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() =>
        Boolean(document.activeElement?.closest("dialog")),
      ),
    ).toBeTruthy();
  }
  await page.keyboard.press("Escape");
  await expect(filters).not.toBeVisible();
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/shop/",
      `/product/${product.slug}/`,
      "/cart/",
      "/my-account/",
    ]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBeTruthy();
    }
  }
});

test("home, catalog and product have no serious accessibility violations", async ({
  page,
}) => {
  for (const path of ["/", "/shop/", `/product/${product.slug}/`]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      violations.filter((violation) =>
        ["critical", "serious"].includes(violation.impact || ""),
      ),
    ).toEqual([]);
  }
});
