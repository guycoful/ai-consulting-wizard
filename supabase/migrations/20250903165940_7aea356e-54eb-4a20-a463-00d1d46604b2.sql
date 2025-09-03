-- Create user roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check if user has admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_roles.user_id = is_admin.user_id
      AND role = 'admin'
  );
$$;

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can view all submissions" ON public.profiling_form_submissions;
DROP POLICY IF EXISTS "Authenticated users can update submissions" ON public.profiling_form_submissions;
DROP POLICY IF EXISTS "Authenticated users can delete submissions" ON public.profiling_form_submissions;

-- Create secure admin-only policies
CREATE POLICY "Only admins can view submissions"
ON public.profiling_form_submissions
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can update submissions"
ON public.profiling_form_submissions
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can delete submissions"
ON public.profiling_form_submissions
FOR DELETE
TO authenticated
USING (public.is_admin());

-- Policy for user_roles table (admins can manage roles)
CREATE POLICY "Admins can manage user roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());