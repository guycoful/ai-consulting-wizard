
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

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
      title: "הטופס נשלח בהצלחה!",
      description: "נחזור אליך בהקדם האפשרי",
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
    <section id="contact" className="bg-navy-dark py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heebo text-white mb-4">
            רוצה לבדוק איך AI יכול להקפיץ את העסק שלך?
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 font-heebo leading-relaxed">
            השאר פרטים ונחזור אליך לשיחת ייעוץ ראשונית ללא עלות. נבין את הצרכים של העסק שלך ונראה איך AI יכול לעזור לך להגיע למטרות.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-navy-light p-8 rounded-xl shadow-lg space-y-6 border border-gold/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium font-heebo text-white mb-2">
                שם מלא *
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full font-heebo border-0 border-b-2 border-gray-500 rounded-none focus:border-gold focus:ring-0 bg-transparent text-white placeholder:text-gray-400"
                placeholder="השם המלא שלך"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium font-heebo text-white mb-2">
                אימייל *
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full font-heebo border-0 border-b-2 border-gray-500 rounded-none focus:border-gold focus:ring-0 bg-transparent text-white placeholder:text-gray-400"
                placeholder="האימייל שלך"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium font-heebo text-white mb-2">
              טלפון
            </label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full font-heebo border-0 border-b-2 border-gray-500 rounded-none focus:border-gold focus:ring-0 bg-transparent text-white placeholder:text-gray-400"
              placeholder="מספר הטלפון שלך"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium font-heebo text-white mb-2">
              מה היית רוצה לשפר או לפתור בעסק שלך? *
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full font-heebo border-0 border-b-2 border-gray-500 rounded-none focus:border-gold focus:ring-0 bg-transparent resize-none text-white placeholder:text-gray-400"
              placeholder="ספר לנו על האתגרים והמטרות של העסק שלך..."
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-blue-primary hover:bg-blue-primary/90 text-white py-4 text-lg font-heebo font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            שלחו לי ייעוץ ראשוני
          </Button>
          
          <p className="text-sm text-gray-400 font-heebo text-center mt-6">
            הפרטים שלך מוגנים ולא יועברו לצד שלישי. נשתמש בהם רק ליצירת קשר איתך בנוגע לשירותי הייעוץ.
          </p>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
