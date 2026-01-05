-- Finance Hub Tables

-- 1. Quotes table
CREATE TABLE public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_number TEXT NOT NULL UNIQUE,
  client TEXT NOT NULL,
  description TEXT,
  value NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Draft',
  sent_date DATE,
  valid_until DATE,
  job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
  created_by TEXT,
  line_items JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Invoices table
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT NOT NULL UNIQUE,
  client TEXT NOT NULL,
  project TEXT,
  amount NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Draft',
  due_date DATE,
  paid_date DATE,
  job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
  quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
  line_items JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Expense claims table
CREATE TABLE public.expense_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
  category TEXT NOT NULL DEFAULT 'Other',
  description TEXT NOT NULL,
  amount NUMERIC NOT NULL DEFAULT 0,
  receipt_url TEXT,
  status TEXT NOT NULL DEFAULT 'Pending',
  submitted_date DATE NOT NULL DEFAULT CURRENT_DATE,
  approved_by TEXT,
  approved_date TIMESTAMPTZ,
  paid_date DATE,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Suppliers table
CREATE TABLE public.suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Wholesaler',
  account_number TEXT,
  credit_limit NUMERIC DEFAULT 0,
  balance NUMERIC DEFAULT 0,
  contact_name TEXT,
  phone TEXT,
  email TEXT,
  delivery_days INTEGER DEFAULT 1,
  discount_percent NUMERIC DEFAULT 0,
  address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Material orders table
CREATE TABLE public.material_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  supplier_id UUID NOT NULL REFERENCES public.suppliers(id) ON DELETE CASCADE,
  job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Processing',
  order_date DATE NOT NULL DEFAULT CURRENT_DATE,
  delivery_date DATE,
  ordered_by TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Price book table
