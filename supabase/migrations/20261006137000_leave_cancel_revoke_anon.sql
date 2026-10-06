-- Security advisor hygiene: cancel_my_leave_request is a worker-only RPC.
-- It was already safe for anon (it only finds rows in my_employee_ids(), which
-- is empty without a session), but a signed-out caller has no reason to reach it.
revoke execute on function public.cancel_my_leave_request(uuid) from public, anon;
grant execute on function public.cancel_my_leave_request(uuid) to authenticated;
