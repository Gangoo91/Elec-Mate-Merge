-- ELE-1808 follow-up — RAG facts that disagreed with the printed BS 7671.
-- Applied 4 Oct 2026 on Andrew's instruction ("apply rag fix").
--
-- Source of truth: BS 7671:2018+A4:2026 as printed
-- (Desktop/05 Trade Reference/BS7671_ocr.pdf), read from the page images:
--   Table 41.1 (p. 71), Regs 411.3.2.3 / 411.3.2.4, Table 4D5 (p. 484).
--
-- Table 41.1, maximum disconnection times (s):
--   U0           TN AC  TN DC   TT AC  TT DC
--   50–120 V     0.8    NOTE 1  0.3    NOTE 1
--   120–230 V    0.4    1       0.2    0.4
--   230–400 V    0.2    0.4     0.07   0.2
--   > 400 V      0.1    0.1     0.04   0.1
-- Six rows had values from the wrong cells — including "TT AC at 230 V =
-- 0.4 s", the most common UK case (the book says 0.2 s). That row had already
-- led the app's IT learning path to delete its correct TT 0.2 s line.
--
-- Flat twin and earth: Table 4D5 Reference Method C (clipped direct), amps,
-- and mV/A/m — 1.0: 16 / 44 · 1.5: 20 / 29 · 2.5: 27 / 18 · 4: 37 / 11 ·
-- 6: 47 / 7.3 · 10: 64 / 4.4 · 16: 85 / 2.8. Table 4D5 stops at 16 mm².
-- Twenty rows added 2 May 2026 were wrong:
--   - ten labelled "Table 4D1A PVC T+E" (4D1A is the SINGLE-CORE table) with
--     values matching no column of 4D5 (2.5 mm² = 24 A); seven are rewritten
--     to the Table 4D5 figures, and the 25/35/50 mm² rows deleted because 4D5
--     does not tabulate T&E above 16 mm²;
--   - ten labelled "Table 4D5A XLPE T+E 90C" — BS 7671 has no Table 4D5A
--     (the list of tables runs 4D5 → 4E1A). Deleted. The real rule, Reg 523.1
--     NOTE 3 (70 °C ratings may be used for 90 °C cables), is already a facet.
--
-- The embedding of a rewritten row is left as it was: the topic is unchanged,
-- only the figure, and tsv is a generated column so keyword search updates.
--
-- Old values, for rollback:
--   143348ff… TT DC 230–400 = 0.04 s · a7127895… / 38b04ac4… TN DC 230–400 = 0.1 s
--   e4f7a31c… TN DC 120–230 = 0.2 s · 326619b6… TN AC 230–400 = 0.4 s
--   eb9f6d36… TT AC 120–230 = 0.4 s · ff965b90… TT DC 50–120 "0.2 s shall be applied"
--   T&E "4D1A" (A): 1.0 13, 1.5 16, 2.5 24, 4 32, 6 41, 10 57, 16 76, 25 101, 35 125, 50 151
--     context_prefix 'BS 7671:2018+A4:2026 Appendix 4 Table 4D1A PVC T+E 70C Method C clipped direct'
--   "4D5A" (A): 1.0 16, 1.5 20, 2.5 30, 4 40, 6 51, 10 70, 16 94, 25 125, 35 156, 50 188

-- ── Table 41.1 ────────────────────────────────────────────────────────────
UPDATE public.bs7671_facets SET content = 'Table 41.1 requires a maximum disconnection time of 0.2 s for AC TT systems where the nominal line-to-earth voltage U0 is over 120 V and up to 230 V — the usual UK 230 V case. Apply it to final circuits within the scope of Regulation 411.3.2.2 (up to 63 A with socket-outlets, up to 32 A supplying only fixed equipment). The TN figure for the same voltage is 0.4 s.'
  WHERE id = 'eb9f6d36-f938-4a69-90b3-15f9736b3a78';
UPDATE public.bs7671_facets SET content = 'Table 41.1 requires a maximum disconnection time of 0.2 s for AC TN systems where the nominal line-to-earth voltage U0 is over 230 V and up to 400 V. This is the applicable time for final circuits covered by Regulation 411.3.2.2. (0.4 s is the TN figure for 120–230 V.)'
  WHERE id = '326619b6-8644-4416-9038-48871c548e26';
UPDATE public.bs7671_facets SET content = 'Table 41.1 requires a maximum disconnection time of 1 s for DC in TN systems where the nominal line-to-earth voltage U0 is over 120 V and up to 230 V. This value applies to final circuits as defined in Regulation 411.3.2.2.'
  WHERE id = 'e4f7a31c-3c0e-47c4-b02a-b3bb1d7dfb44';
