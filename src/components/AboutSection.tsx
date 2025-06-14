
const AboutSection = () => {
  return (
    <section className="bg-gray-light py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-shrink-0">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shadow-lg border-4 border-gold">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face" 
                alt="גיא כהן - יועץ בינה מלאכותית"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-right">
            <h2 className="text-3xl md:text-4xl font-bold font-heebo text-navy-dark mb-2">
              גיא כהן
            </h2>
            
            <h3 className="text-xl md:text-2xl font-medium font-heebo text-blue-primary mb-6">
              יועץ בינה מלאכותית לעסקים קטנים ובינוניים
            </h3>
            
            <p className="text-lg text-gray-text font-heebo leading-relaxed mb-8">
              בעל תואר ראשון במנהל עסקים מאוניברסיטת בן גוריון, ובוגר מאסטר קלאס AI של הייקיו דיגיטל. מלווה עסקים בהטמעת פתרונות AI מותאמים, עם תהליך פשוט שמביא תוצאות אמיתיות.
            </p>
            
            <div className="relative">
              <div className="absolute right-0 top-0 w-1 h-full bg-gold"></div>
              <blockquote className="bg-white p-6 pr-8 rounded-lg shadow-md">
                <p className="text-lg font-heebo text-gray-text italic">
                  "לאחרונה ליוויתי מורה פרטי למדעי המחשב שרצה להגדיל הכנסה, ויצא מהתהליך עם תכנית פעולה ברורה, רעיונות חדשים, והבנה איך לעבוד חכם יותר עם AI."
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
