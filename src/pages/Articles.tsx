import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { Calendar, Clock, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { articles, type Article, type ArticleCategory } from "@/data/articles";
import { formatDate } from "@/lib/utils";

const categoryOrder: ArticleCategory[] = ["skills", "agents", "business"];

const stripHtml = (html: string) => html.replace(/<[^>]+>/g, " ");

// Every word of the query must appear in the title, excerpt, tags or body.
const matchesQuery = (article: Article, q: string) => {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const hay = `${article.title} ${article.excerpt} ${article.tags.join(" ")} ${stripHtml(article.content)}`.toLowerCase();
  return words.every((w) => hay.includes(w));
};

const categoryConfig: Record<ArticleCategory, { emoji: string; title: string; color: string }> = {
  agents: {
    emoji: "🤖",
    title: "פוסטים מקהילת הסוכנים",
    color: "purple",
  },
  business: {
    emoji: "📊",
    title: "מפת ההתייעלות לעסק",
    color: "blue",
  },
  skills: {
    emoji: "🛠️",
    title: "סקילים לקלוד קוד",
    color: "purple",
  },
};

const byDateDesc = (a: Article, b: Article) => new Date(b.date).getTime() - new Date(a.date).getTime();

const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const catParam = searchParams.get("cat");
  const activeCat: ArticleCategory | "all" =
    catParam && (categoryOrder as string[]).includes(catParam) ? (catParam as ArticleCategory) : "all";

  const updateParams = (next: { q?: string; cat?: ArticleCategory | "all" }) => {
    const params = new URLSearchParams(searchParams);
    if (next.q !== undefined) {
      if (next.q) params.set("q", next.q);
      else params.delete("q");
    }
    if (next.cat !== undefined) {
      if (next.cat === "all") params.delete("cat");
      else params.set("cat", next.cat);
    }
    setSearchParams(params, { replace: true });
  };

  const results = useMemo(
    () =>
      articles
        .filter((a) => (activeCat === "all" || a.category === activeCat) && matchesQuery(a, query.trim()))
        .sort(byDateDesc),
    [query, activeCat],
  );
  const isFiltering = query.trim() !== "" || activeCat !== "all";

  const renderArticleCard = (article: (typeof articles)[number]) => (
    <Link key={article.id} to={`/articles/${article.slug}`} className="group">
      <article className="bg-navy-light rounded-xl border border-purple-700/20 overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-purple-700/50 hover:shadow-lg hover:shadow-purple-700/10 hover:-translate-y-1">
        {article.image && (
          <div className={`w-full h-48 overflow-hidden ${article.image.includes("gem-guide") ? "bg-navy-light" : ""}`}>
            <img
              src={article.image}
              alt={article.title}
              className={`w-full h-full transition-transform duration-300 group-hover:scale-105 ${article.image.includes("gem-guide") ? "object-contain" : "object-cover"}`}
              loading="lazy"
            />
          </div>
        )}

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-purple-700/20 text-purple-300 border-0 font-heebo text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <h2 className="text-xl font-bold font-heebo text-white mb-3 group-hover:text-purple-400 transition-colors leading-tight">
            {article.title}
          </h2>

          <p className="text-gray-400 font-heebo text-sm leading-relaxed mb-6 flex-grow">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-500 font-heebo mt-auto pt-4 border-t border-purple-700/10">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(article.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {article.readingTime} דק' קריאה
            </span>
          </div>
        </div>
      </article>
    </Link>
  );

  const renderSection = (category: ArticleCategory, items: typeof articles) => {
    const config = categoryConfig[category];
    if (items.length === 0) return null;
    return (
      <section key={category} className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-purple-700/20 flex items-center justify-center text-2xl shrink-0">
            {config.emoji}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-heebo text-white">
            {config.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(renderArticleCard)}
        </div>
      </section>
    );
  };

  return (
    <div className="bg-navy-dark min-h-screen py-16">
      <Helmet>
        <title>מאמרים על AI לעסקים | גיא כהן</title>
        <meta name="description" content="פוסטים ותובנות על בינה מלאכותית לעסקים - כל מה שצריך לדעת על AI לעסקים קטנים ובינוניים, במקום אחד" />
        <link rel="canonical" href="https://guycohen-ai.co.il/articles" />

        {/* Open Graph meta tags */}
        <meta property="og:title" content="מאמרים | גיא כהן - יועץ AI לעסקים" />
        <meta property="og:description" content="מאמרים על סוכני AI, אוטומציות עסקיות, וכלים חינמיים שיעזרו לעסק שלכם" />
        <meta property="og:url" content="https://guycohen-ai.co.il/articles" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://guycohen-ai.co.il/og-image.png" />
        <meta property="og:locale" content="he_IL" />
        <meta property="og:site_name" content="גיא כהן — ייעוץ AI לעסקים" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="מאמרים | גיא כהן - יועץ AI לעסקים" />
        <meta name="twitter:description" content="מאמרים על סוכני AI, אוטומציות עסקיות, וכלים חינמיים שיעזרו לעסק שלכם" />
        <meta name="twitter:image" content="https://guycohen-ai.co.il/og-image.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "מאמרים על AI לעסקים",
            "numberOfItems": articles.length,
            "itemListElement": articles.map((article, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `https://guycohen-ai.co.il/articles/${article.slug}`,
              "name": article.title
            }))
          })}
        </script>
      </Helmet>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heebo text-white mb-4">
            מאמרים ותובנות
          </h1>
          <div className="w-24 h-1 bg-purple-700 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 font-heebo max-w-2xl mx-auto">
            {articles.length} פוסטים ותובנות מהקהילות שלי. כל מה שצריך לדעת על AI לעסקים, במקום אחד
          </p>
        </div>

        {/* Search + category filter */}
        <div className="mb-12 space-y-5">
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="relative max-w-xl mx-auto"
          >
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
            <Input
              type="search"
              value={query}
              onChange={(e) => updateParams({ q: e.target.value })}
              placeholder="חיפוש במאמרים, למשל: וואטסאפ, סרטון, חוזה"
              aria-label="חיפוש במאמרים"
              className="bg-navy-light border-purple-700/30 text-white placeholder:text-gray-500 font-heebo pr-10 h-12 text-base focus-visible:ring-purple-400"
            />
            {query && (
              <button
                type="button"
                onClick={() => updateParams({ q: "" })}
                aria-label="ניקוי החיפוש"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </form>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="סינון לפי קטגוריה">
            {(["all", ...categoryOrder] as const).map((cat) => {
              const isActive = activeCat === cat;
              const label = cat === "all" ? "הכל" : `${categoryConfig[cat].emoji} ${categoryConfig[cat].title}`;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => updateParams({ cat })}
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
          {isFiltering && (
            <p className="text-center text-sm text-gray-400 font-heebo" aria-live="polite">
              {results.length > 0 ? `נמצאו ${results.length} מאמרים` : ""}
            </p>
          )}
        </div>

        {isFiltering ? (
          results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {results.map(renderArticleCard)}
            </div>
          ) : (
            <p className="text-center text-gray-400 font-heebo text-lg py-12">
              לא מצאתי מאמר שמתאים לחיפוש. נסו מילה אחרת, או{" "}
              <Link to="/tools" className="text-purple-400 hover:text-purple-300 underline">
                הציצו בארגז הכלים החינמי
              </Link>
              .
            </p>
          )
        ) : (
          categoryOrder.map((cat) => renderSection(cat, results.filter((a) => a.category === cat)))
        )}
      </div>
    </div>
  );
};

export default Articles;
