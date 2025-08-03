-- Add budget details column to store additional information when user selects "yes" for budget
ALTER TABLE public.profiling_form_submissions 
ADD COLUMN פרטי_תקציב TEXT;