
-- Allow public access to insert into profiling_form_submissions table
-- Since this is a public form, we need to allow anonymous users to submit
ALTER TABLE public.profiling_form_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert into the table
CREATE POLICY "Allow public form submissions" 
  ON public.profiling_form_submissions 
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Create a policy that allows authenticated users to view all submissions (for admin)
CREATE POLICY "Allow authenticated users to view submissions" 
  ON public.profiling_form_submissions 
  FOR SELECT 
  TO authenticated
  USING (true);
