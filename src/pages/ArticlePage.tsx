import { Helmet } from "react-helmet-async";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Share2, MessageCircle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { articles } from "@/data/articles";
import { formatDate } from "@/lib/utils";
import { useEffect } from "react";

const SITE_URL = "https://guycohen-ai.co.il";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const article = articles.find((a) => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  const articleUrl = `${SITE_URL}/articles/${article.slug}`;
  const articleImageUrl = article.image ? `${SITE_URL}${article.image}` : `${SITE_URL}/og-image.png`;

  // Get related articles from the same category, excluding current article
  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const shareWhatsApp = () => {
    const text = `${article.title}\n\n${articleUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      toast({ title: "הקישור הועתק!" });
    } catch {
      toast({ title: "לא הצלחתי להעתיק", variant: "destructive" });
    }
  };

  // Content comes from our own trusted data file (src/data/articles.ts),
  // not from user input or external sources. Safe to render as HTML.
  return (
    <div className="bg-navy-dark min-h-screen py-12">
      <Helmet>
        <title>{`${article.title} | גיא כהן`}</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={articleUrl} />

        {/* Open Graph meta tags */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={articleImageUrl} />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:type" content="article" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={articleImageUrl} />
        <meta property="og:image:alt" content={article.title} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            datePublished: article.date,
            dateModified: article.date,
            description: article.excerpt,
            image: articleImageUrl,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": articleUrl,
            },
            author: {
              "@type": "Person",
              name: "\u05D2\u05D9\u05D0 \u05DB\u05D4\u05DF",
              url: SITE_URL,
              image: `${SITE_URL}/images/guy-cohen-portrait.webp`,
              jobTitle: "\u05D9\u05D5\u05E2\u05E5 AI \u05DC\u05E2\u05E1\u05E7\u05D9\u05DD",
              description: "\u05D9\u05D5\u05E2\u05E5 AI \u05DC\u05E2\u05E1\u05E7\u05D9\u05DD \u05E7\u05D8\u05E0\u05D9\u05DD \u05D5\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9\u05D9\u05DD. \u05DE\u05E0\u05D4\u05DC \u05E7\u05D4\u05D9\u05DC\u05EA AI \u05E2\u05DD 1,000+ \u05D7\u05D1\u05E8\u05D9\u05DD. \u05DE\u05EA\u05DE\u05D7\u05D4 \u05D1\u05E1\u05D5\u05DB\u05E0\u05D9 AI, \u05D0\u05D5\u05D8\u05D5\u05DE\u05E6\u05D9\u05D5\u05EA \u05E2\u05E1\u05E7\u05D9\u05D5\u05EA, \u05D5\u05D1\u05D5\u05D8\u05D9\u05DD \u05DC\u05D5\u05D5\u05D8\u05E1\u05D0\u05E4.",
              sameAs: ["https://www.linkedin.com/in/guycohen-ai/"],
            },
            publisher: {
              "@type": "Organization",
              name: "\u05D2\u05D9\u05D0 \u05DB\u05D4\u05DF \u2014 \u05D9\u05D9\u05E2\u05D5\u05E5 AI",
              logo: {
                "@type": "ImageObject",
                url: "https://guycohen-ai.co.il/images/guy-cohen-ai-logo.png",
              },
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "\u05D3\u05E3 \u05D4\u05D1\u05D9\u05EA",
                item: SITE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "\u05DE\u05D0\u05DE\u05E8\u05D9\u05DD",
                item: `${SITE_URL}/articles`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: articleUrl,
              },
            ],
          })}
        </script>
      </Helmet>
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Back button */}
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-heebo text-sm mb-8 transition-colors"
        >
          <ArrowRight className="h-4 w-4" />
          חזרה למאמרים
        </Link>

        {/* Hero image */}
        {article.image && (
          <div className="w-full rounded-xl overflow-hidden mb-8">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-10">
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

          <h1 className="text-3xl md:text-4xl font-bold font-heebo text-white mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-400 font-heebo">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(article.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {article.readingTime} דק' קריאה
            </span>
          </div>
        </header>

        {/* Article content — trusted source: own data file, not user input */}
        <article
          className="prose prose-invert prose-lg max-w-none font-heebo
            prose-headings:font-heebo prose-headings:font-bold
            prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
            [&_h3]:!text-2xl [&_h3]:!md:text-3xl [&_h3]:!mt-14 [&_h3]:!mb-6 [&_h3]:!text-white [&_h3]:!leading-snug
            [&_h4]:!text-xl [&_h4]:!md:text-2xl [&_h4]:!mt-10 [&_h4]:!mb-5 [&_h4]:!text-white [&_h4]:!leading-snug
            [&_p]:!text-gray-100 [&_p]:!mb-6 [&_p]:!leading-8
            [&_ul]:!my-8 [&_ol]:!my-8
            [&_li]:!text-gray-100 [&_li]:!mb-3 [&_li]:!leading-8
            [&_strong]:!text-white
            [&_hr]:!my-12 [&_hr]:!border-purple-700/30
            [&_blockquote]:!my-8 [&_blockquote]:!border-purple-500/50 [&_blockquote]:!text-gray-200
            [&_ol]:!text-gray-100"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Author bio */}
        <div className="mt-12 border border-purple-500/30 rounded-xl p-6 bg-navy-light">
          <div className="flex items-start gap-4">
            <div className="w-1 h-full min-h-[60px] bg-purple-500 rounded-full shrink-0"></div>
            <div>
              <p className="text-lg font-bold font-heebo text-white mb-2">
                נכתב על ידי גיא כהן
              </p>
              <p className="text-base font-heebo text-gray-300 leading-relaxed">
                יועץ AI לעסקים קטנים ובינוניים. בוגר מנהל עסקים מאוניברסיטת בן גוריון ומאסטר קלאס AI של הייקיו דיגיטל.
              </p>
            </div>
          </div>
        </div>

        {/* Share buttons */}
        <div className="mt-12 pt-8 border-t border-purple-700/20">
          <div className="flex items-center gap-3 mb-6">
            <Share2 className="h-5 w-5 text-gray-400" />
            <span className="text-gray-400 font-heebo font-medium">שתפו את המאמר</span>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={shareWhatsApp}
              variant="outline"
              className="border-green-600/30 text-green-400 hover:bg-green-600/10 hover:text-green-300 font-heebo"
            >
              <MessageCircle className="h-4 w-4 ml-2" />
              וואטסאפ
            </Button>
            <Button
              onClick={copyLink}
              variant="outline"
              className="border-purple-700/30 text-purple-400 hover:bg-purple-700/10 hover:text-purple-300 font-heebo"
            >
              <Copy className="h-4 w-4 ml-2" />
              העתק קישור
            </Button>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-8 border-t border-purple-700/20">
            <h2 className="text-2xl font-bold font-heebo text-white mb-8">
              מאמרים נוספים מהקטגוריה
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  to={`/articles/${related.slug}`}
                  className="group"
                >
                  <div className="bg-navy-light rounded-xl border border-purple-700/20 overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-purple-700/50 hover:shadow-lg hover:shadow-purple-700/10 hover:-translate-y-1">
                    {related.image && (
                      <div className="w-full h-40 overflow-hidden">
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-base font-bold font-heebo text-white mb-2 group-hover:text-purple-400 transition-colors leading-tight line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-gray-400 font-heebo text-sm leading-relaxed line-clamp-2 flex-grow">
                        {related.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-heebo mt-3 pt-3 border-t border-purple-700/10">
                        <Calendar className="h-3 w-3" />
                        {formatDate(related.date)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Author Profile */}
        <div className="mt-12 bg-navy-light rounded-xl border border-purple-700/20 p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5" dir="rtl">
          <img
            src="/images/guy-cohen-portrait.webp"
            alt="גיא כהן - יועץ AI לעסקים"
            className="w-20 h-20 rounded-full object-cover border-2 border-purple-700/30 shrink-0"
          />
          <div>
            <h4 className="text-white font-bold font-heebo text-lg mb-1">נכתב על ידי גיא כהן</h4>
            <p className="text-gray-300 font-heebo text-sm leading-relaxed">
              יועץ AI לעסקים קטנים ובינוניים בישראל. מנהל קהילת AI עם 1,000+ חברים פעילים.
              מתמחה בבניית סוכני AI, אוטומציות עסקיות (Make.com), בוטים לווטסאפ ואינסטגרם (ManyChat), ומערכות CRM חכמות.
              פוסטים שלי בלינקדאין הגיעו למאות אלפי חשיפות.
              מלווה עשרות עסקים מאיפיון ועד הפעלה בשטח.
            </p>
            <a
              href="https://www.linkedin.com/in/guycohen-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm font-heebo mt-2 transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              עקבו אחרי בלינקדאין
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-navy-light rounded-xl border border-purple-700/20 p-8 text-center">
          <h3 className="text-2xl font-bold font-heebo text-white mb-3">
            רוצה ליהנות מתכנים כאלה ישירות?
          </h3>
          <p className="text-gray-300 font-heebo mb-6">
            הצטרף לקהילת הוואטסאפ שלי או קבע שיחת ייעוץ ראשונית ללא עלות
          </p>
          <Link to="/#contact">
            <Button className="bg-blue-primary hover:bg-blue-primary/90 text-white font-heebo font-medium px-8 py-3">
              צור קשר
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
