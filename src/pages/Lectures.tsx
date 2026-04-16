import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MessageCircle, Users, Zap, BrainCircuit, BarChart3, Building2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const SITE_URL = "https://guycohen-ai.co.il";

// ─── Data ──────────────────────────────────────────────────────────────────

const topics = [
  {
    icon: BrainCircuit,
    title: "מה זה AI ומה זה אומר לארגון שלכם",
    description:
      "הרצאת מבוא מעשית לעידן הבינה המלאכותית. ללא ז'רגון טכני — רק דוגמאות מהשטח שמסבירות מה AI יכול לעשות לצוות שלכם עוד היום.",
    audience: "מנהלים, צוותי עבודה, עובדים שרוצים להבין את הכלי",
    duration: "45–60 דקות",
  },
  {
    icon: Zap,
    title: "סוכני AI שעובדים 24/7: אוטומציה בלי קוד",
    description:
      "הדגמה חיה של אוטומציות עסקיות שחוסכות שעות עבודה: מיילים, תיאומים, סיכומי פגישות, מעקב אחרי לידים — הכל אוטומטי.",
    audience: "מנהלים תפעוליים, צוותי שירות ומכירות",
    duration: "60–90 דקות",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp + AI: לקוחות מקבלים מענה בשניות",
    description:
      "איך לבנות צ'אטבוט חכם שמסנן לידים, עונה על שאלות נפוצות ומעביר לנציג רק מה שצריך טיפול אנושי — עם הדגמה מלאה בזמן אמת.",
    audience: "עסקים עם תקשורת גבוהה בוואטסאפ, צוותי שירות לקוחות",
    duration: "45–60 דקות",
  },
  {
    icon: BarChart3,
    title: "Google Workspace + AI: פרודוקטיביות × 3",
    description:
      "שימוש ב-Gemini AI בתוך Gmail, Google Docs, Sheets ו-Meet לחיסכון יומי של שעות. סדנה מעשית עם מחשבים — כל משתתף יוצא עם כלים שעובדים.",
    audience: "צוותים שעובדים עם Google Workspace",
    duration: "120–180 דקות (סדנה)",
  },
];

const forWho = [
  { icon: Building2, text: "ארגונים שרוצים לצמצם חיכוך תפעולי" },
  { icon: Users, text: "צוותים שאינם טכנולוגיים שרוצים ללמוד AI בפועל" },
  { icon: Zap, text: "עסקים שמחפשים לחסוך זמן על משימות חוזרות" },
  { icon: BrainCircuit, text: "מנהלים שרוצים להבין איך AI ישפיע על הצוות שלהם" },
];

