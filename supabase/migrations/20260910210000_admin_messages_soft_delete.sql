-- Soft delete for admin messages.
--
-- RLS already allowed admins a hard DELETE, but nothing in the UI used it and a
-- support thread is not a safe thing to destroy on a mis-tap: it is the record
-- of what somebody reported, and it can matter later for a dispute or a
-- safeguarding question. `deleted_at` hides the row everywhere while keeping it
-- recoverable, which is what the Undo on the toast restores.
--
-- Archive and delete stay separate and mean different things: archive is "dealt
-- with, get it out of my inbox", delete is "this should not be here".
alter table public.admin_messages
  add column if not exists deleted_at timestamp with time zone;

comment on column public.admin_messages.deleted_at is
  'Soft delete. Non-null hides the message from every view; the row is kept so an accidental delete can be undone. Not the same as archived_at, which only hides a handled thread from the inbox.';

-- The inbox filters on this constantly, and it is almost always null.
create index if not exists admin_messages_deleted_at_idx
  on public.admin_messages (deleted_at)
  where deleted_at is null;
