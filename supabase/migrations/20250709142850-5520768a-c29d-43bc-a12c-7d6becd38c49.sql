-- בדיקה ותיקון מלא של הרשאות עבור הטבלה
-- ביטול RLS זמני לבדיקה
ALTER TABLE public.profiling_form_submissions DISABLE ROW LEVEL SECURITY;

-- מחיקת כל המדיניות הקיימות
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.profiling_form_submissions;
DROP POLICY IF EXISTS "Enable select for authenticated users" ON public.profiling_form_submissions;
DROP POLICY IF EXISTS "Enable insert for everyone" ON public.profiling_form_submissions;
DROP POLICY IF EXISTS "Allow public form submissions" ON public.profiling_form_submissions;
DROP POLICY IF EXISTS "Allow anonymous form submissions" ON public.profiling_form_submissions;
DROP POLICY IF EXISTS "Allow authenticated users to view submissions" ON public.profiling_form_submissions;

-- הפעלת RLS מחדש
ALTER TABLE public.profiling_form_submissions ENABLE ROW LEVEL SECURITY;

-- יצירת מדיניות פשוטה להכנסה עבור כולם
CREATE POLICY "Allow all inserts" ON public.profiling_form_submissions
  FOR INSERT
  WITH CHECK (true);

-- מדיניות לקריאה עבור משתמשים מחוברים
CREATE POLICY "Allow authenticated select" ON public.profiling_form_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- מתן הרשאות מפורשות
GRANT INSERT ON public.profiling_form_submissions TO anon;
GRANT INSERT ON public.profiling_form_submissions TO authenticated;
GRANT SELECT ON public.profiling_form_submissions TO authenticated;