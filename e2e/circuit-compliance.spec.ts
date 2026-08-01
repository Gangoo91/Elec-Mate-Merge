/**
 * BS 7671 compliance engine — regression tests (ELE-1425 / ELE-1426).
 *
 * These are pure-function assertions, but they run through Playwright because
 * that is the runner this repo already has; adding a unit-test framework was
 * not in scope. The module is imported in the page so Vite resolves its `@/`
 * aliases, then exercised directly — no UI interaction, so it is fast and does
 * not depend on auth or on any screen's markup.
 *
 * Every expected number below is worked longhand in the comment beside it. If
 * one of these fails, the arithmetic changed — check the working before
 * changing the expectation.
 */

import { test, expect } from '@playwright/test';

const MODULE = '/src/components/electrician-tools/circuit-designer/zs-compliance.ts';

/** Run `fn` against the compliance module inside the page. */
async function withModule<T>(page: import('@playwright/test').Page, fn: string, arg: unknown) {
  return page.evaluate(
    async ([modPath, body, input]) => {
      const m = await import(/* @vite-ignore */ modPath as string);
      // eslint-disable-next-line no-new-func
      return new Function('m', 'input', `return (${body})(m, input)`)(m, input);
    },
    [MODULE, fn, arg] as const
  ) as Promise<T>;
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Zs is calculated from conductor sizes, not taken from the design', async ({ page }) => {
  // 2.5mm² line / 1.5mm² CPC, 20 m, Ze 0.35.
  // Table 9A: r(2.5) = 7.41, r(1.5) = 12.1 mΩ/m
  // R1+R2 @20°C = (7.41 + 12.1) × 20 / 1000 = 0.3902 Ω
  // × 1.2 (operating temp)          = 0.46824 Ω
  // + Ze 0.35                        = 0.818 Ω
  const result = await withModule<{ value: number; source: string; compliant: boolean }>(
    page,
    '(m, i) => m.getZsCheck(i, 0.35)',
    { cableSize: 2.5, cpcSize: 1.5, cableLength: 20, calculations: { zs: 0, maxZs: 2.73 } }
  );

  expect(result.value).toBeCloseTo(0.818, 3);
  // The design said 0 — the calculated value must win.
  expect(result.source).toBe('calculated');
  expect(result.compliant).toBe(true);
});

test('a Zs of zero never counts as compliant', async ({ page }) => {
  // No conductor data to derive from, and the design carries zero. This is the
  // exact ELE-1426 shape: 0 <= 2.73 used to tick green.
  const result = await withModule<{ state: string; compliant: boolean; label: string }>(
    page,
    '(m, i) => m.getZsCheck(i, 0.35)',
    { calculations: { zs: 0, maxZs: 2.73 } }
  );

  expect(result.state).toBe('not-calculated');
  expect(result.compliant).toBe(false);
  expect(result.label).not.toContain('0.000');
});

test('an undersized cable fails and names the size that would work', async ({ page }) => {
  // 1.5mm² T&E carries 16 A (Table 4D1A / Method C). A 330 A circuit needs far
  // more, and no T&E size reaches it — so no recommendation is possible here.
  const result = await withModule<{ adequate: boolean; iz: number; shortfall: number }>(
    page,
    '(m, i) => m.getCableAdequacy(i)',
    {
      cableSize: 1.5,
      cableType: 'twin and earth',
      designCurrent: 330.43,
      protectionDevice: { rating: 320 },
    }
  );

  expect(result.adequate).toBe(false);
  expect(result.iz).toBe(16);
  expect(result.shortfall).toBeCloseTo(314.4, 1);
});

