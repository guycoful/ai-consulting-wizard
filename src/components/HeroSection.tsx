
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-navy-dark py-16 md:py-24 animate-fade-in">
      <div className="container mx-auto px-4 text-center max-w-6xl">
        <div className="relative mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heebo text-white mb-6 leading-tight">
            ייעוץ AI לעסקים קטנים ובינוניים: פותרים את הבעיות הכי כואבות בעסק שלך בעזרת פתרונות AI מותאמים אישית
          </h1>
          <div className="w-32 h-1 bg-gold mx-auto mb-6"></div>
        </div>
        
        <div className="space-y-6 max-w-4xl mx-auto mb-12">
          <p className="text-xl md:text-2xl text-gray-300 font-heebo leading-relaxed">
            נבין בדיוק מה העסק שלך צריך, נמפה את האתגרים, ונציע פתרונות חכמים שיגדילו הכנסות, ישפרו שירות ויחסכו זמן.
          </p>
        </div>
        
        <div className="mb-12">
          <Button 
            onClick={scrollToContact}
            className="bg-blue-primary hover:bg-blue-primary/90 text-white px-12 py-6 text-xl font-heebo font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            לקביעת שיחת ייעוץ ראשונית ללא עלות
          </Button>
        </div>

        <div className="mb-12">
          <img 
            src="/lovable-uploads/c6adca96-5d55-40b2-9125-f5961c7275d8.png" 
            alt="יועץ AI לעסקים" 
            className="mx-auto max-w-md w-auto h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
