// Builds sitemap.xml, rss.xml and llms.txt from the site data.
// Used by the `seo-files` plugin in vite.config.ts, so these files are
// regenerated on every build and never fall behind the articles list.
// Keep this file free of browser-only and "@/..." imports: it runs in Node.

import type { Article } from "../data/articles";
import type { Tool } from "../data/tools";

export const SITE_URL = "https://guycohen-ai.co.il";

// `sitemap: false` keeps a page out of sitemap.xml (e.g. /lectures, which redirects to an external page).
const STATIC_PAGES: { path: string; priority: string; title: string; description: string; sitemap?: boolean }[] = [
  { path: "/", priority: "1.0", title: "דף הבית", description: "ייעוץ AI לעסקים קטנים ובינוניים: מיפוי, המלצה וליווי עד תוצאות." },
  { path: "/articles", priority: "0.9", title: "מאמרים", description: "כל המאמרים, הסקילים וסיכומי הכנסים." },
  { path: "/tools", priority: "0.9", title: "ארגז הכלים החינמי", description: "סקילים לקלוד קוד, כלים ומדריכים בקוד פתוח." },
  { path: "/lectures", priority: "0.8", title: "הרצאות", description: "הרצאות וסדנאות AI לארגונים ולעסקים.", sitemap: false },
  { path: "/book", priority: "0.8", title: "קביעת שיחת ייעוץ", description: "קביעת שיחה ראשונה." },
  { path: "/profiling-form", priority: "0.7", title: "טופס איפיון", description: "שאלון קצר לפני שיחת ייעוץ." },
  { path: "/accessibility", priority: "0.3", title: "הצהרת נגישות", description: "" },
  { path: "/privacy-policy", priority: "0.3", title: "מדיניות פרטיות", description: "" },
  { path: "/terms-of-use", priority: "0.3", title: "תנאי שימוש", description: "" },
];

const xmlEscape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const byDateDesc = (a: Article, b: Article) => b.date.localeCompare(a.date);

const latestDate = (articles: Article[]) => [...articles].sort(byDateDesc)[0]?.date;

export function buildSitemap(articles: Article[]): string {
  const newest = latestDate(articles);
  const urls = [
    ...STATIC_PAGES.filter((p) => p.sitemap !== false).map((p) => {
      const lastmod = p.path === "/" || p.path === "/articles" || p.path === "/tools" ? newest : undefined;
      return `  <url><loc>${SITE_URL}${p.path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}<priority>${p.priority}</priority></url>`;
    }),
    ...[...articles]
      .sort(byDateDesc)
      .map(
        (a) =>
          `  <url><loc>${SITE_URL}/articles/${a.slug}</loc><lastmod>${a.date}</lastmod><priority>0.7</priority></url>`,
      ),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

const rfc822 = (isoDate: string) => new Date(`${isoDate}T09:00:00+03:00`).toUTCString();

export function buildRss(articles: Article[], limit = 30): string {
  const items = [...articles]
    .sort(byDateDesc)
    .slice(0, limit)
    .map((a) => {
      const url = `${SITE_URL}/articles/${a.slug}`;
      return [
        "    <item>",
        `      <title>${xmlEscape(a.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${rfc822(a.date)}</pubDate>`,
        `      <description>${xmlEscape(a.excerpt)}</description>`,
        ...a.tags.map((t) => `      <category>${xmlEscape(t)}</category>`),
        "    </item>",
      ].join("\n");
    });
  const newest = latestDate(articles);
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>גיא כהן | AI לעסקים</title>
    <link>${SITE_URL}/articles</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>מאמרים, סקילים לקלוד קוד וכלים חינמיים על AI לעסקים קטנים ובינוניים</description>
    <language>he</language>
${newest ? `    <lastBuildDate>${rfc822(newest)}</lastBuildDate>\n` : ""}${items.join("\n")}
  </channel>
</rss>
`;
}

const categoryTitles: Record<Article["category"], string> = {
  skills: "סקילים לקלוד קוד",
  agents: "סוכני AI",
  business: "AI לעסק ולארגון",
};

// llms.txt: a plain map of the site for AI assistants (https://llmstxt.org).
export function buildLlmsTxt(articles: Article[], tools: Tool[]): string {
  const lines: string[] = [
    "# גיא כהן | ייעוץ AI לעסקים",
    "",
    "> גיא כהן הוא יועץ AI לעסקים קטנים ובינוניים בישראל. מיפוי אתגרים, המלצה על פתרונות AI מותאמים אישית, וליווי עד תוצאות: סוכני AI, אוטומציות, בוטים לוואטסאפ ו-Claude Code. כל הכלים והסקילים שלו פתוחים וחינמיים בגיטהאב.",
    "",
    `- אתר: ${SITE_URL}`,
    "- מייל: info@guycohen-ai.co.il",
    "- טלפון: +972-54-623-2063",
    "- לינקדאין: https://www.linkedin.com/in/guycohen-ai/",
    "- גיטהאב: https://github.com/guycoful",
    "",
    "## עמודים",
    ...STATIC_PAGES.filter((p) => p.description).map((p) => `- [${p.title}](${SITE_URL}${p.path}): ${p.description}`),
  ];

  for (const cat of ["skills", "agents", "business"] as const) {
    const items = articles.filter((a) => a.category === cat).sort(byDateDesc);
    if (items.length === 0) continue;
    lines.push("", `## ${categoryTitles[cat]}`);
    for (const a of items) lines.push(`- [${a.title}](${SITE_URL}/articles/${a.slug}): ${a.excerpt}`);
  }

  if (tools.length > 0) {
    lines.push("", "## כלים וסקילים בקוד פתוח");
    for (const t of tools) lines.push(`- [${t.name}](${t.repo}): ${t.description}`);
  }

  return `${lines.join("\n")}\n`;
}
