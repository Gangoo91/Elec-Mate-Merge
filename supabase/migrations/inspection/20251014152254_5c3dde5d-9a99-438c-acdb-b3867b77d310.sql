-- Create building control authorities table for UK local authorities
CREATE TABLE IF NOT EXISTS public.building_control_authorities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  authority_name TEXT NOT NULL,
  region TEXT NOT NULL,
  postcode_prefixes TEXT[] NOT NULL DEFAULT '{}',
  email TEXT,
  phone TEXT,
  website TEXT,
  portal_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.building_control_authorities ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read building control authorities
CREATE POLICY "Building control authorities are viewable by authenticated users"
ON public.building_control_authorities
FOR SELECT
TO authenticated
USING (true);

-- Create index on postcode prefixes for faster lookup
CREATE INDEX idx_building_control_postcode_prefixes ON public.building_control_authorities USING GIN(postcode_prefixes);

-- Add trigger for updated_at
CREATE TRIGGER update_building_control_authorities_updated_at
BEFORE UPDATE ON public.building_control_authorities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed with sample UK Building Control authorities
INSERT INTO public.building_control_authorities (authority_name, region, postcode_prefixes, email, phone, website) VALUES
('Westminster City Council', 'London', ARRAY['SW1', 'W1', 'W2', 'NW1'], 'building.control@westminster.gov.uk', '020 7641 2000', 'https://www.westminster.gov.uk/building-control'),
('Camden Council', 'London', ARRAY['NW1', 'NW3', 'NW5', 'WC1'], 'building.control@camden.gov.uk', '020 7974 4444', 'https://www.camden.gov.uk/building-control'),
('Tower Hamlets Council', 'London', ARRAY['E1', 'E2', 'E3', 'E14'], 'building.control@towerhamlets.gov.uk', '020 7364 5000', 'https://www.towerhamlets.gov.uk/building-control'),
('Birmingham City Council', 'West Midlands', ARRAY['B1', 'B2', 'B3', 'B4', 'B5'], 'building.control@birmingham.gov.uk', '0121 303 1111', 'https://www.birmingham.gov.uk/building-control'),
('Manchester City Council', 'Greater Manchester', ARRAY['M1', 'M2', 'M3', 'M4'], 'building.control@manchester.gov.uk', '0161 234 5000', 'https://www.manchester.gov.uk/building-control'),
('Leeds City Council', 'West Yorkshire', ARRAY['LS1', 'LS2', 'LS3', 'LS4'], 'building.control@leeds.gov.uk', '0113 222 4444', 'https://www.leeds.gov.uk/building-control'),
('Bristol City Council', 'South West', ARRAY['BS1', 'BS2', 'BS3', 'BS4'], 'building.control@bristol.gov.uk', '0117 922 2000', 'https://www.bristol.gov.uk/building-control'),
('Edinburgh City Council', 'Scotland', ARRAY['EH1', 'EH2', 'EH3', 'EH4'], 'building.standards@edinburgh.gov.uk', '0131 200 2000', 'https://www.edinburgh.gov.uk/building-standards'),
('Glasgow City Council', 'Scotland', ARRAY['G1', 'G2', 'G3', 'G4'], 'building.standards@glasgow.gov.uk', '0141 287 2000', 'https://www.glasgow.gov.uk/building-standards'),
('Cardiff Council', 'Wales', ARRAY['CF1', 'CF2', 'CF3', 'CF5'], 'building.control@cardiff.gov.uk', '029 2087 2087', 'https://www.cardiff.gov.uk/building-control')