-- Add missing column for automation tools
ALTER TABLE public.profiling_form_submissions 
ADD COLUMN כלי_אוטומציה TEXT[];