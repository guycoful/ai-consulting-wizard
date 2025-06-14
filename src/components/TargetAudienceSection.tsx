
import { CheckCircle } from "lucide-react";

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
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold font-heebo text-center text-gray-900 mb-12">
          למי זה מתאים?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {targetPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <p className="text-lg font-heebo text-gray-800 leading-relaxed">
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
