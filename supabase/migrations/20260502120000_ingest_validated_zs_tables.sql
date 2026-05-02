-- Ingest validated BS 7671 Zs tables (41.2 / 41.3 / 41.4 / 41.5) as facets.
--
-- Source of truth: src/data/zsLimits.ts — used by the app's Zs validation +
-- compliance checking on certificates. Values are A4:2026, Cmin = 0.95 applied.
-- These are the same numbers an electrician sees on the inspection-and-testing
-- screens, so Mate citing them is consistent with what the app already states.
--
-- Each cell becomes one facet with:
--   primary_topic = "Zs 1.37 Ω · Type B 32 A · 230 V · 0.4 s · Table 41.3(a)"
--   content       = full sentence with reg ref + GN3 0.80 site factor note
--   facet_hash    = "mate-validated/zs/<key>" (idempotent re-runs)
--
-- Idempotent: the leading DELETE clears any prior import so re-running cleans up
-- and re-inserts the canonical set.

DO $$
DECLARE
  v_edition_id uuid;
  v_chunk_b uuid;
  v_chunk_c uuid;
  v_chunk_d uuid;
  v_chunk_f88_2_04 uuid;
  v_chunk_f88_2_5 uuid;
  v_chunk_f88_3_04 uuid;
  v_chunk_f88_3_5 uuid;
  v_chunk_f3036_04 uuid;
  v_chunk_f3036_5 uuid;
  v_chunk_f1362_04 uuid;
  v_chunk_f1362_5 uuid;
  v_chunk_rcd uuid;

  -- Helper: tuple of (rating_amps, max_zs_ohms)
  -- Type B MCBs — Table 41.3(a). Values identical for 0.4 s and 5 s
  -- because the magnetic trip (5×In) dominates over the thermal characteristic.
  type_b CONSTANT numeric[][] := ARRAY[
    ARRAY[3, 14.57], ARRAY[6, 7.28], ARRAY[10, 4.37], ARRAY[16, 2.73],
    ARRAY[20, 2.19], ARRAY[25, 1.75], ARRAY[32, 1.37], ARRAY[40, 1.09],
    ARRAY[50, 0.87], ARRAY[63, 0.69], ARRAY[80, 0.55], ARRAY[100, 0.44],
    ARRAY[125, 0.35]
  ];
  -- Type C MCBs — Table 41.3(b). Same: 0.4 s = 5 s (magnetic trip 10×In).
  type_c CONSTANT numeric[][] := ARRAY[
    ARRAY[6, 3.64], ARRAY[10, 2.19], ARRAY[16, 1.37], ARRAY[20, 1.09],
    ARRAY[25, 0.87], ARRAY[32, 0.68], ARRAY[40, 0.55], ARRAY[50, 0.44],
    ARRAY[63, 0.35], ARRAY[80, 0.27], ARRAY[100, 0.22], ARRAY[125, 0.17]
  ];
  -- Type D MCBs — Table 41.3(c). 0.4 s values (magnetic trip 20×In).
  type_d_04 CONSTANT numeric[][] := ARRAY[
    ARRAY[6, 1.82], ARRAY[10, 1.09], ARRAY[16, 0.68], ARRAY[20, 0.55],
    ARRAY[25, 0.44], ARRAY[32, 0.34], ARRAY[40, 0.27], ARRAY[50, 0.22],
    ARRAY[63, 0.17], ARRAY[80, 0.14], ARRAY[100, 0.11], ARRAY[125, 0.09]
  ];
  -- Type D 5 s values fall back to thermal characteristic (matches Type C).
  type_d_5 CONSTANT numeric[][] := ARRAY[
    ARRAY[6, 3.64], ARRAY[10, 2.19], ARRAY[16, 1.37], ARRAY[20, 1.09],
    ARRAY[25, 0.87], ARRAY[32, 0.68], ARRAY[40, 0.55], ARRAY[50, 0.44],
    ARRAY[63, 0.35], ARRAY[80, 0.27], ARRAY[100, 0.22], ARRAY[125, 0.17]
  ];
  -- BS 88-2.2 gG (HRC) fuses — Table 41.2(a) at 0.4 s
  fuse_88_2_04 CONSTANT numeric[][] := ARRAY[
    ARRAY[2, 33.1], ARRAY[4, 15.6], ARRAY[6, 7.8], ARRAY[10, 4.65],
    ARRAY[16, 2.43], ARRAY[20, 1.68], ARRAY[25, 1.29], ARRAY[32, 0.99],
    ARRAY[40, 0.75], ARRAY[50, 0.57], ARRAY[63, 0.44]
  ];
  -- BS 88-2.2 gG fuses — Table 41.4(a) at 5 s
  fuse_88_2_5 CONSTANT numeric[][] := ARRAY[
    ARRAY[2, 44], ARRAY[4, 21], ARRAY[6, 12], ARRAY[10, 6.8],
    ARRAY[16, 4.0], ARRAY[20, 2.8], ARRAY[25, 2.2], ARRAY[32, 1.7],
    ARRAY[40, 1.3], ARRAY[50, 0.99], ARRAY[63, 0.78], ARRAY[80, 0.55],
    ARRAY[100, 0.42], ARRAY[125, 0.32], ARRAY[160, 0.27], ARRAY[200, 0.18]
  ];
  -- BS 88-3 fuses — Table 41.2(b) at 0.4 s
  fuse_88_3_04 CONSTANT numeric[][] := ARRAY[
    ARRAY[5, 9.93], ARRAY[16, 2.3], ARRAY[20, 1.93],
    ARRAY[32, 0.91], ARRAY[45, 0.57], ARRAY[63, 0.36]
  ];
  -- BS 88-3 fuses — Table 41.4(b) at 5 s
  fuse_88_3_5 CONSTANT numeric[][] := ARRAY[
    ARRAY[5, 14.6], ARRAY[16, 3.9], ARRAY[20, 3.2], ARRAY[32, 1.6],
    ARRAY[45, 1.0], ARRAY[63, 0.68], ARRAY[80, 0.51], ARRAY[100, 0.38]
  ];
  -- BS 3036 rewirable fuses — Table 41.2(c) at 0.4 s
  fuse_3036_04 CONSTANT numeric[][] := ARRAY[
    ARRAY[5, 9.1], ARRAY[15, 2.43], ARRAY[20, 1.68],
    ARRAY[30, 1.04], ARRAY[45, 0.56], ARRAY[60, 0.4]
  ];
  -- BS 3036 — Table 41.4(c) at 5 s
  fuse_3036_5 CONSTANT numeric[][] := ARRAY[
    ARRAY[5, 16.8], ARRAY[15, 5.08], ARRAY[20, 3.64],
    ARRAY[30, 2.51], ARRAY[45, 1.51], ARRAY[60, 1.07], ARRAY[100, 0.51]
  ];
  -- BS 1362 plug-top fuses — Table 41.2(d) at 0.4 s
  fuse_1362_04 CONSTANT numeric[][] := ARRAY[
    ARRAY[3, 15.6], ARRAY[13, 2.3]
  ];
  -- BS 1362 — Table 41.4(d) at 5 s
  fuse_1362_5 CONSTANT numeric[][] := ARRAY[
    ARRAY[3, 22.0], ARRAY[13, 3.64]
  ];
  -- RCDs — Table 41.5. Values: rated residual current (mA), max Zs (Ω)
  rcd_table CONSTANT numeric[][] := ARRAY[
    ARRAY[30, 1667], ARRAY[100, 500], ARRAY[300, 167], ARRAY[500, 100]
  ];

  rec RECORD;
  i int;
