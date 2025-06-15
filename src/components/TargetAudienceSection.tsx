
import { Check, Users, TrendingUp, Clock, Zap } from "lucide-react";

const TargetAudienceSection = () => {
  const targetPoints = [
    {
      text: "בעלי עסקים קטנים ובינוניים שרוצים להכניס טכנולוגיה מתקדמת",
      icon: <Users className="w-5 h-5" />
    },
    {
      text: "בעלי מקצועות חופשיים שמרגישים שהעסק לא ממקסם פוטנציאל",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      text: "עסקים שרוצים לחסוך זמן, לשפר שירות או להגדיל הכנסות",
      icon: <Clock className="w-5 h-5" />
    },
    {
      text: "מי שרוצה להבין איך AI עובד בשבילו – בלי גימיקים",
      icon: <Zap className="w-5 h-5" />
    },
    {
      text: "מי שאין לו זמן להתעסק עם טכנולוגיה, אבל רוצה תוצאות",
      icon: <Clock className="w-5 h-5" />
    },
    {
      text: "מי שכבר ניסה כלים של AI ולא ראה תוצאות משמעותיות",
      icon: <TrendingUp className="w-5 h-5" />
    }
  ];

  return (
    <section id="target-audience" className="bg-white py-16 md:py-20 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-2xl opacity-50"></div>
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            זיהוי קהל היעד
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heebo text-gray-800 mb-6">
            למי זה מתאים?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-700 to-blue-primary mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 font-heebo max-w-3xl mx-auto">
            אם אתם מזדהים עם <strong className="text-purple-700">אחד או יותר</strong> מהמצבים הבאים - 
            <strong className="text-gray-800"> הייעוץ שלי מיועד בדיוק עבורכם</strong>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {targetPoints.map((point, index) => (
            <div key={index} className="group animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex items-start gap-4 bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-r-4 border-purple-600 group-hover:border-purple-700 group-hover:scale-105">
                <div className="bg-purple-100 group-hover:bg-purple-200 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300">
                  <div className="text-purple-700">
                    {point.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-lg font-heebo text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    {point.text}
                  </p>
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm text-purple-600 font-medium">✓ מתאים לך?</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Recognition section */}
        <div className="bg-gradient-to-r from-purple-700 to-blue-primary rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            מזהים את עצמכם?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            <strong>מתלבטים אם זה בשבילכם?</strong> אפשר פשוט לשלוח לי הודעה ולהתייעץ, 
            <strong> גם בלי להתחייב!</strong>
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-purple-700 px-8 py-3 rounded-xl font-heebo font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            בואו נדבר - ללא התחייבות 🤝
          </button>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
