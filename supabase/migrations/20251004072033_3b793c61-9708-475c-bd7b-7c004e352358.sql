-- Step 1: Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Step 2: Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    role public.app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Step 3: Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Step 4: Update SELECT policy for partner_applications to allow admins
DROP POLICY IF EXISTS "Admins can view all applications" ON public.partner_applications;

CREATE POLICY "Admins can view all applications"
ON public.partner_applications
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Step 5: Add UPDATE policy - only admins can update
CREATE POLICY "Only admins can update applications"
ON public.partner_applications
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Step 6: Add DELETE policy - only admins can delete
CREATE POLICY "Only admins can delete applications"
ON public.partner_applications
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Step 7: Add RLS policy so users can view their own role
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());