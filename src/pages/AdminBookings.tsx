import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { format, addMonths, startOfDay } from "date-fns";
import { he } from "date-fns/locale/he";
import { supabase } from "@/integrations/supabase/client";
import {
  Lock,
  LogOut,
  Loader2,
  CalendarDays,
  Clock,
  User,
  Mail,
  Trash2,
  CalendarX,
  Plus,
  Zap,
  Ban,
  CheckCircle,
} from "lucide-react";

const TOKEN_KEY = "booking_admin_token";

type SlotRow = {
  id: string;
  slot_date: string;
  slot_time: string;
  status: string;
  booked_name: string | null;
  booked_email: string | null;
  booked_at: string | null;
};

type Booking = {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
};

// Guy's default schedule
const DEFAULT_SCHEDULE: Record<number, string[]> = {
  0: ["19:00", "20:30"],        // Sunday
  1: ["18:00"],                  // Monday
  2: ["19:00", "20:30"],        // Tuesday
  3: ["18:00"],                  // Wednesday
  4: ["19:00", "20:30"],        // Thursday
  5: ["11:00"],                  // Friday
  // 6: Saturday - no slots
};

const formatHebrewDate = (dateStr: string) => {
  try {
    const date = new Date(dateStr + "T00:00:00");
    return format(date, "EEEE, d בMMMM yyyy", { locale: he });
  } catch {
    return dateStr;
  }
};

const formatShortDate = (dateStr: string) => {
  try {
    const date = new Date(dateStr + "T00:00:00");
    return format(date, "EEEE d/M", { locale: he });
  } catch {
    return dateStr;
  }
};

