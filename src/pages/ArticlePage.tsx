import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Share2, MessageCircle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { articles } from "@/data/articles";
import { useEffect } from "react";

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

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("he-IL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const articleUrl = `https://guycohen-ai.co.il/articles/${article.slug}`;

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
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Back button */}
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-heebo text-sm mb-8 transition-colors"
        >
          <ArrowRight className="h-4 w-4" />
          חזרה למאמרים
        </Link>

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
            prose-headings:font-heebo prose-headings:text-white prose-headings:font-bold
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
            prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3
            prose-p:leading-relaxed prose-p:mb-4
            prose-ul:my-4 prose-ol:my-4
            prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
            [&_p]:!text-gray-100 [&_li]:!text-gray-100 [&_strong]:!text-white
            [&_h3]:!text-white [&_h4]:!text-white [&_ol]:!text-gray-100"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

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

        {/* CTA */}
        <div className="mt-12 bg-navy-light rounded-xl border border-purple-700/20 p-8 text-center">
          <h3 className="text-2xl font-bold font-heebo text-white mb-3">
            רוצה ליהנות מתכנים כאלה ישירות?
          </h3>
          <p className="text-gray-300 font-heebo mb-6">
            הצטרפו לקהילת הוואטסאפ שלי או קבעו שיחת ייעוץ ראשונית ללא עלות
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
