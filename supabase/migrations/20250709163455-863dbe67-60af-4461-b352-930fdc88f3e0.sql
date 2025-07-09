-- תיקון סופי למדיניות RLS
-- הסרת המדיניות הקיימת
DROP POLICY IF EXISTS "Allow all inserts" ON public.profiling_form_submissions;

-- יצירת מדיניות חדשה שמאפשרת הכנסה לכל התפקידים
CREATE POLICY "Allow all inserts" ON public.profiling_form_submissions
  FOR INSERT
  TO anon, authenticated, public
  WITH CHECK (true);

-- וידוא הרשאות מפורשות
GRANT INSERT ON public.profiling_form_submissions TO anon;
GRANT INSERT ON public.profiling_form_submissions TO authenticated;
GRANT INSERT ON public.profiling_form_submissions TO public;