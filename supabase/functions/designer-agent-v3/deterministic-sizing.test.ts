// deno test --no-check --allow-env supabase/functions/designer-agent-v3/deterministic-sizing.test.ts
import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { applyDeterministicSizing } from './deterministic-sizing.ts';

const circuit = (o: Record<string, unknown>) =>
  ({
    name: 'C',
    phases: 'single',
    voltage: 230,
    cableType: '6mm² twin and earth',
    cableSize: 6,
    cpcSize: 2.5,
    cableLength: 15,
    installationMethod: 'Method C - clipped direct',
    loadType: 'shower',
    circuitTopology: 'radial',
    protectionDevice: { type: 'MCB', curve: 'B', rating: 50 },
    calculations: { Ib: 45.65, Iz: 47, voltageDrop: { volts: 0, percent: 0, limit: 5 } },
    expectedTests: { r1r2: { at20C: 0.1, at70C: 0.12, value: '0.12Ω' }, zs: { expected: 0.5 } },
    ...o,
  }) as never;

Deno.test(
  'a 50 A device on 6 mm² T&E (47 A) is corrected to 10 mm², CPC and test values follow',
  () => {
    const { circuits, corrections } = applyDeterministicSizing([circuit({})]);
    const c = circuits[0] as any;
    assertEquals(c.cableSize, 10);
    assertEquals(c.cpcSize, 4);
    assertEquals(c.expectedTests, undefined); // recalculated downstream for the new size
    assertEquals(
      corrections.some((x) => x.field === 'cableSize' && x.to === 10),
      true
    );
  }
);

Deno.test('ring voltage drop is divided by 4 once, not twice', () => {
  const ring = circuit({
    name: 'Kitchen ring',
    cableType: '2.5mm² twin and earth',
    cableSize: 2.5,
    cableLength: 25,
    loadType: 'socket',
    circuitTopology: 'ring',
    protectionDevice: { rating: 32 },
    calculations: { Ib: 32, Iz: 27, voltageDrop: { volts: 0.9, percent: 0.39, limit: 5 } },
  });
  const c = applyDeterministicSizing([ring]).circuits[0] as any;
  // 18 mV/A/m × 32 A × 25 m ÷ 1000 ÷ 4 = 3.6 V = 1.57 %
  assertEquals(c.calculations.voltageDrop.volts, 3.6);
  assertEquals(c.calculations.voltageDrop.percent, 1.57);
  assertEquals(c.cableSize, 2.5); // rings are never resized here
});

Deno.test(
  'a T&E radial over its VD limit is upsized; a ring over it is reported, not changed',
  () => {
    const longRadial = circuit({
      name: 'Long lights',
      cableType: '1.5mm² twin and earth',
      cableSize: 1.5,
      cableLength: 60,
      loadType: 'lighting',
      protectionDevice: { rating: 6 },
      calculations: { Ib: 4.35, Iz: 20, voltageDrop: { percent: 2.9, limit: 3 } },
    });
    const longRing = circuit({
      name: 'Extension ring',
      cableType: '2.5mm² twin and earth',
      cableSize: 2.5,
      cableLength: 110,
      circuitTopology: 'ring',
      protectionDevice: { rating: 32 },
      calculations: { Ib: 32, Iz: 27, voltageDrop: { percent: 0.3, limit: 5 } },
    });
    const { circuits, issues } = applyDeterministicSizing([longRadial, longRing]);
    assertEquals((circuits[0] as any).cableSize, 2.5);
    assertEquals((circuits[1] as any).cableSize, 2.5);
    assertEquals((circuits[1] as any).calculations.voltageDrop.compliant, false);
    assertEquals(
      issues.some((i) => i.circuitName === 'Extension ring'),
      true
    );
  }
);

