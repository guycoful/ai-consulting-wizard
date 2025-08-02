-- Add missing column for preferred meeting time
ALTER TABLE public.profiling_form_submissions 
ADD COLUMN זמן_מועדף_פגישה ARRAY;