UPDATE public.bs7671_facets SET content = 'Table 41.1 lists for DC in TN systems a maximum disconnection time of 0.4 s where the nominal line-to-earth voltage U0 is over 230 V and up to 400 V. This is the DC TN entry and shall be applied to relevant final circuits under Regulation 411.3.2.2.'
  WHERE id = 'a7127895-4082-4d50-873e-730a4029097e';
UPDATE public.bs7671_facets SET content = 'Table 41.1 requires a maximum disconnection time of 0.4 s for DC in TN systems where the nominal line-to-earth voltage U0 is over 230 V and up to 400 V. Apply this time to final circuits within the scope of Regulation 411.3.2.2. (0.1 s is the DC TN figure above 400 V.)'
  WHERE id = '38b04ac4-2553-4d4d-820e-de94f4e04a41';
UPDATE public.bs7671_facets SET content = 'Table 41.1 lists a maximum disconnection time of 0.2 s for DC in TT systems where the nominal line-to-earth voltage U0 is over 230 V and up to 400 V. Apply this value to final circuits within the scope of Regulation 411.3.2.2. (0.04 s is the AC TT figure above 400 V.)'
  WHERE id = '143348ff-d648-4352-9115-eb9e0f458d68';
UPDATE public.bs7671_facets SET content = 'Table 41.1 gives NOTE 1, not a time, for DC in TT systems where the nominal line-to-earth voltage U0 is over 50 V and up to 120 V: disconnection is not required for protection against electric shock, but may be required for other reasons such as protection against thermal effects.'
  WHERE id = 'ff965b90-78af-4871-bb41-2b8f3b08a4f6';

-- ── Flat twin and earth: rewrite 1–16 mm² to Table 4D5 Method C ───────────
UPDATE public.bs7671_facets
SET context_prefix = 'BS 7671:2018+A4:2026 Appendix 4 Table 4D5 70C thermoplastic flat twin and earth Reference Method C clipped direct',
    content = format(
      'Current-carrying capacity (It) for %s mm² 70 °C thermoplastic flat twin and earth cable (with protective conductor), Reference Method C (clipped direct), is %s A, per BS 7671 Table 4D5 at 30 °C ambient, single circuit. Its voltage drop is %s mV/A/m. Apply rating factors for ambient temperature (Table 4B1), grouping (Table 4C1, single layer on a wall: 0.85 for 2 circuits) and thermal insulation as required.',
      v.size, v.amps, v.mv)
FROM (VALUES
  ('4022aadb-5611-4593-aa14-9c390e1a9287'::uuid, '1.0', '16', '44'),
  ('26068439-50d5-4179-a53e-aaf13d038011'::uuid, '1.5', '20', '29'),
  ('09387704-3665-4d6c-a3cf-50dcae546714'::uuid, '2.5', '27', '18'),
  ('fc164a88-ab61-4a38-97ea-545fabd1e8e3'::uuid, '4', '37', '11'),
  ('06ab5590-1833-46be-ae06-ddc938b2c2f4'::uuid, '6', '47', '7.3'),
  ('820f9465-0487-4343-b36e-677277a7c324'::uuid, '10', '64', '4.4'),
  ('1dd6df93-459f-4e14-a6cb-d1a96e4efaff'::uuid, '16', '85', '2.8')
) AS v(id, size, amps, mv)
WHERE public.bs7671_facets.id = v.id;

-- ── Delete: T&E sizes Table 4D5 does not tabulate, and the invented "4D5A" ─
DELETE FROM public.bs7671_facets WHERE id IN (
  'd71948b9-8ca3-4b46-80f2-e9a40338d17e', -- "4D1A" 25 mm²
  'bb6da0d3-a80a-40ca-94a1-a4487afd10c6', -- "4D1A" 35 mm²
  '2360715c-3287-4633-8b3b-f82d37c1fad8', -- "4D1A" 50 mm²
  '46bd219d-909d-4aba-9758-a2c4cab7cb05', '4599cfc3-c8ee-46ba-97e4-7b78b4a991ff',
  'a85b3f77-cfc8-4f5f-8987-f5f3637afbd3', 'f7066f74-e8a9-4a31-935a-caeac681daff',
  '97bb4824-24b0-4ab6-82e0-43ea2fbe29f3', '0e4c44a1-33cc-497e-97d5-8fef7da48e78',
  '692f640f-7f00-46c0-9db5-ef50ee3acf63', 'c27dacf7-47b3-44d8-8937-fbbc4ace80fe',
  'd18ba6e9-ea4e-45fe-982e-9d75e5d0787f', 'f8a5257e-6f3c-46b8-8d03-19f7ae06b9db'
);
