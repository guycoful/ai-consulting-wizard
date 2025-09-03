-- Grant admin role to the current user
INSERT INTO public.user_roles (user_id, role)
VALUES ('7f0a1bfd-dc9a-47e1-a7cc-2f9f15444540', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;