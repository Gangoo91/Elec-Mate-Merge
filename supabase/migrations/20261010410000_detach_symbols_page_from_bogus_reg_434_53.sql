-- BS 7671 has no Regulation 434.53. The OCR of the "Symbols used in BS 7671"
-- page produced a bs7671_regulations row numbered 434.53 (its text begins
-- "434.53 4116.2 4421.2 … SYMBOLS USED IN BS 7671"), and its 20 facets were
-- cited by Mate as "Regulation 434.53 — Symbols used in BS 7671" (10 Oct
-- 2026). Detach those facets (they cite as plain BS 7671, like 7,880 others)
-- and drop the number from the known-number list the citation check uses.
update public.bs7671_facets
set regulation_id = null
where regulation_id = (
  select id from public.bs7671_regulations where reg_number = '434.53'
);

delete from public.bs7671_known_reg_numbers where reg_number = '434.53';

-- Three facets carry the bogus number in their own text. One only says an
-- "index entry flags Reg 434.53" — nothing true in it, so it goes. The other
-- two describe the real symbols list; name the list instead of the number.
delete from public.bs7671_facets
where id = '512a9048-7092-4093-b78d-e096c38ad9a0' and content like 'Reference to Regulation 434.53 in the index%';

update public.bs7671_facets
set content = replace(content, '(Regulation 434.53 area)', '(the ''Symbols used in BS 7671'' list)')
where id = '607975b4-01ec-458c-b333-eabb90352a89';

update public.bs7671_facets
set content = replace(content, 'Regulation 434.53 of BS 7671 provides', 'BS 7671''s ''Symbols used in BS 7671'' list provides')
where id = '75b5b554-0857-4ec7-97a5-060cb2a7349e';
