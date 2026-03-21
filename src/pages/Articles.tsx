import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { articles } from "@/data/articles";

const Articles = () => {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("he-IL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="bg-navy-dark min-h-screen py-16">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sorted.map((article) => (
            <Link
              key={article.id}
              to={`/articles/${article.slug}`}
              className="group"
            >
              <article className="bg-navy-light rounded-xl border border-purple-700/20 overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-purple-700/50 hover:shadow-lg hover:shadow-purple-700/10 hover:-translate-y-1">
                {article.image && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
