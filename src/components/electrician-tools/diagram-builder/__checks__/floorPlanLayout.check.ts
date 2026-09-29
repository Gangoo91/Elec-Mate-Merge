/**
 * The floor planner must lay a plan out cleanly EVERY time, whatever the
 * reader returns (29 Sep 2026 — rooms drawn over each other on a real care
 * home plan, doubled walls, names under fittings).
 *
 * Two kinds of input:
 *   1. Real reader output, saved as fixtures (geometry only).
 *   2. Hundreds of generated plans, tiled like a real floor and then jittered
 *      the way a reader gets them wrong: edges 5–30 cm out, rooms lapping over
 *      each other, slivers of gap, the odd room badly misplaced.
 *
 * Every one must come out with no overlapping rooms, one line per wall, every
 * fitting inside its own room, every room name inside its room and clear of
 * walls, and every mains item on a circuit.
 *
 *   npm run check:floor-plan-layout
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { aiPlanToObjects, type AIRoomEntry } from '../aiPlanToObjects';
import { tidyRooms, layoutFaults } from '../roomLayout';
import { SCALE } from '../constants';
import { labelSize } from '../textMetrics';
import { planFromSchedule, ROOM_PRESETS, type ScheduleRoom } from '../roomSchedule';
import {
  assignNewSymbols,
  circuitColour,
  inferPremises,
  scheduleForRooms,
  scheduleFromObjects,
  toScheduleEntries,
  type DesignedCircuit,
} from '../circuitDesign';
import type { CanvasObject } from '@/pages/electrician-tools/ai-tools/DiagramBuilderPage';
import {
  findBoard,
  placeBoard,
  redesignCircuits,
  runLengths,
  runsAreStale,
  fixLongRuns,
  placeSubBoard,
  subBoards,
  splitCircuit,
  withRuns,
} from '../wiring';

const FIXTURES = 'src/components/electrician-tools/diagram-builder/__checks__/fixtures';

/**
 * Fixtures from real reads: how many fittings may still touch a room name.
 * Only ever lower these. They are the smallest rooms (WC, en-suite) where the
 * wall fittings fill the room.
 */
const LABEL_TOUCH_BUDGET: Record<string, number> = {
  'care-home-two-floor.json': 0, // was 27 before 29 Sep
  'care-home-poor-read.json': 3, // a WC 0.8 m deep, an en-suite 0.96 m deep
  'described-detached-house.json': 0,
  'described-house-run1.json': 0,
  'described-house-run2.json': 2, // a 1.25 × 1.5 m corridor with a switch and a detector
  'described-small-flat.json': 0,
  // Public drawings, read by the live reader on 29 Sep.
  // Re-baselined 29 Sep when names began to be measured at their real Arial width.
  'hmo-13-bed.json': 6,
  'primary-school.json': 2,
  'university-three-floor.json': 3,
  'estate-agent-flat.json': 1,
};

let failures = 0;
const fail = (what: string) => {
  failures++;
  console.error(`  ✘ ${what}`);
};

type Rect = { x0: number; y0: number; x1: number; y1: number };
const roomRect = (r: AIRoomEntry): Rect => {
  const x = 100 + (r.room?.origin?.x ?? 0) * SCALE;
  const y = 100 + (r.room?.origin?.y ?? 0) * SCALE;
  return {
    x0: x,
    y0: y,
    x1: x + (r.room?.dimensions?.width ?? 0) * SCALE,
    y1: y + (r.room?.dimensions?.height ?? 0) * SCALE,
  };
};

const MAINS =
  /^(socket-(single|double|usb|floor|outdoor|fused|switched|unswitched|cooker|ev)|light-|smoke-|heat-|co-detector|water-heater|towel-rail|panel-heater|heater$|boiler|air-conditioning|extractor-fan)/;

