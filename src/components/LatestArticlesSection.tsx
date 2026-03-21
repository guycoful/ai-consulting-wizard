import { Link } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";
import { articles } from "@/data/articles";
import { formatDate } from "@/lib/utils";

const LatestArticlesSection = () => {
  const latest = [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="bg-navy-dark py-16 md:py-20" dir="rtl">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-heebo mb-4">
            מהקהילה
          </h2>
          <div className="w-20 h-1 bg-purple-700 mx-auto mb-4"></div>
          <p className="text-gray-400 font-heebo text-lg">
            פוסטים ותובנות אחרונים מקהילות הסוכנים והעסקים
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((article) => (
            <Link
              key={article.id}
              to={`/articles/${article.slug}`}
              className="group"
            >
              <article className="bg-navy-light rounded-xl border border-purple-700/20 overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-purple-700/50 hover:shadow-lg hover:shadow-purple-700/10 hover:-translate-y-1">
                {article.image && (
                  <div className={`w-full h-40 overflow-hidden ${article.image.includes("gem-guide") ? "bg-navy-light" : ""}`}>
                    <img
                      src={article.image}
                      alt={article.title}
                      className={`w-full h-full transition-transform duration-300 group-hover:scale-105 ${article.image.includes("gem-guide") ? "object-contain" : "object-cover"}`}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold font-heebo text-white mb-2 group-hover:text-purple-400 transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 font-heebo text-sm leading-relaxed mb-4 flex-grow line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 font-heebo">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(article.date)}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-heebo font-medium transition-colors"
          >
            לכל המאמרים
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestArticlesSection;
