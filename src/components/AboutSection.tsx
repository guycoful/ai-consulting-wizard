import { useEffect } from "react";
import { GraduationCap, Award, Users, FileText } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "גיא כהן",
      "jobTitle": "יועץ בינה מלאכותית",
      "url": "https://guycohen-ai.co.il",
      "email": "info@guycohen-ai.co.il",
      "telephone": "+972546232063",
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "אוניברסיטת בן גוריון"
      },
      "knowsAbout": ["בינה מלאכותית", "אוטומציה לעסקים", "סוכני AI", "Gemini", "Make.com"]
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section id="about" className="bg-navy-light py-16 md:py-20" dir="rtl">
      <div ref={ref} className={`animate-scroll-in ${isVisible ? 'visible' : ''} container mx-auto px-4 max-w-6xl`}>

        {/* Bio Section - 2 columns on desktop, stacked on mobile */}
        <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-center mb-16">

          {/* תמונת פורטרט */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-purple-700/40 shadow-lg shadow-purple-700/10">
              <img
                src="/images/guy-cohen-portrait.png"
                alt="גיא כהן — יועץ בינה מלאכותית לעסקים"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Text Content - left side on desktop */}
          <div className="flex-grow text-center md:text-right">
            <h2 className="text-3xl md:text-4xl font-bold font-heebo text-white mb-2">
              גיא כהן
            </h2>
            <h3 className="text-xl md:text-2xl font-bold font-heebo text-purple-400 mb-6">
              יועץ בינה מלאכותית לעסקים קטנים ובינוניים
            </h3>

            <div className="space-y-4 text-base md:text-lg text-gray-300 font-heebo leading-relaxed max-w-2xl">
              <p>
                בעל תואר ראשון במנהל עסקים מאוניברסיטת בן גוריון, ובוגר מאסטר קלאס AI של הייקיו דיגיטל.
              </p>
              <p>
                מלווה עשרות עסקים בהטמעת פתרונות AI מותאמים — מאיפיון צרכים ועד הפעלה בשטח.
                התהליך פשוט, מדויק, ומביא תוצאות אמיתיות.
              </p>
              <p>
                מנהל קהילת AI עם מעל 600 חברים פעילים, ויוצר תוכן מקצועי, מדריכים וסוכני AI חינמיים לקהילה.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Signals / Credibility Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="bg-navy-dark rounded-xl p-5 border border-purple-700/20 flex items-center gap-4 transition-all hover:border-purple-700/40">
            <div className="w-10 h-10 rounded-full bg-purple-700/20 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm md:text-base font-heebo text-gray-200 leading-snug">
              תואר ראשון מנהל עסקים — אוניברסיטת בן גוריון
            </span>
          </div>
          <div className="bg-navy-dark rounded-xl p-5 border border-purple-700/20 flex items-center gap-4 transition-all hover:border-purple-700/40">
            <div className="w-10 h-10 rounded-full bg-purple-700/20 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm md:text-base font-heebo text-gray-200 leading-snug">
              בוגר מאסטר קלאס AI — הייקיו דיגיטל
            </span>
          </div>
          <div className="bg-navy-dark rounded-xl p-5 border border-purple-700/20 flex items-center gap-4 transition-all hover:border-purple-700/40">
            <div className="w-10 h-10 rounded-full bg-purple-700/20 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm md:text-base font-heebo text-gray-200 leading-snug">
              קהילת AI — 600+ חברים פעילים
            </span>
          </div>
          <div className="bg-navy-dark rounded-xl p-5 border border-purple-700/20 flex items-center gap-4 transition-all hover:border-purple-700/40">
            <div className="w-10 h-10 rounded-full bg-purple-700/20 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm md:text-base font-heebo text-gray-200 leading-snug">
              7+ מאמרים ומדריכים מקצועיים
            </span>
          </div>
        </div>

        {/* Success Stories */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold font-heebo text-white mb-8 text-center">
            סיפורי הצלחה מהשטח
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <div className="absolute right-0 top-0 w-1 h-full bg-purple-700 rounded-full"></div>
              <blockquote className="bg-navy-dark p-6 pr-8 rounded-lg shadow-md border border-purple-700/20 h-full">
                <p className="text-base font-heebo text-gray-300 leading-relaxed">
                  ליוויתי <strong className="text-white">מורה פרטי למדעי המחשב</strong> שרצה להגדיל הכנסה, ויצא מהתהליך עם תכנית פעולה ברורה, רעיונות חדשים, והבנה איך לעבוד חכם יותר עם AI.
                </p>
              </blockquote>
            </div>
            <div className="relative">
              <div className="absolute right-0 top-0 w-1 h-full bg-purple-700 rounded-full"></div>
              <blockquote className="bg-navy-dark p-6 pr-8 rounded-lg shadow-md border border-purple-700/20 h-full">
                <p className="text-base font-heebo text-gray-300 leading-relaxed">
                  עזרתי <strong className="text-white">לבעלת עסק לק ג'ל</strong> שרצתה להגיע ליותר לקוחות ולהגדיל חשיפה. ביחד בנינו אסטרטגיית תוכן וקמפיין מבוסס AI, שמשך עשרות לקוחות חדשים בשבועות הראשונים בלבד.
                </p>
              </blockquote>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
