-- Create kirana_store_loans table
CREATE TABLE public.kirana_store_loans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Customer Details (Mandatory)
  customer_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  contact_number TEXT NOT NULL,
  
  -- Co-applicant Details (Optional)
  co_applicant_name TEXT,
  co_applicant_dob DATE,
  co_applicant_contact TEXT,
  
  -- Contact Information (Optional)
  email TEXT,
  
  -- Shop Details (Mandatory)
  retail_shop_name TEXT NOT NULL,
  retail_shop_address TEXT NOT NULL,
  nature_of_retail_shop TEXT NOT NULL,
  nature_of_shop_ownership TEXT NOT NULL,
  shop_size TEXT NOT NULL,
  daily_turnover_range TEXT NOT NULL,
  daily_walkins_range TEXT NOT NULL,
  
  -- Residence Details (Optional)
  residence_address TEXT,
  nature_of_residence_ownership TEXT,
  geo_location TEXT,
  
  -- KYC Details (Optional)
  pan_number TEXT,
  aadhar_number TEXT,
  udyam_number TEXT,
  
  -- Document URLs (Optional)
  bank_statement_url TEXT,
  itr_documents_url TEXT,
  shop_photo_url TEXT,
  
  -- Existing Loans (JSONB array)
  existing_loans JSONB DEFAULT '[]'::jsonb
);

-- Enable Row Level Security
ALTER TABLE public.kirana_store_loans ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit loan applications
CREATE POLICY "Anyone can submit kirana loan applications"
ON public.kirana_store_loans
FOR INSERT
WITH CHECK (true);

-- Allow users to view their own applications (by contact number)
CREATE POLICY "Users can view applications with their contact"
ON public.kirana_store_loans
FOR SELECT
USING (contact_number = current_setting('request.headers')::json->>'x-user-contact' OR has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to view all applications
CREATE POLICY "Admins can view all kirana loan applications"
ON public.kirana_store_loans
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to update applications
CREATE POLICY "Admins can update kirana loan applications"
ON public.kirana_store_loans
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to delete applications
CREATE POLICY "Admins can delete kirana loan applications"
ON public.kirana_store_loans
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));