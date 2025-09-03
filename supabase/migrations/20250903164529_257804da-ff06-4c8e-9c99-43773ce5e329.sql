-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Only authenticated users can view submissions" ON public.profiling_form_submissions;
DROP POLICY IF EXISTS "Only authenticated users can update submissions" ON public.profiling_form_submissions;
DROP POLICY IF EXISTS "Only authenticated users can delete submissions" ON public.profiling_form_submissions;

-- Create more permissive policies for authenticated users
CREATE POLICY "Authenticated users can view all submissions" 
ON public.profiling_form_submissions 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated users can update submissions" 
ON public.profiling_form_submissions 
FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete submissions" 
ON public.profiling_form_submissions 
FOR DELETE 
TO authenticated 
USING (true);