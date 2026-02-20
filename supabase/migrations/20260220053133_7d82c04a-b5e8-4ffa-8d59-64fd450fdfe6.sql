
-- Drop the restrictive INSERT policy and recreate it as permissive
DROP POLICY IF EXISTS "Allow public form submissions" ON public.profiling_form_submissions;

CREATE POLICY "Allow public form submissions"
ON public.profiling_form_submissions
FOR INSERT
WITH CHECK (true);
