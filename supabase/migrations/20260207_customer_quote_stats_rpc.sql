-- RPC to get quote/invoice stats for a batch of customers
CREATE OR REPLACE FUNCTION get_customer_quote_stats(p_customer_ids UUID[])
RETURNS TABLE(
  customer_id UUID,
  quote_count INTEGER,
  invoice_count INTEGER,
  total_quoted NUMERIC,
  total_invoiced NUMERIC,
  last_quote_date TIMESTAMPTZ,
  last_invoice_date TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    q.customer_id,
    COUNT(*) FILTER (WHERE NOT COALESCE(q.invoice_raised, false))::INTEGER,
    COUNT(*) FILTER (WHERE COALESCE(q.invoice_raised, false))::INTEGER,
    COALESCE(SUM(q.total) FILTER (WHERE NOT COALESCE(q.invoice_raised, false)), 0),
    COALESCE(SUM(q.total) FILTER (WHERE COALESCE(q.invoice_raised, false)), 0),
    MAX(q.created_at) FILTER (WHERE NOT COALESCE(q.invoice_raised, false)),
    MAX(q.created_at) FILTER (WHERE COALESCE(q.invoice_raised, false))
  FROM quotes q
  WHERE q.customer_id = ANY(p_customer_ids) AND q.deleted_at IS NULL
  GROUP BY q.customer_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
