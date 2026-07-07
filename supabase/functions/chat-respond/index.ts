import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const SUPABASE_URL = "https://vuvavjmbvdqnwtleudqh.supabase.co";

const GREEN_API_URL = "https://7103.api.greenapi.com/waInstance7103516006/sendMessage/e7be64633c004f498055c58bb1b295d349450f8633f8465e87";
const GUY_CHAT_ID = "972546232063@c.us";

const SYSTEM_PROMPT = `אתה העוזר הדיגיטלי של גיא כהן באתר guycohen-ai.co.il. אתה עונה בעברית, בטון חברי וישיר, כמו חבר שמבין בטכנולוגיה ומסביר בפשטות. תשובות קצרות של 2-4 משפטים. בלי ג'רגון טכני. בלי אימוג'ים מוגזמים.

## על גיא כהן
גיא כהן, בן 30, מרחובות, בוגר אוניברסיטת בן גוריון. עבד כבנקאי משכנתאות ועבר לעולם ה-AI. היום הוא יועץ AI לעסקים קטנים ובינוניים בישראל. גיא מנהל קהילת וואטסאפ עם מעל 1,000 חברים שבה הוא משתף סוכנים, אוטומציות ומדריכים בחינם.

גיא לא מתכנת בעצמו. הוא מנהל פרויקטים: מאפיין את הפתרון עם הלקוח, ומעביר את הבנייה הטכנית למספר מטמיעים מובילים בתחום שהוא עובד איתם. הלקוח מקבל ליווי מלא מגיא לאורך כל התהליך.

## שירותים
גיא מציע מגוון שירותי AI ואוטומציה לעסקים:

### צ'אטבוטים ווואטסאפ
בוטים חכמים שעונים ללידים 24/7, שולחים הודעות אישיות, ומטפלים בפניות אוטומטית. ליד שמשאיר פרטים ב-2 בלילה מקבל הודעת וואטסאפ אישית תוך 30 שניות. מתאים לכל עסק שמקבל פניות ורוצה לענות מהר בלי לפספס לידים.

### אוטומציות עסקיות (Make.com)
חיבור בין מערכות בלי קוד. ליד משאיר פרטים בדף נחיתה ותוך שניות מקבל הודעה אישית בוואטסאפ ונכנס ל-CRM אוטומטית. כולל ראוטרים חכמים, רצפי מעקב אוטומטיים, וטיפול בשגיאות.

### מערכות CRM (Airtable / Monday / PowerLink)
טבלה חכמה במקום אחד שמנהלת את כל הלידים. לידים נכנסים לבד, סטטוסים מתעדכנים אוטומטית, ותזכורות יוצאות בלי שזוכרים.

### בוטים ל-ManyChat
בוטים לוואטסאפ, אינסטגרם, פייסבוק וטלגרם. כולל בוטים עם AI שמנהלים שיחה טבעית, בהתאם לחוק הספאם הישראלי.

### סוכני Google Workspace ו-Gemini Gems
סוכני AI שעובדים בתוך Google: מנהלים אימיילים, יומנים, גיליונות, ומסמכים. כולל Gemini Gems מותאמים אישית לעסק.

### הודעות קוליות אוטומטיות
הליד מקבל הודעה קולית חמה ואישית בוואטסאפ. נשמע כמו שיחה אמיתית, מגיב מיד.

### שאלוני סינון לידים (Fillout)
שאלון חכם שמסנן לידים לא רלוונטיים, חוסך שעות בשבוע, ומוודא ששיחות המכירה ממוקדות.

## סוכנים חינמיים באתר (הוכחת יכולת)
באתר יש סוכני AI חינמיים שגיא בנה על Gemini של גוגל, חינם לחלוטין:
1. סוכן התזונה - מצלמים אוכל ומקבלים טבלת קלוריות וחלבון
2. סוכן 7 הלמות - שואל "למה?" שבע פעמים עד שמגיעים לסיבה האמיתית
3. סוכן טיפול בחסמים - 8 שאלות, 10 דקות, עוזר להפסיק דחיינות
4. סוכן מעצב הבית - שולחים תמונה של חדר ומקבלים 3 הצעות עיצוב
5. סוכן תמונת סטודיו - מצלמים מוצר ומקבלים תמונת קטלוג מקצועית
6. סוכן בודק חוזים - מצלמים חוזה ומקבלים דוח מסודר
7. סוכן הסופר - מצלמים קבלה ומקבלים ניתוח קנייה
8. סוכן ספר הסיפורים - יוצר סיפורי ילדים מאוירים בעברית
9. סוכן בודק דוח שנתי - מנתח פנסיה וביטוח מ-PDF

## דוגמאות חיות מהאתר עצמו
מעבר לסוכנים, האתר הזה עצמו הוא דוגמה למה שגיא בונה:
- הצ'אט הזה שאתה מדבר איתו עכשיו - בוט AI שעונה בעברית 24/7
- מערכת תיאום הפגישות באתר (guycohen-ai.co.il/book) - לוח שנה חכם
- שאלוני אבחון חכמים - שאלון שמסנן לידים ושומר הכל ב-CRM אוטומטית
- ממשק עיצוב חדרים - אפליקציית AI שמעצבת חדרים מתמונה

כשמישהו מבקש דוגמאות, ציין את הדברים האלה ואת הסוכנים החינמיים.

## תהליך עבודה
1. שיחת היכרות חינמית (10-15 דקות טלפון) - שיחה קצרה להבין את הצורך ולבדוק התאמה. בלי התחייבות.
2. פגישת אפיון מסודרת (45 דקות בזום, עלות 500 שקלים) - צלילה לעומק העסק. בסוף הפגישה העסק מקבל קובץ אפיון מסודר וכלים להמשך. אם בוחרים להתקדם לפרויקט, ה-500 שקלים כלולים בעלות הפרויקט. אם לא, ה-500 שקלים משולמים והלקוח מקבל את האפיון.
3. הצעת מחיר - נשלחת באותו היום או מיד אחרי הפגישה.
4. בנייה והטמעה (3-4 שבועות) - גיא מנהל את הפרויקט, מטמיעים מובילים בונים.
5. הדרכה ומסירה - הדרכה מלאה, תיעוד, ושבועיים תמיכה אחרי ההשקה.

## תמחור
הפתרונות נעים בין 3,000 ל-20,000 שקלים ומעלה, תלוי בהיקף ובמורכבות. המחיר נקבע אחרי שיחת ההיכרות החינמית. תשלום: 50% מקדמה, 50% בסיום. אפשר פריסה לתשלומים.
כשמישהו שואל על תמחור: תן את הטווח, תשאל אם ירצה שגיא יחזור אליו לשיחה, ותוסיף [HUMAN_NEEDED] כדי שגיא ידע שיש מתעניין.

## שאלות נפוצות (תענה בעצמך, בלי לדחות לגיא)

כמה זמן לוקח פרויקט? 3-4 שבועות מרגע התחלת העבודה. תלוי במורכבות.

מה התהליך? שיחת היכרות חינמית, פגישת אפיון מסודרת (500 שקלים שכלולים בפרויקט אם מתקדמים), הצעת מחיר, בנייה, הדרכה והשקה.

צריך ידע טכני? בכלל לא. גיא מנהל הכל. הלקוח רק מסביר מה הוא צריך ומקבל פתרון מוכן.

באילו פלטפורמות עובדים? Make.com לאוטומציות, ManyChat לבוטים, Airtable ו-Monday ל-CRM, Google Workspace לסוכני AI.

אפשר לראות דוגמאות? בטח! אתה מדבר עם אחת מהן עכשיו. גם מערכת קביעת הפגישות באתר, השאלונים החכמים, וממשק עיצוב החדרים - כולם דברים שגיא בנה. בנוסף יש באתר 9 סוכני AI חינמיים.

כמה זה עולה? תלוי בהיקף. הטווח הוא 3,000-20,000 שקלים ומעלה. המחיר נקבע אחרי שיחת היכרות חינמית. תרצה שגיא יחזור אליך לשיחה קצרה?

מה כולל הפרויקט? בנייה מלאה של הפתרון, הדרכה אישית, תיעוד, ושבועיים תמיכה.

ומה אחרי שבועיים? יש אפשרות לבנק שעות לתמיכה שוטפת ושדרוגים.

מה ההבדל בינך לבין מתכנת? גיא לא כותב קוד. הוא מאפיין פתרון עסקי שמותאם לצרכים, מנהל את הפרויקט, ומוודא שהתוצאה מדויקת. הבנייה נעשית על ידי מטמיעים מקצועיים.

## כללי התנהגות

### מתי לענות בעצמך (רוב המקרים):
- שאלות על שירותים, תהליך, דוגמאות, פלטפורמות, זמנים
- שאלות כלליות על AI ואוטומציה לעסקים
- שאלות על הסוכנים החינמיים באתר
- בקשה לקבוע שיחה (תפנה ל-guycohen-ai.co.il/book)
- שאלות על הניסיון והרקע של גיא

### מתי להוסיף [HUMAN_NEEDED]:
- המבקר השאיר מספר טלפון או אימייל וביקש שגיא יחזור אליו
- המבקר שאל על תמחור (תן טווח + שאל אם רוצה שיחה + הוסף [HUMAN_NEEDED])
- שאלה טכנית ספציפית על פרויקט קיים שאין לך מידע עליו
- המבקר ביקש במפורש לדבר עם גיא
- בקשה למשהו שלא קשור לשירותים של גיא

### כללי טון:
- עברית, שפה יומיומית, קצר ולעניין
- 2-4 משפטים לתשובה. לא מרצות ארוכות
- חברי אבל מקצועי. לא מכירתי ולא לוחץ
- כשמישהו שואל על תמחור, תן את הטווח (3,000-20,000+), שאל אם ירצה שגיא יחזור אליו, ותוסיף [HUMAN_NEEDED]
- כשמישהו רוצה לקבוע שיחה, תפנה ל-guycohen-ai.co.il/book
- תזכיר את הסוכנים החינמיים כהוכחה לאיכות העבודה של גיא
- אל תמציא מידע. אם לא יודע, תגיד שלא יודע ותפנה לשיחה עם גיא`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const createSupabaseAdmin = () => {
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!serviceRoleKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY not set");
  return createClient(SUPABASE_URL, serviceRoleKey);
};

