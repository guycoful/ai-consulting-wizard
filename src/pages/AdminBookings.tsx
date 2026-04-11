import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import { format } from "date-fns";
import { he } from "date-fns/locale/he";
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
} from "lucide-react";

const TOKEN_KEY = "booking_admin_token";

type Booking = {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
};

const formatHebrewDate = (dateStr: string) => {
  try {
    const date = new Date(dateStr + "T00:00:00");
    return format(date, "EEEE, d בMMMM yyyy", { locale: he });
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
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setBookings([]);
  }, []);

  const fetchBookings = useCallback(
    async (authToken: string) => {
      setLoadingBookings(true);
      try {
        const res = await fetch("/api/bookings", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (res.status === 401) {
          logout();
          toast.error("הסשן פג תוקף, התחבר מחדש");
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data.bookings || data);
      } catch {
        toast.error("שגיאה בטעינת הפגישות");
      } finally {
        setLoadingBookings(false);
      }
    },
    [logout]
  );

  useEffect(() => {
    if (token) {
      fetchBookings(token);
    }
  }, [token, fetchBookings]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoginLoading(true);
    setLoginError(false);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      if (!res.ok) {
        setLoginError(true);
        setPassword("");
        return;
      }

      const data = await res.json();
      const newToken = data.token;
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

  const handleCancel = async () => {
    if (!cancelTarget || !token) return;

    setCancelling(true);
    try {
      const res = await fetch("/api/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: cancelTarget.id }),
      });

      if (res.status === 401) {
        logout();
        toast.error("הסשן פג תוקף, התחבר מחדש");
        return;
      }

      if (!res.ok) throw new Error("Failed to cancel booking");

      setBookings((prev) => prev.filter((b) => b.id !== cancelTarget.id));
      toast.success(
        `הפגישה עם ${cancelTarget.name} בוטלה בהצלחה`
      );
      setCancelTarget(null);
    } catch {
      toast.error("שגיאה בביטול הפגישה");
    } finally {
      setCancelling(false);
    }
  };

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
      <div className="max-w-3xl mx-auto">
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
