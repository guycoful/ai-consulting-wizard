import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { tools, toolCategories, type ToolCategory } from "@/data/tools";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const categoryOrder: ToolCategory[] = ["video", "business", "sales", "personal", "builders"];

// Homepage teaser for the /tools catalog. Counts come straight from src/data/tools.ts.
const FreeToolsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-navy-dark pb-16 md:pb-20" dir="rtl" aria-labelledby="free-tools-title">
      <div
        ref={ref}
        className={`animate-scroll-in ${isVisible ? "visible" : ""} container mx-auto px-4 max-w-6xl`}
      >
        <div className="bg-navy-light rounded-xl border border-purple-700/20 p-6 md:p-10 transition-all hover:border-purple-700/40">
          <div className="text-center mb-8">
            <h2 id="free-tools-title" className="text-2xl md:text-4xl font-bold font-heebo text-white mb-4">
              ארגז הכלים החינמי
            </h2>
            <div className="w-20 h-1 bg-purple-700 mx-auto mb-4"></div>
            <p className="text-gray-300 font-heebo text-base md:text-lg max-w-2xl mx-auto">
              {tools.length} סקילים, כלים ומדריכים שבניתי ופרסמתי בקוד פתוח. בחינם, בעברית, ומוכנים לשימוש.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {categoryOrder.map((cat) => {
              const count = tools.filter((t) => t.category === cat).length;
              return (
                <Link
                  key={cat}
                  to="/tools"
                  className="bg-navy-dark rounded-xl p-4 border border-purple-700/20 text-center transition-all hover:border-purple-700/50 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-700/20 flex items-center justify-center text-xl mx-auto mb-2">
                    {toolCategories[cat].emoji}
                  </div>
                  <div className="text-white font-heebo font-bold text-sm md:text-base leading-tight">
                    {toolCategories[cat].title}
                  </div>
                  <div className="text-gray-500 font-heebo text-xs mt-1">{count} כלים</div>
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-heebo font-medium transition-colors"
            >
              לכל הכלים החינמיים
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeToolsSection;
