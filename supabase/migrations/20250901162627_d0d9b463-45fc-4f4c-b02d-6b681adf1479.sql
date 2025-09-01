-- Create historical prices table to store scraped price data over time
CREATE TABLE public.historical_prices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name TEXT NOT NULL,
  supplier TEXT NOT NULL,
  price NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'GBP',
  date_scraped TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source_url TEXT,
  product_url TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for efficient querying
CREATE INDEX idx_historical_prices_product_date ON public.historical_prices(product_name, date_scraped DESC);
CREATE INDEX idx_historical_prices_supplier_date ON public.historical_prices(supplier, date_scraped DESC);

-- Enable RLS
ALTER TABLE public.historical_prices ENABLE ROW LEVEL SECURITY;

-- Allow public read access to historical price data
CREATE POLICY "Anyone can view historical prices" 
ON public.historical_prices 
FOR SELECT 
USING (true);

-- Create current prices view for easy access to latest prices
CREATE OR REPLACE VIEW public.current_prices AS
SELECT DISTINCT ON (product_name, supplier)
  product_name,
  supplier,
  price,
  currency,
  date_scraped,
  source_url,
  product_url,
  category
FROM public.historical_prices
ORDER BY product_name, supplier, date_scraped DESC;