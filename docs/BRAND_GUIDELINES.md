# חוקי מיתוג ועיצוב — guycohen-ai.co.il

> מסמך זה מגדיר את השפה הויזואלית, הערכים והכללים של המותג.
> כל שינוי באתר חייב לעמוד בכללים האלה.

---

## 1. ערכי המותג (Brand Values)

לפני כל החלטה ויזואלית — שלושה ערכים מנחים:

| ערך | משמעות | איך זה בא לידי ביטוי |
|-----|--------|----------------------|
| **פשטות** | AI נשמע מפחיד — אנחנו הופכים אותו לנגיש | שפה פשוטה, בלי ז'רגון, ויזואל נקי |
| **אמינות** | הלקוח סומך עלינו עם העסק שלו | הוכחות חברתיות, תעודות, שקיפות |
| **תוצאות** | לא מדברים — מראים | מספרים, סיפורי הצלחה, דוגמאות חיות |

### בידול (Differentiation)
> "לא מלמד AI — מטמיע AI. לא תיאוריה — פתרונות שעובדים מחר בבוקר."

### הצעת ערך (Value Proposition)
> "ייעוץ AI מותאם אישית לעסקים קטנים ובינוניים — מיפוי אתגרים, המלצה על פתרונות, וליווי עד תוצאות."

### סלוגן
> "פותרים את הבעיות הכי כואבות בעסק שלך בעזרת פתרונות AI מותאמים אישית"

---

## 2. פלטת צבעים (Color Palette)

### צבעים ראשיים

| שם | Hex | שימוש |
|----|-----|-------|
| **Navy Dark** | `#0A1F44` | רקע ראשי, header, footer |
| **Navy Light** | `#102B5B` | רקע משני, כרטיסים, טפסים |
| **Blue Primary** | `#0052CC` | כפתור CTA ראשי, קישורים פעילים |
| **Purple 700** | `#7C3AED` | אקצנטים, קווים מפרידים, borders, badges |
| **Purple 400** | `#A78BFA` | טקסט הדגשה, hover states, כותרות משנה |

### צבעי טקסט

| שם | Hex | שימוש |
|----|-----|-------|
| **White** | `#FFFFFF` | כותרות ראשיות, טקסט על רקע כהה |
| **Gray 100** | `#F3F4F6` | טקסט גוף על רקע כהה |
| **Gray 300** | `#D1D5DB` | טקסט תיאור, פסקאות |
| **Gray 400** | `#9CA3AF` | טקסט משני, placeholder, footer |
| **Gray 500** | `#6B7280` | מטא-מידע, תאריכים, זמן קריאה |

### כלל ברזל
- **לעולם לא** להשתמש בצבע שלא מופיע בטבלה
- **לעולם לא** טקסט לבן על רקע לבן או טקסט כהה על רקע כהה
- שקיפות borders: `/20` למצב רגיל, `/40` ל-hover, `/50` ל-active

---

## 3. טיפוגרפיה (Typography)

### גופן
- **Heebo** — גופן ראשי ויחיד לכל האתר (כותרות, גוף, כפתורים, ניווט)
- Fallback: `sans-serif`
- מקור: Google Fonts עם `display=swap`

### היררכיית גדלים

| רמה | מובייל | דסקטופ | משקל | שימוש |
|-----|--------|--------|------|-------|
| H1 | `text-2xl` | `text-6xl` | `font-bold` | כותרת Hero בלבד |
| H2 | `text-xl` | `text-4xl` | `font-bold` | כותרות סקציות |
| H3 | `text-lg` | `text-2xl` | `font-bold` | כותרות משנה, כרטיסים |
| Body | `text-base` | `text-lg` | `font-normal` | טקסט גוף |
| Small | `text-sm` | `text-sm` | `font-normal` | מטא, תאריכים, badges |
| Tiny | `text-xs` | `text-xs` | `font-normal` | footer, legal |

### כלל ברזל
- **לעולם לא** להשתמש בגופן שאינו Heebo
- **לעולם לא** להשתמש ב-`font-light` (300) — לא קריא על רקע כהה
- כותרות תמיד `font-bold`, גוף טקסט תמיד `font-normal`

---

## 4. ריווח וקומפוזיציה (Spacing & Layout)

### Container
- רוחב מקסימלי: `max-w-6xl` (1152px)
- Padding צדדי: `px-4` (16px)
- מרכוז: `mx-auto`

### ריווח אנכי בין סקציות
- `py-16 md:py-20` (64px מובייל, 80px דסקטופ)

### ריווח בתוך סקציות
- כותרת → תוכן: `mb-12` עד `mb-16`
- פסקה → פסקה: `mb-6`
- כרטיס → כרטיס: `gap-6`

### Grid
- 1 עמודה מובייל → 2 עמודות `md` → 3 עמודות `lg`
- Gap: `gap-4` ל-badges, `gap-6` לכרטיסים, `gap-8` לטפסים

### כלל ברזל
- רקעות מתחלפים: Dark → Light → Dark (מייצר קצב ויזואלי)
- כל סקציה חייבת `dir="rtl"` (RTL מפורש)

---

## 5. כפתורים (Buttons)

### Primary CTA — שיחת ייעוץ
```
bg-blue-primary text-white font-bold
px-8 md:px-14 py-5 md:py-7
text-lg md:text-2xl rounded-lg
shadow-xl animate-glow-pulse
hover:scale-105
```
- כפתור הכי בולט בדף — גדול, עם אנימציית זוהר
- שימוש: Hero, CTA סיום

