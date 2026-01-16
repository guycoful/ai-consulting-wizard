export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      profiling_form_submissions: {
        Row: {
          created_at: string
          id: number
          אוטומציות_קיימות: string | null
          אזור_פעילות_גאוגרפי: string | null
          "איך_תדעו_שהתהליך_הצליח?_מהם_המדדים_": string | null
          "אילו_מחלקות_עיקריות_פועלות_אצלכם?": string[] | null
          אילו_משימות_היית_רוצה_לייעל_או_להו: string | null
          אילו_סוגי_כלים_מבוססי_AI_אתם_מכירים_: string[] | null
          אילו_תהליכים_כיום_מתבצעים_בצורה_לא: string | null
          "אם_יש_שימוש_–_ציין_שם,_תפקיד,_תחום_ע": string | null
          "באילו_מערכות_/_כלים_דיגיטליים_אתם_מ": string[] | null
          באילו_תחומים_נראה_לכם_שכדאי_להתחיל: string[] | null
          "האם_התקיימו_הכשרות_/_סדנאות_בתחום_ה": string[] | null
          "האם_יש_משהו_נוסף_שתרצו_לשתף,_לציין_": string | null
          "האם_יש_תקציב_ראשוני_לתהליך?": string[] | null
          האם_ראיתם_פתרונות_טכנולוגיים_או_תה: string | null
          הערות_נוספות: string | null
          זמן_וידאו_דקות: number | null
          זמן_מועדף_ליום_הפגישה: string[] | null
          זמן_מועדף_פגישה: string[] | null
          זמן_ניוזלטר_דקות: number | null
          זמן_פוסטים_דקות: number | null
          זמן_תגובה_ללידים: string | null
          טלפון: string | null
          כלי_אוטומציה: string[] | null
          כלים_ניהול_לידים: string[] | null
          כלים_שמירת_קשר: string[] | null
          לידים_אחר_חודשי: number | null
          לידים_אתר_חודשי: number | null
          לידים_הפניות_חודשי: number | null
          לידים_וואטסאפ_חודשי: number | null
          לידים_טלפון_חודשי: number | null
          לידים_פייסבוק_חודשי: number | null
          מדד_הצלחה_כמותי: string | null
          מה_הייתם_רוצים_להשיג_מהטמעת_AI_בארג: string[] | null
          מהם_האתגרים_המרכזיים_שאתם_מתמודדי: string | null
          "מהם_השירותים_/_המוצרים_המרכזיים_שא": string | null
          "מהם_קהלי_היעד_המרכזיים_שלכם?": string[] | null
          "מי_יוביל_את_התהליך_מטעמכם?_נא_לציין": string | null
          מייל: string | null
          מיקום_מאגר_לקוחות: string | null
          מספר_אנשי_קשר_במאגר: number | null
          "מספר_עובדים_(משוער)": number | null
          מערכת_רישום_לידים: string | null
          משימות_חוזרות: string[] | null
          מתי_נוח_לכם_להתחיל_את_התהליך: string | null
          סוגי_תוכן_מיוצרים: string[] | null
          סטטוס_תקציב: string | null
          סכום_תקציב: number | null
          סכום_תקציב_חודשי: number | null
          "עד_כמה_העובדים/המנהלים_בארגון_מכיר": string[] | null
          פגישות_שבועיות: number | null
          פילוח_מאגר_לקוחות: string[] | null
          פירוט_תהליך_עבודה_מרכזי: string | null
          פרטי_תקציב: string | null
          קריטריונים_סינון_לידים: string | null
          שם_בארגון: string | null
          שם_מלא: string | null
          "שנות פעילות": number | null
          שעות_מנהלה_שבועיות: number | null
          תאר_בקצרה_את_הפעילות_של_הארגון: string | null
          תאריך_התחלה: string | null
          תגובה_ראשונית_ללידים: string | null
          תהליך_הפקת_מסמכים: string | null
          תהליך_פנייה_מחודשת: string | null
          תהליך_תיאום_פגישות: string | null
          תוכנות_נוכחיות: string[] | null
          תזכורות_שבועיות: number | null
          תחום_פעילות: string | null
          תפקיד_בארגון: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          אוטומציות_קיימות?: string | null
          אזור_פעילות_גאוגרפי?: string | null
          "איך_תדעו_שהתהליך_הצליח?_מהם_המדדים_"?: string | null
          "אילו_מחלקות_עיקריות_פועלות_אצלכם?"?: string[] | null
          אילו_משימות_היית_רוצה_לייעל_או_להו?: string | null
          אילו_סוגי_כלים_מבוססי_AI_אתם_מכירים_?: string[] | null
          אילו_תהליכים_כיום_מתבצעים_בצורה_לא?: string | null
          "אם_יש_שימוש_–_ציין_שם,_תפקיד,_תחום_ע"?: string | null
          "באילו_מערכות_/_כלים_דיגיטליים_אתם_מ"?: string[] | null
          באילו_תחומים_נראה_לכם_שכדאי_להתחיל?: string[] | null
          "האם_התקיימו_הכשרות_/_סדנאות_בתחום_ה"?: string[] | null
          "האם_יש_משהו_נוסף_שתרצו_לשתף,_לציין_"?: string | null
          "האם_יש_תקציב_ראשוני_לתהליך?"?: string[] | null
          האם_ראיתם_פתרונות_טכנולוגיים_או_תה?: string | null
          הערות_נוספות?: string | null
          זמן_וידאו_דקות?: number | null
          זמן_מועדף_ליום_הפגישה?: string[] | null
          זמן_מועדף_פגישה?: string[] | null
          זמן_ניוזלטר_דקות?: number | null
          זמן_פוסטים_דקות?: number | null
          זמן_תגובה_ללידים?: string | null
          טלפון?: string | null
          כלי_אוטומציה?: string[] | null
          כלים_ניהול_לידים?: string[] | null
          כלים_שמירת_קשר?: string[] | null
          לידים_אחר_חודשי?: number | null
          לידים_אתר_חודשי?: number | null
          לידים_הפניות_חודשי?: number | null
          לידים_וואטסאפ_חודשי?: number | null
          לידים_טלפון_חודשי?: number | null
          לידים_פייסבוק_חודשי?: number | null
          מדד_הצלחה_כמותי?: string | null
          מה_הייתם_רוצים_להשיג_מהטמעת_AI_בארג?: string[] | null
          מהם_האתגרים_המרכזיים_שאתם_מתמודדי?: string | null
          "מהם_השירותים_/_המוצרים_המרכזיים_שא"?: string | null
          "מהם_קהלי_היעד_המרכזיים_שלכם?"?: string[] | null
          "מי_יוביל_את_התהליך_מטעמכם?_נא_לציין"?: string | null
          מייל?: string | null
          מיקום_מאגר_לקוחות?: string | null
          מספר_אנשי_קשר_במאגר?: number | null
          "מספר_עובדים_(משוער)"?: number | null
          מערכת_רישום_לידים?: string | null
          משימות_חוזרות?: string[] | null
          מתי_נוח_לכם_להתחיל_את_התהליך?: string | null
          סוגי_תוכן_מיוצרים?: string[] | null
          סטטוס_תקציב?: string | null
          סכום_תקציב?: number | null
          סכום_תקציב_חודשי?: number | null
          "עד_כמה_העובדים/המנהלים_בארגון_מכיר"?: string[] | null
          פגישות_שבועיות?: number | null
          פילוח_מאגר_לקוחות?: string[] | null
          פירוט_תהליך_עבודה_מרכזי?: string | null
          פרטי_תקציב?: string | null
          קריטריונים_סינון_לידים?: string | null
          שם_בארגון?: string | null
          שם_מלא?: string | null
          "שנות פעילות"?: number | null
          שעות_מנהלה_שבועיות?: number | null
          תאר_בקצרה_את_הפעילות_של_הארגון?: string | null
          תאריך_התחלה?: string | null
          תגובה_ראשונית_ללידים?: string | null
          תהליך_הפקת_מסמכים?: string | null
          תהליך_פנייה_מחודשת?: string | null
          תהליך_תיאום_פגישות?: string | null
          תוכנות_נוכחיות?: string[] | null
          תזכורות_שבועיות?: number | null
          תחום_פעילות?: string | null
          תפקיד_בארגון?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          אוטומציות_קיימות?: string | null
          אזור_פעילות_גאוגרפי?: string | null
          "איך_תדעו_שהתהליך_הצליח?_מהם_המדדים_"?: string | null
          "אילו_מחלקות_עיקריות_פועלות_אצלכם?"?: string[] | null
          אילו_משימות_היית_רוצה_לייעל_או_להו?: string | null
          אילו_סוגי_כלים_מבוססי_AI_אתם_מכירים_?: string[] | null
          אילו_תהליכים_כיום_מתבצעים_בצורה_לא?: string | null
          "אם_יש_שימוש_–_ציין_שם,_תפקיד,_תחום_ע"?: string | null
          "באילו_מערכות_/_כלים_דיגיטליים_אתם_מ"?: string[] | null
          באילו_תחומים_נראה_לכם_שכדאי_להתחיל?: string[] | null
          "האם_התקיימו_הכשרות_/_סדנאות_בתחום_ה"?: string[] | null
          "האם_יש_משהו_נוסף_שתרצו_לשתף,_לציין_"?: string | null
          "האם_יש_תקציב_ראשוני_לתהליך?"?: string[] | null
          האם_ראיתם_פתרונות_טכנולוגיים_או_תה?: string | null
          הערות_נוספות?: string | null
          זמן_וידאו_דקות?: number | null
          זמן_מועדף_ליום_הפגישה?: string[] | null
          זמן_מועדף_פגישה?: string[] | null
          זמן_ניוזלטר_דקות?: number | null
          זמן_פוסטים_דקות?: number | null
          זמן_תגובה_ללידים?: string | null
          טלפון?: string | null
          כלי_אוטומציה?: string[] | null
          כלים_ניהול_לידים?: string[] | null
          כלים_שמירת_קשר?: string[] | null
          לידים_אחר_חודשי?: number | null
          לידים_אתר_חודשי?: number | null
          לידים_הפניות_חודשי?: number | null
          לידים_וואטסאפ_חודשי?: number | null
          לידים_טלפון_חודשי?: number | null
          לידים_פייסבוק_חודשי?: number | null
          מדד_הצלחה_כמותי?: string | null
          מה_הייתם_רוצים_להשיג_מהטמעת_AI_בארג?: string[] | null
          מהם_האתגרים_המרכזיים_שאתם_מתמודדי?: string | null
          "מהם_השירותים_/_המוצרים_המרכזיים_שא"?: string | null
          "מהם_קהלי_היעד_המרכזיים_שלכם?"?: string[] | null
          "מי_יוביל_את_התהליך_מטעמכם?_נא_לציין"?: string | null
          מייל?: string | null
          מיקום_מאגר_לקוחות?: string | null
          מספר_אנשי_קשר_במאגר?: number | null
          "מספר_עובדים_(משוער)"?: number | null
          מערכת_רישום_לידים?: string | null
          משימות_חוזרות?: string[] | null
          מתי_נוח_לכם_להתחיל_את_התהליך?: string | null
          סוגי_תוכן_מיוצרים?: string[] | null
          סטטוס_תקציב?: string | null
          סכום_תקציב?: number | null
          סכום_תקציב_חודשי?: number | null
          "עד_כמה_העובדים/המנהלים_בארגון_מכיר"?: string[] | null
          פגישות_שבועיות?: number | null
          פילוח_מאגר_לקוחות?: string[] | null
          פירוט_תהליך_עבודה_מרכזי?: string | null
          פרטי_תקציב?: string | null
          קריטריונים_סינון_לידים?: string | null
          שם_בארגון?: string | null
          שם_מלא?: string | null
          "שנות פעילות"?: number | null
          שעות_מנהלה_שבועיות?: number | null
          תאר_בקצרה_את_הפעילות_של_הארגון?: string | null
          תאריך_התחלה?: string | null
          תגובה_ראשונית_ללידים?: string | null
          תהליך_הפקת_מסמכים?: string | null
          תהליך_פנייה_מחודשת?: string | null
          תהליך_תיאום_פגישות?: string | null
          תוכנות_נוכחיות?: string[] | null
          תזכורות_שבועיות?: number | null
          תחום_פעילות?: string | null
          תפקיד_בארגון?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: { user_id?: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
