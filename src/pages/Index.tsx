
import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/HeroSection";
import TargetAudienceSection from "@/components/TargetAudienceSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import LatestArticlesSection from "@/components/LatestArticlesSection";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
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
      </Helmet>
      <HeroSection />
      <TargetAudienceSection />
      <ProcessSection />
      <AboutSection />
      <LatestArticlesSection />
      <ContactSection />
      <FaqSection />

      {/* כפתור למעבר לטופס איפיון */}
      <section className="bg-blue-primary py-16" dir="rtl">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-heebo">
            מוכנים להתחיל? מלאו את טופס האיפיון
          </h3>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto font-heebo">
            טופס מפורט שיעזור לנו להבין בדיוק מה הארגון שלכם צריך ולהתאים פתרון AI מושלם
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
