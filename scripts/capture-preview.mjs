import { chromium } from "@playwright/test";

const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "domcontentloaded" });
  await page
    .getByRole("heading", { name: "Small molecules. Big possibilities." })
    .waitFor();
  await page.evaluate(async () => {
    await Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 5000)),
    ]);
    for (const image of document.images) image.loading = "eager";
    await Promise.all(
      [...document.images].map((image) => image.decode().catch(() => {})),
    );
  });
  await page.screenshot({ path: ".preview/home-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: ".preview/home-mobile-viewport.png" });
  await page.screenshot({ path: ".preview/home-mobile.png", fullPage: true });
  await page.goto("http://127.0.0.1:5173/shop/", {
    waitUntil: "domcontentloaded",
  });
  await page.getByRole("heading", { level: 1 }).waitFor();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: ".preview/shop-desktop.png", fullPage: true });
  console.log("Saved desktop, mobile, and catalog previews to .preview/.");
} finally {
  await browser.close();
}
