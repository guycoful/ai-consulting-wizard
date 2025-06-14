
import { Check } from "lucide-react";

const TargetAudienceSection = () => {
  const targetPoints = [
    "בעלי עסקים קטנים ובינוניים שרוצים להכניס טכנולוגיה מתקדמת",
    "בעלי מקצועות חופשיים שמרגישים שהעסק לא ממקסם פוטנציאל",
    "עסקים שרוצים לחסוך זמן, לשפר שירות או להגדיל הכנסות",
    "מי שרוצה להבין איך AI עובד בשבילו – בלי גימיקים",
    "מי שאין לו זמן להתעסק עם טכנולוגיה, אבל רוצה תוצאות",
    "מי שכבר ניסה כלים של AI ולא ראה תוצאות משמעותיות"
  ];

  return (
    <section className="bg-gray-light py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heebo text-navy-dark mb-4">
            למי זה מתאים?
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {targetPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border-r-4 border-gold">
              <div className="bg-gold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-navy-dark" />
              </div>
              <p className="text-lg font-heebo text-gray-text leading-relaxed">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
