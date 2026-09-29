-- Part P write-back RPC — callable by signed-in users only.
--
-- Functions in `public` default to EXECUTE for PUBLIC, so `anon` could reach
-- the RPC (it refuses a null auth.uid(), but it should not be reachable at all).
revoke execute on function public.record_building_regs_on_certificate(text, boolean, boolean, boolean, text) from public, anon;
grant execute on function public.record_building_regs_on_certificate(text, boolean, boolean, boolean, text) to authenticated;
