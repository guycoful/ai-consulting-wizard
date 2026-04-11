import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Check, X, Trash2, Star, Image, Loader2 } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  text: string;
  rating: number;
  allow_publish_name: boolean;
  photo_url: string | null;
  approved: boolean;
  created_at: string;
};

const AdminTestimonials = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [photoInputs, setPhotoInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    // Read ALL testimonials (RLS allows it)
    const { data, error } = await supabase
      .from("testimonials" as any)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("שגיאה בטעינה");
    } else {
      setItems((data as any[]) || []);
    }
    setLoading(false);
  };

  const approve = async (id: string) => {
    const { error } = await supabase
      .from("testimonials" as any)
      .update({ approved: true })
      .eq("id", id);
    if (error) return toast.error("שגיאה");
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, approved: true } : t)));
    toast.success("אושר לפרסום");
  };

  const unapprove = async (id: string) => {
    const { error } = await supabase
      .from("testimonials" as any)
      .update({ approved: false })
      .eq("id", id);
    if (error) return toast.error("שגיאה");
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, approved: false } : t)));
    toast.success("הוסר מפרסום");
  };

  const remove = async (id: string) => {
    if (!confirm("למחוק את חוות הדעת ?")) return;
    const { error } = await supabase
      .from("testimonials" as any)
      .delete()
      .eq("id", id);
    if (error) return toast.error("שגיאה במחיקה");
    setItems((prev) => prev.filter((t) => t.id !== id));
    toast.success("נמחק");
  };

  const setPhoto = async (id: string) => {
    const url = photoInputs[id]?.trim();
    if (!url) return;
    const { error } = await supabase
      .from("testimonials" as any)
      .update({ photo_url: url })
      .eq("id", id);
    if (error) return toast.error("שגיאה");
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, photo_url: url } : t)));
    setPhotoInputs((prev) => ({ ...prev, [id]: "" }));
    toast.success("תמונה עודכנה");
  };

  const pending = items.filter((t) => !t.approved);
  const approved = items.filter((t) => t.approved);

  return (
    <div className="min-h-screen bg-navy-dark py-8 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white font-heebo mb-8">
          ניהול חוות דעת
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          </div>
        ) : (
          <>
            {/* Pending */}
            <div className="mb-12">
              <h2 className="text-lg font-semibold text-yellow-400 font-heebo mb-4">
                ממתינות לאישור ({pending.length})
              </h2>
              {pending.length === 0 ? (
                <p className="text-gray-500 font-heebo">אין חוות דעת ממתינות</p>
              ) : (
                <div className="space-y-4">
                  {pending.map((t) => (
                    <div
                      key={t.id}
                      className="bg-navy-light p-6 rounded-xl border border-yellow-600/30"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <span className="text-white font-semibold font-heebo">
                            {t.name}
                          </span>
                          {t.role && (
                            <span className="text-gray-400 text-sm mr-2">
                              - {t.role}
                            </span>
                          )}
                          <div className="flex gap-1 mt-1" dir="ltr">
                            {Array.from({ length: t.rating }, (_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            t.allow_publish_name
                              ? "border-green-600 text-green-400"
                              : "border-gray-600 text-gray-400"
                          }
                        >
                          {t.allow_publish_name ? "מאשר שם + תמונה" : "לא מאשר פרסום שם"}
                        </Badge>
                      </div>
                      <p className="text-gray-300 font-heebo text-sm mb-4">
                        {t.text}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          size="sm"
                          onClick={() => approve(t.id)}
                          className="bg-green-700 hover:bg-green-600 gap-1"
                        >
                          <Check className="w-4 h-4" />
                          אשר
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => remove(t.id)}
                          className="gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          מחק
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Approved */}
            <div>
              <h2 className="text-lg font-semibold text-green-400 font-heebo mb-4">
                מאושרות ומפורסמות ({approved.length})
              </h2>
              {approved.length === 0 ? (
                <p className="text-gray-500 font-heebo">אין חוות דעת מאושרות</p>
              ) : (
                <div className="space-y-4">
                  {approved.map((t) => (
                    <div
                      key={t.id}
                      className="bg-navy-light p-6 rounded-xl border border-green-700/30"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          {t.photo_url ? (
                            <img
                              src={t.photo_url}
                              alt={t.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-purple-700/20 flex items-center justify-center">
                              <span className="text-purple-400 font-bold">
                                {t.name[0]}
                              </span>
                            </div>
                          )}
                          <div>
                            <span className="text-white font-semibold font-heebo">
                              {t.name}
                            </span>
                            {t.role && (
                              <span className="text-gray-400 text-sm mr-2">
                                - {t.role}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => unapprove(t.id)}
                            className="border-yellow-600/40 text-yellow-400 hover:bg-yellow-700/10 gap-1"
                          >
                            <X className="w-3 h-3" />
                            הסר
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => remove(t.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-300 font-heebo text-sm mb-4">
                        {t.text}
                      </p>

                      {/* Photo URL input */}
                      {t.allow_publish_name && (
                        <div className="flex gap-2 items-center">
                          <Image className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <Input
                            placeholder="הדבק URL תמונה"
                            value={photoInputs[t.id] || ""}
                            onChange={(e) =>
                              setPhotoInputs((p) => ({
                                ...p,
                                [t.id]: e.target.value,
                              }))
                            }
                            className="bg-navy-dark border-purple-700/20 text-white text-sm h-8 placeholder:text-gray-600"
                          />
                          <Button
                            size="sm"
                            onClick={() => setPhoto(t.id)}
                            disabled={!photoInputs[t.id]?.trim()}
                            className="h-8 bg-purple-700 hover:bg-purple-600"
                          >
                            שמור
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminTestimonials;
