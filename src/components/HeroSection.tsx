import { Button } from "@/components/ui/button";
import ScrollDownButton from "./ScrollDownButton";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormNavigation = () => {
    navigate('/profiling-form');
  };

  return (
    <section id="hero" className="relative bg-navy-dark py-8 md:py-16 lg:py-24 animate-fade-in">
      <div className="container mx-auto px-4 text-center max-w-6xl">
        <div className="relative mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-bold font-heebo text-white mb-4 md:mb-6 leading-tight px-2">
            ייעוץ AI לעסקים קטנים ובינוניים:
          </h1>
          <h2 className="text-xl md:text-3xl lg:text-5xl xl:text-6xl font-bold font-heebo text-white mb-4 md:mb-6 leading-tight px-2">
            פותרים את הבעיות הכי כואבות בעסק שלך בעזרת פתרונות AI מותאמים אישית
          </h2>
          
          <div className="w-24 md:w-32 h-1 bg-purple-700 mx-auto mb-4 md:mb-6"></div>
        </div>

        <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto mb-8 md:mb-12">
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-heebo leading-relaxed px-4">
            נבין בדיוק מה העסק שלך צריך, נמפה את האתגרים, ונציע פתרונות חכמים שיגדילו הכנסות, ישפרו שירות ויחסכו זמן.
          </p>
        </div>

        {/* CTAs - Primary and Secondary */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 md:mb-8 px-4">
          <Button
            onClick={scrollToContact}
            className="bg-blue-primary hover:bg-blue-primary/90 text-white px-8 md:px-14 py-5 md:py-7 text-lg md:text-2xl font-heebo font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl w-full sm:w-auto animate-glow-pulse hover:animate-none"
          >
            לקביעת שיחת ייעוץ ראשונית ללא עלות
          </Button>
          <Button
            onClick={handleFormNavigation}
            variant="outline"
            className="bg-white border-2 border-white text-navy-dark hover:bg-gray-100 font-heebo font-bold px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto"
          >
            מלא טופס איפיון
          </Button>
        </div>

        {/* Social Proof Strip */}
        <div className="flex items-center justify-center mb-8 md:mb-12 px-4">
          <div className="flex items-center justify-center gap-6 flex-wrap bg-navy-light/30 rounded-full px-6 py-2">
            <span className="text-gray-400 text-sm md:text-base font-heebo">600+ חברי קהילה</span>
            <span className="text-purple-400 text-sm md:text-base">·</span>
            <span className="text-gray-400 text-sm md:text-base font-heebo">עשרות עסקים מלווים</span>
            <span className="text-purple-400 text-sm md:text-base">·</span>
            <span className="text-gray-400 text-sm md:text-base font-heebo">שיחת ייעוץ ראשונית ללא עלות</span>
          </div>
        </div>

        <div className="mb-8 md:mb-12 px-4">
          <img 
            src="/images/guy-cohen-hero.png" 
            alt="גיא כהן - יועץ בינה מלאכותית לעסקים קטנים ובינוניים"
            className="mx-auto max-w-full w-full sm:max-w-md h-auto"
          />
        </div>
      </div>
      <ScrollDownButton />
    </section>
  );
};

export default HeroSection;
