-- Clear all existing time entries and tracking sessions
DELETE FROM time_entries;
DELETE FROM time_tracking_sessions;
DELETE FROM study_sessions;

-- Reset any auto-increment sequences if they exist
-- This ensures clean slate for new time tracking