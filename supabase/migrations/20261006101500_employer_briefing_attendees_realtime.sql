-- BriefingViewer subscribes to briefing_attendees for live sign-off updates,
-- but the table was never in the realtime publication, so a remote signature
-- never appeared until the page was reloaded. briefings is added for the
-- status / completion counters on the same screen.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'briefing_attendees') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.briefing_attendees;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'briefings') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.briefings;
  END IF;
END $$;
