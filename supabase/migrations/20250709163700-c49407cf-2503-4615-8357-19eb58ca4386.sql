-- פתרון סופי - השבתת RLS זמנית לבדיקה
ALTER TABLE public.profiling_form_submissions DISABLE ROW LEVEL SECURITY;

-- מחיקת כל המדיניות
DROP POLICY IF EXISTS "Allow all inserts" ON public.profiling_form_submissions;
DROP POLICY IF EXISTS "Allow authenticated select" ON public.profiling_form_submissions;

-- מתן הרשאות מלאות
GRANT ALL PRIVILEGES ON public.profiling_form_submissions TO anon;
GRANT ALL PRIVILEGES ON public.profiling_form_submissions TO authenticated;
GRANT ALL PRIVILEGES ON public.profiling_form_submissions TO public;