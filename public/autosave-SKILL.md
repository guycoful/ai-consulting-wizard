---
name: autosave
description: "Personal memory agent. Save conversation summaries to local registry with auto-categorization (לקוח/ליד/כלי/ידע/משימה/debug/רעיון/תוכן/מטא), tags, search across all past saves, and stats. Use at end of conversation, when user says 'autosave', 'תשמור', 'save this', 'archive', 'תכניס לזיכרון'."
user_invocable: true
version: 2.0.0
---

# Autosave — Personal Memory Agent

זה לא רק "לוג של שיחות". זה **הזיכרון האישי שלך**: כל שיחה משויכת לקטגוריה, מתויגת, וניתנת לחיפוש. ככל שיש יותר שיחות שמורות - הסוכן יודע יותר עליך.

## 🎯 4 שכבות הסוכן (לפי "Stage 2-4" מהפוסט)

1. **🧠 זיכרון** — registry JSON ב-`~/.autosave/registry.json` + קובץ .md לכל שיחה
2. **🏷️ סיווג חכם** — 10 קטגוריות (לקוח/ליד/כלי/ידע/משימה/debug/רעיון/תוכן/מטא/אחר)
3. **🔍 חיפוש** — חיפוש על נושא, סיכום, תגיות, קטגוריה
4. **📊 סטטיסטיקה** — מה הכי נושא חוזר, איזה לקוח הכי הרבה

## 📋 מה לעשות (כשהמשתמש מבקש לשמור)

### 1. נתח את השיחה
חלץ:
- **נושא** (שורה אחת, ספציפי)
- **קטגוריה** מתוך: client, lead, tool, knowledge, task, debug, idea, content, meta, other
- **תגיות** (3-7 תגיות שיעזרו לחיפוש - שם לקוח, פרויקט, טכנולוגיה)
- **סיכום** (3-5 משפטים מה נבנה/הוחלט/השתנה)
- **נקודות חשובות** (החלטות, בעיות, דברים לזכור)
- **קישורים** (URLs, קבצים שיצרת)
- **פרומפטים שעבדו** (אם רלוונטי)

### 2. הרץ את הסקריפט
```bash
python3 ~/.claude/skills/autosave/scripts/agent.py save \
  --topic "TOPIC" \
  --summary "SUMMARY" \
  --category CATEGORY \
  --tags "tag1,tag2,tag3" \
  --links "url1,url2" \
  --key-points "POINTS" \
  --prompts "PROMPTS"
```

### 3. אישור למשתמש
תן ID של השמירה ותגיד באיזו קטגוריה.

## 🔍 פקודות חיפוש (כשהמשתמש שואל "מה דיברנו על X")

```bash
# חיפוש חופשי
python3 ~/.claude/skills/autosave/scripts/agent.py search "Intango"

# שיחות אחרונות
python3 ~/.claude/skills/autosave/scripts/agent.py recent --limit 20

# התפלגות קטגוריות
python3 ~/.claude/skills/autosave/scripts/agent.py categories

# סטטיסטיקה כללית
python3 ~/.claude/skills/autosave/scripts/agent.py stats
```

## 🏷️ קטגוריות (Hebrew/Emoji)

| קוד | אמוג'י | עברית | מתי |
|---|---|---|---|
| `client` | 🧑 | לקוח / פרויקט | עבדנו על משהו ללקוח קונקרטי |
| `lead` | 💼 | ליד / מכירות | שיחה על ליד פוטנציאלי |
| `tool` | 🛠️ | פיתוח כלי / סקיל | בנינו / שדרגנו סקיל |
| `knowledge` | 🧠 | ידע / לימוד | הסבר מעמיק על נושא |
| `task` | 📋 | משימה אישית | משימה אדמיניסטרטיבית |
| `debug` | 🐛 | תיקון / debug | תיקון תקלה |
| `idea` | 💭 | רעיון / סיעור מוחות | סיעור מוחות, תכנון |
| `content` | ✍️ | תוכן / פוסט / סרטון | יצירת תוכן |
| `meta` | 🌀 | מטא | על הסוכנים עצמם |
| `other` | 📌 | אחר | לא משויך |

## 💡 טריגרים אוטומטיים

הסוכן צריך לרוץ אוטומטית במצבים אלה:
- **בסוף שיחה** (כשהמשתמש מסיים, אומר "תודה", "סיימנו", "שבת שלום" וכו')
- **כשהמשתמש אומר "תשמור"**
- **כל 30 הודעות** בשיחה ארוכה (checkpoint)
- **לפני compact** של השיחה

## 📁 מבנה אחסון

```
~/.autosave/
  registry.json              # אינדקס - מטא של כל השיחות
  conversations/
    2026-05-09-abc12345.md   # תוכן מלא לכל שיחה
    2026-05-08-def67890.md
```

## ⚠️ הערות חשובות

- אם יש זמינות ל-Google Sheets → גם לשם (סנכרון אופציונלי)
- כתוב כל סיכום בעברית (אלא אם השיחה הייתה באנגלית)
- תגיות באנגלית מותרות (טכניות) או עברית (תוכן)
- אל תכפיל - אם נושא כבר נשמר באותו יום, אפשר לעדכן את הקיים