Deno.test(
  'cables not in the tables keep their size; small copper ones get voltage drop from resistance',
  () => {
    const fp = circuit({
      name: 'Emergency lighting',
      loadType: 'emergency-lighting',
      cableType: '1.5mm² FP200',
      cableSize: 1.5,
      cableLength: 40,
      protectionDevice: { rating: 6 },
      calculations: { Ib: 1.3, Iz: 18, voltageDrop: { percent: 5.09, limit: 3 } },
    });
    const swaConduit = circuit({
      name: 'Outdoor',
      cableType: '35mm² SWA',
      cableSize: 35,
      installationMethod: 'in steel conduit',
      protectionDevice: { rating: 100 },
    });
    const { circuits } = applyDeterministicSizing([fp, swaConduit]);
    const e = circuits[0] as any;
    assertEquals(e.cableSize, 1.5);
    // 2 × 12.1 × 1.28 = 30.98 mV/A/m × 1.3 A × 40 m = 1.61 V = 0.7 %
    assertEquals(e.calculations.voltageDrop.percent, 0.7);
    assertEquals(e.calculations.voltageDrop.limit, 3);
    // 35mm², not in the resistance-only range: left exactly as designed.
    assertEquals(circuits[1], swaConduit);
  }
);

Deno.test(
  'stated grouping (0.8) derates every size, so a 6mm² on 40 A goes to 10mm²; the model Iz alone does not',
  () => {
    const grouped = circuit({
      name: 'Grouped',
      protectionDevice: { rating: 40 },
      calculations: { Ib: 38, Iz: 37.6, voltageDrop: { percent: 1, limit: 5 } },
    });
    const c = applyDeterministicSizing([grouped], undefined, { groupingFactor: 0.8 })
      .circuits[0] as any;
    assertEquals(c.cableSize, 10);
    assertEquals(c.cableType, '10mm² twin and earth');
    assertEquals(
      String(c.justifications.cableSize).startsWith('Corrected from 6mm² to 10mm²'),
      true
    );
    // Same circuit, nothing stated: 6mm² clipped direct is 47 A — it stays.
    const plain = applyDeterministicSizing([grouped]).circuits[0] as any;
    assertEquals(plain.cableSize, 6);
    assertEquals(plain.calculations.Iz, 47);
  }
);

Deno.test(
  'review: a table with no column for the method leaves the circuit to the legacy check',
  () => {
    const tray = circuit({
      name: 'Tray',
      installationMethod: 'Method E - on tray',
      protectionDevice: { rating: 63 },
      calculations: { Ib: 50, Iz: 70, voltageDrop: { percent: 1, limit: 5 } },
    });
    const c = applyDeterministicSizing([tray]).circuits[0] as any;
    assertEquals(c._appendix4Sized, undefined);
    assertEquals(c.calculations.Iz, 70);
  }
);

Deno.test('review: lighting is held to 3% even when the design says 5%', () => {
  const lights = circuit({
    name: 'Long lighting',
    loadType: 'lighting',
    cableType: '1.5mm² twin and earth',
    cableSize: 1.5,
    cableLength: 70,
    protectionDevice: { rating: 6 },
    calculations: { Ib: 5, Iz: 20, voltageDrop: { percent: 1, limit: 5 } },
  });
  const c = applyDeterministicSizing([lights]).circuits[0] as any;
  assertEquals(c.calculations.voltageDrop.limit, 3);
  assertEquals(c.cableSize > 1.5, true);
});

Deno.test('review: methods — "100 x 50 trunking" is B, D2 is buried direct', async () => {
  const { mapMethod } = await import('./deterministic-sizing.ts');
  assertEquals(mapMethod('Method B - in 100 x 50 trunking'), 'method-b');
  assertEquals(mapMethod('Method 100 - above plasterboard ceiling'), 'method-100');
  assertEquals(mapMethod('buried direct D2'), 'method-d2');
  assertEquals(mapMethod('Method D2 - buried direct'), 'method-d2');
});

