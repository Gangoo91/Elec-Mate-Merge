-- Add foreign key constraint between reports and customers
ALTER TABLE reports 
ADD CONSTRAINT fk_reports_customer 
FOREIGN KEY (customer_id) 
REFERENCES customers(id) 
ON DELETE SET NULL;

-- Add trigger to auto-update customers.updated_at
CREATE TRIGGER update_customers_updated_at 
BEFORE UPDATE ON customers 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();