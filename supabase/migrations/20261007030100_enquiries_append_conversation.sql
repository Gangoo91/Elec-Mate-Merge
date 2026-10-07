-- ELE-2022 calls/texts: a voicemail or follow-up text joins its card. The original
-- message stays immutable, but the server may APPEND to it (never rewrite it), and
-- may move message_id on so a retried webhook is caught as a duplicate.
create or replace function public.tg_enquiries_touch()
returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  if old.status = 'new' and new.status <> 'new' and new.first_actioned_at is null then
    new.first_actioned_at := now();
  end if;
  new.raw_from := old.raw_from;
  new.raw_subject := old.raw_subject;
  new.received_at := old.received_at;
  new.user_id := old.user_id;
  if current_user in ('service_role', 'postgres', 'supabase_admin') then
    -- Append-only: what was there must still be there, unchanged, at the start
    if old.raw_text is not null
       and (new.raw_text is null or left(new.raw_text, length(old.raw_text)) <> old.raw_text) then
      new.raw_text := old.raw_text;
    end if;
    new.message_id := coalesce(new.message_id, old.message_id);
  else
    new.raw_text := old.raw_text;
    new.message_id := old.message_id;
    new.photos := old.photos;
    new.nudged_at := old.nudged_at;
  end if;
  return new;
end $$;

-- When the customer said they're free ({days, earliest, latest, note}); visit times respect it
alter table public.enquiries add column if not exists availability jsonb;
comment on column public.enquiries.availability is 'Customer''s stated free times read by AI, e.g. {"days":null,"earliest":"15:00","latest":null,"note":"Any day after 3pm"}. Suggested visit times respect it.';