Deno.test('review: Ib above In is reported once as a load problem, not as a voltage drop', () => {
  const kitchen = circuit({
    name: 'Kitchen',
    loadType: 'lighting',
    cableType: '1.5mm² twin and earth',
    cableSize: 1.5,
    cableLength: 20,
    protectionDevice: { rating: 16 },
    calculations: { Ib: 330.43, Iz: 16, voltageDrop: { percent: 0, limit: 3 } },
  });
  const { circuits, issues } = applyDeterministicSizing([kitchen]);
  assertEquals(issues.length, 1);
  assertEquals(issues[0].error.startsWith('Design current 330.43A is above the 16A device'), true);
  assertEquals((circuits[0] as any).cableSize, 1.5);
});

Deno.test(
  'review: the diversified current (Id) is the design current — a cooker is not over its 32 A device',
  () => {
    const cooker = circuit({
      name: 'Cooker',
      loadType: 'cooker',
      cableType: '6mm² twin and earth',
      cableSize: 6,
      cableLength: 12,
      protectionDevice: { rating: 32 },
      calculations: { Ib: 40, Id: 24.6, Iz: 47, voltageDrop: { percent: 1, limit: 5 } },
    });
    const { circuits, issues } = applyDeterministicSizing([cooker]);
    assertEquals(issues.length, 0);
    // 7.3 mV/A/m × 24.6 A × 12 m = 2.15 V
    assertEquals((circuits[0] as any).calculations.voltageDrop.volts, 2.15);
  }
);

Deno.test(
  'review 3: an implausible design Iz (factor < 0.4) is ignored, so the upsize still happens',
  () => {
    const c0 = circuit({
      name: 'Garage',
      loadType: 'socket',
      cableType: '4mm² twin and earth',
      cableSize: 4,
      cpcSize: 1.5,
      cableLength: 40,
      protectionDevice: { rating: 32 },
      calculations: { Ib: 30, Iz: 12, voltageDrop: { percent: 1, limit: 5 } },
    });
    const c = applyDeterministicSizing([c0]).circuits[0] as any;
    assertEquals(c.cableSize, 6);
    assertEquals(c.cpcSize, 2.5);
  }
);

Deno.test('review 3: resized singles get a Table 54.7 CPC, not the old one', () => {
  const c0 = circuit({
    name: 'Sub-main',
    loadType: 'distribution',
    cableType: '10mm² PVC singles in conduit',
    cableSize: 10,
    cpcSize: 2.5,
    cableLength: 40,
    installationMethod: 'Method B - in conduit',
    protectionDevice: { rating: 80 },
    calculations: { Ib: 70, Iz: 57, voltageDrop: { percent: 1, limit: 5 } },
  });
  const c = applyDeterministicSizing([c0]).circuits[0] as any;
  assertEquals(c.cableSize > 10, true);
  assertEquals(c.cpcSize, c.cableSize <= 16 ? c.cableSize : 16);
  assertEquals(c.cableType.startsWith(`${c.cableSize}mm²`), true);
});

Deno.test('review 3: a stated limit above 5% is not allowed to pass a socket radial', () => {
  const c0 = circuit({
    name: 'Sockets',
    loadType: 'socket',
    cableType: '2.5mm² twin and earth',
    cableSize: 2.5,
    cpcSize: 1.5,
    protectionDevice: { rating: 20 },
    calculations: { Ib: 20, Iz: 27, voltageDrop: { percent: 1, limit: 8 } },
  });
  assertEquals(
    (applyDeterministicSizing([c0]).circuits[0] as any).calculations.voltageDrop.limit,
    5
  );
});

