// select_cable_size — pinned against Table 4D5 / Table 4D4A values held in
// src/lib/calculators/bs7671-data (transcribed from the printed standard).
// Run: npm run check:cable-select

import { assertEquals, assert, assertThrows } from 'https://deno.land/std@0.190.0/testing/asserts.ts';
import { selectCableSize } from './bs7671-cable-select.ts';
import { BS7671_TOOL_SCHEMAS, executeBS7671ToolCall } from './bs7671-tool-calls.ts';

Deno.test('9.5 kW at 230 V: Ib 41.3 A → 50 A MCB → 10 mm² T&E clipped direct', () => {
  const r = selectCableSize({ load_kw: 9.5, length_m: 15 });
  assertEquals(r.design_current_ib_a, 41.3);
  assertEquals(r.device.rating_in_a, 50); // no 45 A in the MCB series
  assertEquals(r.selected?.size_mm2, 10);
  // 6 mm² Method C is 47 A — the figure Elec-AI kept getting wrong
  assertEquals(r.sizes_checked.find((s) => s.size_mm2 === 6)?.tabulated_it_a, 47);
});

Deno.test('9.5 kW at 240 V: Ib 39.6 A → 40 A MCB → 6 mm²', () => {
  const r = selectCableSize({ load_kw: 9.5, voltage_v: 240, length_m: 15 });
  assertEquals(r.device.rating_in_a, 40);
  assertEquals(r.selected?.size_mm2, 6);
  // the 230 V case comes back with it, so the model never has to guess it
  assertEquals(r.at_other_rating_voltage?.device_rating_in_a, 50);
  assertEquals(r.at_other_rating_voltage?.selected_size_mm2, 10);
});

Deno.test('a device below Ib fails whatever the cable', () => {
  const r = selectCableSize({ load_kw: 9.5, device_rating_a: 40, length_m: 15 });
  assertEquals(r.device.ib_le_in, false);
  assertEquals(r.selected, null);
  assert(r.notes.some((n) => n.includes('BELOW Ib')));
});

Deno.test('T&E in insulated stud wall (Method 103) and totally surrounded both need 10 mm² at 32 A', () => {
  assertEquals(selectCableSize({ design_current_a: 32, installation_method: 'method-103' }).selected?.size_mm2, 10);
  const ci = selectCableSize({ design_current_a: 32, insulation_surrounded_mm: 500 });
  assertEquals(ci.factors.ci, 0.5);
  assertEquals(ci.selected?.size_mm2, 10);
});

Deno.test('voltage drop can drive the size up', () => {
  // 20 A over 60 m: 2.5 mm² carries it but drops 18 × 20 × 60 / 1000 = 21.6 V (9.4%)
  const r = selectCableSize({ design_current_a: 20, length_m: 60 });
  const s25 = r.sizes_checked.find((s) => s.size_mm2 === 2.5)!;
  assert(s25.in_le_iz);
  assertEquals(s25.vd_ok, false);
  assertEquals(r.selected?.size_mm2, 6); // 4 mm²: 11 × 20 × 60 / 1000 = 13.2 V (5.7%) also fails
});

Deno.test('grouping and ambient factors are applied', () => {
  const r = selectCableSize({ design_current_a: 40, ambient_temp_c: 35, grouping_count: 2 });
  assertEquals(r.factors.ca, 0.94);
  assertEquals(r.factors.cg, 0.8);
});

Deno.test('a method the table does not hold is an error, not a guess', () => {
  assertThrows(() => selectCableSize({ design_current_a: 20, installation_method: 'method-e' }));
});

Deno.test('Elec-AI offers select_cable_size, not the memory-fed capacity tool', () => {
  const names: string[] = BS7671_TOOL_SCHEMAS.map((t) => t.name);
  assert(names.includes('select_cable_size'));
  assert(!names.includes('calculate_cable_capacity'));
  const out = executeBS7671ToolCall('select_cable_size', { load_kw: 7.4, length_m: 20 });
  assertEquals(out.error, undefined);
});
