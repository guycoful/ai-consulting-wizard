
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions' as any)
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            message: formData.message,
          },
        ]);

      if (error) {
        console.error('Supabase insertion error:', error);
        toast({
          title: "שגיאה בשליחת הטופס",
          description: "אנא נסה שנית מאוחר יותר או צור קשר ישירות",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "הטופס נשלח בהצלחה!",
        description: "נחזור אליך בהקדם האפשרי",
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Unexpected error submitting contact form:', err);
      toast({
        title: "שגיאה בשליחת הטופס",
        description: "אירעה שגיאה בלתי צפויה. אנא נסה שנית.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="bg-navy-dark py-20 md:py-32">
      <div ref={ref} className={`animate-scroll-in ${isVisible ? 'visible' : ''} container mx-auto px-4 max-w-5xl`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heebo text-white mb-6">
            רוצה לבדוק איך AI יכול להקפיץ את העסק שלך?
          </h2>
          <div className="w-32 h-1 bg-gold mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 font-heebo leading-relaxed max-w-4xl mx-auto">
            השאר פרטים ונחזור אליך לשיחת ייעוץ ראשונית ללא עלות. נבין את הצרכים של העסק שלך ונראה איך AI יכול לעזור לך להגיע למטרות.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-navy-light p-12 rounded-xl shadow-lg space-y-8 border border-gold/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="name" className="block text-lg font-medium font-heebo text-white mb-3">
                שם מלא *
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full font-heebo border-0 border-b-2 border-gray-500 rounded-none focus:border-gold focus:ring-0 bg-transparent text-white placeholder:text-gray-400 text-lg py-4"
                placeholder="השם המלא שלך"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-lg font-medium font-heebo text-white mb-3">
                אימייל *
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full font-heebo border-0 border-b-2 border-gray-500 rounded-none focus:border-gold focus:ring-0 bg-transparent text-white placeholder:text-gray-400 text-lg py-4"
                placeholder="האימייל שלך"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-lg font-medium font-heebo text-white mb-3">
              טלפון
            </label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full font-heebo border-0 border-b-2 border-gray-500 rounded-none focus:border-gold focus:ring-0 bg-transparent text-white placeholder:text-gray-400 text-lg py-4"
              placeholder="מספר הטלפון שלך"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-lg font-medium font-heebo text-white mb-3">
              מה היית רוצה לשפר או לפתור בעסק שלך? *
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full font-heebo border-0 border-b-2 border-gray-500 rounded-none focus:border-gold focus:ring-0 bg-transparent resize-none text-white placeholder:text-gray-400 text-lg py-4"
              placeholder="ספר לנו על האתגרים והמטרות של העסק שלך..."
            />
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-primary hover:bg-blue-primary/90 text-white py-6 text-xl font-heebo font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "שולח..." : "שלח לי ייעוץ ראשוני"}
          </Button>
          
          <p className="text-base text-gray-400 font-heebo text-center mt-8">
            הפרטים שלך מוגנים ולא יועברו לצד שלישי. נשתמש בהם רק ליצירת קשר איתך בנוגע לשירותי הייעוץ.
          </p>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
