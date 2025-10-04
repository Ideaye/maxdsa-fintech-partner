-- Create partner applications table
CREATE TABLE public.partner_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  years_in_business TEXT NOT NULL,
  partnership_type TEXT NOT NULL,
  monthly_lead_capacity TEXT NOT NULL,
  regions_of_operation TEXT NOT NULL,
  additional_information TEXT,
  agreed_to_terms BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.partner_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert applications (public form)
CREATE POLICY "Anyone can submit partner applications" 
ON public.partner_applications 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated admins can view applications (for future admin panel)
CREATE POLICY "Admins can view all applications" 
ON public.partner_applications 
FOR SELECT 
USING (false); -- Will be updated when admin system is implemented