CREATE TABLE public.price_book (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  buy_price NUMERIC NOT NULL DEFAULT 0,
  sell_price NUMERIC NOT NULL DEFAULT 0,
  markup NUMERIC GENERATED ALWAYS AS (
    CASE WHEN buy_price > 0 THEN ROUND(((sell_price - buy_price) / buy_price * 100)::numeric, 1) ELSE 0 END
  ) STORED,
  unit TEXT NOT NULL DEFAULT 'each',
  supplier_id UUID REFERENCES public.suppliers(id) ON DELETE SET NULL,
  stock_level INTEGER DEFAULT 0,
  reorder_level INTEGER DEFAULT 10,
  sku TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expense_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.material_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_book ENABLE ROW LEVEL SECURITY;

-- RLS Policies (permissive for now - can be tightened with auth later)
CREATE POLICY "Allow all access to quotes" ON public.quotes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to invoices" ON public.invoices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to expense_claims" ON public.expense_claims FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to suppliers" ON public.suppliers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to material_orders" ON public.material_orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to price_book" ON public.price_book FOR ALL USING (true) WITH CHECK (true);

-- Triggers for updated_at
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON public.quotes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_expense_claims_updated_at BEFORE UPDATE ON public.expense_claims FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE ON public.suppliers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_material_orders_updated_at BEFORE UPDATE ON public.material_orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_price_book_updated_at BEFORE UPDATE ON public.price_book FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed Data: Suppliers (insert first as other tables reference them)
INSERT INTO public.suppliers (name, category, account_number, credit_limit, balance, contact_name, phone, email, delivery_days, discount_percent, address) VALUES
('Edmundson Electrical', 'Wholesaler', 'EDM-2024-001', 15000, 2340, 'Steve Marshall', '0161 456 7890', 'trade@edmundson.co.uk', 1, 15, '123 Industrial Estate, Manchester'),
('CEF', 'Wholesaler', 'CEF-2024-002', 10000, 890, 'Mike Johnson', '0151 234 5678', 'accounts@cef.co.uk', 1, 12, '456 Trade Park, Liverpool'),
('Screwfix', 'Retail', 'SFX-2024-003', 5000, 0, 'Online', '0800 896 896', 'trade@screwfix.com', 1, 5, 'National'),
('Schneider Electric', 'Manufacturer', 'SCH-2024-004', 25000, 4500, 'Sarah Williams', '020 7123 4567', 'uk.sales@schneider.com', 3, 20, 'Schneider House, London'),
('Toolstation', 'Retail', 'TLS-2024-005', 3000, 156, 'Online', '0808 100 7211', 'trade@toolstation.com', 1, 8, 'National');

-- Seed Data: Quotes
INSERT INTO public.quotes (quote_number, client, description, value, status, sent_date, valid_until, line_items, created_by) VALUES
('Q-2024-001', 'Costa Coffee', 'New store electrical installation', 18500, 'Sent', '2024-01-10', '2024-02-10', '[{"description": "Consumer unit installation", "qty": 1, "price": 2500}, {"description": "Lighting circuits", "qty": 8, "price": 800}, {"description": "Socket circuits", "qty": 12, "price": 600}]', 'Mike Thompson'),
('Q-2024-002', 'Manchester City Council', 'Street lighting upgrade Phase 2', 45000, 'Approved', '2024-01-05', '2024-02-05', '[{"description": "LED street lights", "qty": 50, "price": 600}, {"description": "Installation labour", "qty": 1, "price": 15000}]', 'Mike Thompson'),
('Q-2024-003', 'Riverside Apartments', 'Emergency lighting system', 12800, 'Draft', NULL, '2024-02-15', '[{"description": "Emergency luminaires", "qty": 45, "price": 180}, {"description": "Central battery system", "qty": 1, "price": 4700}]', 'Sarah Chen'),
('Q-2024-004', 'Premier Inn Leeds', 'EV charging points x6', 28000, 'Rejected', '2024-01-02', '2024-02-02', '[{"description": "22kW chargers", "qty": 6, "price": 3500}, {"description": "Groundworks", "qty": 1, "price": 7000}]', 'Mike Thompson');

-- Seed Data: Invoices
INSERT INTO public.invoices (invoice_number, client, project, amount, status, due_date, paid_date, line_items) VALUES
('INV-2024-001', 'Costa Coffee', 'Shop fit-out electrical', 12500, 'Paid', '2024-01-15', '2024-01-10', '[{"description": "Electrical installation Phase 1", "amount": 12500}]'),
('INV-2024-002', 'Riverside Apartments', 'Common areas rewire', 8750, 'Pending', '2024-02-01', NULL, '[{"description": "Rewiring works", "amount": 8750}]'),
('INV-2024-003', 'Manchester City Council', 'Street lighting Q4', 34200, 'Overdue', '2024-01-20', NULL, '[{"description": "Lighting maintenance Q4", "amount": 34200}]'),
('INV-2024-004', 'Premier Inn Manchester', 'Fire alarm upgrade', 15800, 'Paid', '2024-01-25', '2024-01-22', '[{"description": "Fire alarm system upgrade", "amount": 15800}]');

-- Seed Data: Expense Claims (need employee IDs - will use subquery)
INSERT INTO public.expense_claims (employee_id, category, description, amount, status, submitted_date, approved_by, approved_date)
SELECT e.id, 'Materials', 'Emergency cable purchase - Screwfix', 156.80, 'Pending', '2024-01-15', NULL, NULL
FROM public.employees e WHERE e.name = 'Mike Thompson' LIMIT 1;

INSERT INTO public.expense_claims (employee_id, category, description, amount, status, submitted_date, approved_by, approved_date)
SELECT e.id, 'Parking', 'City centre parking - Costa job', 24.50, 'Approved', '2024-01-14', 'Sarah Chen', now()
FROM public.employees e WHERE e.name = 'Dave Wilson' LIMIT 1;

INSERT INTO public.expense_claims (employee_id, category, description, amount, status, submitted_date, approved_by, approved_date)
SELECT e.id, 'Tools', 'Replacement multimeter', 189.99, 'Pending', '2024-01-16', NULL, NULL
FROM public.employees e WHERE e.name = 'James Cooper' LIMIT 1;

INSERT INTO public.expense_claims (employee_id, category, description, amount, status, submitted_date, approved_by, approved_date)
SELECT e.id, 'Travel', 'Mileage - Leeds site visit', 67.50, 'Rejected', '2024-01-12', 'Mike Thompson', now()
FROM public.employees e WHERE e.name = 'Sarah Chen' LIMIT 1;

INSERT INTO public.expense_claims (employee_id, category, description, amount, status, submitted_date, approved_by, approved_date)
SELECT e.id, 'PPE', 'Safety boots and gloves', 95.00, 'Approved', '2024-01-10', 'Mike Thompson', now()
FROM public.employees e WHERE e.name = 'Tom Bradley' LIMIT 1;

-- Seed Data: Material Orders (reference supplier IDs)
INSERT INTO public.material_orders (order_number, supplier_id, items, total, status, order_date, delivery_date, ordered_by)
SELECT 'ORD-2024-001', s.id, '[{"name": "Twin & Earth 2.5mm", "qty": 10, "unit": "100m", "price": 89.99}, {"name": "Consumer Unit 12-way", "qty": 2, "price": 145.00}]', 1189.90, 'In Transit', '2024-01-15', '2024-01-17', 'Mike Thompson'
FROM public.suppliers s WHERE s.name = 'Edmundson Electrical' LIMIT 1;

INSERT INTO public.material_orders (order_number, supplier_id, items, total, status, order_date, delivery_date, ordered_by)
SELECT 'ORD-2024-002', s.id, '[{"name": "LED Downlights", "qty": 24, "price": 12.99}, {"name": "Dimmer switches", "qty": 6, "price": 18.50}]', 422.76, 'Delivered', '2024-01-12', '2024-01-13', 'Sarah Chen'
FROM public.suppliers s WHERE s.name = 'CEF' LIMIT 1;

INSERT INTO public.material_orders (order_number, supplier_id, items, total, status, order_date, delivery_date, ordered_by)
SELECT 'ORD-2024-003', s.id, '[{"name": "Schneider iC60N MCBs", "qty": 50, "price": 8.50}]', 425.00, 'Processing', '2024-01-16', NULL, 'Mike Thompson'
FROM public.suppliers s WHERE s.name = 'Schneider Electric' LIMIT 1;

INSERT INTO public.material_orders (order_number, supplier_id, items, total, status, order_date, delivery_date, ordered_by)
SELECT 'ORD-2024-004', s.id, '[{"name": "Cable clips assorted", "qty": 5, "price": 6.99}, {"name": "Drill bits set", "qty": 2, "price": 24.99}]', 84.93, 'Delivered', '2024-01-10', '2024-01-11', 'Dave Wilson'
FROM public.suppliers s WHERE s.name = 'Screwfix' LIMIT 1;

-- Seed Data: Price Book (reference supplier IDs)
INSERT INTO public.price_book (name, category, buy_price, sell_price, unit, supplier_id, stock_level, reorder_level, sku)
SELECT 'Twin & Earth 2.5mm 100m', 'Cable', 89.99, 129.99, 'roll', s.id, 8, 5, 'CAB-TE25-100'
FROM public.suppliers s WHERE s.name = 'Edmundson Electrical' LIMIT 1;

INSERT INTO public.price_book (name, category, buy_price, sell_price, unit, supplier_id, stock_level, reorder_level, sku)
SELECT 'Twin & Earth 1.5mm 100m', 'Cable', 65.99, 94.99, 'roll', s.id, 12, 5, 'CAB-TE15-100'
FROM public.suppliers s WHERE s.name = 'Edmundson Electrical' LIMIT 1;

INSERT INTO public.price_book (name, category, buy_price, sell_price, unit, supplier_id, stock_level, reorder_level, sku)
SELECT 'Consumer Unit 12-way', 'Distribution', 145.00, 210.00, 'each', s.id, 3, 2, 'CU-12WAY'
FROM public.suppliers s WHERE s.name = 'Schneider Electric' LIMIT 1;

INSERT INTO public.price_book (name, category, buy_price, sell_price, unit, supplier_id, stock_level, reorder_level, sku)
SELECT 'LED Downlight 10W', 'Lighting', 12.99, 24.99, 'each', s.id, 45, 20, 'LED-DL10W'
FROM public.suppliers s WHERE s.name = 'CEF' LIMIT 1;

INSERT INTO public.price_book (name, category, buy_price, sell_price, unit, supplier_id, stock_level, reorder_level, sku)
SELECT 'MCB 32A Type B', 'Protection', 8.50, 15.00, 'each', s.id, 25, 10, 'MCB-32B'
FROM public.suppliers s WHERE s.name = 'Schneider Electric' LIMIT 1;

INSERT INTO public.price_book (name, category, buy_price, sell_price, unit, supplier_id, stock_level, reorder_level, sku)
SELECT 'RCD 30mA 2P', 'Protection', 45.00, 75.00, 'each', s.id, 6, 4, 'RCD-30-2P'
FROM public.suppliers s WHERE s.name = 'Schneider Electric' LIMIT 1;

INSERT INTO public.price_book (name, category, buy_price, sell_price, unit, supplier_id, stock_level, reorder_level, sku)
SELECT 'Double Socket White', 'Accessories', 4.50, 12.00, 'each', s.id, 2, 20, 'SOC-DBL-W'
FROM public.suppliers s WHERE s.name = 'Screwfix' LIMIT 1;

INSERT INTO public.price_book (name, category, buy_price, sell_price, unit, supplier_id, stock_level, reorder_level, sku)
SELECT 'Light Switch 1G 2W', 'Accessories', 3.20, 8.50, 'each', s.id, 35, 15, 'SW-1G2W'
FROM public.suppliers s WHERE s.name = 'Screwfix' LIMIT 1;

INSERT INTO public.price_book (name, category, buy_price, sell_price, unit, supplier_id, stock_level, reorder_level, sku)
SELECT 'Junction Box 20A', 'Accessories', 2.80, 6.50, 'each', s.id, 50, 25, 'JB-20A'
FROM public.suppliers s WHERE s.name = 'CEF' LIMIT 1;

INSERT INTO public.price_book (name, category, buy_price, sell_price, unit, supplier_id, stock_level, reorder_level, sku)
SELECT 'Emergency Exit Light', 'Emergency', 28.00, 55.00, 'each', s.id, 8, 5, 'EMG-EXIT'
FROM public.suppliers s WHERE s.name = 'CEF' LIMIT 1;

INSERT INTO public.price_book (name, category, buy_price, sell_price, unit, supplier_id, stock_level, reorder_level, sku)
SELECT 'SWA Cable 4c 6mm 50m', 'Cable', 285.00, 420.00, 'drum', s.id, 2, 2, 'CAB-SWA4-6'
FROM public.suppliers s WHERE s.name = 'Edmundson Electrical' LIMIT 1;

INSERT INTO public.price_book (name, category, buy_price, sell_price, unit, supplier_id, stock_level, reorder_level, sku)
SELECT 'Fire Alarm Smoke Det', 'Fire Safety', 18.50, 35.00, 'each', s.id, 15, 10, 'FA-SMOKE'
FROM public.suppliers s WHERE s.name = 'CEF' LIMIT 1;