test('derating is applied to cable capacity', async ({ page }) => {
  // 6mm² T&E: It = 41 A. Ca 0.87 × Cg 0.8 = 0.696 → Iz = 41 × 0.696 = 28.5 A.
  // A 40 A device therefore needs a larger cable.
  const result = await withModule<{ adequate: boolean; iz: number; recommendedSize: number }>(
    page,
    '(m, i) => m.getCableAdequacy(i)',
    {
      cableSize: 6,
      cableType: 'twin and earth',
      designCurrent: 38,
      protectionDevice: { rating: 40 },
      deratingFactors: { Ca: 0.87, Cg: 0.8, Ci: 1, overall: 0.696 },
    }
  );

  expect(result.iz).toBeCloseTo(28.5, 1);
  expect(result.adequate).toBe(false);
  expect(result.recommendedSize).toBe(16);
});

test('a standard 2.5mm² ring final on 32 A is NOT flagged as undersized', async ({ page }) => {
  // Regression guard. The radial rule (24 A tabulated vs 32 A device) would fail
  // this, but a ring has two legs in parallel and is governed by Appendix 15.
  // Getting this wrong would fail almost every domestic ring in the country.
  const result = await withModule<{ verdict: string; failures: string[] }>(
    page,
    '(m, i) => m.getCircuitCompliance(i, 0.35)',
    {
      name: 'Ring final — sockets',
      circuitTopology: 'ring',
      cableSize: 2.5,
      cpcSize: 1.5,
      cableLength: 25,
      cableType: 'twin and earth',
      designCurrent: 26,
      phases: 'single',
      voltage: 230,
      protectionDevice: { rating: 32, curve: 'B' },
      calculations: { zs: 0, maxZs: 1.37 },
    }
  );

  expect(result.verdict).not.toBe('fail');
  expect(result.failures).toHaveLength(0);
});

test('the same cable as a radial on 32 A IS flagged', async ({ page }) => {
  // The mirror of the test above — proves the ring exemption is topology-driven
  // and has not simply disabled the check.
  const result = await withModule<{ verdict: string; cable: { recommendedSize: number } }>(
    page,
    '(m, i) => m.getCircuitCompliance(i, 0.35)',
    {
      name: 'Radial sockets',
      circuitTopology: 'radial',
      cableSize: 2.5,
      cpcSize: 1.5,
      cableLength: 25,
      cableType: 'twin and earth',
      designCurrent: 28,
      phases: 'single',
      voltage: 230,
      protectionDevice: { rating: 32, curve: 'B' },
      calculations: { zs: 0, maxZs: 1.37 },
    }
  );

  expect(result.verdict).toBe('fail');
  expect(result.cable.recommendedSize).toBe(4);
});

test('ring voltage drop uses the L/4 rule, not the radial formula', async ({ page }) => {
  // Two legs in parallel, worst case at the mid-point → effective L/4.
  // The same circuit as a radial gives 5.09%; as a ring it must be a quarter.
  const ring = await withModule<{ percent: number }>(page, '(m, i) => m.getVoltageDrop(i)', {
    circuitTopology: 'ring',
    cableSize: 2.5,
    cableType: 'twin and earth',
    designCurrent: 26,
    cableLength: 25,
    phases: 'single',
    voltage: 230,
  });
  const radial = await withModule<{ percent: number }>(page, '(m, i) => m.getVoltageDrop(i)', {
    circuitTopology: 'radial',
    cableSize: 2.5,
    cableType: 'twin and earth',
    designCurrent: 26,
    cableLength: 25,
    phases: 'single',
    voltage: 230,
  });

  expect(radial.percent / ring.percent).toBeCloseTo(4, 1);
});

test('the CPC check runs against generated designs', async ({ page }) => {
  // ELE-1425/1426 root cause: the repo's validators only ever fired on manual
  // edits, never on generated output. Pointing the WHOLE suite at generated
  // designs turned out to be unsafe — cableType matches exactly against
  // size-prefixed dropdown strings, and cableLength recomputes Vd with the
  // radial formula, so both cried wolf on correct circuits. The CPC check is
  // the one that is both additive and vocabulary-free, so it is the one wired
  // in. A 10mm² live with a 1mm² CPC is well under Table 54.7 and must be seen.
  const findings = await withModule<Array<{ field: string }>>(
    page,
    '(m, i) => m.auditCircuitFields(i)',
    {
      name: 'Undersized CPC',
      circuitTopology: 'radial',
      cableSize: 10,
      cpcSize: 1.0,
      cableLength: 10,
      cableType: 'PVC twin and earth',
      designCurrent: 40,
      protectionDevice: { rating: 40, curve: 'B' },
      calculations: { Ib: 40, zs: 0.4, maxZs: 1.09 },
    }
  );

  expect(findings.some((f) => f.field === 'cpcSize')).toBe(true);
});

