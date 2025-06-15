
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Quote, User, Briefcase } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "רונית ל.",
      business: "עסק לק ג'ל",
      role: "יזמת",
      text: "גיא עזר לי לבנות קמפיין AI שמשך עשרות לקוחות חדשים בשבועות הראשונים. הכל פשוט ויעיל!",
      result: "50+ לקוחות חדשים בחודש הראשון",
      avatar: "👩‍💼"
    },
    {
      name: "דני כ.",
      business: "מורה פרטי למדעי המחשב",
      role: "מורה פרטי",
      text: "יצאתי עם תכנית פעולה ברורה ורעיונות חדשים. למדתי איך לעבוד חכם יותר עם AI.",
      result: "הגדלת הכנסות ב-40%",
      avatar: "👨‍🏫"
    },
    {
      name: "שירה ר.",
      business: "סטודיו עיצוב גרפי",
      role: "מעצבת גרפית",
      text: "הייעוץ של גיא חסך לי שעות עבודה בשבוע והגדיל את הפרודוקטיביות שלי משמעותית.",
      result: "חיסכון של 15 שעות בשבוע",
      avatar: "🎨"
    }
  ];

  return (
    <section id="testimonials" className="bg-gray-50 py-16 md:py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-700 to-transparent"></div>
      <div className="absolute top-10 right-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-60"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" />
            המלצות לקוחות
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heebo text-gray-800 mb-6">
            מה לקוחות מספרים?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-700 to-blue-primary mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 font-heebo max-w-3xl mx-auto">
            <strong className="text-gray-800">תוצאות אמיתיות</strong> מלקוחות אמיתיים שכבר חוו את השינוי
          </p>
        </div>
        
        {/* Desktop view */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-purple-200 h-full relative overflow-hidden">
                {/* Quote icon */}
                <div className="absolute top-4 left-4 text-purple-200 opacity-50">
                  <Quote className="w-8 h-8" />
                </div>
                
                {/* Stars */}
                <div className="flex gap-1 mb-4 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-purple-400 text-purple-400" />
                  ))}
                </div>
                
                {/* Testimonial text */}
                <p className="text-gray-700 font-heebo leading-relaxed mb-6 relative z-10 italic">
                  "{testimonial.text}"
                </p>
                
                {/* Result badge */}
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6 inline-block">
                  ✨ {testimonial.result}
                </div>
                
                {/* Profile */}
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 font-heebo">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 font-heebo">
                      {testimonial.business}
                    </div>
                    <div className="text-xs text-purple-600 font-medium">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                
                {/* Decorative gradient */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-purple-50 to-transparent rounded-full opacity-50"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile carousel */}
        <div className="md:hidden">
          <Carousel className="w-full max-w-sm mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden">
                    {/* Quote icon */}
                    <div className="absolute top-4 left-4 text-purple-200 opacity-50">
                      <Quote className="w-6 h-6" />
                    </div>
                    
                    {/* Stars */}
                    <div className="flex gap-1 mb-4 relative z-10">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-purple-400 text-purple-400" />
                      ))}
                    </div>
                    
                    {/* Testimonial text */}
                    <p className="text-gray-700 font-heebo leading-relaxed mb-4 relative z-10 italic text-sm">
                      "{testimonial.text}"
                    </p>
                    
                    {/* Result badge */}
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium mb-4 inline-block">
                      ✨ {testimonial.result}
                    </div>
                    
                    {/* Profile */}
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 font-heebo text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-gray-600 font-heebo">
                          {testimonial.business}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span>תוצאות מוכחות</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span>לקוחות מרוצים</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span>שירות אישי</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
