
-- תחילה נוריד את כל המדיניות הקיימות
DROP POLICY IF EXISTS "Allow public form submissions" ON public.profiling_form_submissions;
DROP POLICY IF EXISTS "Allow anonymous form submissions" ON public.profiling_form_submissions;
DROP POLICY IF EXISTS "Allow authenticated users to view submissions" ON public.profiling_form_submissions;

-- ניצור מדיניות חדשה שמאפשרת לכל אחד להכניס נתונים
CREATE POLICY "Enable insert for everyone" 
  ON public.profiling_form_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- מדיניות לצפייה עבור משתמשים מחוברים
CREATE POLICY "Enable select for authenticated users" 
  ON public.profiling_form_submissions 
  FOR SELECT 
  TO authenticated
  USING (true);

-- נוודא שהטבלה מאפשרת גישה אנונימית
GRANT INSERT ON public.profiling_form_submissions TO anon;
GRANT INSERT ON public.profiling_form_submissions TO authenticated;
