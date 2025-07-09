-- הסרת המדיניות הנוכחית והוספת מדיניות חדשה עבור anon
DROP POLICY IF EXISTS "Enable insert for everyone" ON public.profiling_form_submissions;

-- יצירת מדיניות להכנסת נתונים עבור כל המשתמשים כולל אנונימיים
CREATE POLICY "Allow anonymous inserts" 
  ON public.profiling_form_submissions 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- וידוא שהטבלה כוללת הרשאות INSERT
GRANT INSERT ON public.profiling_form_submissions TO anon;
GRANT INSERT ON public.profiling_form_submissions TO authenticated;