### Secondary CTA — טופס איפיון
```
bg-white text-navy-dark font-bold
border-2 border-white
px-6 md:px-8 py-3 md:py-4
text-base md:text-lg rounded-lg
hover:bg-gray-100 hover:scale-105
```
- כפתור משני — לבן על רקע כהה, טקסט כהה
- שימוש: Hero (ליד Primary), סיום דף

### Text Link
```
text-purple-400 hover:text-purple-300
font-medium transition-colors
```
- שימוש: "לכל המאמרים", "חזרה למאמרים"

### כלל ברזל
- **מקסימום 2 כפתורים בולטים בכל מסך** (Primary + Secondary)
- **לעולם לא** כפתור בלי hover effect
- **לעולם לא** טקסט לבן על כפתור לבן

---

## 6. כרטיסים (Cards)

### כרטיס מאמר
```
bg-navy-light rounded-xl
border border-purple-700/20
hover:border-purple-700/50
hover:shadow-lg hover:shadow-purple-700/10
hover:-translate-y-1
transition-all duration-300
```
- תמונה: `h-48 object-cover` (חוץ מ-gem-guide שהוא `object-contain`)
- Padding תוכן: `p-6`

### כרטיס Badge / Credential
```
bg-navy-dark rounded-xl p-5
border border-purple-700/20
flex items-center gap-4
hover:border-purple-700/40
```
- אייקון: `w-10 h-10 rounded-full bg-purple-700/20`

### כרטיס סיפור הצלחה
```
bg-navy-dark p-6 pr-8 rounded-lg
shadow-md border border-purple-700/20
+ absolute right-0 w-1 h-full bg-purple-700 (קו אקצנט)
```

### כלל ברזל
- כל כרטיס חייב hover effect (מינימום `border` change)
- כל כרטיס חייב `rounded-xl` או `rounded-lg`
- borders תמיד `purple-700/20` (לא gray, לא solid)

---

## 7. אקצנטים דקורטיביים

### קו מפריד (Divider)
```
w-20 md:w-24 h-1 bg-purple-700 mx-auto mb-4
```
- מופיע מתחת לכל כותרת סקציה (H2)
- תמיד ממורכז, תמיד סגול

### קו אקצנט בכרטיס
```
absolute right-0 top-0 w-1 h-full bg-purple-700 rounded-full
```
- מופיע בסיפורי הצלחה ובציטוטים

### Separator בין חלקי תוכן (במאמרים)
```
<hr> עם my-10 md:my-12 border-purple-700/30
```

---

## 8. אייקונים (Icons)

### ספרייה: Lucide React
- גודל קטן: `h-4 w-4` (מטא, links)
- גודל בינוני: `h-5 w-5` (badges, credentials)
- גודל גדול: `h-8 w-8` (process steps)

### קונטיינר אייקון
```
w-10 h-10 rounded-full bg-purple-700/20
flex items-center justify-center
```
- אייקון בצבע: `text-purple-400`

### כלל ברזל
- **רק** Lucide React — לא Font Awesome, לא אייקונים אחרים
- אייקונים תמיד בתוך קונטיינר עגול (לא "צפים")

---

## 9. תמונות (Images)

### שמות קבצים
- תיאוריים בלבד: `guy-cohen-hero.png`, `supermarket-agent.png`
- **לעולם לא** שמות UUID או מספרים

### Alt Text
- כל תמונה חייבת alt text תיאורי בעברית
- כולל שם + תפקיד כשרלוונטי

### טעינה
- Hero: `fetchpriority="high"` (LCP element)
- כל השאר: `loading="lazy"`

### תמונות מאמרים (Thumbnails)
- גובה: `h-48` בכרטיסים, `h-40` ב-latest
- `object-cover` (חוץ מלוגואים שהם `object-contain`)

---

## 10. SEO / GEO / AEO

### Schema Markup (JSON-LD)
- **דף הבית**: `ProfessionalService` + `FAQPage`
- **About**: `Person` (גיא כהן)
- **מאמרים**: `Article` עם `author` ו-`publisher`

### Meta Tags per Route
- כל דף חייב `<Helmet>` עם title ו-description ייחודיים
- פורמט title: `{שם הדף} | גיא כהן`

### תוכן
- תשובה ישירה בתחילת כל פסקה (לא "שיטת הרטבה")
- שפה טבעית, גוף ראשון ("אני מלווה", לא "דניאל מלווה")
- שאלות תשובות (FAQ) בכל עמוד חשוב

### E-E-A-T
- פסקת מחבר בכל מאמר
- Trust signals (תעודות, קהילה, ניסיון) ב-About
- סיפורי הצלחה עם פרטים ספציפיים

---

## 11. בדיקה לפני פרסום (Pre-Publish Checklist)

לפני כל שינוי באתר, שאל:

- [ ] האם זה עומד בערכי המותג? (פשטות, אמינות, תוצאות)
- [ ] האם הצבעים מתוך הפלטה?
- [ ] האם הגופן הוא Heebo בלבד?
- [ ] האם יש hover effect על כל אלמנט אינטראקטיבי?
- [ ] האם יש alt text לכל תמונה?
- [ ] האם יש title + meta description ייחודיים?
- [ ] האם התוכן בשפה פשוטה, בלי ז'רגון?
- [ ] האם ה-CTA ברור ובולט?

---

*מסמך זה נוצר ב-2026-03-21 ומבוסס על ניתוח האתר הקיים + עקרונות מיתוג מהרצאת עידן הישראלי.*
