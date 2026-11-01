import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Code, ExternalLink, BookOpen, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  tools,
  toolCategories,
  kindLabels,
  type Tool,
  type ToolCategory,
} from "@/data/tools";

const SITE_URL = "https://guycohen-ai.co.il";
const categoryOrder: ToolCategory[] = ["video", "business", "sales", "personal", "builders"];

const matches = (tool: Tool, q: string) => {
  if (!q) return true;
  const hay = `${tool.name} ${tool.description} ${toolCategories[tool.category].title}`.toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => hay.includes(word));
};

const ToolCard = ({ tool }: { tool: Tool }) => (
  <article className="bg-navy-light rounded-xl border border-purple-700/20 p-6 h-full flex flex-col transition-all duration-300 hover:border-purple-700/50 hover:shadow-lg hover:shadow-purple-700/10 hover:-translate-y-1">
    <div className="flex items-center justify-between gap-3 mb-3">
      <h3 className="text-lg md:text-xl font-bold font-heebo text-white leading-tight">{tool.name}</h3>
      <Badge variant="secondary" className="bg-purple-700/20 text-purple-300 border-0 font-heebo text-xs shrink-0">
        {kindLabels[tool.kind]}
      </Badge>
    </div>
    <p className="text-gray-300 font-heebo text-sm leading-relaxed mb-6 flex-grow">{tool.description}</p>
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 border-t border-purple-700/10 text-sm font-heebo">
      {tool.articleSlug && (
        <Link
          to={`/articles/${tool.articleSlug}`}
          className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 font-medium transition-colors"
        >
          <BookOpen className="h-4 w-4" />
          איך זה עובד
        </Link>
      )}
      <a
        href={tool.repo}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
      >
        <Code className="h-4 w-4" />
        גיטהאב
      </a>
      {tool.liveUrl && (
        <a
          href={tool.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          לאתר החי
        </a>
      )}
    </div>
  </article>
);

const Tools = () => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<ToolCategory | "all">("all");

  const filtered = useMemo(
    () => tools.filter((t) => (active === "all" || t.category === active) && matches(t, query.trim())),
    [query, active],
  );

  const skillCount = tools.filter((t) => t.kind === "skill").length;
  const title = "כלים וסקילים חינמיים ל-AI | גיא כהן";
  const description = `${tools.length} סקילים לקלוד קוד, כלים ומדריכים חינמיים שבניתי ופרסמתי בקוד פתוח: וידאו וקול בעברית, חוזים והוצאות, מכירות, סוכנים אישיים ובניית אתרים.`;

  return (
    <div className="bg-navy-dark min-h-screen py-16" dir="rtl">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/tools`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/tools`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:locale" content="he_IL" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "כלים וסקילים חינמיים של גיא כהן",
            numberOfItems: tools.length,
            itemListElement: tools.map((tool, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "SoftwareSourceCode",
                name: tool.name,
                description: tool.description,
                codeRepository: tool.repo,
                url: tool.articleSlug ? `${SITE_URL}/articles/${tool.articleSlug}` : tool.liveUrl || tool.repo,
                dateModified: tool.updated,
                isAccessibleForFree: true,
                author: { "@type": "Person", name: "גיא כהן", url: SITE_URL },
              },
            })),
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold font-heebo text-white mb-4">ארגז הכלים החינמי</h1>
          <div className="w-24 h-1 bg-purple-700 mx-auto mb-6"></div>
          <p className="text-base md:text-lg text-gray-300 font-heebo max-w-2xl mx-auto leading-relaxed">
            כל הסקילים, הכלים והמדריכים שבניתי ופרסמתי בקוד פתוח. {skillCount} מהם הם סקילים ל-Claude Code:
            קובץ הוראות שמלמד את הסוכן לבצע משימה אחת היטב. הכל חינם, והקוד פתוח בגיטהאב.
          </p>
        </div>

        {/* Search + category filter */}
        <div className="mb-10 space-y-5">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="חיפוש כלי, למשל: סרטון, חוזה, מכירות"
              aria-label="חיפוש בכלים"
              className="bg-navy-light border-purple-700/30 text-white placeholder:text-gray-500 font-heebo pr-10 h-12 text-base focus-visible:ring-purple-400"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="ניקוי החיפוש"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="סינון לפי תחום">
            {(["all", ...categoryOrder] as const).map((cat) => {
              const label = cat === "all" ? "הכל" : `${toolCategories[cat].emoji} ${toolCategories[cat].title}`;
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  aria-pressed={isActive}
                  className={`px-4 py-2 rounded-full text-sm font-heebo font-medium border transition-colors ${
                    isActive
                      ? "bg-purple-700 border-purple-700 text-white"
                      : "border-purple-700/30 text-gray-300 hover:text-white hover:border-purple-700/60"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 font-heebo text-lg py-12">
            לא מצאתי כלי שמתאים לחיפוש. נסו מילה אחרת, או{" "}
            <Link to="/#contact" className="text-purple-400 hover:text-purple-300 underline">
              ספרו לי מה אתם צריכים
            </Link>
            .
          </p>
        ) : (
          categoryOrder
            .filter((cat) => filtered.some((t) => t.category === cat))
            .map((cat) => {
              const items = filtered
                .filter((t) => t.category === cat)
                .sort((a, b) => b.updated.localeCompare(a.updated));
              return (
                <section key={cat} className="mb-14" aria-labelledby={`tools-${cat}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-purple-700/20 flex items-center justify-center text-2xl shrink-0">
                      {toolCategories[cat].emoji}
                    </div>
                    <div>
                      <h2 id={`tools-${cat}`} className="text-xl md:text-3xl font-bold font-heebo text-white">
                        {toolCategories[cat].title}
                      </h2>
                      <p className="text-gray-400 font-heebo text-sm">{toolCategories[cat].description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </section>
              );
            })
        )}

        {/* How to install a skill */}
        <section className="bg-navy-light rounded-xl border border-purple-700/20 p-6 md:p-8 mt-4">
          <h2 className="text-xl md:text-2xl font-bold font-heebo text-white mb-4">איך מתקינים סקיל ?</h2>
          <ol className="list-decimal pr-5 space-y-2 text-gray-300 font-heebo leading-relaxed">
            <li>נכנסים לריפו בגיטהאב ומורידים אותו (כפתור Code ואז Download ZIP), או מעתיקים את הקישור.</li>
            <li>
              ב-Claude Code אפשר פשוט לכתוב: "תתקין לי את הסקיל מהקישור הזה" ולהדביק את הקישור. הסוכן מעתיק את התיקייה
              למקום הנכון.
            </li>
            <li>מפעילים את הסקיל במילים רגילות, או בפקודה שמופיעה בקובץ ההסבר של הריפו.</li>
          </ol>
          <p className="text-gray-400 font-heebo text-sm mt-4">
            רוצים שאתאים אחד מהכלים לעסק שלכם, או שאבנה לכם כלי חדש ?{" "}
            <Link to="/#contact" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
              דברו איתי
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Tools;
