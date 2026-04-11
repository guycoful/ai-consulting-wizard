
import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/HeroSection";
import TargetAudienceSection from "@/components/TargetAudienceSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import LatestArticlesSection from "@/components/LatestArticlesSection";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleFormNavigation = () => {
    navigate('/profiling-form');
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>ייעוץ AI לעסקים קטנים ובינוניים | גיא כהן</title>
        <meta name="description" content="ייעוץ בינה מלאכותית לעסקים קטנים ובינוניים. פתרונות AI מותאמים אישית שיגדילו הכנסות, ישפרו שירות ויחסכו זמן." />
        <link rel="canonical" href="https://guycohen-ai.co.il/" />

        {/* Open Graph meta tags */}
        <meta property="og:title" content="ייעוץ AI לעסקים קטנים ובינוניים | גיא כהן" />
        <meta property="og:description" content="ייעוץ בינה מלאכותית לעסקים קטנים ובינוניים. פתרונות AI מותאמים אישית שיגדילו הכנסות, ישפרו שירות ויחסכו זמן." />
        <meta property="og:url" content="https://guycohen-ai.co.il/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://guycohen-ai.co.il/og-image.png" />
        <meta property="og:image:alt" content="גיא כהן - יועץ בינה מלאכותית לעסקים" />
        <meta property="og:locale" content="he_IL" />
        <meta property="og:site_name" content="גיא כהן — ייעוץ AI לעסקים" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ייעוץ AI לעסקים קטנים ובינוניים | גיא כהן" />
        <meta name="twitter:description" content="ייעוץ בינה מלאכותית לעסקים קטנים ובינוניים. פתרונות AI מותאמים אישית שיגדילו הכנסות, ישפרו שירות ויחסכו זמן." />
        <meta name="twitter:image" content="https://guycohen-ai.co.il/og-image.png" />

        {/* ProfessionalService Schema — AEO critical */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "גיא כהן — ייעוץ AI לעסקים",
            url: "https://guycohen-ai.co.il",
            logo: "https://guycohen-ai.co.il/images/guy-cohen-ai-logo.png",
            image: "https://guycohen-ai.co.il/images/guy-cohen-portrait.webp",
            description: "ייעוץ בינה מלאכותית לעסקים קטנים ובינוניים בישראל. פתרונות AI מותאמים אישית — סוכני AI, אוטומציות עסקיות, חיסכון בזמן והגדלת הכנסות.",
            telephone: "+972-50-123-4567",
            address: {
              "@type": "PostalAddress",
              addressCountry: "IL",
              addressLocality: "ישראל",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 32.0853,
              longitude: 34.7818,
            },
            areaServed: {
              "@type": "Country",
              name: "Israel",
            },
            priceRange: "₪₪",
            serviceType: ["ייעוץ AI לעסקים", "אוטומציה עסקית", "סוכני AI", "בינה מלאכותית לעסקים קטנים"],
            knowsAbout: ["Artificial Intelligence", "Business Automation", "AI Agents", "Make.com", "Gemini", "ChatGPT", "WhatsApp Automation"],
            founder: {
              "@type": "Person",
              name: "גיא כהן",
              url: "https://guycohen-ai.co.il",
              image: "https://guycohen-ai.co.il/images/guy-cohen-portrait.webp",
              jobTitle: "יועץ AI לעסקים",
              description: "יועץ בינה מלאכותית המתמחה בהטמעת פתרונות AI לעסקים קטנים ובינוניים בישראל. מומחה בסוכני AI, אוטומציות עסקיות וכלים מבוססי AI.",
              knowsAbout: ["AI Consulting", "Business Automation", "AI Agents", "Make.com", "Gemini Gems", "WhatsApp API"],
              sameAs: [
                "https://www.linkedin.com/in/guycohen-ai"
              ],
            },
          })}
        </script>

        {/* WebSite Schema — for sitelinks search */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "גיא כהן — ייעוץ AI לעסקים",
            url: "https://guycohen-ai.co.il",
            inLanguage: "he-IL",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://guycohen-ai.co.il/articles?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
      </Helmet>
      <HeroSection />
      <div className="h-16 bg-gradient-to-b from-navy-dark to-navy-light" />
      <TargetAudienceSection />
      <div className="h-16 bg-gradient-to-b from-navy-light to-navy-dark" />
      <ProcessSection />
      <div className="h-16 bg-gradient-to-b from-navy-dark to-navy-light" />
      <AboutSection />
      <div className="h-16 bg-gradient-to-b from-navy-light to-navy-dark" />
      <LatestArticlesSection />
      <div id="review" />
      <TestimonialsSection />
      <ContactSection />
      <FaqSection />

      {/* כפתור למעבר לטופס איפיון */}
      <section className="bg-blue-primary py-16" dir="rtl">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-heebo">
            מוכן להתחיל? מלא את טופס האיפיון
          </h3>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto font-heebo">
            טופס מפורט שיעזור לנו להבין בדיוק מה העסק שלך צריך ולהתאים פתרון AI מושלם
          </p>
          <Button
            onClick={handleFormNavigation}
            size="lg"
            className="bg-white text-blue-primary hover:bg-gray-100 font-heebo font-medium px-8 py-4 text-lg"
          >
            מלא טופס איפיון
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
