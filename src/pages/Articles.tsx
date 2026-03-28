import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { articles, type ArticleCategory } from "@/data/articles";
import { formatDate } from "@/lib/utils";

const categoryConfig: Record<ArticleCategory, { emoji: string; title: string; color: string }> = {
  agents: {
    emoji: "🤖",
    title: "פוסטים מקהילת הסוכנים",
    color: "purple",
  },
  business: {
    emoji: "💼",
    title: "פוסטים מקהילת העסקים",
    color: "blue",
  },
};

const Articles = () => {
  const agentArticles = [...articles]
    .filter((a) => a.category === "agents")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const businessArticles = [...articles]
    .filter((a) => a.category === "business")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
    return (
      <section className="mb-16">
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
            פוסטים ותובנות מהקהילות שלי — כל מה שצריך לדעת על AI לעסקים, במקום אחד
          </p>
        </div>

        {renderSection("agents", agentArticles)}
        {renderSection("business", businessArticles)}
      </div>
    </div>
  );
};

export default Articles;