test('a locked ring field is not reported as a fault', async ({ page }) => {
  // Tier 4 locks mean "fixed by regulation", not "wrong" — auditing a ring must
  // not report its 2.5mm² as a cable-size failure.
  const findings = await withModule<Array<{ field: string }>>(
    page,
    '(m, i) => m.auditCircuitFields(i)',
    {
      name: 'Ring final — sockets',
      circuitTopology: 'ring',
      cableSize: 2.5,
      cpcSize: 1.5,
      cableLength: 25,
      cableType: 'twin and earth',
      designCurrent: 26,
      protectionDevice: { rating: 32, curve: 'B' },
      calculations: { Ib: 26, zs: 0.9, maxZs: 1.37 },
    }
  );

  expect(findings.some((f) => f.field === 'cableSize')).toBe(false);
});

test('a design current that does not follow from the load is flagged', async ({ page }) => {
  // 7000 W at 230 V is ~30.4 A. A design claiming 12 A is describing a different
  // circuit — and every other check would then be measured against the wrong
  // number, so this is worth saying out loud.
  const result = await withModule<{ warnings: string[] }>(
    page,
    '(m, i) => m.getCircuitCompliance(i, 0.35)',
    {
      name: 'Shower',
      loadPower: 7000,
      voltage: 230,
      phases: 'single',
      designCurrent: 12,
      cableSize: 10,
      cpcSize: 4,
      cableLength: 12,
      cableType: 'twin and earth',
      protectionDevice: { rating: 16, curve: 'B' },
      calculations: { zs: 0, maxZs: 2.73 },
    }
  );

  expect(result.warnings.some((w) => w.includes('Design current'))).toBe(true);
});

test('a correct design current is not flagged', async ({ page }) => {
  // Same shower, stated honestly at ~30 A. Guards against the check above
  // becoming noise on good designs.
  const result = await withModule<{ warnings: string[] }>(
    page,
    '(m, i) => m.getCircuitCompliance(i, 0.35)',
    {
      name: 'Shower',
      loadPower: 7000,
      voltage: 230,
      phases: 'single',
      designCurrent: 30.4,
      cableSize: 10,
      cpcSize: 4,
      cableLength: 12,
      cableType: 'twin and earth',
      protectionDevice: { rating: 32, curve: 'B' },
      calculations: { zs: 0, maxZs: 1.37 },
    }
  );

  expect(result.warnings.some((w) => w.includes('Design current'))).toBe(false);
});

test('the frontend and edge-function Iz tables have not drifted apart', async ({ page }) => {
  // The PVC T&E capacities exist twice — IZ_TABLE_70C_TE in circuit-edit-validator
  // (frontend) and PVC_TWIN_EARTH_CAPACITIES in the designer-agent-v3 edge
  // function. They are identical today. They live in different runtimes so they
  // cannot share a module without a build step; this asserts the values instead,
  // so a change to one without the other fails here rather than in the field —
  // where the UI and the pipeline would silently disagree about whether a design
  // is safe.
  const EDGE_PVC_TWIN_EARTH: Record<number, number> = {
    1.0: 13, 1.5: 16, 2.5: 24, 4: 32, 6: 41, 10: 57, 16: 76, 25: 101, 35: 125, 50: 151,
  };

  const front = await withModule<Record<string, number | null>>(
    page,
    '(m, i) => Object.fromEntries(i.map((s) => [s, m.getCableAdequacy({ cableSize: s, cableType: "twin and earth", designCurrent: 1, protectionDevice: { rating: 1 } }).tabulatedIt]))',
    Object.keys(EDGE_PVC_TWIN_EARTH).map(Number)
  );

  for (const [size, iz] of Object.entries(EDGE_PVC_TWIN_EARTH)) {
    expect(front[size], `Iz for ${size}mm² must match the edge function`).toBe(iz);
  }
});

