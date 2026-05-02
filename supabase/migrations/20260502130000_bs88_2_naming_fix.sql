-- Fix BS 88-2 facet naming so the modern standard name (BS 88-2) matches search.
--
-- The validated Zs facets use "BS 88-2.2" (the older IEC name). Modern queries
-- and the BS 7671:2018+A4:2026 standard refer to it as just "BS 88-2", so the
-- token doesn't appear in tsv → search misses these cells. Embed both forms.

UPDATE public.bs7671_facets
SET
  primary_topic = REPLACE(primary_topic, 'BS 88-2.2 gG fuse', 'BS 88-2 / 88-2.2 gG fuse'),
  content       = REPLACE(content,       'BS 88-2.2 (BS EN 60269-2) gG / HRC fuse',
                                          'BS 88-2 (formerly BS 88-2.2; BS EN 60269-2) gG / HRC fuse')
WHERE facet_hash LIKE 'mate-validated/zs/bs88-2-%';
