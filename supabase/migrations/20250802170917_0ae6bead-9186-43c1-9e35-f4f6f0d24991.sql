-- Add missing column for newsletter time in minutes
ALTER TABLE public.profiling_form_submissions 
ADD COLUMN זמן_ניוזלטר_דקות BIGINT;