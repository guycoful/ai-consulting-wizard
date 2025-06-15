
import { Button } from "@/components/ui/button";
import ScrollDownButton from "./ScrollDownButton";

const HeroSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="bg-navy-dark py-8 md:py-16 lg:py-24 animate-fade-in relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-700 via-blue-primary to-purple-700"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-purple-700/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-blue-primary/10 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-4 text-center max-w-6xl relative z-10">
        <div className="relative mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-bold font-heebo text-white mb-4 md:mb-6 leading-tight px-2">
            <span className="text-purple-400">ייעוץ AI</span> לעסקים קטנים ובינוניים:
          </h1>
          <h2 className="text-xl md:text-3xl lg:text-5xl xl:text-6xl font-bold font-heebo text-white mb-4 md:mb-6 leading-tight px-2">
            פותרים את הבעיות הכי כואבות בעסק שלך בעזרת פתרונות AI <span className="text-gold">מותאמים אישית</span>
          </h2>
          <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-purple-700 to-gold mx-auto mb-4 md:mb-6 rounded-full"></div>
        </div>
        
        <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto mb-8 md:mb-12">
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-heebo leading-relaxed px-4">
            נבין בדיוק מה העסק שלך צריך, נמפה את האתגרים, ונציע <strong className="text-white">פתרונות חכמים</strong> שיגדילו הכנסות, ישפרו שירות ויחסכו זמן.
          </p>
        </div>
        
        <div className="mb-8 md:mb-12 px-4">
          <Button 
            onClick={scrollToContact}
            className="bg-gradient-to-r from-blue-primary to-purple-700 hover:from-blue-primary/90 hover:to-purple-700/90 text-white px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-heebo font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto"
          >
            🚀 לקביעת <strong>שיחת ייעוץ ראשונית ללא עלות</strong>
          </Button>
        </div>

        <div className="mb-8 md:mb-12 px-4">
          <div className="relative inline-block">
            <img 
              src="/lovable-uploads/c6adca96-5d55-40b2-9125-f5961c7275d8.png" 
              alt="גיא כהן - יועץ בינה מלאכותית לעסקים קטנים ובינוניים" 
              className="mx-auto max-w-full w-full sm:max-w-md h-auto rounded-2xl shadow-2xl border-4 border-purple-700/30"
            />
            <div className="absolute -top-4 -right-4 bg-gold text-navy-dark px-4 py-2 rounded-full text-sm font-bold animate-bounce">
              💡 ייעוץ חינם!
            </div>
          </div>
        </div>
      </div>
      <ScrollDownButton />
    </section>
  );
};

export default HeroSection;
