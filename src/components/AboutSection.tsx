
const AboutSection = () => {
  return (
    <section className="bg-navy-light py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heebo text-white mb-2">
              גיא כהן
            </h2>
            
            <h3 className="text-xl md:text-2xl font-medium font-heebo text-gold mb-6">
              יועץ בינה מלאכותית לעסקים קטנים ובינוניים
            </h3>
            
            <p className="text-lg text-gray-300 font-heebo leading-relaxed mb-8 max-w-4xl">
              בעל תואר ראשון במנהל עסקים מאוניברסיטת בן גוריון, ובוגר מאסטר קלאס AI של הייקיו דיגיטל. מלווה עסקים בהטמעת פתרונות AI מותאמים, עם תהליך פשוט שמביא תוצאות אמיתיות.
            </p>
            
            <div className="relative">
              <div className="absolute right-0 top-0 w-1 h-full bg-gold"></div>
              <blockquote className="bg-navy-dark p-6 pr-8 rounded-lg shadow-md border border-gold/20">
                <p className="text-lg font-heebo text-gray-300 italic">
                  לאחרונה ליוויתי מורה פרטי למדעי המחשב שרצה להגדיל הכנסה, ויצא מהתהליך עם תכנית פעולה ברורה, רעיונות חדשים, והבנה איך לעבוד חכם יותר עם AI.
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
