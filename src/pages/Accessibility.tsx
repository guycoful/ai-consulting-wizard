import { Helmet } from "react-helmet-async";
import { legalContent } from "@/lib/legal-content";

const Accessibility = () => {
  const { title, body } = legalContent.accessibility;

  return (
    <main dir="rtl" lang="he" className="bg-navy-dark min-h-screen py-20 md:py-32">
      <Helmet>
        <title>הצהרת נגישות | גיא כהן</title>
        <meta name="description" content="הצהרת הנגישות של אתר ייעוץ AI לעסקים - גיא כהן" />
        <link rel="canonical" href="https://guycohen-ai.co.il/accessibility" />
      </Helmet>
      <div className="container mx-auto px-4 max-w-[680px]">
        <h1 className="text-3xl md:text-4xl font-bold font-heebo text-white mb-8">
          {title}
        </h1>
        <div className="text-gray-300 font-heebo text-sm leading-[1.9] whitespace-pre-line">
          {body}
        </div>
      </div>
    </main>
  );
};

export default Accessibility;