BEGIN
  -- ── 0. Resolve edition ──────────────────────────────────────────────
  SELECT id INTO v_edition_id
  FROM bs7671_editions
  WHERE is_active = true AND document_type = 'bs7671'
  LIMIT 1;

  IF v_edition_id IS NULL THEN
    RAISE EXCEPTION 'No active bs7671 edition found';
  END IF;

  -- ── 1. Wipe prior mate-validated facets so this is idempotent ──────
  DELETE FROM bs7671_facets WHERE facet_hash LIKE 'mate-validated/zs/%';

  -- ── 2. Synthetic chunks: one per sub-table for context_prefix grouping
  --     UNIQUE (edition_id, content_hash) → idempotent ON CONFLICT
  INSERT INTO bs7671_chunks (edition_id, chunk_type, content, content_hash, metadata)
  VALUES
    (v_edition_id, 'paragraph',
     'BS 7671:2018+A4:2026 Table 41.3(a) — Maximum earth fault loop impedance Zs (Ω) for Type B MCBs to BS EN 60898 and overcurrent characteristic of RCBOs to BS EN 61009-1 at 230 V. Values apply to both 0.4 s (final circuits) and 5 s (distribution circuits) because the magnetic trip dominates. Cmin = 0.95.',
     'mate-validated/zs/chunk/41.3-typeB',
     '{"source":"src/data/zsLimits.ts","table":"41.3(a)","kind":"validated_app_data"}'::jsonb)
  ON CONFLICT (edition_id, content_hash) DO NOTHING
  RETURNING id INTO v_chunk_b;
  IF v_chunk_b IS NULL THEN
    SELECT id INTO v_chunk_b FROM bs7671_chunks
    WHERE edition_id = v_edition_id AND content_hash = 'mate-validated/zs/chunk/41.3-typeB';
  END IF;

  INSERT INTO bs7671_chunks (edition_id, chunk_type, content, content_hash, metadata)
  VALUES
    (v_edition_id, 'paragraph',
     'BS 7671:2018+A4:2026 Table 41.3(b) — Type C MCBs at 230 V. Values apply to both 0.4 s and 5 s (10×In magnetic trip).',
     'mate-validated/zs/chunk/41.3-typeC',
     '{"source":"src/data/zsLimits.ts","table":"41.3(b)","kind":"validated_app_data"}'::jsonb)
  ON CONFLICT (edition_id, content_hash) DO NOTHING
  RETURNING id INTO v_chunk_c;
  IF v_chunk_c IS NULL THEN
    SELECT id INTO v_chunk_c FROM bs7671_chunks
    WHERE edition_id = v_edition_id AND content_hash = 'mate-validated/zs/chunk/41.3-typeC';
  END IF;

  INSERT INTO bs7671_chunks (edition_id, chunk_type, content, content_hash, metadata)
  VALUES
    (v_edition_id, 'paragraph',
     'BS 7671:2018+A4:2026 Table 41.3(c) — Type D MCBs at 230 V. Different values for 0.4 s (20×In magnetic) vs 5 s (thermal characteristic, matches Type C).',
     'mate-validated/zs/chunk/41.3-typeD',
     '{"source":"src/data/zsLimits.ts","table":"41.3(c)","kind":"validated_app_data"}'::jsonb)
  ON CONFLICT (edition_id, content_hash) DO NOTHING
  RETURNING id INTO v_chunk_d;
  IF v_chunk_d IS NULL THEN
    SELECT id INTO v_chunk_d FROM bs7671_chunks
    WHERE edition_id = v_edition_id AND content_hash = 'mate-validated/zs/chunk/41.3-typeD';
  END IF;

  -- Fuse chunks (one per sub-table per disconnection time)
  INSERT INTO bs7671_chunks (edition_id, chunk_type, content, content_hash, metadata) VALUES
    (v_edition_id, 'paragraph',
     'BS 7671:2018+A4:2026 Table 41.2(a) — BS 88-2.2 gG (HRC) fuses to BS EN 60269-2 at 230 V, 0.4 s disconnection.',
     'mate-validated/zs/chunk/41.2-bs88-2',
     '{"source":"src/data/zsLimits.ts","table":"41.2(a)"}'::jsonb)
  ON CONFLICT (edition_id, content_hash) DO NOTHING RETURNING id INTO v_chunk_f88_2_04;
  IF v_chunk_f88_2_04 IS NULL THEN SELECT id INTO v_chunk_f88_2_04 FROM bs7671_chunks WHERE edition_id = v_edition_id AND content_hash = 'mate-validated/zs/chunk/41.2-bs88-2'; END IF;

  INSERT INTO bs7671_chunks (edition_id, chunk_type, content, content_hash, metadata) VALUES
    (v_edition_id, 'paragraph',
     'BS 7671:2018+A4:2026 Table 41.4(a) — BS 88-2.2 gG (HRC) fuses at 230 V, 5 s disconnection.',
     'mate-validated/zs/chunk/41.4-bs88-2',
     '{"source":"src/data/zsLimits.ts","table":"41.4(a)"}'::jsonb)
  ON CONFLICT (edition_id, content_hash) DO NOTHING RETURNING id INTO v_chunk_f88_2_5;
  IF v_chunk_f88_2_5 IS NULL THEN SELECT id INTO v_chunk_f88_2_5 FROM bs7671_chunks WHERE edition_id = v_edition_id AND content_hash = 'mate-validated/zs/chunk/41.4-bs88-2'; END IF;

  INSERT INTO bs7671_chunks (edition_id, chunk_type, content, content_hash, metadata) VALUES
    (v_edition_id, 'paragraph',
     'BS 7671:2018+A4:2026 Table 41.2(b) — BS 88-3 (System C) fuses at 230 V, 0.4 s disconnection.',
     'mate-validated/zs/chunk/41.2-bs88-3',
     '{"source":"src/data/zsLimits.ts","table":"41.2(b)"}'::jsonb)
  ON CONFLICT (edition_id, content_hash) DO NOTHING RETURNING id INTO v_chunk_f88_3_04;
  IF v_chunk_f88_3_04 IS NULL THEN SELECT id INTO v_chunk_f88_3_04 FROM bs7671_chunks WHERE edition_id = v_edition_id AND content_hash = 'mate-validated/zs/chunk/41.2-bs88-3'; END IF;

  INSERT INTO bs7671_chunks (edition_id, chunk_type, content, content_hash, metadata) VALUES
    (v_edition_id, 'paragraph',
     'BS 7671:2018+A4:2026 Table 41.4(b) — BS 88-3 fuses at 230 V, 5 s disconnection.',
     'mate-validated/zs/chunk/41.4-bs88-3',
     '{"source":"src/data/zsLimits.ts","table":"41.4(b)"}'::jsonb)
  ON CONFLICT (edition_id, content_hash) DO NOTHING RETURNING id INTO v_chunk_f88_3_5;
  IF v_chunk_f88_3_5 IS NULL THEN SELECT id INTO v_chunk_f88_3_5 FROM bs7671_chunks WHERE edition_id = v_edition_id AND content_hash = 'mate-validated/zs/chunk/41.4-bs88-3'; END IF;

  INSERT INTO bs7671_chunks (edition_id, chunk_type, content, content_hash, metadata) VALUES
    (v_edition_id, 'paragraph',
     'BS 7671:2018+A4:2026 Table 41.2(c) — BS 3036 rewirable (semi-enclosed) fuses at 230 V, 0.4 s.',
     'mate-validated/zs/chunk/41.2-bs3036',
     '{"source":"src/data/zsLimits.ts","table":"41.2(c)"}'::jsonb)
  ON CONFLICT (edition_id, content_hash) DO NOTHING RETURNING id INTO v_chunk_f3036_04;
  IF v_chunk_f3036_04 IS NULL THEN SELECT id INTO v_chunk_f3036_04 FROM bs7671_chunks WHERE edition_id = v_edition_id AND content_hash = 'mate-validated/zs/chunk/41.2-bs3036'; END IF;

  INSERT INTO bs7671_chunks (edition_id, chunk_type, content, content_hash, metadata) VALUES
    (v_edition_id, 'paragraph',
     'BS 7671:2018+A4:2026 Table 41.4(c) — BS 3036 rewirable fuses at 230 V, 5 s.',
     'mate-validated/zs/chunk/41.4-bs3036',
     '{"source":"src/data/zsLimits.ts","table":"41.4(c)"}'::jsonb)
  ON CONFLICT (edition_id, content_hash) DO NOTHING RETURNING id INTO v_chunk_f3036_5;
  IF v_chunk_f3036_5 IS NULL THEN SELECT id INTO v_chunk_f3036_5 FROM bs7671_chunks WHERE edition_id = v_edition_id AND content_hash = 'mate-validated/zs/chunk/41.4-bs3036'; END IF;

  INSERT INTO bs7671_chunks (edition_id, chunk_type, content, content_hash, metadata) VALUES
    (v_edition_id, 'paragraph',
     'BS 7671:2018+A4:2026 Table 41.2(d) — BS 1362 plug-top fuses at 230 V, 0.4 s.',
     'mate-validated/zs/chunk/41.2-bs1362',
     '{"source":"src/data/zsLimits.ts","table":"41.2(d)"}'::jsonb)
  ON CONFLICT (edition_id, content_hash) DO NOTHING RETURNING id INTO v_chunk_f1362_04;
  IF v_chunk_f1362_04 IS NULL THEN SELECT id INTO v_chunk_f1362_04 FROM bs7671_chunks WHERE edition_id = v_edition_id AND content_hash = 'mate-validated/zs/chunk/41.2-bs1362'; END IF;

  INSERT INTO bs7671_chunks (edition_id, chunk_type, content, content_hash, metadata) VALUES
    (v_edition_id, 'paragraph',
     'BS 7671:2018+A4:2026 Table 41.4(d) — BS 1362 plug-top fuses at 230 V, 5 s.',
     'mate-validated/zs/chunk/41.4-bs1362',
     '{"source":"src/data/zsLimits.ts","table":"41.4(d)"}'::jsonb)
  ON CONFLICT (edition_id, content_hash) DO NOTHING RETURNING id INTO v_chunk_f1362_5;
  IF v_chunk_f1362_5 IS NULL THEN SELECT id INTO v_chunk_f1362_5 FROM bs7671_chunks WHERE edition_id = v_edition_id AND content_hash = 'mate-validated/zs/chunk/41.4-bs1362'; END IF;

  INSERT INTO bs7671_chunks (edition_id, chunk_type, content, content_hash, metadata) VALUES
    (v_edition_id, 'paragraph',
     'BS 7671:2018+A4:2026 Table 41.5 — Maximum Zs for RCDs to BS EN 61008-1 / BS EN 61009-1 in TT systems. Formula: Zs = 50 V / (IΔn × 5). Earth electrode resistance ≤ 200 Ω required for IΔn ≤ 100 mA.',
     'mate-validated/zs/chunk/41.5-rcd',
     '{"source":"src/data/zsLimits.ts","table":"41.5"}'::jsonb)
  ON CONFLICT (edition_id, content_hash) DO NOTHING RETURNING id INTO v_chunk_rcd;
  IF v_chunk_rcd IS NULL THEN SELECT id INTO v_chunk_rcd FROM bs7671_chunks WHERE edition_id = v_edition_id AND content_hash = 'mate-validated/zs/chunk/41.5-rcd'; END IF;

  -- ── 3. Insert one facet per cell ─────────────────────────────────────

  -- Type B MCBs (0.4 s and 5 s identical)
  FOR i IN 1..array_length(type_b, 1) LOOP
    INSERT INTO bs7671_facets (
      chunk_id, edition_id, document_type, facet_type,
      primary_topic, content, context_prefix, facet_hash,
      keywords, equipment_category, protection_method, system_types,
      disconnection_time_s, confidence_score, metadata
    ) VALUES (
      v_chunk_b, v_edition_id, 'bs7671', 'requirement',
      format('Zs %s Ω · Type B %s A · 230 V · 0.4 s and 5 s · Table 41.3(a)', type_b[i][2], type_b[i][1]::int),
      format('Maximum earth fault loop impedance (Zs) for a Type B MCB to BS EN 60898 (or RCBO to BS EN 61009-1) rated %s A at 230 V is %s Ω. Applies for both 0.4 s (final-circuit) and 5 s (distribution-circuit) disconnection criteria — the magnetic trip (5×In) operates within both. Cmin = 0.95 applied (BS 7671 Note 1). Cold-measured site limit using GN3 0.80 factor: %s Ω.',
        type_b[i][1]::int, type_b[i][2], round(type_b[i][2] * 0.8, 2)),
      'BS 7671:2018+A4:2026 · Part 4 · Chapter 41 · Reg 411.4.204(a) · Table 41.3(a) · Type B MCB · 230 V',
      format('mate-validated/zs/typeB-%sA', type_b[i][1]::int),
      ARRAY['Zs','Type B','MCB','RCBO','230V','Table 41.3','disconnection','earth fault loop impedance', format('%s A', type_b[i][1]::int)],
      'mcb_typeB', 'ads', ARRAY['TN-S','TN-C-S','TT'],
      0.4, 1.00,
      jsonb_build_object('rating_amps', type_b[i][1]::int, 'max_zs_ohm', type_b[i][2], 'site_factor_zs_ohm', round(type_b[i][2] * 0.8, 2), 'voltage', 230, 'source', 'src/data/zsLimits.ts')
    );
  END LOOP;

  -- Type C MCBs (0.4 s and 5 s identical)
  FOR i IN 1..array_length(type_c, 1) LOOP
    INSERT INTO bs7671_facets (
      chunk_id, edition_id, document_type, facet_type,
      primary_topic, content, context_prefix, facet_hash,
      keywords, equipment_category, protection_method, system_types,
      disconnection_time_s, confidence_score, metadata
    ) VALUES (
      v_chunk_c, v_edition_id, 'bs7671', 'requirement',
      format('Zs %s Ω · Type C %s A · 230 V · 0.4 s and 5 s · Table 41.3(b)', type_c[i][2], type_c[i][1]::int),
      format('Maximum earth fault loop impedance (Zs) for a Type C MCB / RCBO rated %s A at 230 V is %s Ω. Applies for both 0.4 s and 5 s — magnetic trip 10×In. Cmin = 0.95. Cold-measured site limit (GN3 0.80): %s Ω.',
        type_c[i][1]::int, type_c[i][2], round(type_c[i][2] * 0.8, 2)),
      'BS 7671:2018+A4:2026 · Part 4 · Chapter 41 · Reg 411.4.204(b) · Table 41.3(b) · Type C MCB · 230 V',
      format('mate-validated/zs/typeC-%sA', type_c[i][1]::int),
      ARRAY['Zs','Type C','MCB','RCBO','230V','Table 41.3','disconnection', format('%s A', type_c[i][1]::int)],
      'mcb_typeC', 'ads', ARRAY['TN-S','TN-C-S','TT'],
      0.4, 1.00,
      jsonb_build_object('rating_amps', type_c[i][1]::int, 'max_zs_ohm', type_c[i][2], 'site_factor_zs_ohm', round(type_c[i][2] * 0.8, 2), 'voltage', 230, 'source', 'src/data/zsLimits.ts')
    );
  END LOOP;

  -- Type D MCBs at 0.4 s
  FOR i IN 1..array_length(type_d_04, 1) LOOP
    INSERT INTO bs7671_facets (
      chunk_id, edition_id, document_type, facet_type,
      primary_topic, content, context_prefix, facet_hash,
      keywords, equipment_category, protection_method, system_types,
      disconnection_time_s, confidence_score, metadata
    ) VALUES (
      v_chunk_d, v_edition_id, 'bs7671', 'requirement',
      format('Zs %s Ω · Type D %s A · 230 V · 0.4 s · Table 41.3(c)', type_d_04[i][2], type_d_04[i][1]::int),
      format('Maximum Zs for a Type D MCB / RCBO rated %s A at 230 V for 0.4 s disconnection is %s Ω (magnetic trip 20×In). Cmin = 0.95. Cold-measured site limit (GN3 0.80): %s Ω.',
        type_d_04[i][1]::int, type_d_04[i][2], round(type_d_04[i][2] * 0.8, 2)),
      'BS 7671:2018+A4:2026 · Part 4 · Chapter 41 · Reg 411.4.204(c) · Table 41.3(c) · Type D MCB · 230 V · 0.4 s',
      format('mate-validated/zs/typeD-%sA-0.4s', type_d_04[i][1]::int),
      ARRAY['Zs','Type D','MCB','RCBO','230V','Table 41.3','0.4 s', format('%s A', type_d_04[i][1]::int)],
      'mcb_typeD', 'ads', ARRAY['TN-S','TN-C-S','TT'],
      0.4, 1.00,
      jsonb_build_object('rating_amps', type_d_04[i][1]::int, 'max_zs_ohm', type_d_04[i][2], 'voltage', 230, 'source', 'src/data/zsLimits.ts')
    );
  END LOOP;

  -- Type D MCBs at 5 s (different — thermal characteristic)
  FOR i IN 1..array_length(type_d_5, 1) LOOP
    INSERT INTO bs7671_facets (
      chunk_id, edition_id, document_type, facet_type,
      primary_topic, content, context_prefix, facet_hash,
      keywords, equipment_category, protection_method, system_types,
      disconnection_time_s, confidence_score, metadata
    ) VALUES (
      v_chunk_d, v_edition_id, 'bs7671', 'requirement',
      format('Zs %s Ω · Type D %s A · 230 V · 5 s · Table 41.3(c)', type_d_5[i][2], type_d_5[i][1]::int),
      format('Maximum Zs for a Type D MCB / RCBO rated %s A at 230 V for 5 s (distribution circuit) disconnection is %s Ω. Cmin = 0.95. Cold-measured site limit (GN3 0.80): %s Ω.',
        type_d_5[i][1]::int, type_d_5[i][2], round(type_d_5[i][2] * 0.8, 2)),
      'BS 7671:2018+A4:2026 · Part 4 · Chapter 41 · Reg 411.4.204(c) · Table 41.3(c) · Type D MCB · 230 V · 5 s',
      format('mate-validated/zs/typeD-%sA-5s', type_d_5[i][1]::int),
      ARRAY['Zs','Type D','MCB','RCBO','230V','Table 41.3','5 s','distribution', format('%s A', type_d_5[i][1]::int)],
      'mcb_typeD', 'ads', ARRAY['TN-S','TN-C-S','TT'],
      5.0, 1.00,
      jsonb_build_object('rating_amps', type_d_5[i][1]::int, 'max_zs_ohm', type_d_5[i][2], 'voltage', 230, 'source', 'src/data/zsLimits.ts')
    );
  END LOOP;

  -- BS 88-2.2 gG fuses at 0.4 s
  FOR i IN 1..array_length(fuse_88_2_04, 1) LOOP
    INSERT INTO bs7671_facets (
      chunk_id, edition_id, document_type, facet_type,
      primary_topic, content, context_prefix, facet_hash,
      keywords, equipment_category, protection_method, system_types,
      disconnection_time_s, confidence_score, metadata
    ) VALUES (
      v_chunk_f88_2_04, v_edition_id, 'bs7671', 'requirement',
      format('Zs %s Ω · BS 88-2.2 gG fuse %s A · 230 V · 0.4 s · Table 41.2(a)', fuse_88_2_04[i][2], fuse_88_2_04[i][1]::int),
      format('Maximum Zs for a BS 88-2.2 (BS EN 60269-2) gG / HRC fuse rated %s A at 230 V for 0.4 s disconnection is %s Ω. Cmin = 0.95. Cold-measured site limit (GN3 0.80): %s Ω.',
        fuse_88_2_04[i][1]::int, fuse_88_2_04[i][2], round(fuse_88_2_04[i][2] * 0.8, 2)),
      'BS 7671:2018+A4:2026 · Part 4 · Chapter 41 · Reg 411.4 · Table 41.2(a) · BS 88-2.2 gG fuse · 230 V · 0.4 s',
      format('mate-validated/zs/bs88-2-%sA-0.4s', fuse_88_2_04[i][1]::int),
      ARRAY['Zs','BS 88','HRC','gG','fuse','230V','Table 41.2','0.4 s', format('%s A', fuse_88_2_04[i][1]::int)],
      'fuse_bs88_2', 'ads', ARRAY['TN-S','TN-C-S','TT'],
      0.4, 1.00,
      jsonb_build_object('rating_amps', fuse_88_2_04[i][1]::int, 'max_zs_ohm', fuse_88_2_04[i][2], 'voltage', 230)
    );
  END LOOP;

  -- BS 88-2.2 gG fuses at 5 s
  FOR i IN 1..array_length(fuse_88_2_5, 1) LOOP
    INSERT INTO bs7671_facets (
      chunk_id, edition_id, document_type, facet_type,
      primary_topic, content, context_prefix, facet_hash,
      keywords, equipment_category, protection_method, system_types,
      disconnection_time_s, confidence_score, metadata
    ) VALUES (
      v_chunk_f88_2_5, v_edition_id, 'bs7671', 'requirement',
      format('Zs %s Ω · BS 88-2.2 gG fuse %s A · 230 V · 5 s · Table 41.4(a)', fuse_88_2_5[i][2], fuse_88_2_5[i][1]::int),
      format('Maximum Zs for a BS 88-2.2 gG fuse rated %s A at 230 V for 5 s (distribution circuit) disconnection is %s Ω. Cmin = 0.95.',
        fuse_88_2_5[i][1]::int, fuse_88_2_5[i][2]),
      'BS 7671:2018+A4:2026 · Part 4 · Chapter 41 · Table 41.4(a) · BS 88-2.2 gG fuse · 230 V · 5 s',
      format('mate-validated/zs/bs88-2-%sA-5s', fuse_88_2_5[i][1]::int),
      ARRAY['Zs','BS 88','HRC','gG','fuse','230V','Table 41.4','5 s','distribution', format('%s A', fuse_88_2_5[i][1]::int)],
      'fuse_bs88_2', 'ads', ARRAY['TN-S','TN-C-S','TT'],
      5.0, 1.00,
      jsonb_build_object('rating_amps', fuse_88_2_5[i][1]::int, 'max_zs_ohm', fuse_88_2_5[i][2], 'voltage', 230)
    );
  END LOOP;

  -- BS 88-3 fuses (0.4 s and 5 s)
  FOR i IN 1..array_length(fuse_88_3_04, 1) LOOP
    INSERT INTO bs7671_facets (chunk_id, edition_id, document_type, facet_type, primary_topic, content, context_prefix, facet_hash, keywords, equipment_category, protection_method, system_types, disconnection_time_s, confidence_score, metadata) VALUES
      (v_chunk_f88_3_04, v_edition_id, 'bs7671', 'requirement',
       format('Zs %s Ω · BS 88-3 fuse %s A · 230 V · 0.4 s · Table 41.2(b)', fuse_88_3_04[i][2], fuse_88_3_04[i][1]::int),
       format('Maximum Zs for a BS 88-3 (System C / BS EN 60269-3) fuse rated %s A at 230 V for 0.4 s is %s Ω. Cmin = 0.95.', fuse_88_3_04[i][1]::int, fuse_88_3_04[i][2]),
       'BS 7671:2018+A4:2026 · Table 41.2(b) · BS 88-3 fuse · 230 V · 0.4 s',
       format('mate-validated/zs/bs88-3-%sA-0.4s', fuse_88_3_04[i][1]::int),
       ARRAY['Zs','BS 88-3','fuse','230V','Table 41.2', format('%s A', fuse_88_3_04[i][1]::int)],
       'fuse_bs88_3', 'ads', ARRAY['TN-S','TN-C-S','TT'], 0.4, 1.00,
       jsonb_build_object('rating_amps', fuse_88_3_04[i][1]::int, 'max_zs_ohm', fuse_88_3_04[i][2]));
  END LOOP;

  FOR i IN 1..array_length(fuse_88_3_5, 1) LOOP
    INSERT INTO bs7671_facets (chunk_id, edition_id, document_type, facet_type, primary_topic, content, context_prefix, facet_hash, keywords, equipment_category, protection_method, system_types, disconnection_time_s, confidence_score, metadata) VALUES
      (v_chunk_f88_3_5, v_edition_id, 'bs7671', 'requirement',
       format('Zs %s Ω · BS 88-3 fuse %s A · 230 V · 5 s · Table 41.4(b)', fuse_88_3_5[i][2], fuse_88_3_5[i][1]::int),
       format('Maximum Zs for a BS 88-3 fuse rated %s A at 230 V for 5 s is %s Ω.', fuse_88_3_5[i][1]::int, fuse_88_3_5[i][2]),
       'BS 7671:2018+A4:2026 · Table 41.4(b) · BS 88-3 fuse · 230 V · 5 s',
       format('mate-validated/zs/bs88-3-%sA-5s', fuse_88_3_5[i][1]::int),
       ARRAY['Zs','BS 88-3','fuse','230V','Table 41.4','5 s', format('%s A', fuse_88_3_5[i][1]::int)],
       'fuse_bs88_3', 'ads', ARRAY['TN-S','TN-C-S','TT'], 5.0, 1.00,
       jsonb_build_object('rating_amps', fuse_88_3_5[i][1]::int, 'max_zs_ohm', fuse_88_3_5[i][2]));
  END LOOP;

  -- BS 3036 rewirable fuses (0.4 s and 5 s)
  FOR i IN 1..array_length(fuse_3036_04, 1) LOOP
    INSERT INTO bs7671_facets (chunk_id, edition_id, document_type, facet_type, primary_topic, content, context_prefix, facet_hash, keywords, equipment_category, protection_method, system_types, disconnection_time_s, confidence_score, metadata) VALUES
      (v_chunk_f3036_04, v_edition_id, 'bs7671', 'requirement',
       format('Zs %s Ω · BS 3036 rewirable fuse %s A · 230 V · 0.4 s · Table 41.2(c)', fuse_3036_04[i][2], fuse_3036_04[i][1]::int),
       format('Maximum Zs for a BS 3036 semi-enclosed (rewirable) fuse rated %s A at 230 V for 0.4 s is %s Ω.', fuse_3036_04[i][1]::int, fuse_3036_04[i][2]),
       'BS 7671:2018+A4:2026 · Table 41.2(c) · BS 3036 rewirable · 230 V · 0.4 s',
       format('mate-validated/zs/bs3036-%sA-0.4s', fuse_3036_04[i][1]::int),
       ARRAY['Zs','BS 3036','rewirable','semi-enclosed','fuse','230V','Table 41.2', format('%s A', fuse_3036_04[i][1]::int)],
       'fuse_bs3036', 'ads', ARRAY['TN-S','TN-C-S','TT'], 0.4, 1.00,
       jsonb_build_object('rating_amps', fuse_3036_04[i][1]::int, 'max_zs_ohm', fuse_3036_04[i][2]));
  END LOOP;

  FOR i IN 1..array_length(fuse_3036_5, 1) LOOP
    INSERT INTO bs7671_facets (chunk_id, edition_id, document_type, facet_type, primary_topic, content, context_prefix, facet_hash, keywords, equipment_category, protection_method, system_types, disconnection_time_s, confidence_score, metadata) VALUES
      (v_chunk_f3036_5, v_edition_id, 'bs7671', 'requirement',
       format('Zs %s Ω · BS 3036 rewirable fuse %s A · 230 V · 5 s · Table 41.4(c)', fuse_3036_5[i][2], fuse_3036_5[i][1]::int),
       format('Maximum Zs for a BS 3036 rewirable fuse rated %s A at 230 V for 5 s is %s Ω.', fuse_3036_5[i][1]::int, fuse_3036_5[i][2]),
       'BS 7671:2018+A4:2026 · Table 41.4(c) · BS 3036 rewirable · 230 V · 5 s',
       format('mate-validated/zs/bs3036-%sA-5s', fuse_3036_5[i][1]::int),
       ARRAY['Zs','BS 3036','rewirable','semi-enclosed','fuse','230V','Table 41.4','5 s', format('%s A', fuse_3036_5[i][1]::int)],
       'fuse_bs3036', 'ads', ARRAY['TN-S','TN-C-S','TT'], 5.0, 1.00,
       jsonb_build_object('rating_amps', fuse_3036_5[i][1]::int, 'max_zs_ohm', fuse_3036_5[i][2]));
  END LOOP;

  -- BS 1362 plug-top fuses
  FOR i IN 1..array_length(fuse_1362_04, 1) LOOP
    INSERT INTO bs7671_facets (chunk_id, edition_id, document_type, facet_type, primary_topic, content, context_prefix, facet_hash, keywords, equipment_category, protection_method, system_types, disconnection_time_s, confidence_score, metadata) VALUES
      (v_chunk_f1362_04, v_edition_id, 'bs7671', 'requirement',
       format('Zs %s Ω · BS 1362 plug-top fuse %s A · 230 V · 0.4 s · Table 41.2(d)', fuse_1362_04[i][2], fuse_1362_04[i][1]::int),
       format('Maximum Zs for a BS 1362 plug-top fuse rated %s A at 230 V for 0.4 s is %s Ω.', fuse_1362_04[i][1]::int, fuse_1362_04[i][2]),
       'BS 7671:2018+A4:2026 · Table 41.2(d) · BS 1362 plug-top · 230 V · 0.4 s',
       format('mate-validated/zs/bs1362-%sA-0.4s', fuse_1362_04[i][1]::int),
       ARRAY['Zs','BS 1362','plug-top','fuse','230V','Table 41.2', format('%s A', fuse_1362_04[i][1]::int)],
       'fuse_bs1362', 'ads', ARRAY['TN-S','TN-C-S','TT'], 0.4, 1.00,
       jsonb_build_object('rating_amps', fuse_1362_04[i][1]::int, 'max_zs_ohm', fuse_1362_04[i][2]));
  END LOOP;

  FOR i IN 1..array_length(fuse_1362_5, 1) LOOP
    INSERT INTO bs7671_facets (chunk_id, edition_id, document_type, facet_type, primary_topic, content, context_prefix, facet_hash, keywords, equipment_category, protection_method, system_types, disconnection_time_s, confidence_score, metadata) VALUES
      (v_chunk_f1362_5, v_edition_id, 'bs7671', 'requirement',
       format('Zs %s Ω · BS 1362 plug-top fuse %s A · 230 V · 5 s · Table 41.4(d)', fuse_1362_5[i][2], fuse_1362_5[i][1]::int),
       format('Maximum Zs for a BS 1362 plug-top fuse rated %s A at 230 V for 5 s is %s Ω.', fuse_1362_5[i][1]::int, fuse_1362_5[i][2]),
       'BS 7671:2018+A4:2026 · Table 41.4(d) · BS 1362 plug-top · 230 V · 5 s',
       format('mate-validated/zs/bs1362-%sA-5s', fuse_1362_5[i][1]::int),
       ARRAY['Zs','BS 1362','plug-top','fuse','230V','Table 41.4','5 s', format('%s A', fuse_1362_5[i][1]::int)],
       'fuse_bs1362', 'ads', ARRAY['TN-S','TN-C-S','TT'], 5.0, 1.00,
       jsonb_build_object('rating_amps', fuse_1362_5[i][1]::int, 'max_zs_ohm', fuse_1362_5[i][2]));
  END LOOP;

  -- RCDs — Table 41.5
  FOR i IN 1..array_length(rcd_table, 1) LOOP
    INSERT INTO bs7671_facets (chunk_id, edition_id, document_type, facet_type, primary_topic, content, context_prefix, facet_hash, keywords, equipment_category, protection_method, system_types, disconnection_time_s, confidence_score, metadata) VALUES
      (v_chunk_rcd, v_edition_id, 'bs7671', 'requirement',
       format('Zs %s Ω · RCD IΔn %s mA · 230 V · Table 41.5', rcd_table[i][2], rcd_table[i][1]::int),
       format('In a TT system protected by an RCD with rated residual current IΔn = %s mA, the maximum earth fault loop impedance Zs is %s Ω (50 V / (IΔn × 5)). For IΔn ≤ 100 mA the earth electrode resistance must not exceed 200 Ω (Table 41.5 Note 2). Per Reg 411.5.3.',
         rcd_table[i][1]::int, rcd_table[i][2]),
       'BS 7671:2018+A4:2026 · Table 41.5 · RCD · TT · Reg 411.5.3',
       format('mate-validated/zs/rcd-%smA', rcd_table[i][1]::int),
       ARRAY['Zs','RCD','residual current','TT','230V','Table 41.5','411.5.3', format('%s mA', rcd_table[i][1]::int)],
       'rcd', 'ads', ARRAY['TT'], 0.4, 1.00,
       jsonb_build_object('residual_current_ma', rcd_table[i][1]::int, 'max_zs_ohm', rcd_table[i][2], 'electrode_max_ohm', CASE WHEN rcd_table[i][1] <= 100 THEN 200 ELSE NULL END));
  END LOOP;

  RAISE NOTICE 'Mate validated Zs facets ingested';
END $$;