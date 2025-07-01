
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import TargetAudienceSection from "@/components/TargetAudienceSection";
import ContactSection from "@/components/ContactSection";
import TestimonialsSection from "@/components/TestimonialsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-navy-dark font-heebo text-white" dir="rtl">
      <HeroSection />
      <AboutSection />
      <ProcessSection />
      
      {/* Call to Action for Organization Form */}
      <section className="bg-navy-light py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-6 font-heebo">
            מוכנים להתחיל?
          </h2>
          <p className="text-xl text-gray-300 mb-8 font-heebo max-w-2xl mx-auto">
            מלאו את טופס איפיון הארגון והשאירו לנו להציע לכם פתרונות AI מותאמים אישית
          </p>
          <Link to="/organization-form">
            <Button className="bg-gold hover:bg-gold/90 text-navy-dark font-bold text-xl px-8 py-4 rounded-lg font-heebo">
              מלא טופס איפיון ארגון
            </Button>
          </Link>
        </div>
      </section>
      
      <TargetAudienceSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
