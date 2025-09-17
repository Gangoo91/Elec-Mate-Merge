-- Clear the live education cache to force refresh with new professional qualifications
DELETE FROM public.live_education_cache WHERE category = 'all';