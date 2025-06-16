import { Button } from "@/components/ui/button";
import ScrollDownButton from "./ScrollDownButton";

const HeroSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="bg-navy-dark py-8 md:py-16 lg:py-24 animate-fade-in">
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
        
        <div className="mb-8 md:mb-12 px-4">
          <Button 
            onClick={scrollToContact}
            className="bg-blue-primary hover:bg-blue-primary/90 text-white px-6 md:px-12 py-4 md:py-6 text-lg md:text-xl font-heebo font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
          >
            לקביעת שיחת ייעוץ ראשונית ללא עלות
          </Button>
        </div>

        <div className="mb-8 md:mb-12 px-4">
          <img 
            src="/lovable-uploads/c6adca96-5d55-40b2-9125-f5961c7275d8.png" 
            alt="יועץ AI לעסקים" 
            className="mx-auto max-w-full w-full sm:max-w-md h-auto"
          />
        </div>
      </div>
      <ScrollDownButton />
    </section>
  );
};

export default HeroSection;
