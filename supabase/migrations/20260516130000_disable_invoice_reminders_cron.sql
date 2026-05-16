-- Migration: Disable the daily automated invoice overdue reminders cron job.
--
-- Why: The product direction has shifted to manual-only reminders. Users
-- see overdue invoices in the dashboard and trigger reminders themselves
-- via the PaymentReminderButton component, picking the tone (gentle /
-- firm / final) for each send. Auto-firing has been removed to give the
-- electrician full control over client communications.
--
-- The helper functions `setup_invoice_reminders_cron()` and
-- `disable_invoice_reminders_cron()` from migration 20260226090000 remain
-- in place so the cron can be trivially re-enabled later if needed —
-- just `select public.setup_invoice_reminders_cron();`.
--
-- The edge function `automated-invoice-reminders` is also left in the
-- repo for the same reason (reversibility).

do $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    if exists (select 1 from cron.job where jobname = 'daily-invoice-reminders') then
      perform cron.unschedule('daily-invoice-reminders');
      raise notice 'Unscheduled daily-invoice-reminders cron job.';
    else
      raise notice 'daily-invoice-reminders cron job already absent.';
    end if;
  else
    raise notice 'pg_cron extension not present; nothing to unschedule.';
  end if;
end;
$$;
