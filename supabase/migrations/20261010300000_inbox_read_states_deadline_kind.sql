-- The EPA-organisation deadline rows (ELE-2041, 20261010220600) gave the
-- college inbox a new kind, 'deadline', but the read-state table only accepted
-- the older kinds. "Mark all seen" writes every item in one upsert, so a single
-- deadline row failed the whole batch with a 400 and nothing was marked seen;
-- opening a deadline row failed the same way.
--
-- Any new inbox kind must be added here too.
alter table public.college_inbox_read_states
  drop constraint college_inbox_read_states_source_check;

alter table public.college_inbox_read_states
  add constraint college_inbox_read_states_source_check
  check (source = any (array[
    'portfolio', 'otj', 'iqa', 'message', 'hours', 'app_learning', 'evidence',
    'comment', 'review', 'checkin', 'marking', 'deadline'
  ]));
