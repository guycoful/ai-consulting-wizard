export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiling_form_submissions: {
        Row: {
          created_at: string
          id: number
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
          זמן_מועדף_ליום_הפגישה: string[] | null
          טלפון: string | null
          מה_הייתם_רוצים_להשיג_מהטמעת_AI_בארג: string[] | null
          מהם_האתגרים_המרכזיים_שאתם_מתמודדי: string | null
          "מהם_השירותים_/_המוצרים_המרכזיים_שא": string | null
          "מהם_קהלי_היעד_המרכזיים_שלכם?": string[] | null
          "מי_יוביל_את_התהליך_מטעמכם?_נא_לציין": string | null
          מייל: string | null
          "מספר_עובדים_(משוער)": number | null
          מתי_נוח_לכם_להתחיל_את_התהליך: string | null
          "עד_כמה_העובדים/המנהלים_בארגון_מכיר": string[] | null
          שם_בארגון: string | null
          שם_מלא: string | null
          "שנות פעילות": number | null
          תאר_בקצרה_את_הפעילות_של_הארגון: string | null
          תחום_פעילות: string | null
          תפקיד_בארגון: string | null
        }
        Insert: {
          created_at?: string
          id?: number
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
          זמן_מועדף_ליום_הפגישה?: string[] | null
          טלפון?: string | null
          מה_הייתם_רוצים_להשיג_מהטמעת_AI_בארג?: string[] | null
          מהם_האתגרים_המרכזיים_שאתם_מתמודדי?: string | null
          "מהם_השירותים_/_המוצרים_המרכזיים_שא"?: string | null
          "מהם_קהלי_היעד_המרכזיים_שלכם?"?: string[] | null
          "מי_יוביל_את_התהליך_מטעמכם?_נא_לציין"?: string | null
          מייל?: string | null
          "מספר_עובדים_(משוער)"?: number | null
          מתי_נוח_לכם_להתחיל_את_התהליך?: string | null
          "עד_כמה_העובדים/המנהלים_בארגון_מכיר"?: string[] | null
          שם_בארגון?: string | null
          שם_מלא?: string | null
          "שנות פעילות"?: number | null
          תאר_בקצרה_את_הפעילות_של_הארגון?: string | null
          תחום_פעילות?: string | null
          תפקיד_בארגון?: string | null
        }
        Update: {
          created_at?: string
          id?: number
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
          זמן_מועדף_ליום_הפגישה?: string[] | null
          טלפון?: string | null
          מה_הייתם_רוצים_להשיג_מהטמעת_AI_בארג?: string[] | null
          מהם_האתגרים_המרכזיים_שאתם_מתמודדי?: string | null
          "מהם_השירותים_/_המוצרים_המרכזיים_שא"?: string | null
          "מהם_קהלי_היעד_המרכזיים_שלכם?"?: string[] | null
          "מי_יוביל_את_התהליך_מטעמכם?_נא_לציין"?: string | null
          מייל?: string | null
          "מספר_עובדים_(משוער)"?: number | null
          מתי_נוח_לכם_להתחיל_את_התהליך?: string | null
          "עד_כמה_העובדים/המנהלים_בארגון_מכיר"?: string[] | null
          שם_בארגון?: string | null
          שם_מלא?: string | null
          "שנות פעילות"?: number | null
          תאר_בקצרה_את_הפעילות_של_הארגון?: string | null
          תחום_פעילות?: string | null
          תפקיד_בארגון?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
