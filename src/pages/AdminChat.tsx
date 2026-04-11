import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import {
  Lock,
  LogOut,
  Loader2,
  MessageCircle,
  Send,
  X,
  CheckCircle,
  AlertCircle,
  User,
} from "lucide-react";

const TOKEN_KEY = "chat_admin_token";

type Conversation = {
  id: string;
  visitor_name: string | null;
  status: "active" | "human_needed" | "closed";
  created_at: string;
  updated_at: string;
  last_message?: string;
};

type Message = {
  id: string;
  conversation_id: string;
  role: "visitor" | "ai" | "admin";
  content: string;
  created_at: string;
};

const formatTime = (iso: string) => {
  try {
    const date = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 1) return "עכשיו";
    if (minutes < 60) return `לפני ${minutes} דק'`;
    if (hours < 24) return `לפני ${hours} שע'`;

    return date.toLocaleDateString("he-IL", {
      day: "numeric",
      month: "short",
    });
  } catch {
    return "";
  }
};

const formatMessageTime = (iso: string) => {
  try {
    return new Date(iso).toLocaleTimeString("he-IL", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
};

const statusConfig = {
  active: {
    label: "פעיל",
    color: "bg-green-500/20 text-green-400 border-green-500/30",
    dot: "bg-green-500",
  },
  human_needed: {
    label: "דורש מענה",
    color: "bg-red-500/20 text-red-400 border-red-500/30",
    dot: "bg-red-500",
  },
  closed: {
    label: "סגור",
    color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    dot: "bg-gray-500",
  },
};

const roleBadge = {
  ai: { label: "AI", className: "bg-purple-600/20 text-purple-300 border-purple-600/30" },
  visitor: { label: "לקוח", className: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  admin: { label: "גיא", className: "bg-green-500/20 text-green-300 border-green-500/30" },
};

const AdminChat = () => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  );
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setConversations([]);
    setMessages([]);
    setSelectedId(null);
  }, []);

  // Auto-scroll messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when conversation selected
  useEffect(() => {
    if (selectedId && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [selectedId]);

  // Fetch conversations
  const fetchConversations = useCallback(async () => {
    setLoadingConversations(true);
    try {
      const { data: convData, error: convError } = await supabase
        .from("chat_conversations" as any)
        .select("*")
        .order("updated_at", { ascending: false });

      if (convError) throw convError;

      const convs = (convData as any[]) || [];

      // For each conversation, fetch the last message
      const convsWithLastMsg: Conversation[] = await Promise.all(
        convs.map(async (c: any) => {
          const { data: msgData } = await supabase
            .from("chat_messages" as any)
            .select("content")
            .eq("conversation_id", c.id)
            .order("created_at", { ascending: false })
            .limit(1);

          return {
            id: c.id,
            visitor_name: c.visitor_name,
            status: c.status as Conversation["status"],
            created_at: c.created_at,
            updated_at: c.updated_at,
            last_message:
              msgData && (msgData as any[]).length > 0
                ? (msgData as any[])[0].content
                : undefined,
          };
        })
      );

      setConversations(convsWithLastMsg);
    } catch {
      toast.error("שגיאה בטעינת שיחות");
    } finally {
      setLoadingConversations(false);
    }
  }, []);

  // Fetch messages for selected conversation
  const fetchMessages = useCallback(async (convId: string) => {
    setLoadingMessages(true);
    try {
      const { data, error } = await supabase
        .from("chat_messages" as any)
        .select("*")
        .eq("conversation_id", convId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      setMessages(
        ((data as any[]) || []).map((m: any) => ({
          id: m.id,
          conversation_id: m.conversation_id,
          role: m.role as Message["role"],
          content: m.content,
          created_at: m.created_at,
        }))
      );
    } catch {
      toast.error("שגיאה בטעינת הודעות");
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  // Load conversations on login
  useEffect(() => {
    if (token) {
      fetchConversations();
    }
  }, [token, fetchConversations]);

  // Load messages when conversation selected
  useEffect(() => {
    if (selectedId) {
      fetchMessages(selectedId);
    } else {
      setMessages([]);
    }
  }, [selectedId, fetchMessages]);

  // Poll for new messages every 5 seconds
  useEffect(() => {
    if (!token) return;

    const poll = setInterval(() => {
      fetchConversations();
      if (selectedId) {
        fetchMessages(selectedId);
      }
    }, 5000);

    return () => clearInterval(poll);
  }, [token, selectedId, fetchConversations, fetchMessages]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoginLoading(true);
    setLoginError(false);
    try {
      const ADMIN_PASS = "Guy@1994";
      if (password.trim() !== ADMIN_PASS) {
        setLoginError(true);
        setPassword("");
        return;
      }

      const newToken = btoa(JSON.stringify({ role: "chat_admin", ts: Date.now() }));
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

  // Send admin reply
  const handleSendReply = async () => {
    const text = replyText.trim();
    if (!text || !selectedId || sendingReply) return;

    setSendingReply(true);
    setReplyText("");

    try {
      const { error } = await supabase.from("chat_messages" as any).insert({
        conversation_id: selectedId,
        role: "admin",
        content: text,
      });

      if (error) throw error;

      // Update conversation updated_at
      await supabase
        .from("chat_conversations" as any)
        .update({ updated_at: new Date().toISOString() })
        .eq("id", selectedId);

      // Refresh messages and conversations
      fetchMessages(selectedId);
      fetchConversations();
    } catch {
      toast.error("שגיאה בשליחת הודעה");
      setReplyText(text); // Restore text on error
    } finally {
      setSendingReply(false);
    }
  };

  const handleReplyKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendReply();
    }
  };

  // Close conversation
  const handleCloseConversation = async (convId: string) => {
    try {
      const { error } = await supabase
        .from("chat_conversations" as any)
        .update({ status: "closed", updated_at: new Date().toISOString() })
        .eq("id", convId);

      if (error) throw error;

      toast.success("השיחה נסגרה");
      fetchConversations();
    } catch {
      toast.error("שגיאה בסגירת שיחה");
    }
  };

  // Mark as handled (human_needed -> active)
  const handleMarkHandled = async (convId: string) => {
    try {
      const { error } = await supabase
        .from("chat_conversations" as any)
        .update({ status: "active", updated_at: new Date().toISOString() })
        .eq("id", convId);

      if (error) throw error;

      toast.success("השיחה סומנה כטופלה");
      fetchConversations();
    } catch {
      toast.error("שגיאה בעדכון שיחה");
    }
  };

  const selectedConversation = conversations.find((c) => c.id === selectedId);

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
            <h1 className="text-2xl font-bold text-white font-heebo">ניהול צ'אט</h1>
            <p className="text-gray-300 text-sm mt-1 font-heebo">
              הכנס סיסמה כדי לגשת לממשק הניהול
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chat-admin-password" className="text-gray-100">
                  סיסמה
                </Label>
                <Input
                  id="chat-admin-password"
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
                    loginError &&
                      "animate-[shake_0.5s_ease-in-out] border-red-500"
                  )}
                />
                {loginError && (
                  <p className="text-red-400 text-sm font-heebo">
                    סיסמה שגויה, נסה שוב
                  </p>
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

  // Dashboard
  return (
    <div dir="rtl" className="min-h-screen bg-navy-dark">
      {/* Header */}
      <div className="bg-navy-light border-b border-purple-700/20 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-700/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-purple-400" />
            </div>
            <h1 className="text-xl font-bold text-white font-heebo">ניהול צ'אט</h1>
            <Badge className="bg-purple-700/20 text-purple-300 border-purple-700/30">
              {conversations.filter((c) => c.status !== "closed").length} פעילות
            </Badge>
          </div>
          <Button
            variant="ghost"
            onClick={logout}
            className="text-gray-400 hover:text-white hover:bg-navy-dark"
          >
            <LogOut className="w-4 h-4 ml-2" />
            התנתק
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row h-[calc(100vh-65px)]">
        {/* Sidebar - conversation list */}
        <div
          className={cn(
            "lg:w-80 xl:w-96 border-l border-purple-700/20 overflow-y-auto bg-navy-dark",
            selectedId ? "hidden lg:block" : "block"
          )}
        >
          {loadingConversations && conversations.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 text-blue-primary animate-spin" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 px-4">
              <MessageCircle className="w-10 h-10 text-gray-600" />
              <p className="text-gray-400 font-heebo text-center">
                אין שיחות עדיין
              </p>
            </div>
          ) : (
            <div className="divide-y divide-purple-700/10">
              {conversations.map((conv) => {
                const status = statusConfig[conv.status];
                const isSelected = conv.id === selectedId;

                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedId(conv.id)}
                    className={cn(
                      "w-full text-right px-4 py-3 hover:bg-navy-light/50 transition-colors",
                      isSelected && "bg-navy-light"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={cn(
                            "w-2.5 h-2.5 rounded-full shrink-0",
                            status.dot
                          )}
                        />
                        <span className="text-white font-medium text-sm truncate font-heebo">
                          {conv.visitor_name || "אנונימי"}
                        </span>
                      </div>
                      <span className="text-gray-500 text-xs shrink-0">
                        {formatTime(conv.updated_at)}
                      </span>
                    </div>
                    {conv.last_message && (
                      <p className="text-gray-400 text-xs mt-1 truncate pr-5 font-heebo">
                        {conv.last_message}
                      </p>
                    )}
                    <Badge
                      className={cn(
                        "mt-1.5 text-[10px] px-1.5 py-0 h-5 border",
                        status.color
                      )}
                    >
                      {status.label}
                    </Badge>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Main area - messages */}
        <div className="flex-1 flex flex-col min-w-0">
          {!selectedId ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-400 font-heebo text-lg">
                  בחר שיחה מהרשימה
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Conversation header */}
              <div className="bg-navy-light/50 border-b border-purple-700/20 px-4 py-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  {/* Back button on mobile */}
                  <button
                    onClick={() => setSelectedId(null)}
                    className="lg:hidden text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <User className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-medium font-heebo">
                    {selectedConversation?.visitor_name || "אנונימי"}
                  </span>
                  {selectedConversation && (
                    <Badge
                      className={cn(
                        "text-xs border",
                        statusConfig[selectedConversation.status].color
                      )}
                    >
                      {statusConfig[selectedConversation.status].label}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {selectedConversation?.status === "human_needed" && (
                    <Button
                      size="sm"
                      onClick={() => handleMarkHandled(selectedId)}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs h-8"
                    >
                      <CheckCircle className="w-3.5 h-3.5 ml-1" />
                      טופל
                    </Button>
                  )}
                  {selectedConversation?.status !== "closed" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCloseConversation(selectedId)}
                      className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 text-xs h-8"
                    >
                      <AlertCircle className="w-3.5 h-3.5 ml-1" />
                      סגור שיחה
                    </Button>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
              >
                {loadingMessages ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-6 h-6 text-blue-primary animate-spin" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex items-center justify-center py-20">
                    <p className="text-gray-500 font-heebo">אין הודעות</p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const badge = roleBadge[msg.role];
                    const isVisitor = msg.role === "visitor";

                    return (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex",
                          isVisitor ? "justify-start" : "justify-end"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[75%] rounded-xl px-3 py-2",
                            isVisitor && "bg-blue-primary/20 border border-blue-500/20",
                            msg.role === "ai" && "bg-navy-light border border-purple-700/20",
                            msg.role === "admin" && "bg-green-700/20 border border-green-600/20"
                          )}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              className={cn(
                                "text-[10px] px-1.5 py-0 h-4 border",
                                badge.className
                              )}
                            >
                              {badge.label}
                            </Badge>
                            <span className="text-gray-500 text-[10px]">
                              {formatMessageTime(msg.created_at)}
                            </span>
                          </div>
                          <p className="text-gray-100 text-sm whitespace-pre-wrap leading-relaxed font-heebo">
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Reply input */}
              {selectedConversation?.status !== "closed" && (
                <div className="border-t border-purple-700/20 px-4 py-3 flex items-center gap-2 shrink-0 bg-navy-dark">
                  <Input
                    ref={inputRef}
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={handleReplyKeyDown}
                    placeholder="כתוב תשובה..."
                    disabled={sendingReply}
                    className="flex-1 bg-navy-light/50 border-purple-700/20 text-gray-100 placeholder:text-gray-500 focus:border-blue-primary focus:ring-blue-primary/30 font-heebo"
                  />
                  <Button
                    onClick={handleSendReply}
                    disabled={!replyText.trim() || sendingReply}
                    className="bg-blue-primary hover:bg-blue-primary/90 text-white h-10 w-10 p-0 shrink-0"
                  >
                    {sendingReply ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 rotate-180" />
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