function checkPlan(name: string, rooms: AIRoomEntry[], labelBudget: number): void {
  const tidy = tidyRooms(rooms);
  const faults = layoutFaults(tidy);
  if (faults.overlaps) {
    if (process.env.DEBUG_LAYOUT) {
      const rs = tidy.map((r) => ({ n: r.room?.name, f: r.room?.floor ?? '', ...roomRect(r) }));
      rs.forEach((a, i) =>
        rs.slice(i + 1).forEach((b) => {
          const ox = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0);
          const oy = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0);
          if (a.f === b.f && ox > 1 && oy > 1)
            console.error(
              `    ${a.n} × ${b.n}  ox ${(ox / SCALE).toFixed(2)} oy ${(oy / SCALE).toFixed(2)}  a ${[a.x0, a.y0, a.x1, a.y1].map((v) => ((v - 100) / SCALE).toFixed(2))}  b ${[b.x0, b.y0, b.x1, b.y1].map((v) => ((v - 100) / SCALE).toFixed(2))}`
            );
        })
      );
    }
    fail(`${name}: ${faults.overlaps} rooms still overlap`);
  }
  if (faults.nearMisses) {
    if (process.env.DEBUG_LAYOUT) {
      const rs = tidy.map((r) => ({ n: r.room?.name, f: r.room?.floor ?? '', ...roomRect(r) }));
      rs.forEach((a, i) =>
        rs.slice(i + 1).forEach((b) => {
          if (a.f !== b.f) return;
          const m = (p: number, q: number) =>
            Math.abs(p - q) > 0.5 && Math.abs(p - q) <= 0.3 * SCALE;
          const ox = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0);
          const oy = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0);
          if (
            (oy > 0.3 * SCALE && (m(a.x1, b.x0) || m(b.x1, a.x0))) ||
            (ox > 0.3 * SCALE && (m(a.y1, b.y0) || m(b.y1, a.y0)))
          )
            console.error(
              `    near: ${a.n} ${[a.x0, a.y0, a.x1, a.y1].map((v) => ((v - 100) / SCALE).toFixed(2))} | ${b.n} ${[b.x0, b.y0, b.x1, b.y1].map((v) => ((v - 100) / SCALE).toFixed(2))}`
            );
        })
      );
    }
    fail(`${name}: ${faults.nearMisses} doubled walls (two lines 3–30 cm apart)`);
  }
  tidy.forEach((r) => {
    const w = r.room?.dimensions?.width ?? 0;
    const h = r.room?.dimensions?.height ?? 0;
    if (w < 0.79 || h < 0.79) fail(`${name}: "${r.room?.name}" collapsed to ${w} × ${h} m`);
  });

  const objects = aiPlanToObjects({ rooms }, 1);
  const rects = tidy.map(roomRect);

  // Every fitting inside its own room (a wall fitting sits on the inner face).
  objects
    .filter((o) => o.type === 'symbol')
    .forEach((s) => {
      const idx = Number(/^ai-sym-(\d+)-/.exec(s.id)?.[1]);
      const r = rects[idx];
      if (!r) return;
      const m = 4;
      if (s.x < r.x0 - m || s.x > r.x1 + m || s.y < r.y0 - m || s.y > r.y1 + m) {
        if (process.env.DEBUG_LAYOUT)
          console.error(
            JSON.stringify({
              id: s.id,
              x: Math.round(s.x),
              y: Math.round(s.y),
              r: Object.fromEntries(Object.entries(r).map(([k, v]) => [k, Math.round(v)])),
            })
          );
        fail(`${name}: ${s.symbolId} in "${tidy[idx].room?.name}" drawn outside the room`);
      }
      if (s.symbolId && MAINS.test(s.symbolId) && !s.circuitRef) {
        fail(`${name}: ${s.symbolId} in "${tidy[idx].room?.name}" is on no circuit`);
      }
    });

  // Every name inside its room, and only so many fittings touching names.
  let touching = 0;
  const symbols = objects.filter((o) => o.type === 'symbol');
  objects
    .filter((o) => o.id.startsWith('ai-title-'))
    .forEach((t) => {
      const idx = Number(/^ai-title-(\d+)-/.exec(t.id)?.[1]);
      const r = rects[idx];
      const lines = String(t.text).split('\n');
      // The drawn size, from Arial's own widths (the same as placement uses).
      const { w: tw, h: th } = labelSize(String(t.text), t.fontSize ?? 16);
      const b = t.rotation
        ? { x0: t.x, y0: t.y - tw, x1: t.x + th, y1: t.y }
        : { x0: t.x, y0: t.y, x1: t.x + tw, y1: t.y + th };
      if (b.x0 < r.x0 - 2 || b.y0 < r.y0 - 2 || b.x1 > r.x1 + 2 || b.y1 > r.y1 + 2) {
        fail(`${name}: the name "${lines[0]}" runs outside its room`);
      }
      const touch = symbols.filter((s) => {
        // The drawn glyph, not its box: ~0.4 of the symbol's size either side.
        const g = (s.width ?? 30) * 0.4;
        return s.x + g > b.x0 && s.x - g < b.x1 && s.y + g > b.y0 && s.y - g < b.y1;
      });
      touching += touch.length;
      if (process.env.DEBUG_LAYOUT && touch.length)
        console.error(
          `    "${lines.join(' / ')}"${t.rotation ? ' ↑' : ''}${t.fontSize ? ' ' + t.fontSize : ''} room ${Math.round(r.x1 - r.x0)}×${Math.round(r.y1 - r.y0)}px ← ${touch.map((x) => `${x.symbolId}${Number(/^ai-sym-(\d+)-/.exec(x.id)?.[1]) === idx ? '' : ' (other room)'}`).join(', ')}`
        );
    });
  if (touching > labelBudget) {
    fail(`${name}: ${touching} fittings touch room names (budget ${labelBudget})`);
  }
}

// ── 1. Real reader output ────────────────────────────────────────────────────
console.log('Real plans');
for (const file of readdirSync(FIXTURES).filter((f) => f.endsWith('.json'))) {
  const before = failures;
  const { rooms } = JSON.parse(readFileSync(join(FIXTURES, file), 'utf8'));
  checkPlan(file, rooms, LABEL_TOUCH_BUDGET[file] ?? 0);
  if (failures === before) console.log(`  ✔ ${file} (${rooms.length} rooms)`);
}

