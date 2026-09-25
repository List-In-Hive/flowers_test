import test from "node:test";
import assert from "node:assert/strict";
import { parseArticles, publicArticles } from "../lib/blog";
function article(extra: string = "") {
  return {
    name: "test.md",
    source: `---\ntitle: Test article\nslug: test-article\ndescription: Test description\npublishedAt: "2026-01-01T00:00:00Z"\nstatus: published\ncoverImage: /images/hero.webp\ncoverAlt: Flowers\n${extra}---\n\nA useful article body.`,
  };
}
test("valid article exposes content and reading time", () => {
  const [a] = parseArticles([article()]);
  assert.equal(a.slug, "test-article");
  assert.equal(a.readingTime, 1);
});
test("duplicate slugs fail with an actionable error", () =>
  assert.throws(
    () => parseArticles([article(), { ...article(), name: "another.md" }]),
    /Duplicate article slug/,
  ));
test("invalid metadata fails and identifies the file", () =>
  assert.throws(
    () =>
      parseArticles([
        {
          name: "bad.md",
          source: article().source.replace(
            "slug: test-article",
            "slug: ../unsafe",
          ),
        },
      ]),
    /bad.md/,
  ));
test("a timezone is required", () =>
  assert.throws(() =>
    parseArticles([
      {
        ...article(),
        source: article().source.replace(
          "2026-01-01T00:00:00Z",
          "2026-01-01T00:00:00",
        ),
      },
    ]),
  ));
test("drafts and future articles are unavailable until due", () => {
  const [a] = parseArticles([article()]);
  const entries = [
    a,
    { ...a, slug: "draft", status: "draft" as const },
    { ...a, slug: "future", publishedAt: "2026-12-01T00:00:00Z" },
  ];
  assert.deepEqual(
    publicArticles(entries, new Date("2026-09-25T00:00:00Z")).map(
      (a) => a.slug,
    ),
    ["test-article"],
  );
  assert.equal(
    publicArticles(entries, new Date("2026-12-01T00:00:00Z"))[0].slug,
    "future",
  );
});
test("script image URLs are rejected", () =>
  assert.throws(() =>
    parseArticles([
      {
        ...article(),
        source: article().source.replace(
          "/images/hero.webp",
          "javascript:alert(1)",
        ),
      },
    ]),
  ));