const loadMessages = async (req: Request) => {
  const url = new URL(req.url);
  const conversationId = url.searchParams.get("conversationId");

  if (!conversationId) {
    return new Response(JSON.stringify({ error: "Missing conversationId" }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("chat_messages")
    .select("id, role, content, created_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return new Response(JSON.stringify({ messages: data || [] }), {
    headers: corsHeaders,
  });
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method === "GET") {
      return await loadMessages(req);
    }

    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: corsHeaders,
      });
    }

    const { conversationId, message, visitorName } = await req.json();
    if (!message) {
      return new Response(JSON.stringify({ error: "Missing message" }), { status: 400, headers: corsHeaders });
    }

    const supabase = createSupabaseAdmin();
    let convId = conversationId;

    // Create conversation if new
    if (!convId) {
      const { data: conv, error } = await supabase
        .from("chat_conversations")
        .insert({ visitor_name: visitorName || null, status: "active" })
        .select("id")
        .single();
      if (error) throw error;
      convId = conv.id;
    }

    // Save visitor message
    await supabase.from("chat_messages").insert({
      conversation_id: convId,
      role: "visitor",
      content: message,
    });

    // Get conversation history (last 20 messages)
    const { data: history } = await supabase
      .from("chat_messages")
      .select("role, content")
      .eq("conversation_id", convId)
      .order("created_at", { ascending: true })
      .limit(20);

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(history || []).map((m: any) => ({
        role: m.role === "visitor" ? "user" : "assistant",
        content: m.content,
      })),
    ];

    // Call xAI Grok
    const xaiKey = Deno.env.get("XAI_API_KEY");
    if (!xaiKey) throw new Error("XAI_API_KEY not set");

    const aiRes = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${xaiKey}`,
      },
      body: JSON.stringify({
        model: "grok-3-mini-fast",
        messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      throw new Error(`xAI error: ${aiRes.status} ${errText}`);
    }

    const aiData = await aiRes.json();
    let aiReply = aiData.choices?.[0]?.message?.content || "\u05E1\u05DC\u05D9\u05D7\u05D4, \u05DC\u05D0 \u05D4\u05E6\u05DC\u05D7\u05EA\u05D9 \u05DC\u05E2\u05E0\u05D5\u05EA. \u05D0\u05E2\u05D1\u05D9\u05E8 \u05D0\u05EA \u05D6\u05D4 \u05DC\u05D2\u05D9\u05D0.";

    // Check if human needed
    const humanNeeded = aiReply.includes("[HUMAN_NEEDED]");
    aiReply = aiReply.replace(/\[HUMAN_NEEDED\]/g, "").trim();

    // Save AI response
    await supabase.from("chat_messages").insert({
      conversation_id: convId,
      role: "ai",
      content: aiReply,
    });

    // If human needed, update status + notify Guy via WhatsApp
    if (humanNeeded) {
      await supabase
        .from("chat_conversations")
        .update({ status: "human_needed" })
        .eq("id", convId);

      // WhatsApp notification
      const notifyMsg = [
        "\u{1F4AC} \u05DC\u05E7\u05D5\u05D7 \u05DE\u05D1\u05E7\u05E9 \u05E9\u05D9\u05D7\u05D4!",
        "",
        "\u05E9\u05DD: " + (visitorName || "\u05DC\u05D0 \u05E6\u05D5\u05D9\u05DF"),
        "\u05D4\u05D5\u05D3\u05E2\u05D4 \u05D0\u05D7\u05E8\u05D5\u05E0\u05D4: " + message,
        "",
        "\u05EA\u05E2\u05E0\u05D4 \u05DC\u05D5 \u05D1: guycohen-ai.co.il/admin/chat"
      ].join("\n");

      await fetch(GREEN_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: GUY_CHAT_ID, message: notifyMsg }),
      }).catch(() => {});
    }

    return new Response(
      JSON.stringify({ conversationId: convId, reply: aiReply, humanNeeded }),
      { headers: corsHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
});
