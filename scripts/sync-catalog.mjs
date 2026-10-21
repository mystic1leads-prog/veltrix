import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const origin = "https://nordaxlabs.com";
const categories = [
  "growth-hormone-boosters",
  "fat-loss-diabetes",
  "recovery-healing",
  "anti-aging-cellular-health",
  "nootropics-cognitive-enhancers",
  "libido-sexual-health",
  "sleep-recovery",
];
const clean = (value = "") =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;/gi, "")
    .replace(/\s+/g, " ")
    .trim();
async function request(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(45000) });
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  return response;
}

await mkdir(resolve("src/data"), { recursive: true });
await mkdir(resolve("public/products"), { recursive: true });
const first = await request(
  `${origin}/wp-json/wc/store/v1/products?per_page=100`,
);
const rows = await first.json();
const pages = Number(first.headers.get("x-wp-totalpages") || 1);
for (let page = 2; page <= pages; page++)
  rows.push(
    ...(await (
      await request(
        `${origin}/wp-json/wc/store/v1/products?per_page=100&page=${page}`,
      )
    ).json()),
  );
// Keep the seven research collections in the brief; unrelated medicine collections are out of scope.
const selected = rows.filter(
  (row) =>
    row.categories.some((category) => categories.includes(category.slug)) &&
    !row.categories.some((category) => category.slug === "top-medicine"),
);
const products = [];
let next = 0;
await Promise.all(
  Array.from({ length: 5 }, async () => {
    while (next < selected.length) {
      const row = selected[next++];
      const image = row.images[0];
      let localImage = "";
      if (image) {
        const imageUrl = image.thumbnail || image.src;
        const extension =
          new URL(imageUrl).pathname.match(/\.(png|jpe?g|webp)$/i)?.[1] ||
          "png";
        localImage = `/products/${row.id}.${extension}`;
        try {
          await writeFile(
            resolve(`public${localImage}`),
            Buffer.from(await (await request(imageUrl)).arrayBuffer()),
          );
        } catch (error) {
          console.warn(`Image fallback for ${row.id}: ${error.message}`);
          localImage = "";
        }
      }
      const minorUnit = 10 ** row.prices.currency_minor_unit;
      products.push({
        id: String(row.id),
        slug: row.slug,
        name: clean(row.name),
        sku: row.sku || null,
        categories: row.categories
          .map((category) => category.slug)
          .filter((slug) => categories.includes(slug)),
        price: Number(row.prices.price) / minorUnit,
        regularPrice: Number(row.prices.regular_price) / minorUnit,
        currency: row.prices.currency_code,
        inStock: row.is_in_stock,
        image: localImage,
        sourceImage: image?.src || null,
        sourceUrl: row.permalink,
        summary: clean(row.short_description),
        description: clean(row.description),
        format: clean(
          row.attributes
            .find((attribute) => /format/i.test(attribute.name))
            ?.terms.map((term) => term.name)
            .join(", ") || "",
        ),
        certificate: null,
      });
    }
  }),
);
products.sort((a, b) => a.name.localeCompare(b.name));
await writeFile(
  resolve("src/data/catalog.json"),
  JSON.stringify(products, null, 2) + "\n",
);
const paths = [
  "/",
  "/about-us/",
  "/contact-us/",
  "/my-account/",
  "/cart/",
  "/shop/",
  ...Array.from({ length: 6 }, (_, i) => `/shop/page/${i + 2}/`),
  ...categories.map((category) => `/product-category/${category}/`),
  ...categories
    .slice(0, 2)
    .map((category) => `/product-category/${category}/page/2/`),
];
const crawl = [];
for (const path of paths) {
  try {
    const html = await (await request(origin + path)).text();
    crawl.push({
      path,
      title: clean(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]),
      productIds: [...html.matchAll(/data-product-id="(\d+)"/g)].map(
        (match) => match[1],
      ),
    });
  } catch (error) {
    crawl.push({ path, error: error.message });
  }
}
await writeFile(
  resolve("src/data/source-manifest.json"),
  JSON.stringify(
    {
      origin,
      fetchedAt: new Date().toISOString(),
      count: products.length,
      pages: crawl,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `Saved ${products.length} source products, local images, and ${crawl.length} page crawl records.`,
);
