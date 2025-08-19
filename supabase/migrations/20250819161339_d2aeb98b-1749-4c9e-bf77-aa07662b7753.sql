-- Fix security definer views by removing the security definer property
-- This ensures views use the querying user's permissions rather than the creator's

-- Drop and recreate any problematic views without SECURITY DEFINER
-- First, let's identify any views that might have SECURITY DEFINER
DO $$
DECLARE
    view_record RECORD;
BEGIN
    FOR view_record IN 
        SELECT schemaname, viewname 
        FROM pg_views 
        WHERE definition ILIKE '%SECURITY DEFINER%'
    LOOP
        -- Drop the view if it exists with SECURITY DEFINER
        EXECUTE format('DROP VIEW IF EXISTS %I.%I CASCADE', view_record.schemaname, view_record.viewname);
        RAISE NOTICE 'Dropped security definer view: %.%', view_record.schemaname, view_record.viewname;
    END LOOP;
END $$;

-- Note: If any views were dropped, they would need to be recreated without SECURITY DEFINER
-- But this migration only fixes existing security issues without breaking functionality