// ── 2. Generated plans, read badly ──────────────────────────────────────────
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

/** A floor cut into rooms the way buildings are: repeated straight splits. */
function tiledFloor(rand: () => number, count: number): Rect[] {
  const W = 8 + rand() * 12;
  const H = 6 + rand() * 10;
  const rects: Rect[] = [{ x0: 0, y0: 0, x1: W, y1: H }];
  while (rects.length < count) {
    rects.sort((a, b) => (b.x1 - b.x0) * (b.y1 - b.y0) - (a.x1 - a.x0) * (a.y1 - a.y0));
    const r = rects.shift()!;
    const w = r.x1 - r.x0;
    const h = r.y1 - r.y0;
    const vertical = w > h;
    const len = vertical ? w : h;
    if (len < 2.2) {
      rects.push(r);
      break;
    }
    const cut = Math.round((0.3 + rand() * 0.4) * len * 10) / 10;
    rects.push(
      vertical ? { ...r, x1: r.x0 + cut } : { ...r, y1: r.y0 + cut },
      vertical ? { ...r, x0: r.x0 + cut } : { ...r, y0: r.y0 + cut }
    );
  }
  return rects;
}

const NAMES = [
  'Kitchen',
  'Lounge',
  'Bedroom',
  'Bathroom',
  'Hall',
  'WC',
  'Store',
  'Office',
  'Utility',
  'Landing',
];
const SYMBOLS = [
  'socket-double-13a',
  'socket-double-13a',
  'light-ceiling',
  'light-downlight',
  'switch-1way',
  'smoke-detector',
];

console.log('Generated plans, read badly');
const RUNS = 300;
let generatedFailures = 0;
for (let seed = 1; seed <= RUNS; seed++) {
  const rand = rng(seed);
  const floors = rand() < 0.3 ? ['Ground Floor', 'First Floor'] : [''];
  const rooms: AIRoomEntry[] = [];
  floors.forEach((floor, fi) => {
    const tiles = tiledFloor(rand, 3 + Math.floor(rand() * 12));
    tiles.forEach((t, i) => {
      // How readers get it wrong.
      const j = () => (rand() - 0.5) * 0.5; // ±25 cm per edge
      let x0 = t.x0 + j();
      const y0 = t.y0 + j();
      let x1 = t.x1 + j();
      const y1 = t.y1 + j();
      if (rand() < 0.08) {
        // Badly placed: shifted by up to a metre.
        const dx = (rand() - 0.5) * 2;
        x0 += dx;
        x1 += dx;
      }
      const w = Math.max(0.9, Math.round((x1 - x0) * 100) / 100);
      const h = Math.max(0.9, Math.round((y1 - y0) * 100) / 100);
      const sides = ['north', 'east', 'south', 'west'];
      rooms.push({
        room: {
          name: `${NAMES[i % NAMES.length]} ${i + 1}`,
          floor: floor || undefined,
          origin: { x: Math.round((x0 + fi * 25) * 100) / 100, y: Math.round(y0 * 100) / 100 },
          dimensions: { width: w, height: h, unit: 'm' },
        },
        walls: sides.map((id) => ({ id, length: id === 'north' || id === 'south' ? w : h })),
        symbols: Array.from({ length: 2 + Math.floor(rand() * 6) }, () => {
          const type = SYMBOLS[Math.floor(rand() * SYMBOLS.length)];
          return type.startsWith('socket') || type.startsWith('switch')
            ? {
                type,
                wall: sides[Math.floor(rand() * 4)],
                position: Math.round(rand() * 3 * 10) / 10,
              }
            : { type, position: 'center' };
        }),
      });
    });
  });
  const before = failures;
  // Generated rooms can be tiny and packed; allow a fitting or two per plan on a name.
  checkPlan(`generated #${seed}`, rooms, 2 + Math.floor(rooms.length / 4));
  if (failures > before) generatedFailures++;
}
if (!generatedFailures) console.log(`  ✔ ${RUNS} plans`);

