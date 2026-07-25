-- ELE-226 hardening — cron-only fan-out functions must NOT be REST-callable by
-- anon/authenticated (they notify ALL users). pg_cron runs them as the owner, so
-- scheduled runs are unaffected. mark_quote_viewed stays anon-callable by design
-- (the public quote page has no auth), and notify_user stays locked.
revoke execute on function public.notify_cert_reinspections()  from public, anon, authenticated;
revoke execute on function public.notify_compliance_expiries() from public, anon, authenticated;
revoke execute on function public.notify_ecs_expiries()        from public, anon, authenticated;
