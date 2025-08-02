-- Add missing column for video time in minutes
ALTER TABLE public.profiling_form_submissions 
ADD COLUMN זמן_וידאו_דקות BIGINT;