// ── 3. Room lists typed into the form ───────────────────────────────────────
console.log('Room lists from the form');
let scheduleFailures = 0;
for (let seed = 1; seed <= 150; seed++) {
  const rand = rng(seed * 7919);
  const floors = rand() < 0.4 ? ['Ground floor', 'First floor'] : [''];
  const list: ScheduleRoom[] = [];
  floors.forEach((floor) => {
    const n = 1 + Math.floor(rand() * 10);
    for (let i = 0; i < n; i++) {
      const p = ROOM_PRESETS[Math.floor(rand() * ROOM_PRESETS.length)];
      list.push({
        name: `${p.name} ${i + 1}`,
        floor,
        width: Math.round(p.width * (0.7 + rand() * 0.6) * 10) / 10,
        length: Math.round(p.length * (0.7 + rand() * 0.6) * 10) / 10,
        // What an electrician would actually list: the preset, give or take one.
        sockets: Math.max(0, p.sockets + Math.floor(rand() * 3) - 1),
        lights: Math.max(1, p.lights + Math.floor(rand() * 3) - 1),
        extras: p.extras,
      });
    }
  });
  // Odd lists as on a phone (floors stacked), even ones as on a desktop.
  const plan = planFromSchedule(list, { stackFloors: seed % 2 === 1 });
  const before = failures;
  // Sanitary and utility rooms, and anything under 2.5 m², are full once
  // they have a door, a switch, lights and an extractor: each one's name may
  // touch up to two fittings. Every other room must stay clear.
  const tiny = (plan.rooms ?? []).filter(
    (r) =>
      /\b(wc|en-?suite|bathroom|utility|store)\b/i.test(r.room?.name ?? '') ||
      (r.room?.dimensions?.width ?? 0) * (r.room?.dimensions?.height ?? 0) < 2.5
  ).length;
  checkPlan(
    `room list #${seed}`,
    plan.rooms ?? [],
    2 + Math.floor((plan.rooms?.length ?? 0) / 4) + tiny * 2
  );
  // Every item asked for is on the drawing.
  const asked = list.reduce(
    (s, r) => s + r.sockets + r.lights + Object.values(r.extras).reduce((a, b) => a + (b ?? 0), 0),
    0
  );
  const drawn = aiPlanToObjects(plan, 1).filter(
    (o) => o.type === 'symbol' && !/^(door|switch)/.test(o.symbolId ?? '')
  ).length;
  // The list's own hall is drawn with what was asked for; one the layout adds
  // brings its own light(s) and alarm, so the drawing can only hold more.
  if (drawn < asked) fail(`room list #${seed}: ${asked} items asked for, ${drawn} drawn`);
  if (failures > before) scheduleFailures++;
}
if (!scheduleFailures) console.log('  ✔ 150 room lists');