const AdminBookings = () => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  );
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Bookings tab state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState(false);

  // Slots tab state
  const [allSlots, setAllSlots] = useState<SlotRow[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Add custom slot state
  const [customDate, setCustomDate] = useState("");
  const [customTime, setCustomTime] = useState("");
  const [addingCustom, setAddingCustom] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setBookings([]);
    setAllSlots([]);
  }, []);

  // Fetch bookings from API (uses JWT auth)
  const fetchBookings = useCallback(
    async (_authToken: string) => {
      setLoadingBookings(true);
      try {
        const today = new Date().toISOString().split("T")[0];
        const { data, error } = await supabase
          .from("booking_slots")
          .select("*")
          .eq("status", "booked")
          .gte("slot_date", today)
          .order("slot_date")
          .order("slot_time");
        if (error) throw error;
        setBookings(
          (data || []).map((s: any) => ({
            id: s.id,
            name: s.booked_name || "",
            email: s.booked_email || "",
            date: s.slot_date,
            time: s.slot_time,
          }))
        );
      } catch {
        toast.error("שגיאה בטעינת הפגישות");
      } finally {
        setLoadingBookings(false);
      }
    },
    []
  );

  // Fetch all upcoming slots from Supabase directly
  const fetchSlots = useCallback(async () => {
    setLoadingSlots(true);
    try {
      const todayStr = format(startOfDay(new Date()), "yyyy-MM-dd");

      const { data, error } = await supabase
        .from("booking_slots" as any)
        .select("id, slot_date, slot_time, status, booked_name, booked_email, booked_at")
        .gte("slot_date", todayStr)
        .order("slot_date", { ascending: true })
        .order("slot_time", { ascending: true });

      if (error) {
        console.error("Error fetching slots:", error);
        toast.error("שגיאה בטעינת החלונות");
        return;
      }

      setAllSlots((data as unknown as SlotRow[]) || []);
    } catch {
      toast.error("שגיאה בטעינת החלונות");
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchBookings(token);
      fetchSlots();
    }
  }, [token, fetchBookings, fetchSlots]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoginLoading(true);
    setLoginError(false);
    try {
      // Simple password check - no API needed
      const ADMIN_PASS = "Guy@1994";
      if (password.trim() !== ADMIN_PASS) {
        setLoginError(true);
        setPassword("");
        return;
      }

      const newToken = btoa(JSON.stringify({ role: "admin", ts: Date.now() }));
      localStorage.setItem(TOKEN_KEY, newToken);
      setToken(newToken);
      setPassword("");
    } catch {
      setLoginError(true);
      setPassword("");
    } finally {
      setLoginLoading(false);
    }
  };

  // Cancel a booking - revert slot to available
  const handleCancel = async () => {
    if (!cancelTarget || !token) return;

    setCancelling(true);
    try {
      const { error } = await supabase
        .from("booking_slots")
        .update({
          status: "available",
          booked_name: null,
          booked_email: null,
          booked_at: null,
        })
        .eq("id", cancelTarget.id);

      if (error) throw error;

      setBookings((prev) => prev.filter((b) => b.id !== cancelTarget.id));
      toast.success(`הפגישה עם ${cancelTarget.name} בוטלה בהצלחה`);
      setCancelTarget(null);

      // Refresh slots to show the now-available slot
      fetchSlots();
    } catch {
      toast.error("שגיאה בביטול הפגישה");
    } finally {
      setCancelling(false);
    }
  };

  // Generate slots for the next 2 months based on Guy's default schedule
  const handleGenerateSlots = async () => {
    setGenerating(true);
    try {
      const today = startOfDay(new Date());
      const end = addMonths(today, 2);
      const slotsToInsert: Array<{ slot_date: string; slot_time: string; status: string }> = [];

      // Iterate through each day
      const current = new Date(today);
      while (current <= end) {
        const dayOfWeek = current.getDay();
        const times = DEFAULT_SCHEDULE[dayOfWeek];

        if (times) {
          const dateStr = format(current, "yyyy-MM-dd");
          for (const time of times) {
            slotsToInsert.push({
              slot_date: dateStr,
              slot_time: time,
              status: "available",
            });
          }
        }

        current.setDate(current.getDate() + 1);
      }

      if (slotsToInsert.length === 0) {
        toast.error("לא נמצאו חלונות ליצירה");
        setGenerating(false);
        return;
      }

      // Use upsert with onConflict to skip existing slots
      const { error, data } = await supabase
        .from("booking_slots" as any)
        .upsert(slotsToInsert, {
          onConflict: "slot_date,slot_time",
          ignoreDuplicates: true,
        })
        .select();

      if (error) {
        console.error("Error generating slots:", error);
        toast.error("שגיאה ביצירת חלונות: " + error.message);
        return;
      }

      const createdCount = data ? (data as any[]).length : 0;
      toast.success(`נוצרו ${createdCount} חלונות חדשים (${slotsToInsert.length} סהכ לוח זמנים)`);

      // Refresh slots list
      fetchSlots();
    } catch (err: any) {
      toast.error("שגיאה ביצירת חלונות: " + (err.message || "שגיאה לא צפויה"));
    } finally {
      setGenerating(false);
    }
  };

  // Toggle slot status: available <-> blocked
  const handleToggleSlot = async (slot: SlotRow) => {
    if (slot.status === "booked") return; // Can't toggle booked slots - use cancel instead

    const newStatus = slot.status === "available" ? "blocked" : "available";

    try {
      const { error } = await supabase
        .from("booking_slots" as any)
        .update({ status: newStatus })
        .eq("id", slot.id);

      if (error) {
        console.error("Error toggling slot:", error);
        toast.error("שגיאה בעדכון החלון");
        return;
      }

      // Update local state
      setAllSlots((prev) =>
        prev.map((s) => (s.id === slot.id ? { ...s, status: newStatus } : s))
      );

      toast.success(
        newStatus === "blocked" ? "החלון נחסם" : "החלון שוחרר"
      );
    } catch {
      toast.error("שגיאה בעדכון החלון");
    }
  };

  // Add a custom slot
  const handleAddCustomSlot = async () => {
    if (!customDate || !customTime) {
      toast.error("נא למלא תאריך ושעה");
      return;
    }

    setAddingCustom(true);
    try {
      const { error } = await supabase
        .from("booking_slots" as any)
        .insert({
          slot_date: customDate,
          slot_time: customTime,
          status: "available",
        });

      if (error) {
        if (error.code === "23505") {
          toast.error("חלון זה כבר קיים");
        } else {
          console.error("Error adding custom slot:", error);
          toast.error("שגיאה בהוספת חלון: " + error.message);
        }
        return;
      }

      toast.success(`חלון חדש נוסף: ${customDate} ${customTime}`);
      setCustomDate("");
      setCustomTime("");

      // Refresh slots
      fetchSlots();
    } catch {
      toast.error("שגיאה בהוספת חלון");
    } finally {
      setAddingCustom(false);
    }
  };

  // Group slots by date for display
  const slotsByDate = allSlots.reduce<Record<string, SlotRow[]>>((acc, slot) => {
    if (!acc[slot.slot_date]) {
      acc[slot.slot_date] = [];
    }
    acc[slot.slot_date].push(slot);
    return acc;
  }, {});

  const sortedDates = Object.keys(slotsByDate).sort();

  // Login Screen
  if (!token) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-navy-dark flex items-center justify-center px-4"
      >
        <Card className="bg-navy-light border border-purple-700/20 rounded-xl max-w-sm w-full">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-14 h-14 rounded-full bg-purple-700/20 flex items-center justify-center mb-4">
              <Lock className="w-7 h-7 text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">ניהול פגישות</h1>
            <p className="text-gray-300 text-sm mt-1">
              הכנס סיסמה כדי לגשת לממשק הניהול
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-password" className="text-gray-100">
                  סיסמה
                </Label>
                <Input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError(false);
                  }}
                  placeholder="הכנס סיסמה"
                  className={cn(
                    "bg-navy-dark border-purple-700/30 text-gray-100 placeholder:text-gray-500 focus:border-blue-primary focus:ring-blue-primary/30",
                    loginError && "animate-[shake_0.5s_ease-in-out] border-red-500"
                  )}
                />
                {loginError && (
                  <p className="text-red-400 text-sm">סיסמה שגויה, נסה שוב</p>
                )}
              </div>
              <Button
                type="submit"
                disabled={loginLoading || !password.trim()}
                className="bg-blue-primary hover:bg-blue-primary/90 text-white w-full h-11"
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                    מתחבר...
                  </>
                ) : (
                  "כניסה"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div dir="rtl" className="min-h-screen bg-navy-dark px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-700/20 flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">ניהול פגישות</h1>
          </div>
          <Button
            variant="ghost"
            onClick={logout}
            className="text-gray-400 hover:text-white hover:bg-navy-light"
          >
            <LogOut className="w-4 h-4 ml-2" />
            התנתק
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="slots" className="w-full">
          <TabsList className="bg-navy-light border border-purple-700/20 w-full mb-6">
            <TabsTrigger
              value="slots"
              className="flex-1 data-[state=active]:bg-blue-primary data-[state=active]:text-white text-gray-300"
            >
              <CalendarDays className="w-4 h-4 ml-2" />
              ניהול חלונות
            </TabsTrigger>
            <TabsTrigger
              value="bookings"
              className="flex-1 data-[state=active]:bg-blue-primary data-[state=active]:text-white text-gray-300"
            >
              <User className="w-4 h-4 ml-2" />
              פגישות
              {bookings.length > 0 && (
                <Badge className="mr-2 bg-blue-primary/30 text-blue-primary border-blue-primary/30 text-xs">
                  {bookings.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Slot Management */}
          <TabsContent value="slots">
            <div className="space-y-6">
              {/* Generate Slots Section */}
              <Card className="bg-navy-light border border-purple-700/20 rounded-xl">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-white font-medium text-lg mb-1">יצירת חלונות אוטומטית</h3>
                      <p className="text-gray-400 text-sm">
                        יצור חלונות לפי לוח הזמנים הקבוע לחודשיים הקרובים
                      </p>
                    </div>
                    <Button
                      onClick={handleGenerateSlots}
                      disabled={generating}
                      className="bg-blue-primary hover:bg-blue-primary/90 text-white whitespace-nowrap"
                    >
                      {generating ? (
                        <>
                          <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                          יוצר...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 ml-2" />
                          צור חלונות לחודשיים הקרובים
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Add Custom Slot */}
              <Card className="bg-navy-light border border-purple-700/20 rounded-xl">
                <CardContent className="p-5">
                  <h3 className="text-white font-medium text-lg mb-3">הוסף חלון ידני</h3>
                  <div className="flex flex-col sm:flex-row gap-3 items-end">
                    <div className="space-y-1 flex-1">
                      <Label className="text-gray-300 text-sm">תאריך</Label>
                      <Input
                        type="date"
                        value={customDate}
                        onChange={(e) => setCustomDate(e.target.value)}
                        className="bg-navy-dark border-purple-700/30 text-gray-100 focus:border-blue-primary focus:ring-blue-primary/30"
                        dir="ltr"
                      />
                    </div>
                    <div className="space-y-1 flex-1">
                      <Label className="text-gray-300 text-sm">שעה</Label>
                      <Input
                        type="time"
                        value={customTime}
                        onChange={(e) => setCustomTime(e.target.value)}
                        className="bg-navy-dark border-purple-700/30 text-gray-100 focus:border-blue-primary focus:ring-blue-primary/30"
                        dir="ltr"
                      />
                    </div>
                    <Button
                      onClick={handleAddCustomSlot}
                      disabled={addingCustom || !customDate || !customTime}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {addingCustom ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Plus className="w-4 h-4 ml-1" />
                          הוסף חלון
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Slots List */}
              {loadingSlots ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <Loader2 className="w-8 h-8 text-blue-primary animate-spin" />
                  <p className="text-gray-300">טוען חלונות...</p>
                </div>
              ) : sortedDates.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="w-16 h-16 rounded-full bg-navy-light flex items-center justify-center">
                    <CalendarX className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="text-gray-400 text-lg">אין חלונות. לחץ "צור חלונות" כדי להתחיל.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-purple-700/20 text-purple-300 border-purple-700/30">
                      {allSlots.length} חלונות סהכ
                    </Badge>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-green-400">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                        פנוי
                      </span>
                      <span className="flex items-center gap-1 text-blue-400">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                        תפוס
                      </span>
                      <span className="flex items-center gap-1 text-red-400">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                        חסום
                      </span>
                    </div>
                  </div>

                  {sortedDates.map((dateStr) => {
                    const daySlots = slotsByDate[dateStr];
                    return (
                      <Card
                        key={dateStr}
                        className="bg-navy-light border border-purple-700/20 rounded-xl"
                      >
                        <CardContent className="p-4">
                          <h4 className="text-white font-medium mb-3">
                            {formatShortDate(dateStr)}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {daySlots.map((slot) => {
                              const timeDisplay = slot.slot_time.substring(0, 5);
                              const isAvailable = slot.status === "available";
                              const isBooked = slot.status === "booked";
                              const isBlocked = slot.status === "blocked";

                              return (
                                <button
                                  key={slot.id}
                                  onClick={() => handleToggleSlot(slot)}
                                  disabled={isBooked}
                                  title={
                                    isBooked
                                      ? `תפוס: ${slot.booked_name}`
                                      : isBlocked
                                      ? "לחץ לשחרר"
                                      : "לחץ לחסום"
                                  }
                                  className={cn(
                                    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 border",
                                    isAvailable &&
                                      "bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20 cursor-pointer",
                                    isBooked &&
                                      "bg-blue-500/10 text-blue-300 border-blue-500/30 cursor-default",
                                    isBlocked &&
                                      "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20 cursor-pointer"
                                  )}
                                >
                                  {isAvailable && <CheckCircle className="w-3.5 h-3.5" />}
                                  {isBooked && <User className="w-3.5 h-3.5" />}
                                  {isBlocked && <Ban className="w-3.5 h-3.5" />}
                                  {timeDisplay}
                                  {isBooked && slot.booked_name && (
                                    <span className="text-xs text-blue-400/70 mr-1">
                                      ({slot.booked_name})
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Tab 2: Bookings */}
          <TabsContent value="bookings">
            {/* Loading state */}
            {loadingBookings && (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="w-8 h-8 text-blue-primary animate-spin" />
                <p className="text-gray-300">טוען פגישות...</p>
              </div>
            )}

            {/* Empty state */}
            {!loadingBookings && bookings.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-16 h-16 rounded-full bg-navy-light flex items-center justify-center">
                  <CalendarX className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-gray-400 text-lg">אין פגישות קרובות</p>
              </div>
            )}

            {/* Bookings list */}
            {!loadingBookings && bookings.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-blue-primary/20 text-blue-primary border-blue-primary/30">
                    {bookings.length} פגישות קרובות
                  </Badge>
                </div>

                {bookings.map((booking) => (
                  <Card
                    key={booking.id}
                    className="bg-navy-light border border-purple-700/20 rounded-xl hover:border-purple-700/40 transition-colors"
                  >
                    <CardContent className="p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-white font-medium text-lg">
                            <User className="w-5 h-5 text-purple-400" />
                            {booking.name}
                          </div>
                          <div className="flex items-center gap-2 text-gray-300 text-sm">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span dir="ltr">{booking.email}</span>
                          </div>
                          <div className="flex items-center gap-4 text-gray-100">
                            <span className="flex items-center gap-1.5">
                              <CalendarDays className="w-4 h-4 text-purple-400" />
                              {formatHebrewDate(booking.date)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-purple-400" />
                              {booking.time}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => setCancelTarget(booking)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 self-start sm:self-center"
                        >
                          <Trash2 className="w-4 h-4 ml-1" />
                          בטל
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={cancelTarget !== null}
        onOpenChange={(open) => {
          if (!open) setCancelTarget(null);
        }}
      >
        <DialogContent className="bg-navy-light border border-purple-700/20 text-white sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-white text-right">
              ביטול פגישה
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-right">
              {cancelTarget && (
                <>
                  האם לבטל את הפגישה עם{" "}
                  <span className="font-medium text-white">
                    {cancelTarget.name}
                  </span>{" "}
                  ב-{formatHebrewDate(cancelTarget.date)} בשעה{" "}
                  {cancelTarget.time}?
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:flex-row-reverse sm:justify-start">
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={cancelling}
              className="bg-red-600 hover:bg-red-700"
            >
              {cancelling ? (
                <>
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                  מבטל...
                </>
              ) : (
                "כן, בטל פגישה"
              )}
            </Button>
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-navy-dark/50"
              >
                חזרה
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBookings;
