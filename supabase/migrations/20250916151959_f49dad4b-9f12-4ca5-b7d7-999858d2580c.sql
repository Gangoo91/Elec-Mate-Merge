-- Clear old static sample data and reset the industry_news table for fresh live data
DELETE FROM industry_news WHERE source_name IN ('Sample Source', 'Electrical Times Sample', 'Professional Electrician Sample', 'System Notice');

-- Update any remaining old entries to be inactive so fresh data takes precedence
UPDATE industry_news 
SET is_active = false 
WHERE created_at < (CURRENT_DATE - INTERVAL '7 days');