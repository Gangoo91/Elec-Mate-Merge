-- ELE-226 — payment_recovered now routes through notify_user (bell + push) in
-- stripe-subscription-webhook, completing the payment lifecycle notifications.
insert into public.notification_types (type, category, push, importance) values
  ('payment_recovered', 'invoices_quotes', true, 1)
on conflict (type) do update set category = excluded.category, push = excluded.push,
  importance = excluded.importance, updated_at = now();
