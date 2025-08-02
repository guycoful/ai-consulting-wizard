-- Add missing column for existing automations
ALTER TABLE public.profiling_form_submissions 
ADD COLUMN אוטומציות_קיימות TEXT;