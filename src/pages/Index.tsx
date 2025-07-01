
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
      <TargetAudienceSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
