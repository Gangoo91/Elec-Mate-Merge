-- Insert company settings rows into app_settings table
INSERT INTO public.app_settings (key, value, description)
VALUES 
  ('company_name', 'Elec-Mate Ltd', 'Company trading name'),
  ('company_address', '', 'Full business address'),
  ('company_phone', '', 'Contact phone number'),
  ('company_email', 'Founder@elec-mate.com', 'Main contact email'),
  ('company_number', '', 'Companies House registration number'),
  ('company_vat_number', '', 'VAT registration number'),
  ('company_website', 'https://elec-mate.com', 'Company website URL')
ON CONFLICT (key) DO NOTHING;