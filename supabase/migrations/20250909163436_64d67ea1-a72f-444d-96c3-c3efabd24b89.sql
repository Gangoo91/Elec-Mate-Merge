-- Clear cache with incorrect sealant tools data
DELETE FROM tools_weekly_cache WHERE category = 'all_tools' AND tools_data::text ILIKE '%sealant%';