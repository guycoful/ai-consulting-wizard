
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
            תוך 60 ימים תוכל להרוויח 5 ספרות בחודש
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heebo text-purple-400 mb-8 leading-tight">
            כיועץ AI לעסקים - גם בלי ידע ונסיון קודם
          </h2>
          <div className="w-32 h-1 bg-gold mx-auto mb-6"></div>
        </div>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-gray-300 mb-6 font-heebo leading-relaxed">
            הצטרף לתכנית המעשית היחידה שלוקחת אותך מאפס לעסק רווחי בתחום ה-AI - עם שיטה מוכחת,
          </p>
          <p className="text-xl md:text-2xl text-gray-300 mb-6 font-heebo leading-relaxed">
            ליווי אישי צמוד, וכלים מדויקים להשגת הלקוח הראשון שלך כבר במהלך התכנית
          </p>
        </div>
        
        <div className="mt-12">
          <Button 
            onClick={scrollToContact}
            className="bg-blue-primary hover:bg-blue-primary/90 text-white px-12 py-6 text-xl font-heebo font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            לקביעת שיחת ייעוץ ראשונית ללא עלות
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
