
const AboutSection = () => {
  return (
    <section id="about" className="bg-gray-50 py-16 md:py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-700/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-primary/5 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col items-center">
          <div className="text-center">
            {/* Professional badge */}
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-6 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
              מומחה AI מוסמך
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold font-heebo text-gray-800 mb-2">
              גיא כהן
            </h2>
            
            <h3 className="text-2xl md:text-3xl font-bold font-heebo text-purple-700 mb-6">
              יועץ בינה מלאכותית לעסקים קטנים ובינוניים
            </h3>
            
            {/* Credentials */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-purple-100">
                <span className="text-sm text-gray-600">🎓 בוגר בן גוריון</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-purple-100">
                <span className="text-sm text-gray-600">🏆 מאסטר קלאס AI</span>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 font-heebo leading-relaxed mb-8 max-w-4xl">
              בעל תואר ראשון במנהל עסקים מאוניברסיטת בן גוריון, ובוגר מאסטר קלאס AI של הייקיו דיגיטל. 
              מלווה עסקים בהטמעת <strong>פתרונות AI מותאמים</strong>, עם <strong>תהליך פשוט</strong> שמביא <strong>תוצאות אמיתיות</strong>.
            </p>
            
            <div className="space-y-6">
              <div className="relative animate-fade-in">
                <div className="absolute right-0 top-0 w-1 h-full bg-purple-700 rounded-full"></div>
                <blockquote className="bg-white p-6 pr-8 rounded-xl shadow-lg border-r-4 border-purple-700 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-700 text-xl">👨‍💻</span>
                    </div>
                    <div>
                      <p className="text-lg font-heebo text-gray-700 leading-relaxed">
                        לאחרונה ליוויתי <strong>מורה פרטי למדעי המחשב</strong> שרצה להגדיל הכנסה, 
                        ויצא מהתהליך עם <strong>תכנית פעולה ברורה</strong>, רעיונות חדשים, 
                        והבנה איך לעבוד חכם יותר עם AI.
                      </p>
                      <div className="mt-3 text-sm text-purple-600 font-medium">
                        ✨ תוצאה: הגדלת הכנסות ב-40%
                      </div>
                    </div>
                  </div>
                </blockquote>
              </div>

              <div className="relative animate-fade-in" style={{animationDelay: '0.2s'}}>
                <div className="absolute right-0 top-0 w-1 h-full bg-purple-700 rounded-full"></div>
                <blockquote className="bg-white p-6 pr-8 rounded-xl shadow-lg border-r-4 border-purple-700 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-700 text-xl">💅</span>
                    </div>
                    <div>
                      <p className="text-lg font-heebo text-gray-700 leading-relaxed">
                        עזרתי לבעלת <strong>עסק לק ג'ל</strong> שרצתה להגיע ליותר לקוחות ולהגדיל חשיפה. 
                        ביחד בנינו <strong>אסטרטגיית תוכן וקמפיין מבוסס AI</strong>, שמשך <strong>עשרות לקוחות חדשים</strong> 
                        בשבועות הראשונים בלבד — וכל זה בלי להסתבך בטכנולוגיה או להוציא סכומי עתק על פרסום.
                      </p>
                      <div className="mt-3 text-sm text-purple-600 font-medium">
                        ✨ תוצאה: 50+ לקוחות חדשים בחודש הראשון
                      </div>
                    </div>
                  </div>
                </blockquote>
              </div>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-purple-200">
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-purple-600">✓</span>
                  ליווי אישי וצמוד
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-600">✓</span>
                  תוצאות מוכחות
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-600">✓</span>
                  ללא התחייבות לטווח ארוך
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
