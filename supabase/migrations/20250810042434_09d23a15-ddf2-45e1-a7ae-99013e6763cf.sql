-- Enable Row Level Security on profiling_form_submissions table
ALTER TABLE public.profiling_form_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public to insert new form submissions (so the form can work)
CREATE POLICY "Allow public form submissions" 
ON public.profiling_form_submissions 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Only authenticated users can view submissions (for admin access)
CREATE POLICY "Only authenticated users can view submissions" 
ON public.profiling_form_submissions 
FOR SELECT 
TO authenticated 
USING (true);

-- Only authenticated users can update submissions
CREATE POLICY "Only authenticated users can update submissions" 
ON public.profiling_form_submissions 
FOR UPDATE 
TO authenticated 
USING (true);

-- Only authenticated users can delete submissions
CREATE POLICY "Only authenticated users can delete submissions" 
ON public.profiling_form_submissions 
FOR DELETE 
TO authenticated 
USING (true);