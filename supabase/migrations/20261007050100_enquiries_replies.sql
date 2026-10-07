-- ELE-2022: replies sent from the app (email now; texts later), kept on the card
alter table public.enquiries add column if not exists replies jsonb not null default '[]'::jsonb;
comment on column public.enquiries.replies is 'Replies sent from Elec-Mate: [{at, via:"email", by, to, text}], newest last, max 20. Written by enquiry-send-reply.';