Deno.test(
  'XLPE SWA voltage drop uses the 90 °C Table 4E4B figure (19 mV/A/m at 2.5mm²), PVC SWA keeps 4D4B',
  () => {
    const run = (cableType: string) =>
      (
        applyDeterministicSizing([
          circuit({
            name: 'Shed',
            loadType: 'socket',
            cableType,
            cableSize: 2.5,
            cpcSize: 2.5,
            cableLength: 20,
            protectionDevice: { rating: 20 },
            calculations: { Ib: 10, Iz: 30, voltageDrop: { percent: 1, limit: 5 } },
          }),
        ]).circuits[0] as any
      ).calculations.voltageDrop.volts;
    assertEquals(run('2.5mm² SWA'), 3.8); // 19 × 10 × 20 / 1000
    assertEquals(run('2.5mm² PVC SWA') < 3.8, true);
  }
);

Deno.test(
  'Zs: a D16 compressor on 2.5mm² SWA (Zs 0.77 > 0.68) goes to 4mm², core CPC follows',
  () => {
    const comp = circuit({
      name: 'Compressor',
      phases: 'three',
      voltage: 400,
      loadType: 'motor',
      cableType: '2.5mm² SWA',
      cableSize: 2.5,
      cpcSize: 2.5,
      cableLength: 30,
      protectionDevice: { type: 'MCB', curve: 'D', rating: 16 },
      calculations: { Ib: 11, Iz: 21, maxZs: 0.68, voltageDrop: { percent: 1, limit: 5 } },
    });
    const c = applyDeterministicSizing([comp], undefined, { ze: 0.2 }).circuits[0] as any;
    assertEquals(c.cableSize, 4);
    assertEquals(c.cpcSize, 4);
    assertEquals(c.cableType, '4mm² SWA');
  }
);

Deno.test('Zs: without Ze (TT supply) the Zs step does nothing', () => {
  const comp = circuit({
    name: 'Garage',
    loadType: 'socket',
    cableType: '2.5mm² twin and earth',
    cableSize: 2.5,
    cpcSize: 1.5,
    cableLength: 25,
    protectionDevice: { rating: 20 },
    calculations: { Ib: 16, Iz: 27, maxZs: 2.19, voltageDrop: { percent: 1, limit: 5 } },
  });
  const { circuits, issues } = applyDeterministicSizing([comp]);
  assertEquals((circuits[0] as any).cableSize, 2.5);
  assertEquals(issues.length, 0);
});

Deno.test(
  'a 9 kW household cooker (39 A raw) is 18.7 A after OSG A2 diversity — fine on 32 A',
  () => {
    const ck = circuit({
      name: 'Cooker',
      loadType: 'cooker',
      cableType: '6mm² twin and earth',
      cableSize: 6,
      cpcSize: 2.5,
      cableLength: 12,
      protectionDevice: { rating: 32 },
      calculations: { Ib: 39.13, Id: 39.13, Iz: 47, voltageDrop: { percent: 1, limit: 5 } },
    });
    const { circuits, issues } = applyDeterministicSizing([ck], undefined, {
      installationType: 'domestic',
    });
    assertEquals((circuits[0] as any).calculations.Id, 18.74);
    assertEquals(issues.length, 0);
  }
);

Deno.test('a 9.5 kW shower (41.3 A) on 40 A steps up to 45 A and Table 41.3 maxZs follows', () => {
  const sh = circuit({
    name: 'Shower',
    cableType: '6mm² twin and earth',
    cableSize: 6,
    cpcSize: 2.5,
    cableLength: 18,
    protectionDevice: { type: 'RCBO', curve: 'B', rating: 40 },
    calculations: { Ib: 41.3, Iz: 47, maxZs: 1.09, voltageDrop: { percent: 1, limit: 5 } },
  });
  const { circuits, issues } = applyDeterministicSizing([sh], undefined, { ze: 0.35 });
  const c = circuits[0] as any;
  assertEquals(c.protectionDevice.rating, 45);
  assertEquals(c.calculations.maxZs < 1.09, true);
  assertEquals(issues.length, 0);
});

