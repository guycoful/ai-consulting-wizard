
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

const ProfilingForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>שאלון סינון - ייעוץ AI | גיא כהן</title>
        <meta name="description" content="שאלון קצר שיעזור לנו להבין מה העסק שלך צריך ולהתאים פתרון AI מדויק" />
        <link rel="canonical" href="https://guycohen-ai.co.il/profiling-form" />

        <meta property="og:title" content="שאלון סינון - ייעוץ AI | גיא כהן" />
        <meta property="og:description" content="שאלון קצר שיעזור לנו להבין מה העסק שלך צריך ולהתאים פתרון AI מדויק" />
        <meta property="og:url" content="https://guycohen-ai.co.il/profiling-form" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://guycohen-ai.co.il/og-image.png" />
        <meta property="og:locale" content="he_IL" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="שאלון סינון - ייעוץ AI | גיא כהן" />
        <meta name="twitter:description" content="שאלון קצר שיעזור לנו להבין מה העסק שלך צריך ולהתאים פתרון AI מדויק" />
        <meta name="twitter:image" content="https://guycohen-ai.co.il/og-image.png" />
      </Helmet>

      <section className="min-h-screen bg-[#0A1F44] pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            בוא נבדוק אם אני יכול לעזור
          </h1>
          <div className="w-20 h-1 bg-[#7C3AED] mx-auto mb-4 rounded" />
          <p className="text-[#D1D5DB] text-lg">
            שאלון קצר של 2 דקות שיעזור לי להבין את העסק שלך
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-[#102B5B] border border-[#7C3AED]/20 rounded-2xl overflow-hidden">
          <iframe
            src="https://forms.fillout.com/t/wxa1J8DvUjus"
            title="שאלון סינון"
            className="w-full border-0"
            style={{ minHeight: "700px" }}
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
};

export default ProfilingForm;
