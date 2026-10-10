-- Remove the unused mock-topic → qualification-criteria mapping (Andrew, 10 Oct 2026:
-- "remove the lesson criteria"). Built 10 Oct, then left unused after "Study
-- Centre only, don't encroach on colleges". Nothing in the app read it; nothing
-- else in the database depended on it (checked). The 7,688 mappings were saved
-- before dropping. The edge function map-mock-topics-to-criteria was deleted too.
drop function if exists public.my_criteria_knowledge(integer);
drop function if exists public._mock_topic_corpus();
drop table if exists public.mock_topic_criteria;