Deno.test(
  'a cable name that disagrees with cableSize follows cableSize; ring Iz is the table figure',
  () => {
    const oven = circuit({
      name: 'Oven',
      loadType: 'cooker',
      cableType: '1.5mm² twin and earth',
      cableSize: 2.5,
      cpcSize: 1.5,
      protectionDevice: { rating: 16 },
      calculations: { Ib: 13, Iz: 20, voltageDrop: { percent: 1, limit: 5 } },
    });
    const ring = circuit({
      name: 'Ring',
      loadType: 'socket',
      circuitTopology: 'ring',
      cableType: '2.5mm² twin and earth',
      cableSize: 2.5,
      cpcSize: 1.5,
      protectionDevice: { rating: 32 },
      calculations: { Ib: 32, Iz: 46, voltageDrop: { percent: 1, limit: 5 } },
    });
    const [o, r] = applyDeterministicSizing([oven, ring]).circuits as any[];
    assertEquals(o.cableType, '2.5mm² twin and earth');
    assertEquals(r.calculations.Iz, 27);
  }
);

Deno.test('a socket radial over its 32 A device is reported, never stepped up to 40 A', () => {
  const u = circuit({
    name: 'Utility',
    loadType: 'socket',
    cableType: '4mm² twin and earth',
    cableSize: 4,
    cpcSize: 1.5,
    protectionDevice: { rating: 32 },
    calculations: { Ib: 40, Iz: 37, voltageDrop: { percent: 1, limit: 5 } },
  });
  const { circuits, issues } = applyDeterministicSizing([u]);
  assertEquals((circuits[0] as any).protectionDevice.rating, 32);
  assertEquals(
    issues.some((i) => i.kind === 'design-current'),
    true
  );
});

Deno.test('working lines name the table and show the sum', () => {
  const r = circuit({
    name: 'Radial',
    loadType: 'socket',
    cableType: '4mm² twin and earth',
    cableSize: 4,
    cpcSize: 1.5,
    cableLength: 20,
    protectionDevice: { rating: 32 },
    calculations: { Ib: 20, Iz: 37, voltageDrop: { percent: 1, limit: 5 } },
  });
  const c = applyDeterministicSizing([r]).circuits[0] as any;
  assertEquals(c.calculations.izWorking, 'Table 4D5, 4mm², Method C: It 37 A');
  assertEquals(
    c.calculations.voltageDrop.working,
    'Table 4D5: 11 mV/A/m × 20 A × 20 m ÷ 1000 = 4.4 V (1.91% of 230 V, limit 5%)'
  );
});

Deno.test('review 5: "XLPE/SWA/PVC" is 90 °C XLPE, not PVC', async () => {
  const { mapCable } = await import('./deterministic-sizing.ts');
  const { operatingTempFactor } = await import('./test-value-calculator.ts');
  assertEquals(mapCable('6mm² XLPE/SWA/PVC')?.capKey, 'swa-xlpe');
  assertEquals(mapCable('6mm² PVC/SWA/PVC (BS 6346)')?.capKey, 'swa-pvc');
  assertEquals(operatingTempFactor('6mm² XLPE/SWA/PVC'), 1.28);
  assertEquals(operatingTempFactor('2.5mm² LSZH twin and earth 6242B'), 1.2);
});

Deno.test(
  'review 5: names — conduit size and CPC of a pair are not the conductor size',
  async () => {
    const { namedSize } = await import('./deterministic-sizing.ts');
    assertEquals(namedSize('PVC singles (6491X) in 20mm conduit'), null);
    assertEquals(namedSize('2.5/1.5mm² twin and earth'), null);
    assertEquals(namedSize('6mm² twin and earth'), 6);
    const c = applyDeterministicSizing([
      circuit({
        cableType: '4mm² PVC singles in 20mm conduit',
        cableSize: 4,
        cpcSize: 4,
        installationMethod: 'Method B - in conduit',
        protectionDevice: { rating: 40 },
        calculations: { Ib: 35, Iz: 30, voltageDrop: { percent: 1, limit: 5 } },
      }),
    ]).circuits[0] as any;
    assertEquals(c.cableType.endsWith('in 20mm conduit'), true);
  }
);

