import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

const faqCategories: FaqCategory[] = [
  {
    title: "על השירות",
    items: [
      {
        question: "מה בדיוק כולל ייעוץ AI לעסקים?",
        answer:
          "התהליך מתחיל בשיחת היכרות ללא עלות, שבה אני מבין את האתגרים של העסק שלך. משם אני ממפה את התהליכים שאפשר לייעל עם AI, ממליץ על פתרונות ספציפיים, ומלווה אותך ביישום — צעד אחרי צעד, בלי ז'רגון טכני.",
      },
      {
        question: "כמה זמן לוקח לראות תוצאות?",
        answer:
          "רוב הלקוחות מתחילים לראות חיסכון בזמן ושיפור בתהליכים תוך שבועיים עד חודש מתחילת היישום. יש כלים שנותנים ערך מהיום הראשון — כמו אוטומציות לוואטסאפ או סוכני AI שחוסכים שעות עבודה.",
      },
      {
        question: "האם אני צריך ידע טכני כדי להשתמש בפתרונות?",
        answer:
          "בכלל לא. כל הפתרונות שאני מציע בנויים כדי שבעל העסק יוכל להפעיל אותם בעצמו, בלי קוד ובלי רקע טכני. אני מלווה אותך עד שאתה מרגיש בנוח.",
      },
    ],
  },
  {
    title: "שאלות כלליות",
    items: [
      {
        question: "מה זה סוכן AI ולמה זה רלוונטי לעסק שלי?",
        answer:
          "סוכן AI הוא כמו עובד דיגיטלי שעובד 24/7. הוא יכול לענות ללקוחות, לנתח מידע, ליצור תוכן, ולבצע משימות חוזרות — הכל אוטומטי. עסקים קטנים שמטמיעים סוכנים חוסכים בממוצע 10-15 שעות שבוע.",
      },
      {
        question: "מה ההבדל בין ChatGPT לבין סוכן AI מותאם?",
        answer:
          "ChatGPT הוא כלי גנרי שצריך להסביר לו כל פעם מחדש מה לעשות. סוכן AI מותאם כבר יודע את התפקיד שלו, את הסגנון, ואת המטרות — כמו עובד שעבר הכשרה. הוא נותן תוצאות עקביות בלי שצריך לכתוב פרומפט כל פעם.",
      },
      {
        question: "כמה עולה ייעוץ AI?",
        answer:
          "שיחת ההיכרות הראשונית היא ללא עלות ובלי התחייבות. המחירים משתנים לפי סוג הפרויקט והיקפו — מליווי חד-פעמי ועד ליווי שוטף. אחרי שאני מבין מה העסק צריך, אני מציע הצעת מחיר מותאמת.",
      },
    ],
  },
  {
    title: "שאלות ממוקדות חיפוש",
    items: [
      {
        question: "איך AI יכול לעזור לעסק קטן בישראל?",
        answer:
          "AI יכול לעזור בשלושה תחומים מרכזיים: חיסכון בזמן (אוטומציה של מענה ללקוחות, תזמון, מעקב), הגדלת הכנסות (ניתוח נתונים, זיהוי הזדמנויות, שיפור מכירות), ושיפור שירות (מענה 24/7, תגובה מהירה ללידים, תוכן מותאם אישית).",
      },
      {
        question: "האם AI מתאים לכל סוג של עסק?",
        answer:
          "כן. עבדתי עם עסקים מגוונים — ממורים פרטיים, דרך בעלי מספרות ועד חברות הייטק. הכלי משתנה, אבל העיקרון זהה: למצוא את המשימות שגוזלות הכי הרבה זמן ולייעל אותן עם AI.",
      },
      {
        question: "מה ההבדל בין ייעוץ AI לבין קורס AI?",
        answer:
          "בקורס אתה לומד תיאוריה כללית. בייעוץ אני נכנס לעסק שלך ספציפית, ממפה את האתגרים שלך, ובונה פתרונות שמותאמים בדיוק לך. התוצאה היא לא ידע כללי — אלא כלים שעובדים מחר בבוקר.",
      },
    ],
  },
];

// Build flat list for JSON-LD
const allFaqs = faqCategories.flatMap((cat) => cat.items);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const FaqSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="faq" className="bg-navy-dark py-20 md:py-32" dir="rtl">
      <div ref={ref} className={`animate-scroll-in ${isVisible ? 'visible' : ''} container mx-auto px-4 max-w-4xl`}>
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heebo text-white mb-6">
            שאלות נפוצות
          </h2>
          <div className="w-32 h-1 bg-purple-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 font-heebo leading-relaxed max-w-3xl mx-auto">
            כל מה שרצית לדעת על ייעוץ AI לעסקים — במקום אחד
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqCategories.map((category, catIdx) => (
            <div key={catIdx}>
              <h3 className="text-2xl font-bold font-heebo text-purple-400 mb-6">
                {category.title}
              </h3>
              <Accordion type="single" collapsible className="space-y-3">
                {category.items.map((faq, faqIdx) => (
                  <AccordionItem
                    key={faqIdx}
                    value={`cat-${catIdx}-faq-${faqIdx}`}
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
          ))}
        </div>
      </div>

      {/* FAQ JSON-LD Schema — static hardcoded data, no user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
};

export default FaqSection;
