-- Add missing column for lead response time
ALTER TABLE public.profiling_form_submissions 
ADD COLUMN זמן_תגובה_ללידים TEXT;