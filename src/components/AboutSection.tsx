
const AboutSection = () => {
  return (
    <section id="about" className="bg-navy-light py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Section - More prominent */}
          <div className="lg:w-1/3 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-gold shadow-2xl">
                <img 
                  src="/lovable-uploads/c6adca96-5d55-40b2-9125-f5961c7275d8.png" 
                  alt="גיא כהן - יועץ בינה מלאכותית"
                  className="w-full h-full object-cover filter brightness-110 contrast-110"
                />
              </div>
              {/* Decorative elements around image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gold rounded-full opacity-70"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-700 rounded-full opacity-80"></div>
            </div>
          </div>

          {/* Text Section */}
          <div className="lg:w-2/3 text-center lg:text-right">
            <h2 className="text-3xl md:text-4xl font-bold font-heebo text-white mb-2">
              גיא כהן
            </h2>
            
            {/* Enhanced subtitle - bolder and brighter */}
            <h3 className="text-2xl md:text-3xl font-black font-heebo text-gold mb-6 leading-tight">
              יועץ בינה מלאכותית לעסקים קטנים ובינוניים
            </h3>
            
            <p className="text-lg text-gray-300 font-heebo leading-relaxed mb-8 max-w-4xl">
              בעל תואר ראשון במנהל עסקים מאוניברסיטת בן גוריון, ובוגר מאסטר קלאס AI של הייקיו דיגיטל. מלווה עסקים בהטמעת פתרונות AI מותאמים, עם תהליך פשוט שמביא תוצאות אמיתיות.
            </p>
            
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute right-0 top-0 w-1 h-full bg-purple-700"></div>
                <blockquote className="bg-navy-dark p-6 pr-8 rounded-lg shadow-md border border-purple-700/20">
                  <p className="text-lg font-heebo text-gray-300">
                    לאחרונה ליוויתי מורה פרטי למדעי המחשב שרצה להגדיל הכנסה, ויצא מהתהליך עם תכנית פעולה ברורה, רעיונות חדשים, והבנה איך לעבוד חכם יותר עם AI.
                  </p>
                </blockquote>
              </div>

              <div className="relative">
                <div className="absolute right-0 top-0 w-1 h-full bg-purple-700"></div>
                <blockquote className="bg-navy-dark p-6 pr-8 rounded-lg shadow-md border border-purple-700/20">
                  <p className="text-lg font-heebo text-gray-300">
                    עזרתי לבעלת עסק לק ג'ל שרצתה להגיע ליותר לקוחות ולהגדיל חשיפה. ביחד בנינו אסטרטגיית תוכן וקמפיין מבוסס AI, שמשך עשרות לקוחות חדשים בשבועות הראשונים בלבד — וכל זה בלי להסתבך בטכנולוגיה או להוציא סכומי עתק על פרסום.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
