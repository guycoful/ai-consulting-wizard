import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { format, addMonths, isBefore, startOfDay, isAfter } from "date-fns";
import { he } from "date-fns/locale/he";
import { supabase } from "@/integrations/supabase/client";
import {
  CalendarDays,
  Clock,
  User,
  ChevronRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";

type Slot = {
  time: string;
  available: boolean;
};

const STEP_LABELS = ["בחירת תאריך", "בחירת שעה", "אישור פגישה"];

const formatHebrewDate = (date: Date) =>
  format(date, "EEEE, d בMMMM yyyy", { locale: he });

const BookingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Dates that have available slots (for enabling in the calendar)
  const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());
  const [loadingDates, setLoadingDates] = useState(true);

  const today = startOfDay(new Date());
  const maxDate = addMonths(today, 2);

  // On mount, fetch all dates that have available slots in the next 2 months
  useEffect(() => {
    const fetchAvailableDates = async () => {
      setLoadingDates(true);
      try {
        const todayStr = format(today, "yyyy-MM-dd");
        const maxStr = format(maxDate, "yyyy-MM-dd");

        const { data, error } = await supabase
          .from("booking_slots" as any)
          .select("slot_date")
          .eq("status", "available")
          .gte("slot_date", todayStr)
          .lte("slot_date", maxStr);

        if (error) {
          console.error("Error fetching available dates:", error);
          return;
        }

        const dates = new Set<string>();
        if (data) {
          (data as unknown as Array<{ slot_date: string }>).forEach((row) => {
            dates.add(row.slot_date);
          });
        }
        setAvailableDates(dates);
      } catch (err) {
        console.error("Error fetching available dates:", err);
      } finally {
        setLoadingDates(false);
      }
    };

    fetchAvailableDates();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Disable dates that have no available slots, past dates, or dates beyond 2 months
  const disabledDays = useCallback(
    (date: Date) => {
      if (isBefore(date, today)) return true;
      if (isAfter(date, maxDate)) return true;
      const dateStr = format(date, "yyyy-MM-dd");
      return !availableDates.has(dateStr);
    },
    [today, maxDate, availableDates]
  );

  // Fetch slots when date is selected - query Supabase directly
  useEffect(() => {
    if (!selectedDate) return;

    const fetchSlots = async () => {
      setLoadingSlots(true);
      setSelectedTime(null);
      try {
        const dateStr = format(selectedDate, "yyyy-MM-dd");

        const { data, error } = await supabase
          .from("booking_slots" as any)
          .select("slot_time, status")
          .eq("slot_date", dateStr)
          .order("slot_time", { ascending: true });

        if (error) {
          console.error("Error fetching slots:", error);
          toast.error("שגיאה בטעינת השעות הפנויות");
          setSlots([]);
          return;
        }

        if (data) {
          const mapped = (data as unknown as Array<{ slot_time: string; status: string }>).map((row) => ({
            time: row.slot_time.substring(0, 5), // "18:00:00" -> "18:00"
            available: row.status === "available",
          }));
          setSlots(mapped);
        } else {
          setSlots([]);
        }
      } catch {
        toast.error("שגיאה בטעינת השעות הפנויות");
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [selectedDate]);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    setStep(2);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !name.trim() || !email.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: format(selectedDate, "yyyy-MM-dd"),
          time: selectedTime,
          name: name.trim(),
          email: email.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || data.error || "שגיאה בקביעת הפגישה");
      }

      setConfirmed(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "שגיאה בקביעת הפגישה");
    } finally {
      setSubmitting(false);
    }
  };

  const goBack = () => {
    if (step === 3) {
      setSelectedTime(null);
      setStep(2);
    } else if (step === 2) {
      setSelectedDate(undefined);
      setSlots([]);
      setStep(1);
    }
  };

  // Confirmation screen
  if (confirmed && selectedDate) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-navy-dark flex items-center justify-center px-4 py-12"
      >
        <Card className="bg-navy-light border border-purple-700/20 rounded-xl max-w-md w-full">
          <CardContent className="p-8 text-center space-y-6">
            <div className="mx-auto w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center animate-[fade-in_0.6s_ease-out]">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">הפגישה נקבעה!</h2>
            <div className="space-y-2 text-gray-100">
              <p>
                נדבר בזום ב-{formatHebrewDate(selectedDate)} ב-{selectedTime}
              </p>
            </div>
            <Button
              onClick={() => navigate("/")}
              className="bg-blue-primary hover:bg-blue-primary/90 text-white w-full mt-4"
            >
              חזרה לאתר
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-navy-dark flex flex-col items-center px-4 py-12"
    >
      {/* Header */}
      <div className="text-center mb-8 space-y-2">
        <div className="mx-auto w-14 h-14 rounded-full bg-purple-700/20 flex items-center justify-center mb-4">
          <CalendarDays className="w-7 h-7 text-purple-400" />
        </div>
        <h1 className="text-3xl font-bold text-white">
          קביעת פגישה עם Guy Cohen
        </h1>
        <p className="text-gray-300 text-lg">
          {step === 1 && "בחר תאריך נוח"}
          {step === 2 && "בחר שעה מתאימה"}
          {step === 3 && "מלא פרטים ואשר"}
        </p>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center gap-3 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-3">
            <button
              onClick={() => {
                if (s < step) {
                  if (s === 1) {
                    setSelectedDate(undefined);
                    setSlots([]);
                    setSelectedTime(null);
                  }
                  if (s === 2) {
                    setSelectedTime(null);
                  }
                  setStep(s);
                }
              }}
              disabled={s > step}
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                s === step
                  ? "bg-blue-primary text-white scale-110"
                  : s < step
                  ? "bg-blue-primary/30 text-blue-primary cursor-pointer hover:bg-blue-primary/50"
                  : "bg-navy-light text-gray-500 border border-gray-600"
              )}
            >
              {s}
            </button>
            {s < 3 && (
              <div
                className={cn(
                  "w-8 h-0.5 transition-colors duration-300",
                  s < step ? "bg-blue-primary" : "bg-gray-600"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Labels (mobile-friendly) */}
      <p className="text-gray-400 text-sm mb-6">
        שלב {step} מתוך 3 - {STEP_LABELS[step - 1]}
      </p>

      {/* Content Area */}
      <Card className="bg-navy-light border border-purple-700/20 rounded-xl max-w-lg w-full">
        <CardContent className="p-6">
          {/* Step 1: Select Date */}
          {step === 1 && (
            <div className="flex flex-col items-center animate-[fade-in_0.4s_ease-out]">
              {loadingDates ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <Loader2 className="w-8 h-8 text-blue-primary animate-spin" />
                  <p className="text-gray-300 text-sm">טוען תאריכים פנויים...</p>
                </div>
              ) : (
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={disabledDays}
                  fromDate={today}
                  toDate={maxDate}
                  locale={he}
                  className="text-white"
                  classNames={{
                    months:
                      "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    month: "space-y-4",
                    caption:
                      "flex justify-center pt-1 relative items-center text-white",
                    caption_label: "text-sm font-medium text-white",
                    nav: "space-x-1 flex items-center",
                    nav_button:
                      "h-7 w-7 bg-transparent p-0 text-gray-300 hover:text-white hover:bg-navy-dark rounded-md inline-flex items-center justify-center",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell:
                      "text-gray-400 rounded-md w-9 font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                    day: "h-9 w-9 p-0 font-normal text-gray-100 hover:bg-blue-primary/30 rounded-md inline-flex items-center justify-center transition-colors",
                    day_selected:
                      "bg-blue-primary text-white hover:bg-blue-primary focus:bg-blue-primary",
                    day_today:
                      "border border-purple-500 text-purple-300",
                    day_outside: "text-gray-600 opacity-50",
                    day_disabled: "text-gray-600 opacity-30 cursor-not-allowed",
                    day_hidden: "invisible",
                  }}
                />
              )}
            </div>
          )}

          {/* Step 2: Select Time */}
          {step === 2 && (
            <div className="space-y-5 animate-[fade-in_0.4s_ease-out]">
              {/* Selected date display */}
              <div className="flex items-center gap-2 text-gray-100 bg-navy-dark/50 rounded-lg p-3">
                <CalendarDays className="w-5 h-5 text-purple-400" />
                <span>{selectedDate && formatHebrewDate(selectedDate)}</span>
              </div>

              {/* Loading state */}
              {loadingSlots && (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <Loader2 className="w-8 h-8 text-blue-primary animate-spin" />
                  <p className="text-gray-300 text-sm">טוען שעות פנויות...</p>
                </div>
              )}

              {/* Slots grid */}
              {!loadingSlots && slots.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {slots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant="ghost"
                      disabled={!slot.available}
                      onClick={() => handleTimeSelect(slot.time)}
                      className={cn(
                        "h-12 rounded-lg font-medium text-base transition-all duration-200",
                        slot.available && selectedTime !== slot.time
                          ? "bg-navy-dark text-gray-100 hover:bg-blue-primary hover:text-white border border-purple-700/20"
                          : "",
                        selectedTime === slot.time
                          ? "bg-blue-primary text-white border-blue-primary"
                          : "",
                        !slot.available
                          ? "bg-navy-dark/30 text-gray-600 opacity-30 cursor-not-allowed border border-transparent"
                          : ""
                      )}
                    >
                      <Clock className="w-4 h-4 ml-1" />
                      {slot.time}
                    </Button>
                  ))}
                </div>
              )}

              {/* No slots */}
              {!loadingSlots && slots.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400">
                    אין שעות פנויות בתאריך זה. נסה תאריך אחר.
                  </p>
                </div>
              )}

              {/* Back button */}
              <Button
                variant="ghost"
                onClick={goBack}
                className="text-gray-300 hover:text-white hover:bg-navy-dark/50"
              >
                <ChevronRight className="w-4 h-4 ml-1" />
                חזרה לבחירת תאריך
              </Button>
            </div>
          )}

          {/* Step 3: Confirm Booking */}
          {step === 3 && (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 animate-[fade-in_0.4s_ease-out]"
            >
              {/* Summary */}
              <div className="bg-navy-dark/50 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-100">
                  <CalendarDays className="w-5 h-5 text-purple-400" />
                  <span>{selectedDate && formatHebrewDate(selectedDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-100">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <span>{selectedTime}</span>
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="booking-name"
                  className="text-gray-100 flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-purple-400" />
                  שם מלא
                </Label>
                <Input
                  id="booking-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="הכנס את שמך"
                  className="bg-navy-dark border-purple-700/30 text-gray-100 placeholder:text-gray-500 focus:border-blue-primary focus:ring-blue-primary/30"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="booking-email"
                  className="text-gray-100 flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4 text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  אימייל
                </Label>
                <Input
                  id="booking-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  dir="ltr"
                  className="bg-navy-dark border-purple-700/30 text-gray-100 placeholder:text-gray-500 focus:border-blue-primary focus:ring-blue-primary/30 text-left"
                />
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={submitting || !name.trim() || !email.trim()}
                  className="bg-blue-primary hover:bg-blue-primary/90 text-white h-12 text-base font-medium rounded-lg w-full"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                      שולח...
                    </>
                  ) : (
                    "אשר פגישה"
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={goBack}
                  className="text-gray-300 hover:text-white hover:bg-navy-dark/50"
                >
                  <ChevronRight className="w-4 h-4 ml-1" />
                  חזרה לבחירת שעה
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingPage;
