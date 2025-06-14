
import { Users, Target, Search, Lightbulb, Cog } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      icon: <Users className="w-8 h-8 text-gold" />,
      title: "שיחת היכרות ראשונית",
      description: "נכיר, נבין את העסק ואת המטרות"
    },
    {
      icon: <Target className="w-8 h-8 text-gold" />,
      title: "מיפוי אתגרים ומטרות",
      description: "נזהה בדיוק מה צריך לשפר ומה המטרות"
    },
    {
      icon: <Search className="w-8 h-8 text-gold" />,
      title: "בדיקת ניסיון קודם עם AI",
      description: "נבדוק מה כבר נוסה ומה עבד או לא עבד"
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-gold" />,
      title: "המלצה לפתרונות מותאמים",
      description: "נציע פתרונות ספציפיים לעסק שלך"
    },
    {
      icon: <Cog className="w-8 h-8 text-gold" />,
      title: "יישום ובקרה עם ליווי מלא",
      description: "נלווה אותך בכל השלבים עד לתוצאות"
    }
  ];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heebo text-navy-dark mb-4">
            איך זה עובד?
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gray-light w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:text-navy-dark transition-all duration-300 border-2 border-gold">
                {step.icon}
              </div>
              
              <div className="bg-navy-dark text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                {index + 1}
              </div>
              
              <h3 className="text-lg font-semibold font-heebo text-navy-dark mb-3">
                {step.title}
              </h3>
              
              <p className="text-gray-text font-heebo text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
