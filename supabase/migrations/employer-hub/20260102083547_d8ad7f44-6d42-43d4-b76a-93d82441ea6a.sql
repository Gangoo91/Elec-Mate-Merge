-- Add pay type and annual salary columns to employees table
ALTER TABLE public.employees 
ADD COLUMN IF NOT EXISTS pay_type text NOT NULL DEFAULT 'hourly',
ADD COLUMN IF NOT EXISTS annual_salary numeric NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.employees.pay_type IS 'Payment type: hourly, annual, or day_rate';
COMMENT ON COLUMN public.employees.annual_salary IS 'Annual salary amount for annual pay type employees';