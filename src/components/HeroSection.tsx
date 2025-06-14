
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-navy-dark py-16 md:py-24 animate-fade-in">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <div className="relative mb-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heebo text-white mb-4 leading-tight">
            ייעוץ AI לעסקים קטנים ובינוניים: פותרים את הבעיות הכי כואבות בעסק שלך בעזרת פתרונות AI מותאמים אישית
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>
        
        <p className="text-lg md:text-xl text-gray-300 mb-12 font-heebo leading-relaxed max-w-3xl mx-auto">
          נבין בדיוק מה העסק שלך צריך, נמפה את האתגרים, ונציע פתרונות חכמים שיגדילו הכנסות, ישפרו שירות ויחסכו זמן.
        </p>
        
        <Button 
          onClick={scrollToContact}
          className="bg-blue-primary hover:bg-blue-primary/90 text-white px-8 py-4 text-lg font-heebo font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          לקביעת שיחת ייעוץ ראשונית ללא עלות
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