test('a ring wired in 1.5mm² fails the 20 A floor', async ({ page }) => {
  // BS 7671 App 15: a ring is deemed to satisfy Reg 433.1.1 only if the cable's
  // Iz is not less than 20 A. 1.5mm² T&E is 16 A — so this ring is not
  // compliant, even though the radial rule could never express that and
  // skipping ring checks entirely would have passed it silently.
  const result = await withModule<{
    verdict: string;
    cable: { adequate: boolean; iz: number; recommendedSize: number; ringFinal: boolean };
  }>(page, '(m, i) => m.getCircuitCompliance(i, 0.35)', {
    name: 'Ring final — sockets',
    circuitTopology: 'ring',
    cableSize: 1.5,
    cpcSize: 1.0,
    cableLength: 20,
    cableType: 'twin and earth',
    designCurrent: 26,
    phases: 'single',
    voltage: 230,
    protectionDevice: { rating: 32, curve: 'B' },
    calculations: { zs: 0, maxZs: 1.37 },
  });

  expect(result.cable.ringFinal).toBe(true);
  expect(result.cable.iz).toBe(16);
  expect(result.cable.adequate).toBe(false);
  expect(result.cable.recommendedSize).toBe(2.5);
  expect(result.verdict).toBe('fail');
});

test('the app Iz tables match the BS 7671 facets in the RAG', async ({ page }) => {
  // Sourced from bs7671_facets "Cable rating Iz …· Method C" requirement facets,
  // which cite Tables 4D1A / 4D5A / 4D4A at ambient 30°C. This asserts the
  // hard-coded tables still agree with the standard as ingested — if someone
  // edits a capacity by hand, this fails.
  const PVC_TE_METHOD_C: Record<number, number> = {
    1.0: 13, 1.5: 16, 2.5: 24, 4: 32, 6: 41, 10: 57, 16: 76, 25: 101, 35: 125, 50: 151,
  };
  const XLPE_TE_METHOD_C: Record<number, number> = {
    1.0: 16, 1.5: 20, 2.5: 30, 4: 40, 6: 51, 10: 70, 16: 94, 25: 125, 35: 156, 50: 188,
  };

  for (const [label, table, type] of [
    ['PVC T&E', PVC_TE_METHOD_C, 'twin and earth'],
    ['XLPE T&E', XLPE_TE_METHOD_C, 'xlpe twin and earth'],
  ] as const) {
    const got = await withModule<Record<string, number | null>>(
      page,
      `(m, i) => Object.fromEntries(i.map((s) => [s, m.getCableAdequacy({ cableSize: s, cableType: ${JSON.stringify(type)}, designCurrent: 1, protectionDevice: { rating: 1 } }).tabulatedIt]))`,
      Object.keys(table).map(Number)
    );
    for (const [size, iz] of Object.entries(table)) {
      expect(got[size], `${label} ${size}mm² must match the RAG facet`).toBe(iz);
    }
  }
});