// ── 4. Bugs found in review, 29 Sep — each must stay fixed ─────────────────
console.log('Review regressions');
const beforeRegressions = failures;
const room = (
  name: string,
  x: number,
  y: number,
  w: number,
  h: number,
  floor: string | undefined,
  symbols: string[]
) => ({
  room: { name, floor, origin: { x, y }, dimensions: { width: w, height: h } },
  walls: ['north', 'east', 'south', 'west'].map((id) => ({
    id,
    length: id === 'north' || id === 'south' ? w : h,
  })),
  symbols: symbols.map((type, i) =>
    type.startsWith('light') || type.startsWith('smoke')
      ? { type, position: 'center' }
      : { type, wall: ['north', 'east', 'south', 'west'][i % 4], position: '1' }
  ),
});
{
  // Premises: an en-suite named after its bedroom is not another bedroom.
  const f = (name: string) => ({ name, floor: '', areaM2: 10, cx: 0, cy: 0 });
  const house = [
    'Bedroom 1',
    'Bedroom 2',
    'Bedroom 3',
    'Bedroom 4',
    'Bed 1 En-suite',
    'Bed 2 En-suite',
    'Bedroom 3 Wardrobe',
  ];
  if (inferPremises(house.map(f)) !== 'dwelling')
    fail('a four-bed house with en-suites is read as multi-occupancy');
  if (
    inferPremises(Array.from({ length: 8 }, (_, i) => f(`Bedroom ${i + 1}`))) !== 'multi-occupancy'
  )
    fail('eight bedrooms are not read as multi-occupancy');
}
{
  // Eight rooms all called "BEDROOM": still eight rooms on the schedule.
  const plan = {
    rooms: Array.from({ length: 8 }, (_, i) =>
      room('BEDROOM', i * 3.8, 0, 3.8, 3.7, undefined, ['socket-double-13a', 'socket-double-13a'])
    ),
  };
  const { circuits, premises } = scheduleFromObjects(aiPlanToObjects(plan, 7));
  const area = circuits.filter((c) => c.kind === 'ring').reduce((a, c) => a + (c.areaM2 ?? 0), 0);
  if (premises !== 'multi-occupancy') fail(`same-named bedrooms collapse: premises ${premises}`);
  if (Math.abs(area - 8 * 3.8 * 3.7) > 1)
    fail(`same-named rooms collapse: ring area ${area} m², expected ${(8 * 3.8 * 3.7).toFixed(1)}`);
}
{
  // Two sheets each designed from S1 are two rings on the board, not one.
  const sheet = (stamp: number) =>
    aiPlanToObjects(
      {
        rooms: [
          room('Lounge', 0, 0, 8, 7, undefined, [
            'socket-double-13a',
            'socket-double-13a',
            'socket-double-13a',
          ]),
          room('Dining', 8, 0, 5, 7, undefined, [
            'socket-double-13a',
            'socket-double-13a',
            'socket-double-13a',
          ]),
        ],
      },
      stamp
    );
  const { circuits } = scheduleForRooms([
    { name: 'Ground', objects: sheet(1) },
    { name: 'First', objects: sheet(2) },
  ]);
  const rings = circuits.filter((c) => c.kind === 'ring');
  if (rings.length !== 2) fail(`two sheets' S1 merged: ${rings.length} ring(s)`);
  if (rings.some((c) => c.notes.some((n) => /over the 100/.test(n))))
    fail('two sheets merged into a false over-100 m² ring');
}
{
  // A towel rail in a room with no sockets doesn't push a ring past 100 m².
  const { circuits } = scheduleFromObjects(
    aiPlanToObjects(
      {
        rooms: [
          room('Lounge', 0, 0, 10, 9.5, undefined, ['socket-double-13a']),
          room('Bathroom', 10, 0, 3, 3, undefined, ['towel-rail']),
        ],
      },
      3
    )
  );
  if (circuits.some((c) => c.kind === 'ring' && (c.areaM2 ?? 0) > 100))
    fail('a spur-only room pushed a ring past 100 m²');
}
{
  // Two cookers added together get two circuits.
  const base = aiPlanToObjects(
    { rooms: [room('Kitchen', 0, 0, 4, 3, undefined, ['socket-double-13a', 'light-ceiling'])] },
    4
  );
  const added: CanvasObject[] = [0, 1].map(
    (i) =>
      ({
        id: `new-${i}`,
        type: 'symbol',
        symbolId: 'socket-cooker-45a',
        x: 140 + i * 30,
        y: 120,
      }) as CanvasObject
  );
  const refs = assignNewSymbols([...base, ...added])
    .objects.filter((o) => o.id.startsWith('new-'))
    .map((o) => o.circuitRef);
  if (new Set(refs).size !== 2) fail(`two new cookers share a circuit: ${refs.join(', ')}`);
}
{
  // A room with dimensions but no walls is drawn at its size.
  const objs = aiPlanToObjects(
    {
      rooms: [
        {
          room: { name: 'Kitchen', origin: { x: 0, y: 0 }, dimensions: { width: 6, height: 2.5 } },
        },
      ],
    },
    5
  );
  const walls = objs.filter((o) => o.type === 'wall' && o.points);
  const xs = walls.flatMap((w) => w.points!.map((p) => p.x));
  const width = (Math.max(...xs) - Math.min(...xs)) / SCALE;
  if (Math.abs(width - 6) > 0.05)
    fail(`a room given 6 m wide with no walls was drawn ${width.toFixed(2)} m`);
}
{
  // A room with no floor stays on the floor it sits on; three floors never overlap.
  const t = tidyRooms([
    room('Lounge', 0, 0, 5, 4, 'Ground', []),
    room('Kitchen', 5, 0, 4, 4, 'Ground', []),
    room('Stairs', 9, 0, 1.2, 4, undefined, []),
    room('Bed 1', 20, 0, 5, 4, 'First', []),
  ] as AIRoomEntry[]);
  const stairs = t[2].room!.origin!.x!;
  if (stairs > 12) fail(`a floor-less room was thrown ${stairs} m along, off its floor`);
  const three = tidyRooms([
    room('A', 0, 0, 10, 10, 'Ground', []),
    room('B', 2, 20, 2, 5, 'First', []),
    room('C', 5, 0, 10, 10, 'Second', []),
  ] as AIRoomEntry[]);
  const a = three[0].room!,
    c = three[2].room!;
  const overlapX =
    Math.min(a.origin!.x! + a.dimensions!.width!, c.origin!.x! + c.dimensions!.width!) -
    Math.max(a.origin!.x!, c.origin!.x!);
  if (overlapX > 0) fail('two floors were left on top of each other');
}
{
  // The form never draws one circulation space inside another.
  const plan = planFromSchedule([
    { name: 'Hall', floor: '', width: 6, length: 1.2, sockets: 0, lights: 1, extras: {} },
    { name: 'Landing', floor: '', width: 4, length: 1.2, sockets: 0, lights: 1, extras: {} },
    { name: 'Corridor', floor: '', width: 2, length: 1.2, sockets: 0, lights: 1, extras: {} },
    { name: 'Lounge', floor: '', width: 4, length: 4, sockets: 2, lights: 1, extras: {} },
    { name: 'Kitchen', floor: '', width: 4, length: 3, sockets: 2, lights: 1, extras: {} },
    { name: 'Bedroom', floor: '', width: 3, length: 3, sockets: 2, lights: 1, extras: {} },
  ]);
  const r = (n: string) => plan.rooms!.find((x) => x.room?.name === n)!.room!;
  const land = r('Landing'),
    corr = r('Corridor');
  if (corr.origin!.x! < land.origin!.x! + land.dimensions!.width! - 0.01)
    fail('the form drew the corridor inside the landing');
  // …and an unnamed room is drawn, not dropped.
  const unnamed = planFromSchedule([
    { name: '', floor: '', width: 3, length: 3, sockets: 1, lights: 1, extras: {} },
  ]);
  if (!unnamed.rooms?.length) fail('an unnamed room in the form was dropped');
}
if (circuitColour('S0') === undefined) fail('circuitColour("S0") is undefined');
{
  // A house's smoke alarms are BS 5839-6 domestic alarms — never a panel and zones;
  // a care home's detectors are a BS 5839-1 system with a panel supply.
  const house = scheduleFromObjects(
    aiPlanToObjects(
      {
        rooms: [
          room('Hall', 0, 0, 4, 1.2, undefined, ['smoke-detector']),
          room('Kitchen', 0, 1.2, 4, 3, undefined, ['heat-detector', 'socket-double-13a']),
        ],
      },
      8
    )
  ).circuits;
  if (house.some((c) => c.kind === 'fire-zone' || c.kind === 'fire-supply'))
    fail('a house was given a BS 5839-1 panel and zones');
  if (!house.some((c) => c.kind === 'smoke-alarms'))
    fail('a house’s smoke alarms are on no circuit');
  const home = scheduleFromObjects(
    aiPlanToObjects(
      {
        rooms: Array.from({ length: 8 }, (_, i) =>
          room(`Bedroom ${i + 1}`, i * 3.5, 0, 3.5, 4, undefined, ['smoke-detector'])
        ),
      },
      9
    )
  ).circuits;
  if (!home.some((c) => c.kind === 'fire-zone') || !home.some((c) => c.kind === 'fire-supply'))
    fail('a care home lost its panel zones or panel supply');
}
{
  // Wiring it up: a board, one run per circuit from it, rings back to it.
  const { rooms: care } = JSON.parse(
    readFileSync(join(FIXTURES, 'care-home-two-floor.json'), 'utf8')
  );
  let objs = withRuns(placeBoard(aiPlanToObjects({ rooms: care }, 11)));
  const board = findBoard(objs);
  if (!board) fail('no consumer unit was placed');
  // Fire zones are wired from the alarm panel, not the board: no run.
  const circuits = scheduleFromObjects(objs).circuits.filter(
    (c) => c.points > 0 && c.kind !== 'fire-zone'
  );
  const lengths = runLengths(objs);
  const missing = circuits.filter((c) => !lengths.has(c.ref)).map((c) => c.ref);
  if (missing.length) fail(`circuits with no drawn run: ${missing.join(', ')}`);
  objs
    .filter((o) => o.generated && /^S\d/.test(o.circuitRef ?? ''))
    .forEach((r) => {
      const [a, z] = [r.points![0], r.points![r.points!.length - 1]];
      if (Math.hypot(a.x - z.x, a.y - z.y) > 1)
        fail(`ring ${r.circuitRef} does not return to the board`);
    });
  if ([...lengths.values()].some((m) => !(m > 0))) fail('a run has no length');
  // A ring over the OSG limit, split, comes back within it (or at least shorter).
  const over = scheduleFromObjects(objs).circuits.find((c) => c.length?.ok === false);
  if (over) {
    const before = over.length!.lengthM;
    objs = splitCircuit(objs, over.ref);
    const after = runLengths(objs).get(over.ref) ?? Infinity;
    if (!(after < before))
      fail(`splitting ${over.ref} did not shorten it (${before} → ${after} m)`);
  }
  // Building type drives AFDD and the fire system.
  const asHmo = scheduleFromObjects(redesignCircuits(objs, { buildingType: 'hmo' })).circuits;
  if (!asHmo.filter((c) => c.kind === 'ring').every((c) => c.afdd))
    fail('an HMO ring without AFDD');
  if (asHmo.some((c) => c.kind === 'fire-zone')) fail('an HMO was given BS 5839-1 panel zones');
  const asHouse = scheduleFromObjects(redesignCircuits(objs, { buildingType: 'house' })).circuits;
  if (asHouse.some((c) => c.afdd)) fail('a house was told AFDDs are required');
  const asCare = scheduleFromObjects(
    redesignCircuits(objs, { buildingType: 'care-home' })
  ).circuits;
  if (!asCare.some((c) => c.kind === 'fire-zone')) fail('a care home lost its panel zones');
}
{
  // Wiring review, 29 Sep 2026.
  const load = (f: string) =>
    aiPlanToObjects({ rooms: JSON.parse(readFileSync(join(FIXTURES, f), 'utf8')).rooms }, 11);
  const house = withRuns(placeBoard(load('described-detached-house.json')));
  const board = findBoard(house)!;
  // A board with no floor stamp (added from the palette) wires the same.
  const unstamped = withRuns(
    house.map((o) => (o.id === board.id ? { ...o, floor: undefined, roomKey: undefined } : o))
  );
  const a = runLengths(house);
  const b = runLengths(unstamped);
  const drift = [...a.keys()].filter((k) => Math.abs((a.get(k) ?? 0) - (b.get(k) ?? 0)) > 0.5);
  if (drift.length) fail(`a hand-placed board wires differently: ${drift.join(', ')}`);
  // A circuit on more than one floor is drawn per floor, from the riser.
  const floors = new Set(house.filter((o) => o.circuitRef === 'SA1').map((o) => o.floor));
  if (floors.size > 1 && house.filter((o) => o.generated && o.circuitRef === 'SA1').length < 2)
    fail('the smoke alarm circuit was drawn across the page between floors');
  // No run for a fire zone.
  if (
    withRuns(placeBoard(load('care-home-two-floor.json'))).some(
      (o) => o.generated && /^FZ/.test(o.circuitRef ?? '')
    )
  )
    fail('a fire detection zone was drawn from the board');
  // Rooms with no floor name are on the board's floor: every run of theirs
  // starts at the board.
  const school = withRuns(placeBoard(load('primary-school.json')));
  const sb = findBoard(school)!;
  const unnamedRefs = new Set(
    school.filter((o) => o.type === 'symbol' && o.circuitRef && !o.floor).map((o) => o.circuitRef)
  );
  const offBoard = school.filter(
    (o) =>
      o.generated &&
      unnamedRefs.has(o.circuitRef) &&
      school
        .filter((x) => x.circuitRef === o.circuitRef && x.type === 'symbol')
        .every((x) => !x.floor) &&
      Math.hypot(o.points![0].x - sb.x, o.points![0].y - sb.y) > 1
  );
  if (offBoard.length)
    fail(
      `runs on an unnamed floor start away from the board: ${offBoard.map((o) => o.circuitRef).join(', ')}`
    );
  // A school has a panel system, not domestic alarms.
  if (!scheduleFromObjects(school).circuits.some((c) => c.kind === 'fire-zone'))
    fail('a school was given domestic smoke alarms');
  // An HMO's alarm note is not the domestic one.
  const hmoSa = scheduleFromObjects(redesignCircuits(house, { buildingType: 'hmo' })).circuits.find(
    (c) => c.kind === 'smoke-alarms'
  );
  if (hmoSa && /Domestic premises/.test(hmoSa.notes.join(' ')))
    fail('an HMO smoke-alarm circuit says "Domestic premises"');
  // The first detector added by hand to a house is an alarm, not a panel zone.
  const bare = load('described-detached-house.json').filter(
    (o) => !/^(SA|FZ|FA)/.test(o.circuitRef ?? '')
  );
  const added = assignNewSymbols([
    ...bare,
    { id: 'new-sd', type: 'symbol', symbolId: 'smoke-detector', x: bare[0].x, y: bare[0].y },
  ] as CanvasObject[]).objects.find((o) => o.id === 'new-sd');
  if (!/^SA/.test(added?.circuitRef ?? ''))
    fail(`a house's first new detector went on ${added?.circuitRef}`);
  // Moving an item makes the runs stale; redrawing clears it.
  const moved = house.map((o) =>
    o.id === house.find((x) => x.circuitRef === 'S1')!.id ? { ...o, x: o.x + 40 } : o
  );
  if (!runsAreStale(moved) || runsAreStale(withRuns(moved))) fail('stale runs are not detected');
  // Splitting keeps switches with their room's lights.
  let care = withRuns(placeBoard(load('care-home-poor-read.json')));
  [
    ...new Set(care.filter((o) => /^L\d+$/.test(o.circuitRef ?? '')).map((o) => o.circuitRef!)),
  ].forEach((ref) => (care = splitCircuit(care, ref)));
  const strays = care.filter((sw) => {
    if (
      sw.type !== 'symbol' ||
      !/^switch-/.test(sw.symbolId ?? '') ||
      !/^L/.test(sw.circuitRef ?? '')
    )
      return false;
    const lights = care.filter((l) => l.roomKey === sw.roomKey && /^light-/.test(l.symbolId ?? ''));
    return lights.length > 0 && !lights.some((l) => l.circuitRef === sw.circuitRef);
  });
  if (strays.length) fail(`${strays.length} switches split away from their room's lights`);
  // Redesign stays quick on a big plan.
  const uni = load('university-three-floor.json');
  const t0 = performance.now();
  redesignCircuits(uni, { buildingType: 'non-domestic' });
  const ms = performance.now() - t0;
  if (ms > 1500) fail(`redesigning a large plan took ${Math.round(ms)} ms`);
  // Every warning reaches the issued schedule, not just the length one.
  const ring: DesignedCircuit = {
    ref: 'S1',
    kind: 'ring',
    description: 'Sockets',
    device: '32 A',
    cable: '2.5/1.5',
    points: 10,
    floor: '',
    rooms: [],
    rcd: true,
    afdd: false,
    source: '',
    notes: ['Serves 140 m² — over the 100 m² ring limit'],
    length: { lengthM: 120, maxM: 106, ok: false, note: 'Over 106 m — split the circuit' },
  };
  const review = toScheduleEntries([ring])[0].needsReview ?? '';
  if (!/140 m²/.test(review) || !/106 m/.test(review)) fail('a schedule warning was dropped');
}
{
  // Sub-boards and long runs, 29 Sep 2026.
  const load = (f: string) =>
    withRuns(
      placeBoard(
        aiPlanToObjects({ rooms: JSON.parse(readFileSync(join(FIXTURES, f), 'utf8')).rooms }, 11)
      )
    );
  const overOf = (o: CanvasObject[]) =>
    scheduleFromObjects(o).circuits.filter((c) => c.kind !== 'submain' && c.length?.ok === false);
  const school = load('primary-school.json');
  const fixed = fixLongRuns(school);
  if (fixed.stillOver.length > 3)
    fail(
      `fixing a school's long runs left ${fixed.stillOver.length} over (was ${overOf(school).length})`
    );
  const uni = fixLongRuns(load('university-three-floor.json'));
  if (uni.stillOver.length) fail(`the university still has long runs: ${uni.stillOver.join(', ')}`);
  // A ring a few metres over is split, not given a new board.
  const care = fixLongRuns(load('care-home-two-floor.json'));
  if (care.added.length) fail('a single slightly-long ring was given a sub-board');
  // Every sub-board has its submain way on the main board, and circuits on it say so.
  const sched = scheduleFromObjects(fixed.objects).circuits;
  subBoards(fixed.objects).forEach((b) => {
    const way = sched.find((c) => c.ref === b.circuitRef);
    if (way?.kind !== 'submain' || way.board !== 'CU')
      fail(`${b.circuitRef} has no submain on the main board`);
    if (!sched.some((c) => c.board === b.circuitRef)) fail(`${b.circuitRef} feeds nothing`);
  });
  // No two boards stacked in one place by repeated taps.
  // (The same long circuits each time — as tapping the button again would.)
  const target = overOf(school).map((c) => c.ref);
  let again = school;
  for (let i = 0; i < 4; i++) again = placeSubBoard(again, target);
  const boards = again.filter((o) => /^(consumer-unit|distribution-board)$/.test(o.symbolId ?? ''));
  boards.forEach((a, i) =>
    boards.slice(i + 1).forEach((b) => {
      if (Math.hypot(a.x - b.x, a.y - b.y) < 2 * SCALE)
        fail('two boards were placed on top of each other');
    })
  );
  // A board added by hand to a wired plan is a sub-board; the main one keeps no way.
  const main = findBoard(school)!;
  const hand = assignNewSymbols([
    ...school,
    { id: 'hand-db', type: 'symbol', symbolId: 'distribution-board', x: 100, y: 100 },
  ] as CanvasObject[]).objects;
  if (hand.find((o) => o.id === 'hand-db')?.circuitRef !== 'DB2')
    fail('a hand-placed second board is not DB2');
  if (hand.find((o) => o.id === main.id)?.circuitRef) fail('the main board was given a way');
  // A split makes two compact circuits, not two that each span the building.
  const span = (o: CanvasObject[], ref: string) => {
    const xs = o.filter((x) => x.type === 'symbol' && x.circuitRef === ref);
    return Math.hypot(
      Math.max(...xs.map((x) => x.x)) - Math.min(...xs.map((x) => x.x)),
      Math.max(...xs.map((x) => x.y)) - Math.min(...xs.map((x) => x.y))
    );
  };
  const longest = overOf(school).sort((a, b) => b.points - a.points)[0];
  if (longest) {
    const before = span(school, longest.ref);
    const after = splitCircuit(school, longest.ref);
    const newRef = scheduleFromObjects(after).circuits.find(
      (c) => !scheduleFromObjects(school).circuits.some((x) => x.ref === c.ref)
    )?.ref;
    if (newRef && Math.max(span(after, longest.ref), span(after, newRef)) > before * 0.85)
      fail(`splitting ${longest.ref} left a half spanning nearly the whole circuit`);
  }
  // No ring over 100 m² (OSG H2.1) unless it is one room with too few
  // sockets to share out — a 720 m² hall used to sit on one ring.
  for (const f of readdirSync(FIXTURES).filter((x) => x.endsWith('.json'))) {
    const objs = load(f);
    scheduleFromObjects(objs)
      .circuits.filter((c) => c.kind === 'ring' && (c.areaM2 ?? 0) > 100)
      .forEach((c) => {
        const room = objs.find((o) => o.roomName === c.rooms[0]);
        const roomSockets = objs.filter(
          (o) => o.roomKey === room?.roomKey && /^socket-/.test(o.symbolId ?? '')
        ).length;
        const couldShare = roomSockets >= Math.ceil((room?.roomArea ?? 0) / 100);
        if (c.rooms.length > 1 || couldShare)
          fail(`${f}: ${c.ref} serves ${c.areaM2} m² on one ring`);
      });
  }
  // A "Kitchen Store" is not a kitchen: no appliance ring of its own.
  const stores = scheduleFromObjects(school).circuits.filter(
    (c) => c.kind === 'ring' && c.rooms.length === 1 && /kitchen store/i.test(c.rooms[0])
  );
  if (stores.length)
    fail(`a store room got an appliance ring: ${stores.map((c) => c.ref).join(', ')}`);
  // Moving a wall makes the runs stale (they route round walls).
  const wall = school.find((o) => o.type === 'wall')!;
  const moved = school.map((o) =>
    o.id === wall.id ? { ...o, points: o.points!.map((p) => ({ x: p.x + 20, y: p.y })) } : o
  );
  if (!runsAreStale(moved)) fail('moving a wall did not make the runs stale');
}
if (failures === beforeRegressions) console.log('  ✔ all fixed and staying fixed');

if (failures) {
  console.error(`\n✘ ${failures} layout faults`);
  process.exit(1);
}
console.log('\n✔ Every plan laid out cleanly');
