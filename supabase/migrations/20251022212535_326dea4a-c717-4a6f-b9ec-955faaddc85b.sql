-- Phase 1: Add status tracking timestamps
ALTER TABLE quotes 
ADD COLUMN IF NOT EXISTS invoice_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS invoice_paid_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS invoice_payment_method TEXT,
ADD COLUMN IF NOT EXISTS invoice_payment_reference TEXT;

-- Phase 3: Add payment tracking table (future: partial payments)
CREATE TABLE IF NOT EXISTS invoice_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  payment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  payment_method TEXT,
  payment_reference TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on invoice_payments
ALTER TABLE invoice_payments ENABLE ROW LEVEL SECURITY;

-- Users can manage their own payment records
CREATE POLICY "Users can manage their own invoice payments"
ON invoice_payments
FOR ALL
USING (auth.uid() = user_id);

-- Add reminder tracking table
CREATE TABLE IF NOT EXISTS invoice_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reminder_type TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_to_email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on invoice_reminders
ALTER TABLE invoice_reminders ENABLE ROW LEVEL SECURITY;

-- Users can manage their own reminder records
CREATE POLICY "Users can manage their own invoice reminders"
ON invoice_reminders
FOR ALL
USING (auth.uid() = user_id);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_quotes_invoice_status ON quotes(invoice_status) WHERE invoice_raised = true;
CREATE INDEX IF NOT EXISTS idx_quotes_invoice_sent_at ON quotes(invoice_sent_at) WHERE invoice_raised = true;
CREATE INDEX IF NOT EXISTS idx_quotes_invoice_paid_at ON quotes(invoice_paid_at) WHERE invoice_raised = true;
CREATE INDEX IF NOT EXISTS idx_invoice_payments_quote_id ON invoice_payments(quote_id);
CREATE INDEX IF NOT EXISTS idx_invoice_reminders_quote_id ON invoice_reminders(quote_id);