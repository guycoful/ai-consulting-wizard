
import HeroSection from "@/components/HeroSection";
import TargetAudienceSection from "@/components/TargetAudienceSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleFormNavigation = () => {
    navigate('/profiling-form');
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      <TargetAudienceSection />
      <ProcessSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
      
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
