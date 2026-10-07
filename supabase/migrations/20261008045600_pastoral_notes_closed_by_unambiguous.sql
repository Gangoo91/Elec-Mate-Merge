-- pastoral_notes.closed_by gained a second foreign key to college_staff (7 Oct), which made the
-- live client's `college_staff(name)` embed ambiguous: Student 360 Notes and the safeguarding
-- queue loaded nothing. Drop that FK (keep the column) so the released build works now. The new
-- client names the author FK explicitly; re-add this constraint after the release ships.
alter table public.pastoral_notes drop constraint if exists pastoral_notes_closed_by_fkey;
notify pgrst, 'reload schema';