Deno.test(
  'review 5: "Hobby room sockets" is not a cooker; "Method buried direct" is not method B',
  async () => {
    const { mapMethod } = await import('./deterministic-sizing.ts');
    assertEquals(mapMethod('Method buried direct in ground'), 'method-d2');
    const hobby = circuit({
      name: 'Hobby room sockets',
      loadType: 'socket',
      cableType: '2.5mm² twin and earth',
      cableSize: 2.5,
      cpcSize: 1.5,
      protectionDevice: { rating: 20 },
      calculations: { Ib: 20, Id: 20, Iz: 27, voltageDrop: { percent: 1, limit: 5 } },
    });
    assertEquals((applyDeterministicSizing([hobby]).circuits[0] as any).calculations.Id, 20);
  }
);

Deno.test('review 5: a BS 88 fuse is never stepped up to an MCB rating', () => {
  const f = circuit({
    name: 'Heater',
    loadType: 'heating',
    cableType: '10mm² twin and earth',
    cableSize: 10,
    cpcSize: 4,
    protectionDevice: { type: 'BS88', curve: 'gG', rating: 40 },
    calculations: { Ib: 42, Iz: 64, voltageDrop: { percent: 1, limit: 5 } },
  });
  const { circuits, issues } = applyDeterministicSizing([f]);
  assertEquals((circuits[0] as any).protectionDevice.rating, 40);
  assertEquals(
    issues.some((i) => i.kind === 'design-current'),
    true
  );
});

Deno.test('review 5: Ze taking the whole allowance is reported, never a 240mm² cable', () => {
  const big = circuit({
    name: 'Sub',
    loadType: 'distribution',
    cableType: '16mm² XLPE/SWA/PVC',
    cableSize: 16,
    cpcSize: 16,
    cableLength: 20,
    protectionDevice: { type: 'MCB', curve: 'C', rating: 63 },
    calculations: { Ib: 55, Iz: 99, maxZs: 0.35, voltageDrop: { percent: 1, limit: 5 } },
  });
  const { circuits, issues } = applyDeterministicSizing([big], undefined, { ze: 0.35 });
  assertEquals((circuits[0] as any).cableSize, 16);
  assertEquals(
    issues.some((i) => i.kind === 'zs'),
    true
  );
});

Deno.test(
  'review 5: after a Zs upsize the voltage-drop correction describes the final cable',
  () => {
    const m = circuit({
      name: 'Motor',
      phases: 'three',
      loadType: 'motor',
      cableType: '4mm² SWA',
      cableSize: 4,
      cpcSize: 4,
      cableLength: 60,
      protectionDevice: { type: 'MCB', curve: 'D', rating: 20 },
      calculations: { Ib: 15, Iz: 36, maxZs: 0.55, voltageDrop: { percent: 3, limit: 5 } },
    });
    const { circuits, corrections } = applyDeterministicSizing([m], undefined, { ze: 0.2 });
    const c = circuits[0] as any;
    const vdCorr = corrections.find((x) => x.field === 'voltageDrop');
    assertEquals(c.cableSize > 4, true);
    assertEquals(vdCorr?.to, `${c.calculations.voltageDrop.percent}%`);
  }
);

Deno.test('device step-up keeps calculations.In in step with the rating', () => {
  const sh = circuit({
    name: 'Shower',
    cableType: '6mm² twin and earth',
    cableSize: 6,
    cpcSize: 2.5,
    protectionDevice: { type: 'RCBO', curve: 'B', rating: 40 },
    calculations: { Ib: 41.3, In: 40, Iz: 47, maxZs: 1.09, voltageDrop: { percent: 1, limit: 5 } },
  });
  const c = applyDeterministicSizing([sh]).circuits[0] as any;
  assertEquals(c.calculations.In, 45);
});
