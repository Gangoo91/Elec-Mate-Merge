-- Pin search_path on the Live Pricing helper functions (advisor:
-- function_search_path_mutable). They are pure SQL with no object references,
-- but they run inside SECURITY DEFINER callers, so pin it anyway.

alter function public.live_pricing_classify_job(text) set search_path = public;
alter function public.live_pricing_classify_item(text) set search_path = public;
alter function public.live_pricing_extract_postcode(text) set search_path = public;
alter function public.live_pricing_region_from_postcode(text) set search_path = public;
