
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Phone, Mail, Shield, Clock, CheckCircle } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "🎉 הטופס נשלח בהצלחה!",
      description: "נחזור אליך תוך 24 שעות למתן שיחת ייעוץ ראשונית",
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="bg-navy-dark py-20 md:py-32 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-purple-700 to-transparent"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-purple-700/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-blue-primary/20 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-900/50 text-purple-300 px-6 py-2 rounded-full text-sm font-medium mb-6">
            <MessageCircle className="w-4 h-4" />
            צרו קשר עכשיו
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-heebo text-white mb-6">
            רוצה לבדוק איך AI יכול להקפיץ את העסק שלך?
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-700 to-gold mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 font-heebo leading-relaxed max-w-4xl mx-auto">
            השאר פרטים ונחזור אליך ל<strong className="text-white">שיחת ייעוץ ראשונית ללא עלות</strong>. 
            נבין את הצרכים של העסק שלך ונראה איך AI יכול לעזור לך להגיע למטרות.
          </p>
          
          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
            <div className="flex items-center gap-2 text-purple-300">
              <CheckCircle className="w-4 h-4" />
              <span>ייעוץ ללא עלות</span>
            </div>
            <div className="flex items-center gap-2 text-purple-300">
              <Clock className="w-4 h-4" />
              <span>מענה תוך 24 שעות</span>
            </div>
            <div className="flex items-center gap-2 text-purple-300">
              <Shield className="w-4 h-4" />
              <span>שמירה על פרטיות</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-navy-light/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-2xl space-y-8 border border-purple-700/30 relative overflow-hidden">
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-700 via-gold to-purple-700"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label htmlFor="name" className="flex items-center gap-2 text-lg font-medium font-heebo text-white">
                <Mail className="w-4 h-4 text-purple-400" />
                שם מלא *
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full font-heebo bg-navy-dark/50 border-2 border-purple-700/30 focus:border-purple-500 rounded-xl text-white placeholder:text-gray-400 text-lg py-4 px-4 transition-all duration-300"
                placeholder="איך קוראים לך?"
              />
              <div className="text-xs text-gray-400 font-heebo">
                השם שלך יעזור לנו לפנות אליך באופן אישי
              </div>
            </div>
            
            <div className="space-y-3">
              <label htmlFor="email" className="flex items-center gap-2 text-lg font-medium font-heebo text-white">
                <Mail className="w-4 h-4 text-purple-400" />
                כתובת אימייל *
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full font-heebo bg-navy-dark/50 border-2 border-purple-700/30 focus:border-purple-500 rounded-xl text-white placeholder:text-gray-400 text-lg py-4 px-4 transition-all duration-300"
                placeholder="example@gmail.com"
              />
              <div className="text-xs text-gray-400 font-heebo">
                נשלח אליך את פרטי השיחה באימייל
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <label htmlFor="phone" className="flex items-center gap-2 text-lg font-medium font-heebo text-white">
              <Phone className="w-4 h-4 text-purple-400" />
              מספר טלפון (מומלץ)
            </label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full font-heebo bg-navy-dark/50 border-2 border-purple-700/30 focus:border-purple-500 rounded-xl text-white placeholder:text-gray-400 text-lg py-4 px-4 transition-all duration-300"
              placeholder="050-1234567"
            />
            <div className="text-xs text-gray-400 font-heebo">
              יעזור לנו ליצור קשר מהיר יותר לתיאום שיחה
            </div>
          </div>
          
          <div className="space-y-3">
            <label htmlFor="message" className="flex items-center gap-2 text-lg font-medium font-heebo text-white">
              <MessageCircle className="w-4 h-4 text-purple-400" />
              מה היית רוצה לשפר או לפתור בעסק שלך? *
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full font-heebo bg-navy-dark/50 border-2 border-purple-700/30 focus:border-purple-500 rounded-xl resize-none text-white placeholder:text-gray-400 text-lg py-4 px-4 transition-all duration-300"
              placeholder="ספר לנו על האתגרים והמטרות של העסק שלך... למשל: 'אני רוצה לחסוך זמן בניהול לקוחות' או 'אני מחפש דרכים להגדיל מכירות'"
            />
            <div className="text-xs text-gray-400 font-heebo">
              ככל שתספר יותר, כך נוכל להכין ייעוץ מותאם יותר עבורך
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-700 to-blue-primary hover:from-purple-600 hover:to-blue-600 text-white py-6 text-xl font-heebo font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-purple-500/30"
          >
            🚀 שלחו לי ייעוץ ראשוני ללא עלות
          </Button>
          
          {/* Privacy notice */}
          <div className="bg-navy-dark/30 border border-purple-700/20 rounded-xl p-6 mt-8">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-heebo font-medium mb-2">
                  🛡️ הפרטים שלך מוגנים ובטוחים
                </h4>
                <p className="text-base text-gray-300 font-heebo leading-relaxed">
                  <strong>הפרטים שלך נשמרים בפרטיות מלאה</strong> ולא יועברו לאף גורם חיצוני. 
                  נשתמש בהם אך ורק ליצירת קשר איתך בנוגע לשירותי הייעוץ. 
                  תוכל לבקש למחוק את הפרטים בכל עת.
                </p>
              </div>
            </div>
          </div>
        </form>
        
        {/* Final CTA */}
        <div className="text-center mt-16 p-8 bg-purple-900/30 border border-purple-700/50 rounded-2xl">
          <h3 className="text-2xl font-bold text-white mb-4">
            <strong>מתלבטים אם זה בשבילכם?</strong>
          </h3>
          <p className="text-xl text-gray-300 mb-6">
            אפשר פשוט לשלוח לי הודעה ולהתייעץ, <strong className="text-white">גם בלי להתחייב!</strong>
          </p>
          <div className="text-lg text-purple-300 font-heebo">
            💡 השיחה הראשונה תמיד ללא עלות וללא התחייבות
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
