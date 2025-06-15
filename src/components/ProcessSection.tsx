
import { Users, Target, Search, Lightbulb, Cog, ArrowLeft, CheckCircle } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      icon: <Users className="w-8 h-8 text-purple-700" />,
      title: "שיחת היכרות ראשונית",
      description: "נכיר, נבין את העסק ואת המטרות",
      duration: "30 דקות",
      highlight: "ללא עלות"
    },
    {
      icon: <Target className="w-8 h-8 text-purple-700" />,
      title: "מיפוי אתגרים ומטרות",
      description: "נזהה בדיוק מה צריך לשפר ומה המטרות",
      duration: "שבוע",
      highlight: "ניתוח מעמיק"
    },
    {
      icon: <Search className="w-8 h-8 text-purple-700" />,
      title: "בדיקת ניסיון קודם עם AI",
      description: "נבדוק מה כבר נוסה ומה עבד או לא עבד",
      duration: "2-3 ימים",
      highlight: "לימוד מניסיון"
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-purple-700" />,
      title: "המלצה לפתרונות מותאמים",
      description: "נציע פתרונות ספציפיים לעסק שלך",
      duration: "שבוע",
      highlight: "תכנית פעולה"
    },
    {
      icon: <Cog className="w-8 h-8 text-purple-700" />,
      title: "יישום ובקרה עם ליווי מלא",
      description: "נלווה אותך בכל השלבים עד לתוצאות",
      duration: "1-3 חודשים",
      highlight: "תוצאות מוכחות"
    }
  ];

  return (
    <section id="process" className="bg-navy-dark py-16 md:py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-purple-700 to-transparent"></div>
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-700/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-primary/20 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-900/50 text-purple-300 px-6 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            תהליך מוכח ופשוט
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heebo text-white mb-4">
            איך זה עובד?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-700 to-gold mx-auto mb-4"></div>
          <p className="text-xl text-gray-300 font-heebo max-w-3xl mx-auto">
            תהליך <strong className="text-white">שקוף ומובנה</strong> שמביא אותך <strong className="text-purple-400">מרעיון ליישום</strong> בצורה המותאמת לעסק שלך
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 overflow-x-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="text-center group flex-shrink-0 min-w-[220px] max-w-[220px]">
                <div className="relative">
                  <div className="bg-navy-light w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-700 group-hover:text-navy-dark transition-all duration-300 border-2 border-purple-700 shadow-lg group-hover:shadow-purple-700/50">
                    {step.icon}
                  </div>
                  
                  <div className="absolute -top-2 -right-2 bg-gold text-navy-dark w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                    {index + 1}
                  </div>
                  
                  {step.highlight && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                      {step.highlight}
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold font-heebo text-white mb-3 mt-6">
                  {step.title}
                </h3>
                
                <p className="text-gray-300 font-heebo text-sm leading-relaxed mb-2">
                  {step.description}
                </p>
                
                <div className="text-xs text-purple-400 font-medium">
                  ⏱️ {step.duration}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:flex items-center mx-4">
                  <ArrowLeft className="w-8 h-8 text-purple-700 animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Call to action in process section */}
        <div className="text-center mt-16">
          <div className="bg-purple-900/30 border border-purple-700/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              מוכנים להתחיל?
            </h3>
            <p className="text-gray-300 mb-6">
              השיחה הראשונה <strong className="text-purple-400">ללא עלות וללא התחייבות</strong> - רק כדי להבין איך AI יכול לעזור לעסק שלכם
            </p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-purple-700 to-blue-primary hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-heebo font-medium transition-all duration-300 transform hover:scale-105"
            >
              בואו נתחיל לדבר 💬
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
