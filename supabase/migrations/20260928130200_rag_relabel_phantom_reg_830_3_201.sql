-- The phantom regulation "830.3.201".
--
-- The A4:2026 ingest read the Appendix 6 condition report inspection schedule
-- (page 529) and, from a garbled bracket at the top of one chunk, filed the
-- whole page as "Part 8 · Chapter 83 · Reg 830.3.201". BS 7671 has no Chapter
-- 83: Part 8 in the corpus ends at 826.x, no other chunk or cross-reference
-- mentions an 83x number, and the row has no title. Its 25 facets are the
-- schedule items (presence of CPCs, concealed cables in zones, 30 mA RCD for
-- socket-outlets…), so any socket/RCD/CPC observation retrieves them and the
-- observation writer cites "Regulation 830.3.201" in good faith — 65 reports
-- in production carry it, 61 issued (16 Feb – 25 Sep 2026).
--
-- Relabel, do not delete: the facets ground good wording. Cited as
-- "Appendix 6" the reference is true. The allow-list row is removed so the
-- citation verifier flags the number if a model ever produces it from memory.


update public.bs7671_regulations
set reg_number     = 'Appendix 6',
    title          = 'Condition report inspection schedule',
    part           = 'Appendices',
    part_number    = null,
    chapter        = 'Appendix 6',
    chapter_number = null,
    section        = null,
    section_number = null
where id = '2e348a30-3db4-4c2b-befd-0adde8b3bd6c'
  and reg_number = '830.3.201';

update public.bs7671_facets
set context_prefix = replace(
      context_prefix,
      'Part 8 — Functional Requirements · Chapter 83 · Reg 830.3.201',
      'Appendix 6 · Condition report inspection schedule')
where regulation_id = '2e348a30-3db4-4c2b-befd-0adde8b3bd6c'
  and context_prefix like '%Chapter 83 · Reg 830.3.201%';

delete from public.bs7671_known_reg_numbers where reg_number = '830.3.201';