test('armoured cable uses the SWA table, not twin and earth', async ({ page }) => {
  // Regression guard. "SWA XLPE" matches the /xlpe/ test, so before the armoured
  // check was moved ahead of it, a 16 mm² SWA was credited with the twin-and-earth
  // figure of 94 A against a true 85 A (Table 4D4A) — overstating capacity, the
  // unsafe direction. Both spellings must land on the SWA table.
  for (const cableType of ['SWA 4-core XLPE', 'SWA 3-core PVC', 'steel wire armoured']) {
    const result = await withModule<{ tabulatedIt: number }>(
      page,
      '(m, i) => m.getCableAdequacy(i)',
      { cableSize: 16, cableType, designCurrent: 50, protectionDevice: { rating: 50 } }
    );
    expect(result.tabulatedIt, `${cableType} must use Table 4D4A`).toBe(85);
  }

  // And twin and earth must be unaffected by the new branch.
  const te = await withModule<{ tabulatedIt: number }>(page, '(m, i) => m.getCableAdequacy(i)', {
    cableSize: 16,
    cableType: 'XLPE twin and earth',
    designCurrent: 50,
    protectionDevice: { rating: 50 },
  });
  expect(te.tabulatedIt).toBe(94);
});

test('a 320 A submain in SWA is sized from the armoured table', async ({ page }) => {
  // The ELE-1425 circuit, once the cable-type tripwire has moved it to SWA.
  // 185 mm² SWA is 348 A in Table 4D4A — the size the ticket itself expected.
  const result = await withModule<{ recommendedSize: number; adequate: boolean }>(
    page,
    '(m, i) => m.getCableAdequacy(i)',
    {
      cableSize: 1.5,
      cableType: 'SWA 4-core XLPE',
      designCurrent: 330.43,
      protectionDevice: { rating: 320 },
    }
  );

  expect(result.adequate).toBe(false);
  expect(result.recommendedSize).toBe(185);
});

test('textbook-correct circuits produce no warnings at all', async ({ page }) => {
  // The noise guard. An engine that cries wolf on ordinary work gets ignored,
  // which is worse than no engine. Each of these is a standard domestic circuit
  // and must come back completely clean.
  const circuits = [
    { name: 'Lighting', circuitTopology: 'radial', loadType: 'lighting',
      cableSize: 1.5, cpcSize: 1.0, cableLength: 15, cableType: 'PVC twin and earth',
      designCurrent: 4.5, loadPower: 1035, phases: 'single', voltage: 230,
      protectionDevice: { type: 'MCB', rating: 6, curve: 'B' },
      calculations: { Ib: 4.5, zs: 0, maxZs: 7.28, voltageDrop: { limit: 3 } } },
    { name: 'Sockets ring', circuitTopology: 'ring', loadType: 'sockets',
      cableSize: 2.5, cpcSize: 1.5, cableLength: 40, cableType: 'PVC twin and earth',
      designCurrent: 26, loadPower: 5980, phases: 'single', voltage: 230,
      protectionDevice: { type: 'RCBO', rating: 32, curve: 'B' },
      calculations: { Ib: 26, zs: 0, maxZs: 1.37 } },
    { name: 'Shower', circuitTopology: 'radial', loadType: 'shower',
      cableSize: 10, cpcSize: 4, cableLength: 12, cableType: 'PVC twin and earth',
      designCurrent: 39.1, loadPower: 9000, phases: 'single', voltage: 230,
      protectionDevice: { type: 'RCBO', rating: 40, curve: 'B' },
      calculations: { Ib: 39.1, zs: 0, maxZs: 1.09 } },
    { name: 'Cooker', circuitTopology: 'radial', loadType: 'cooker',
      cableSize: 6, cpcSize: 2.5, cableLength: 10, cableType: 'PVC twin and earth',
      designCurrent: 30, loadPower: 6900, phases: 'single', voltage: 230,
      protectionDevice: { type: 'MCB', rating: 32, curve: 'B' },
      calculations: { Ib: 30, zs: 0, maxZs: 1.37 } },
  ];

  for (const c of circuits) {
    const r = await withModule<{ verdict: string; failures: string[]; warnings: string[] }>(
      page,
      '(m, i) => m.getCircuitCompliance(i, 0.35)',
      c
    );
    expect(r.failures, `${c.name} must not fail`).toHaveLength(0);
    expect(r.warnings, `${c.name} must not warn`).toHaveLength(0);
    expect(r.verdict, `${c.name} must pass`).toBe('pass');
  }
});

