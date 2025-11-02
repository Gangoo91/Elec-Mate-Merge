-- Create a view to expose facet distribution stats
CREATE OR REPLACE VIEW public.facet_distribution_view
WITH (security_invoker = true)
AS
  SELECT * FROM public.get_facet_distribution_stats();

-- Grant access to authenticated users
GRANT SELECT ON public.facet_distribution_view TO authenticated;