-- Add pan_number column to partner_applications table
ALTER TABLE public.partner_applications 
ADD COLUMN IF NOT EXISTS pan_number TEXT;