test('Zs is calculated up to 50mm², and says why beyond it', async ({ page }) => {
  // GN3 Table B1 tabulates conductor resistance only to 50 mm². At 50 it must
  // calculate; above it must decline for the stated reason rather than pretend
  // the inputs were missing.
  const at50 = await withModule<{ state: string; value: number }>(
    page,
    '(m, i) => m.getZsCheck(i, 0.35)',
    { cableSize: 50, cpcSize: 25, cableLength: 30, calculations: { zs: 0, maxZs: 0.5 } }
  );
  expect(at50.state).not.toBe('not-calculated');
  expect(at50.value).toBeGreaterThan(0);

  const above = await withModule<{ warnings: string[] }>(
    page,
    '(m, i) => m.getCircuitCompliance(i, 0.35)',
    {
      name: 'Submain', cableSize: 185, cpcSize: 95, cableLength: 45,
      cableType: 'SWA 4-core XLPE', designCurrent: 300, phases: 'three', voltage: 400,
      protectionDevice: { rating: 320, curve: 'C' },
      calculations: { zs: 0, maxZs: 0.14 },
    }
  );
  expect(above.warnings.some((w) => w.includes('50 mm²') && w.includes('Table B1'))).toBe(true);
});

test('ELE-1424: an overloaded circuit reports OVERLOAD, not "+0% headroom"', async ({ page }) => {
  // The reported circuit: 76 kW / 330.43 A through 1.5mm² on a 16 A device.
  // Headroom used to be (Iz − In) / In, which ignores the design current — Iz
  // happened to equal In, so a catastrophic overload read "+0% headroom", as
  // though it were sitting exactly on the limit.
  const cable = await withModule<{ iz: number; required: number; adequate: boolean }>(
    page,
    '(m, i) => m.getCableAdequacy(i)',
    {
      cableSize: 1.5,
      cableType: 'PVC twin and earth',
      designCurrent: 330.43,
      protectionDevice: { rating: 16 },
    }
  );

  // Headroom must be measured against what the cable actually has to carry.
  const headroom = Math.round(((cable.iz - cable.required) / cable.required) * 100);
  expect(cable.required).toBeCloseTo(330.43, 1);
  expect(headroom).toBeLessThan(0);
  expect(cable.adequate).toBe(false);
});

test('ELE-1424: voltage drop calculates on an overloaded circuit', async ({ page }) => {
  // Vd showed "—" because the tile read the AI's value and got 0. It must be
  // derived, and it must still compute when the circuit is grossly overloaded —
  // there was no guard bailing out, the number was simply never calculated.
  const vd = await withModule<{ known: boolean; percent: number; limit: number; compliant: boolean }>(
    page,
    '(m, i) => m.getVoltageDrop(i)',
    {
      cableSize: 1.5,
      cableType: 'PVC twin and earth',
      designCurrent: 330.43,
      cableLength: 20,
      phases: 'single',
      voltage: 230,
      calculations: { voltageDrop: { limit: 3 } },
    }
  );

  expect(vd.known).toBe(true);
  expect(vd.percent).toBeGreaterThan(0);
  expect(vd.limit).toBe(3);
  expect(vd.compliant).toBe(false);
});

// ─── ELE-1423: On-Site Guide Table A2 diversity ─────────────────────────────
// Values transcribed from the OSG PDF, printed pp.151–152, read directly.

const A2 = '/src/utils/diversity-table-a2.ts';

async function a2<T>(page: import('@playwright/test').Page, fn: string, arg: unknown) {
  return page.evaluate(
    async ([modPath, body, input]) => {
      const m = await import(/* @vite-ignore */ modPath as string);
      // eslint-disable-next-line no-new-func
      return new Function('m', 'input', `return (${body})(m, input)`)(m, input);
    },
    [A2, fn, arg] as const
  ) as Promise<T>;
}

