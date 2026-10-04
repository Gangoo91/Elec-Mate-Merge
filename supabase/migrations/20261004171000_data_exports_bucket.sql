-- Private store for "Download my data" ZIPs (ELE-1812). Paths are
-- <user_id>/elec-mate-data-<date>.zip, so the account purge
-- (gdpr_list_user_storage: name like '<id>/%') removes them with the account.
-- Only the service role writes; downloads are via 7-day signed URLs.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('data-exports', 'data-exports', false, 524288000, array['application/zip'])
on conflict (id) do nothing;
