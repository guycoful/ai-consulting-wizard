-- Add monthly budget amount column to store monthly budget information
ALTER TABLE public.profiling_form_submissions 
ADD COLUMN סכום_תקציב_חודשי BIGINT;