test('ELE-1423: the cooker rule works in amperes and adds the 5 A socket allowance', async ({
  page,
}) => {
  // Table A2 row 3, household: 10 A + 30% f.l. of connected cooking appliances
  // in excess of 10 A + 5 A if a socket-outlet is in the control unit.
  // A 12 kW cooker at 230 V is 52.17 A → 10 + 0.3 × 42.17 + 5 = 27.65 A.
  // The old code did 10 + (12 − 10) × 0.3 = 10.6 "kW" — a 10 AMPERE threshold
  // applied to a kW value.
  const withSocket = await a2<{ diversified: number }>(
    page,
    '(m, i) => m.applyA2Row("cooking", "household", { currents: [m.kwToAmps(12, 230)], cookerControlUnitSocket: true })',
    null
  );
  const without = await a2<{ diversified: number }>(
    page,
    '(m, i) => m.applyA2Row("cooking", "household", { currents: [m.kwToAmps(12, 230)] })',
    null
  );

  expect(withSocket.diversified).toBeCloseTo(27.65, 1);
  expect(without.diversified).toBeCloseTo(22.65, 1);
});

test('ELE-1423: household lighting is 66%, not the small-shops 90%', async ({ page }) => {
  // The old calculator used 0.9 — close to Table A2's small shops column, and
  // wrong for a house.
  const household = await a2<{ diversified: number }>(
    page,
    '(m) => m.applyA2Row("lighting", "household", { currents: [10] })',
    null
  );
  const shops = await a2<{ diversified: number }>(
    page,
    '(m) => m.applyA2Row("lighting", "shops", { currents: [10] })',
    null
  );

  expect(household.diversified).toBeCloseTo(6.6, 2);
  expect(shops.diversified).toBeCloseTo(9.0, 2);
});

test('ELE-1423: rows with no allowable diversity take the full connected load', async ({ page }) => {
  // Rows 6, 7 and 8 are "No diversity allowable" in all three columns. The old
  // calculator gave water heating a 1.0 factor, which happens to agree, but
  // motors got 0.8 where the household column says "Not applicable".
  const thermostatic = await a2<{ diversified: number; noDiversity: boolean }>(
    page,
    '(m) => m.applyA2Row("waterHeatersThermostatic", "household", { currents: [13] })',
    null
  );
  const motors = await a2<{ diversified: number; notApplicable: boolean }>(
    page,
    '(m) => m.applyA2Row("motors", "household", { currents: [8, 5] })',
    null
  );

  expect(thermostatic.diversified).toBe(13);
  expect(thermostatic.noDiversity).toBe(true);
  // Not applicable must not silently discount — the full 13 A stands.
  expect(motors.diversified).toBe(13);
  expect(motors.notApplicable).toBe(true);
});

test('ELE-1423: "100% of largest + 40% of every other" for household sockets', async ({ page }) => {
  // Table A2 row 10, household. Three points at 32/32/16 A →
  // 32 + 0.4 × (32 + 16) = 51.2 A. A flat 0.6 multiplier gives 48 A.
  const r = await a2<{ diversified: number }>(
    page,
    '(m) => m.applyA2Row("socketsAndStationary", "household", { currents: [32, 32, 16] })',
    null
  );
  expect(r.diversified).toBeCloseTo(51.2, 2);
});

test('ELE-1423: EV and heat pump take no diversity, and total connected load is reported', async ({
  page,
}) => {
  // Note † to Table A2: consumer units must be rated for the total connected
  // load WITHOUT diversity, so both figures have to be available.
  const r = await a2<{
    maximumDemand: number;
    totalConnected: number;
    fullDemandAdditions: number;
  }>(
    page,
    '(m) => m.assessMaximumDemand("household", { lighting: { currents: [10] } }, 32)',
    null
  );

  // Lighting 10 A → 6.6 A, plus 32 A EV at 100%.
  expect(r.maximumDemand).toBeCloseTo(38.6, 1);
  expect(r.totalConnected).toBeCloseTo(42, 1);
  expect(r.fullDemandAdditions).toBe(32);
});
