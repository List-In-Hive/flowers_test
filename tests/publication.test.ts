import test from "node:test";
import assert from "node:assert/strict";
import { publicationHash } from "../lib/publication";
const article = { title: "Test", slug: "test", description: "Description", publishedAt: "2026-01-01T00:00:00Z", coverImage: "/images/hero.webp", coverAlt: "Flowers", body: "Article." };
test("publication fingerprint changes when approved content changes", () => {
  assert.notEqual(publicationHash(article), publicationHash({ ...article, body: "Changed." }));
  assert.notEqual(publicationHash(article), publicationHash({ ...article, coverImage: "/images/other.webp" }));
  assert.equal(publicationHash(article), publicationHash({ ...article, body: "\nArticle.\n" }));
});
