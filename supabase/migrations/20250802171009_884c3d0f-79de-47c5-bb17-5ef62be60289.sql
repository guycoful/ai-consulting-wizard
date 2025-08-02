-- Add missing column for posts time in minutes
ALTER TABLE public.profiling_form_submissions 
ADD COLUMN זמן_פוסטים_דקות BIGINT;