const faqItems = [
  {
    question: "מה נושאי ההרצאות של גיא כהן ?",
    answer:
      "גיא כהן מעביר הרצאות וסדנאות בנושאים: מבוא לבינה מלאכותית לארגונים, סוכני AI ואוטומציות עסקיות, WhatsApp Business עם AI, ו-Google Workspace + AI. ההרצאות מותאמות לצוותים שאינם טכנולוגיים.",
  },
  {
    question: "למי מתאימות הסדנאות של גיא כהן ?",
    answer:
      "הסדנאות מתאימות לארגונים שרוצים לצמצם חיכוך תפעולי, לצוותי שירות ומכירות, למנהלים שרוצים להבין איך AI חוסך שעות עבודה, ולעסקים קטנים ובינוניים שרוצים אוטומציה בלי צוות פיתוח.",
  },
  {
    question: "כמה עולה הרצאת AI לארגון ?",
    answer:
      "המחיר משתנה לפי סוג ההרצאה (הרצאה / סדנה), משך, ומספר משתתפים. תאמו שיחת ייעוץ ללא עלות לקבלת הצעת מחיר מותאמת.",
  },
  {
    question: "איך מזמינים הרצאת AI לארגון ?",
    answer:
      "אפשר לשלוח הודעה ישירה בוואטסאפ או למלא את טופס יצירת הקשר באתר. גיא מגיב תוך יום עסקים ומתאם שיחה ראשונית ללא עלות.",
  },
  {
    question: "מה מבדיל את הרצאות גיא כהן מהרצאות AI אחרות ?",
    answer:
      "ההרצאות מבוססות על עבודה מעשית מול עסקים אמיתיים — לא תיאוריה מהאקדמיה. כל הדגמה היא כלי שעובד היום, בלי קוד, ובלי תלות בצוות IT. הדגש הוא על ערך מיידי.",
  },
  {
    question: "האם גיא כהן מעביר הרצאות גם מחוץ לישראל ?",
    answer:
      "ההרצאות מועברות בעברית ומיועדות לשוק הישראלי. לאירועים מיוחדים מחוץ לישראל ניתן לתאם מראש.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "גיא כהן",
  jobTitle: "מומחה סוכני AI ואוטומציה עסקית | מרצה",
  url: SITE_URL,
  telephone: "+972546232063",
  email: "info@guycohen-ai.co.il",
  sameAs: [
    "https://www.linkedin.com/in/guycohen-ai/",
    "https://contentpoint.co.il/%d7%92%d7%99%d7%90-%d7%9b%d7%94%d7%9f-%d7%94%d7%a8%d7%a6%d7%90%d7%95%d7%aa-%d7%95%d7%a1%d7%93%d7%a0%d7%90%d7%95%d7%aa-ai-%d7%95%d7%90%d7%95%d7%98%d7%95%d7%9e%d7%a6%d7%99%d7%94-%d7%9c%d7%99%d7%99/",
  ],
  knowsAbout: [
    "AI Agents",
    "Business Automation",
    "WhatsApp Business",
    "Google Workspace AI",
    "Make.com",
    "ManyChat",
  ],
};

// ─── Page ──────────────────────────────────────────────────────────────────

const Lectures = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: topicsRef, isVisible: topicsVisible } = useScrollAnimation();
  const { ref: forWhoRef, isVisible: forWhoVisible } = useScrollAnimation();
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  const scrollToContact = () => {
    window.location.href = "/#contact";
  };

  return (
    <>
      <Helmet>
        <title>הרצאות וסדנאות AI לארגונים | גיא כהן</title>
        <meta
          name="description"
          content="גיא כהן מעביר הרצאות וסדנאות AI ואוטומציה לארגונים. מותאם לצוותים לא טכנולוגיים. לתיאום — שיחת ייעוץ ללא עלות."
        />
        <meta name="keywords" content="הרצאות AI, סדנאות AI לארגונים, מרצה AI ישראל, גיא כהן הרצאות, אוטומציה לארגונים, בינה מלאכותית לעסקים" />
        <link rel="canonical" href={`${SITE_URL}/lectures`} />
        <meta property="og:title" content="הרצאות וסדנאות AI לארגונים | גיא כהן" />
        <meta property="og:description" content="גיא כהן מעביר הרצאות וסדנאות AI ואוטומציה לארגונים. מותאם לצוותים לא טכנולוגיים." />
        <meta property="og:url" content={`${SITE_URL}/lectures`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <main className="bg-navy-dark min-h-screen" dir="rtl">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="py-20 md:py-32">
          <div
            ref={heroRef}
            className={`animate-scroll-in ${heroVisible ? "visible" : ""} container mx-auto px-4 max-w-4xl text-center`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heebo text-white mb-6 leading-tight">
              הרצאות וסדנאות AI לארגונים
            </h1>
            <div className="w-32 h-1 bg-purple-500 mx-auto mb-8" />
            <p className="text-xl md:text-2xl text-gray-300 font-heebo leading-relaxed mb-6 max-w-3xl mx-auto">
              גיא כהן מומחה לסוכני AI ואוטומציות עסקיות. מלווה ארגונים בתהליכי התייעלות טכנולוגיים
              ומנהל קהילה מקצועית של 1,000+ חברים בתחום הבינה המלאכותית.
            </p>
            <p className="text-lg text-gray-400 font-heebo leading-relaxed mb-10 max-w-2xl mx-auto">
              ההרצאות מבוססות על עבודה מעשית מול עסקים אמיתיים — לא תיאוריה. כל כלי שמוצג עובד היום,
              בלי קוד ובלי רקע טכני.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              {[
                { num: "1,000+", label: "חברי קהילה" },
                { num: "4", label: "נושאי הרצאה" },
                { num: "עשרות", label: "ארגונים מלווים" },
              ].map(({ num, label }) => (
                <div key={label} className="text-center">
                  <div className="text-3xl font-bold font-heebo text-purple-400">{num}</div>
                  <div className="text-gray-400 font-heebo text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>

            <Button
              onClick={scrollToContact}
              className="bg-blue-primary hover:bg-blue-primary/90 text-white px-10 py-6 text-xl font-heebo font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-xl"
            >
              לתיאום הרצאה
            </Button>
          </div>
        </section>

        {/* ── Topics ───────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-navy-light/30">
          <div
            ref={topicsRef}
            className={`animate-scroll-in ${topicsVisible ? "visible" : ""} container mx-auto px-4 max-w-6xl`}
          >
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold font-heebo text-white mb-4">
                נושאי הרצאה וסדנאות
              </h2>
              <div className="w-24 h-1 bg-purple-500 mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {topics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <div
                    key={topic.title}
                    className="bg-navy-light rounded-xl border border-purple-700/20 p-6 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-700/10 flex flex-col gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-700/20 rounded-lg p-3 flex-shrink-0">
                        <Icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold font-heebo text-white mb-2">
                          {topic.title}
                        </h3>
                        <p className="text-gray-300 font-heebo leading-relaxed text-sm">
                          {topic.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm border-t border-purple-700/10 pt-4">
                      <span className="text-gray-400 font-heebo">
                        <span className="text-purple-400">קהל יעד:</span> {topic.audience}
                      </span>
                      <span className="text-gray-400 font-heebo">
                        <span className="text-purple-400">משך:</span> {topic.duration}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── For Who ──────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <div
            ref={forWhoRef}
            className={`animate-scroll-in ${forWhoVisible ? "visible" : ""} container mx-auto px-4 max-w-4xl`}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heebo text-white mb-4">
                למי זה מתאים ?
              </h2>
              <div className="w-24 h-1 bg-purple-500 mx-auto" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {forWho.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-4 bg-navy-light rounded-xl border border-purple-700/20 px-6 py-4"
                >
                  <Icon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span className="text-gray-300 font-heebo">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-navy-light/30">
          <div
            ref={faqRef}
            className={`animate-scroll-in ${faqVisible ? "visible" : ""} container mx-auto px-4 max-w-3xl`}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heebo text-white mb-4">
                שאלות נפוצות
              </h2>
              <div className="w-24 h-1 bg-purple-500 mx-auto" />
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="border border-purple-700/20 rounded-lg bg-navy-light px-6 data-[state=open]:border-purple-500/40 transition-colors"
                >
                  <AccordionTrigger className="text-white font-heebo text-lg font-medium hover:text-purple-300 hover:no-underline py-5 [&>svg]:text-purple-400 [&>svg]:mr-0 [&>svg]:ml-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 font-heebo text-base leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-20 md:py-32">
          <div
            ref={ctaRef}
            className={`animate-scroll-in ${ctaVisible ? "visible" : ""} container mx-auto px-4 max-w-2xl text-center`}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heebo text-white mb-4">
              רוצים להזמין הרצאה ?
            </h2>
            <p className="text-gray-300 font-heebo text-lg mb-8 leading-relaxed">
              שיחת ייעוץ ראשונית ללא עלות — נבין מה הארגון צריך ונתאים את ההרצאה הנכונה.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button
                onClick={scrollToContact}
                className="bg-blue-primary hover:bg-blue-primary/90 text-white px-10 py-6 text-xl font-heebo font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-xl"
              >
                לתיאום שיחה ללא עלות
              </Button>
              <a
                href="https://wa.me/972546232063?text=%D7%94%D7%99%D7%99%20%D7%92%D7%99%D7%90%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A2%D7%9C%20%D7%94%D7%A8%D7%A6%D7%90%D7%95%D7%AA%20AI%20%D7%9C%D7%90%D7%A8%D7%92%D7%95%D7%9F"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-10 py-6 text-xl font-heebo font-bold rounded-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  WhatsApp ישיר
                </Button>
              </a>
            </div>

            {/* ContentPoint badge */}
            <div className="inline-flex items-center gap-2 bg-navy-light border border-purple-700/20 rounded-full px-5 py-2 text-sm text-gray-400 font-heebo">
              <ExternalLink className="w-4 h-4 text-purple-400" />
              <span>פרופיל המרצה:</span>
              <a
                href="https://contentpoint.co.il/%d7%92%d7%99%d7%90-%d7%9b%d7%94%d7%9f-%d7%94%d7%a8%d7%a6%d7%90%d7%95%d7%aa-%d7%95%d7%a1%d7%93%d7%a0%d7%90%d7%95%d7%aa-ai-%d7%95%d7%90%d7%95%d7%98%d7%95%d7%9e%d7%a6%d7%99%d7%94-%d7%9c%d7%99%d7%99/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                ContentPoint
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default Lectures;
