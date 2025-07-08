
-- Drop the existing policy
DROP POLICY IF EXISTS "Allow public form submissions" ON public.profiling_form_submissions;

-- Create a new policy that allows both public and anon roles to insert
CREATE POLICY "Allow anonymous form submissions" 
  ON public.profiling_form_submissions 
  FOR INSERT 
  TO anon, public
  WITH CHECK (true);

-- Also ensure the policy for authenticated users to view submissions exists
DROP POLICY IF EXISTS "Allow authenticated users to view submissions" ON public.profiling_form_submissions;

CREATE POLICY "Allow authenticated users to view submissions" 
  ON public.profiling_form_submissions 
  FOR SELECT 
  TO authenticated
  USING (true);
