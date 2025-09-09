-- Create company_profiles table for user company details and branding
CREATE TABLE public.company_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  company_name TEXT NOT NULL,
  company_address TEXT,
  company_postcode TEXT,
  company_phone TEXT,
  company_email TEXT,
  company_website TEXT,
  company_registration TEXT,
  vat_number TEXT,
  logo_url TEXT,
  logo_data_url TEXT,
  primary_color TEXT DEFAULT '#1e40af',
  secondary_color TEXT DEFAULT '#3b82f6',
  currency TEXT DEFAULT 'GBP',
  locale TEXT DEFAULT 'en-GB',
  payment_terms TEXT DEFAULT '30 days',
  bank_details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.company_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own company profile" 
ON public.company_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own company profile" 
ON public.company_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own company profile" 
ON public.company_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own company profile" 
ON public.company_profiles 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX idx_company_profiles_user_id ON public.company_profiles(user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_company_profiles_updated_at
BEFORE UPDATE ON public.company_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for company branding
INSERT INTO storage.buckets (id, name, public) VALUES ('company-branding', 'company-branding', true);

-- Create policies for branding uploads
CREATE POLICY "Users can view company branding files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'company-branding');

CREATE POLICY "Users can upload their own company branding" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'company-branding' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own company branding" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'company-branding' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own company branding" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'company-branding' AND auth.uid()::text = (storage.foldername(name))[1]);