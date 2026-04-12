import { useEffect } from "react";
import { GraduationCap, Award, Users, FileText, TrendingUp, Linkedin } from "lucide-react";
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
      "jobTitle": "יועץ בינה מלאכותית לעסקים",
      "url": "https://guycohen-ai.co.il",
      "image": "https://guycohen-ai.co.il/images/guy-cohen-portrait.webp",
      "email": "info@guycohen-ai.co.il",
      "telephone": "+972546232063",
      "description": "יועץ AI לעסקים קטנים ובינוניים בישראל. בוגר מנהל עסקים באוניברסיטת בן גוריון, מאסטר קלאס AI של HIGH-Q Digital, תוכנית הכשרת יועצים של בני פרבר, ותוכנית AI Agency. מנהל קהילת AI עם 1,000+ חברים.",
      "alumniOf": [
        {
          "@type": "CollegeOrUniversity",
          "name": "אוניברסיטת בן גוריון בנגב",
          "url": "https://www.bgu.ac.il"
        },
        {
          "@type": "EducationalOrganization",
          "name": "HIGH-Q Digital",
          "url": "https://highq-digital.co.il"
        },
        {
          "@type": "EducationalOrganization",
          "name": "תוכנית הכשרת יועצי AI - בני פרבר",
          "url": "https://bennyfarber-ai.co.il"
        }
      ],
      "knowsAbout": ["בינה מלאכותית", "אוטומציה לעסקים", "סוכני AI", "Make.com", "ManyChat", "CRM", "Google Workspace AI", "WhatsApp Automation"],
      "sameAs": ["https://www.linkedin.com/in/guycohen-ai/"]
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section id="about" className="bg-navy-light py-16 md:py-20" dir="rtl">
      <div ref={ref} className={`animate-scroll-in ${isVisible ? 'visible' : ''} container mx-auto px-4 max-w-6xl`}>

        {/* Bio Section */}
        <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-center mb-16">
          <div className="flex-shrink-0">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-purple-700/40 shadow-lg shadow-purple-700/10">
              <img
                src="/images/guy-cohen-portrait.webp"
                alt="גיא כהן - יועץ בינה מלאכותית לעסקים"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <div className="flex-grow text-center md:text-right">
            <h2 className="text-3xl md:text-4xl font-bold font-heebo text-white mb-2">
              גיא כהן
            </h2>
            <h3 className="text-xl md:text-2xl font-bold font-heebo text-purple-400 mb-6">
              יועץ בינה מלאכותית לעסקים קטנים ובינוניים
            </h3>

            <div className="space-y-4 text-base md:text-lg text-gray-300 font-heebo leading-relaxed max-w-2xl">
              <p>
                בעל תואר ראשון במנהל עסקים מאוניברסיטת בן גוריון בנגב.
                בוגר מאסטר קלאס AI של HIGH-Q Digital, תוכנית הכשרת יועצי AI לעסקים של בני פרבר, ותוכנית AI Agency.
              </p>
              <p>
                מלווה בעלי עסקים בהטמעת פתרונות AI מותאמים אישית - סוכני AI, אוטומציות עסקיות, בוטים לווטסאפ ואינסטגרם, ומערכות CRM חכמות.
                התהליך פשוט, מדויק, ומביא תוצאות אמיתיות.
              </p>
              <p>
                מנהל קהילת AI עם מעל 1,000 חברים פעילים, ויוצר תוכן מקצועי, מדריכים וסוכני AI חינמיים לקהילה.
                פוסטים שלי בלינקדאין הגיעו למעל 100,000 חשיפות ולמעל 1,000 מגיבים שהתעניינו בסוכנים שבניתי.
              </p>
            </div>

            <a
              href="https://www.linkedin.com/in/guycohen-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-purple-400 hover:text-purple-300 font-heebo transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              עקבו אחרי בלינקדאין
            </a>
          </div>
        </div>

        {/* Credibility Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          <div className="bg-navy-dark rounded-xl p-5 border border-purple-700/20 flex items-center gap-4 transition-all hover:border-purple-700/40">
            <div className="w-10 h-10 rounded-full bg-purple-700/20 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm md:text-base font-heebo text-gray-200 leading-snug">
              B.A. מנהל עסקים - אוניברסיטת בן גוריון
            </span>
          </div>
          <div className="bg-navy-dark rounded-xl p-5 border border-purple-700/20 flex items-center gap-4 transition-all hover:border-purple-700/40">
            <div className="w-10 h-10 rounded-full bg-purple-700/20 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm md:text-base font-heebo text-gray-200 leading-snug">
              מאסטר קלאס AI - HIGH-Q Digital
            </span>
          </div>
          <div className="bg-navy-dark rounded-xl p-5 border border-purple-700/20 flex items-center gap-4 transition-all hover:border-purple-700/40">
            <div className="w-10 h-10 rounded-full bg-purple-700/20 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm md:text-base font-heebo text-gray-200 leading-snug">
              הכשרת יועצי AI לעסקים - בני פרבר
            </span>
          </div>
          <div className="bg-navy-dark rounded-xl p-5 border border-purple-700/20 flex items-center gap-4 transition-all hover:border-purple-700/40">
            <div className="w-10 h-10 rounded-full bg-purple-700/20 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm md:text-base font-heebo text-gray-200 leading-snug">
              בוגר תוכנית AI Agency
            </span>
          </div>
          <div className="bg-navy-dark rounded-xl p-5 border border-purple-700/20 flex items-center gap-4 transition-all hover:border-purple-700/40">
            <div className="w-10 h-10 rounded-full bg-purple-700/20 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm md:text-base font-heebo text-gray-200 leading-snug">
              קהילת AI - 1,000+ חברים פעילים
            </span>
          </div>
          <div className="bg-navy-dark rounded-xl p-5 border border-purple-700/20 flex items-center gap-4 transition-all hover:border-purple-700/40">
            <div className="w-10 h-10 rounded-full bg-purple-700/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm md:text-base font-heebo text-gray-200 leading-snug">
              100,000+ חשיפות בפוסט בודד בלינקדאין
            </span>
          </div>
        </div>

        {/* Content Stats */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold font-heebo text-white mb-8 text-center">
            20+ מדריכים וסוכני AI חינמיים לקהילה
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-navy-dark rounded-xl p-6 border border-purple-700/20">
              <div className="text-3xl font-bold text-blue-primary font-heebo">20+</div>
              <div className="text-sm text-gray-400 font-heebo mt-1">מאמרים ומדריכים</div>
            </div>
            <div className="bg-navy-dark rounded-xl p-6 border border-purple-700/20">
              <div className="text-3xl font-bold text-blue-primary font-heebo">1,000+</div>
              <div className="text-sm text-gray-400 font-heebo mt-1">חברי קהילה</div>
            </div>
            <div className="bg-navy-dark rounded-xl p-6 border border-purple-700/20">
              <div className="text-3xl font-bold text-blue-primary font-heebo">100K+</div>
              <div className="text-sm text-gray-400 font-heebo mt-1">חשיפות בלינקדאין</div>
            </div>
            <div className="bg-navy-dark rounded-xl p-6 border border-purple-700/20">
              <div className="text-3xl font-bold text-blue-primary font-heebo">10+</div>
              <div className="text-sm text-gray-400 font-heebo mt-1">סוכני AI חינמיים</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
