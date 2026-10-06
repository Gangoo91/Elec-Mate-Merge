-- ELE-1988: worker_notify(user, type, title, message, data) writes a bell row
-- AND sends a real push to ANY user id. It was executable by `authenticated`,
-- so any signed-in account could push arbitrary text to anyone via
-- rpc('worker_notify'). Nothing in the client calls it; every caller is a
-- SECURITY DEFINER trigger/RPC (checked live 7 Oct), which runs as the owner
-- and is unaffected.
revoke all on function public.worker_notify(uuid, text, text, text, jsonb) from public, anon, authenticated;
