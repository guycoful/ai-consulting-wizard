
const AboutSection = () => {
  return (
    <section id="about" className="bg-navy-light py-16 md:py-20" dir="rtl">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Bio */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heebo text-white mb-2">
            גיא כהן
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold font-heebo text-purple-400 mb-6">
            יועץ בינה מלאכותית לעסקים קטנים ובינוניים
          </h3>
          <p className="text-lg text-gray-300 font-heebo leading-relaxed max-w-3xl mx-auto">
            בעל תואר ראשון במנהל עסקים מאוניברסיטת בן גוריון, ובוגר מאסטר קלאס AI של הייקיו דיגיטל. מלווה עסקים בהטמעת פתרונות AI מותאמים, עם תהליך פשוט שמביא תוצאות אמיתיות.
          </p>
        </div>

        {/* Success Stories */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold font-heebo text-white mb-8 text-center">
            סיפורי הצלחה מהשטח
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <div className="absolute right-0 top-0 w-1 h-full bg-purple-700 rounded-full"></div>
              <blockquote className="bg-navy-dark p-6 pr-8 rounded-lg shadow-md border border-purple-700/20 h-full">
                <p className="text-base font-heebo text-gray-300 leading-relaxed">
                  ליוויתי <strong className="text-white">מורה פרטי למדעי המחשב</strong> שרצה להגדיל הכנסה, ויצא מהתהליך עם תכנית פעולה ברורה, רעיונות חדשים, והבנה איך לעבוד חכם יותר עם AI.
                </p>
              </blockquote>
            </div>
            <div className="relative">
              <div className="absolute right-0 top-0 w-1 h-full bg-purple-700 rounded-full"></div>
              <blockquote className="bg-navy-dark p-6 pr-8 rounded-lg shadow-md border border-purple-700/20 h-full">
                <p className="text-base font-heebo text-gray-300 leading-relaxed">
                  עזרתי <strong className="text-white">לבעלת עסק לק ג'ל</strong> שרצתה להגיע ליותר לקוחות ולהגדיל חשיפה. ביחד בנינו אסטרטגיית תוכן וקמפיין מבוסס AI, שמשך עשרות לקוחות חדשים בשבועות הראשונים בלבד.
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
