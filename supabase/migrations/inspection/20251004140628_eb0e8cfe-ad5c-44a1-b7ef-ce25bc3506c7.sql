-- Create inspector_profiles table
CREATE TABLE public.inspector_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  photo_url TEXT,
  qualifications TEXT[] DEFAULT '{}',
  company_name TEXT NOT NULL,
  company_address TEXT NOT NULL,
  company_phone TEXT NOT NULL,
  company_email TEXT NOT NULL,
  company_logo TEXT,
  company_website TEXT,
  company_registration_number TEXT,
  vat_number TEXT,
  registration_scheme TEXT NOT NULL,
  registration_number TEXT NOT NULL,
  registration_expiry DATE,
  insurance_provider TEXT NOT NULL,
  insurance_policy_number TEXT NOT NULL,
  insurance_coverage TEXT NOT NULL,
  insurance_expiry DATE,
  signature_data TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create partial unique index for default profile
CREATE UNIQUE INDEX inspector_profiles_user_default_idx 
  ON public.inspector_profiles (user_id) 
  WHERE is_default = true;

-- Enable RLS
ALTER TABLE public.inspector_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own inspector profiles"
  ON public.inspector_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own inspector profiles"
  ON public.inspector_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own inspector profiles"
  ON public.inspector_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own inspector profiles"
  ON public.inspector_profiles
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_inspector_profiles_updated_at
  BEFORE UPDATE ON public.inspector_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for inspector photos and signatures
INSERT INTO storage.buckets (id, name, public)
VALUES ('inspector-files', 'inspector-files', true);

-- Storage RLS policies
CREATE POLICY "Users can upload their own inspector files"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'inspector-files' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own inspector files"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'inspector-files' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own inspector files"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'inspector-files' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own inspector files"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'inspector-files' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );