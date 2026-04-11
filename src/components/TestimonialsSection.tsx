import { useState, useEffect } from "react";
import { Star, Plus, Send, Loader2, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  text: string;
  rating: number;
  photo_url: string | null;
  allow_publish_name: boolean;
};

const StarRating = ({
  value,
  onChange,
  readonly = false,
}: {
  value: number;
  onChange?: (v: number) => void;
  readonly?: boolean;
}) => (
  <div className="flex gap-1" dir="ltr">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        disabled={readonly}
        onClick={() => onChange?.(star)}
        className={`transition-colors ${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"}`}
      >
        <Star
          className={`w-5 h-5 ${star <= value ? "fill-yellow-400 text-yellow-400" : "text-gray-500"}`}
        />
      </button>
    ))}
  </div>
);

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Auto-open dialog if URL has #review
  useEffect(() => {
    if (window.location.hash === "#review") {
      setTimeout(() => setDialogOpen(true), 500);
    }
  }, []);

  // Form state
  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formText, setFormText] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formAllowPublish, setFormAllowPublish] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials" as any)
        .select("id, name, role, text, rating, photo_url, allow_publish_name")
        .eq("approved", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTestimonials((data as any[]) || []);
    } catch {
      // Silent fail - show empty state
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formText.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from("testimonials" as any).insert({
        name: formName.trim(),
        role: formRole.trim() || null,
        text: formText.trim(),
        rating: formRating,
        allow_publish_name: formAllowPublish,
        approved: false,
      });

      if (error) throw error;

      toast.success("חוות הדעת נשלחה בהצלחה! תפורסם לאחר אישור.");
      setFormName("");
      setFormRole("");
      setFormText("");
      setFormRating(5);
      setFormAllowPublish(false);
      setDialogOpen(false);
    } catch {
      toast.error("שגיאה בשליחת חוות הדעת");
    } finally {
      setSubmitting(false);
    }
  };

  const displayName = (t: Testimonial) => {
    if (t.allow_publish_name) return t.name;
    // Show first name + initial: "דני כ."
    const parts = t.name.split(" ");
    if (parts.length > 1) return `${parts[0]} ${parts[1][0]}'.`;
    return t.name;
  };

  return (
    <section id="testimonials" className="bg-navy-light py-16 md:py-24">
      <div
        ref={ref}
        className={`animate-scroll-in ${isVisible ? "visible" : ""} container mx-auto px-4 max-w-6xl`}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heebo text-white mb-4">
            מה לקוחות מספרים ?
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-300 font-heebo">
            חוות דעת אמיתיות מלקוחות שעבדו איתי
          </p>
        </div>

        {/* Testimonials grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-navy-dark p-8 rounded-xl border border-purple-700/20 hover:border-purple-700/40 transition-all relative"
              >
                <Quote className="w-8 h-8 text-purple-700/30 absolute top-4 left-4" />

                <div className="flex items-center gap-4 mb-5">
                  {t.photo_url ? (
                    <img
                      src={t.photo_url}
                      alt={displayName(t)}
                      className="w-14 h-14 rounded-full object-cover border-2 border-purple-700/30"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-purple-700/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 font-bold text-xl">
                        {t.name[0]}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-white font-semibold font-heebo">
                      {displayName(t)}
                    </p>
                    {t.role && (
                      <p className="text-gray-400 text-sm font-heebo">
                        {t.role}
                      </p>
                    )}
                  </div>
                </div>

                <StarRating value={t.rating} readonly />

                <p className="text-gray-300 font-heebo mt-4 leading-relaxed text-sm">
                  {t.text}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 mb-12">
            <p className="text-gray-400 font-heebo text-lg">
              חוות דעת יתווספו בקרוב...
            </p>
          </div>
        )}

        {/* Submit review button + dialog */}
        <div className="text-center">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-purple-700/40 text-purple-400 hover:bg-purple-700/10 hover:text-purple-300 gap-2 font-heebo"
              >
                <Plus className="w-4 h-4" />
                השאר חוות דעת
              </Button>
            </DialogTrigger>
            <DialogContent
              className="bg-navy-dark border border-purple-700/30 text-white max-w-md"
              dir="rtl"
            >
              <DialogHeader>
                <DialogTitle className="text-xl font-heebo text-white text-right">
                  השאר חוות דעת
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-5 mt-2">
                <div className="space-y-2">
                  <Label className="text-gray-200 font-heebo">שם מלא *</Label>
                  <Input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    placeholder="השם שלך"
                    className="bg-navy-light border-purple-700/20 text-white placeholder:text-gray-500 font-heebo focus:border-purple-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200 font-heebo">
                    תפקיד / עסק
                  </Label>
                  <Input
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="לדוגמה: בעלים של מסעדת X"
                    className="bg-navy-light border-purple-700/20 text-white placeholder:text-gray-500 font-heebo focus:border-purple-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200 font-heebo">דירוג</Label>
                  <StarRating value={formRating} onChange={setFormRating} />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200 font-heebo">
                    חוות הדעת שלך *
                  </Label>
                  <Textarea
                    value={formText}
                    onChange={(e) => setFormText(e.target.value)}
                    required
                    rows={4}
                    placeholder="ספר על החוויה שלך..."
                    className="bg-navy-light border-purple-700/20 text-white placeholder:text-gray-500 font-heebo resize-none focus:border-purple-400"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="allow-publish"
                    checked={formAllowPublish}
                    onCheckedChange={(c) => setFormAllowPublish(c === true)}
                    className="mt-1 border-purple-700/40 data-[state=checked]:bg-purple-700"
                  />
                  <Label
                    htmlFor="allow-publish"
                    className="text-gray-300 font-heebo text-sm leading-relaxed cursor-pointer"
                  >
                    אני מאשר/ת פרסום שמי המלא ותמונתי באתר
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={submitting || !formName.trim() || !formText.trim()}
                  className="w-full bg-blue-primary hover:bg-blue-primary/90 text-white font-heebo gap-2"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {submitting ? "שולח..." : "שלח חוות דעת"}
                </Button>

                <p className="text-gray-500 text-xs font-heebo text-center">
                  חוות הדעת תפורסם באתר לאחר אישור
                </p>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
