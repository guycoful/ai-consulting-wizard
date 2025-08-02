-- Add missing column for additional notes
ALTER TABLE public.profiling_form_submissions 
ADD COLUMN הערות_נוספות TEXT;