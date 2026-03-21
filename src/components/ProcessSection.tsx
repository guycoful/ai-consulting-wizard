import { Users, Target, Search, Lightbulb, Cog, ArrowRight } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      icon: <Users className="w-8 h-8 text-purple-700" />,
      title: "שיחת היכרות ראשונית",
      description: "נכיר, נבין את העסק ואת המטרות"
    },
    {
      icon: <Target className="w-8 h-8 text-purple-700" />,
      title: "מיפוי אתגרים ומטרות",
      description: "נזהה בדיוק מה צריך לשפר ומה המטרות"
    },
    {
      icon: <Search className="w-8 h-8 text-purple-700" />,
      title: "בדיקת ניסיון קודם עם AI",
      description: "נבדוק מה כבר נוסה ומה עבד או לא עבד"
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-purple-700" />,
      title: "המלצה לפתרונות מותאמים",
      description: "נציע פתרונות ספציפיים לעסק שלך"
    },
    {
      icon: <Cog className="w-8 h-8 text-purple-700" />,
      title: "יישום ובקרה עם ליווי מלא",
      description: "נלווה אותך בכל השלבים עד לתוצאות"
    }
  ];

  return (
    <section id="process" className="bg-navy-dark py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heebo text-white mb-4">
            איך זה עובד?
          </h2>
          <div className="w-24 h-1 bg-purple-700 mx-auto"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 overflow-x-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="text-center group flex-shrink-0 min-w-[200px]">
                <div className="bg-navy-light w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-700 group-hover:text-navy-dark transition-all duration-300 border-2 border-purple-700">
                  {step.icon}
                </div>
                
                <div className="bg-purple-700 text-navy-dark w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {index + 1}
                </div>
                
                <h3 className="text-lg font-semibold font-heebo text-white mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-300 font-heebo text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:flex items-center mx-4">
                  <ArrowRight className="w-8 h-8 text-purple-700 animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
