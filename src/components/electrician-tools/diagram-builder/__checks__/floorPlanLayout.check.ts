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
  applyCircuitEdit,
  assignNewSymbols,
  circuitColour,
  inferPremises,
  scheduleForRooms,
  scheduleFromObjects,
  toScheduleEntries,
  connectedLoadW,
  type DesignedCircuit,
} from '../circuitDesign';
import { notation, phaseLoads, wayMap } from '../boardWays';
import { handDrawnCircuits, jobNumbering } from '../jobNumbering';
import { planToCertificate } from '../planToCertificate';
import { planResults } from '../planResults';
import { deriveCircuitNumber } from '@/utils/circuitNumbering';
import { buildScheduleFromCert } from '@/utils/board-schedule-import';
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
  withoutRuns,
  waysOf,
  moveWay,
  editCircuit,
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
{
  // Board numbering, 30 Sep 2026: ways as the board is marked, never S1/L1.
  const load = (f: string) =>
    withRuns(
      placeBoard(
        aiPlanToObjects({ rooms: JSON.parse(readFileSync(join(FIXTURES, f), 'utf8')).rooms }, 11)
      )
    );
  for (const f of [
    'care-home-two-floor.json',
    'described-detached-house.json',
    'primary-school.json',
  ]) {
    const circuits = scheduleFromObjects(load(f)).circuits;
    const single = wayMap(circuits, 'single');
    const ways = circuits.filter((c) => c.kind !== 'fire-zone').map((c) => single.get(c.ref)!);
    const labels = ways.map((w) => w.label).sort((a, b) => Number(a) - Number(b));
    if (labels.some((l, i) => l !== String(i + 1)))
      fail(`${f}: single-phase ways are not 1..${labels.length}: ${labels.slice(0, 6).join(',')}`);
    circuits
      .filter((c) => c.kind === 'fire-zone')
      .forEach((c) => {
        if (!/^Zone \d+$/.test(single.get(c.ref)!.label))
          fail(`${f}: zone ${c.ref} not numbered as a zone`);
      });
    const three = wayMap(circuits, 'three');
    const seen = new Set<string>();
    circuits
      .filter((c) => c.kind !== 'fire-zone')
      .forEach((c) => {
        const w = three.get(c.ref)!;
        if (!/^\d+(L[123]| TPN)$/.test(w.label)) fail(`${f}: three-phase label ${w.label}`);
        if (seen.has(w.label)) fail(`${f}: two circuits on ${w.label}`);
        seen.add(w.label);
      });
    const phases = phaseLoads(circuits, three).get('CU');
    if (phases) {
      const v = [phases.L1, phases.L2, phases.L3];
      const biggest = Math.max(...circuits.filter((c) => c.kind !== 'submain').map(connectedLoadW));
      if (Math.max(...v) - Math.min(...v) > biggest)
        fail(`${f}: phases out of balance ${v.join('/')}`);
    }
  }
  // With sub-boards every number says which board it is on.
  const fixed = fixLongRuns(load('primary-school.json')).objects;
  const multi = wayMap(scheduleFromObjects(fixed).circuits, 'single');
  const bad = [...multi.values()].filter(
    (w) => w.board !== 'Panel' && !/^(CU|DB\d+)\/\d+$/.test(w.full)
  );
  if (bad.length)
    fail(
      `board-qualified numbers missing: ${bad
        .slice(0, 3)
        .map((w) => w.full)
        .join(', ')}`
    );
}
{
  // Numbering review, 30 Sep 2026.
  const load = (f: string) =>
    withRuns(
      placeBoard(
        aiPlanToObjects({ rooms: JSON.parse(readFileSync(join(FIXTURES, f), 'utf8')).rooms }, 11)
      )
    );
  // Hiding the runs doesn't renumber the board.
  const school = fixLongRuns(load('primary-school.json')).objects;
  const shown = waysOf(school);
  const hidden = waysOf(withoutRuns(school));
  const moved = [...shown].filter(([ref, w]) => hidden.get(ref)?.full !== w.full);
  if (moved.length)
    fail(
      `hiding runs renumbered ${moved.length} circuits (e.g. ${moved[0][1].full} → ${hidden.get(moved[0][0])?.full})`
    );
  // One job, two designed sheets with a sub-board each: no board has two of a
  // way, and every circuit on every sheet has a number.
  const uni = fixLongRuns(load('university-three-floor.json')).objects;
  const job = jobNumbering([
    { name: 'School', objects: school },
    { name: 'University', objects: uni },
  ]);
  const byBoard = new Map<string, Set<string>>();
  job.ways.forEach((w) => {
    const set = byBoard.get(w.board) ?? new Set<string>();
    if (set.has(w.label)) fail(`board ${w.board} has two way ${w.label}`);
    set.add(w.label);
    byBoard.set(w.board, set);
  });
  [school, uni].forEach((objs, i) => {
    const labels = job.labelsFor(i);
    const missing = objs.filter(
      (o) => o.type === 'symbol' && o.circuitRef && !labels.get(o.circuitRef)
    );
    if (missing.length) fail(`sheet ${i + 1}: ${missing.length} fittings have no way number`);
  });
  // A hand-drawn job: the plan's numbers are the schedule's numbers.
  const hand = [
    {
      name: 'Kitchen',
      objects: [] as CanvasObject[],
      symbolIds: [
        'light-ceiling',
        'socket-double',
        'socket-cooker-45a',
        'smoke-detector',
        'socket-ev-charger',
        'water-heater',
      ],
    },
    {
      name: 'Hall',
      objects: [] as CanvasObject[],
      symbolIds: ['light-ceiling', 'socket-double-13a'],
    },
  ];
  const hj = jobNumbering(hand);
  const labels = [...hj.ways.values()].map((w) => w.label);
  if (hj.ways.size < 6) fail(`hand-drawn job lost circuits: ${[...hj.ways.keys()].join(',')}`);
  if (new Set(labels).size !== labels.length || labels.some((l) => !/^\d+$/.test(l)))
    fail(`hand-drawn job numbered badly: ${labels.join(',')}`);
  // A hand-drawn sheet's schedule lists the circuits as drawn — no S2 made
  // up by sorting symbol names — and detectors on FA1 are an alarm circuit.
  const drawnObjs: CanvasObject[] = [
    ...Array.from({ length: 14 }, (_, i) => ({
      id: `s${i}`,
      type: 'symbol' as const,
      symbolId: 'socket-double-13a',
      x: i * 40,
      y: 0,
      circuitRef: 'S1',
    })),
    ...Array.from({ length: 3 }, (_, i) => ({
      id: `l${i}`,
      type: 'symbol' as const,
      symbolId: 'light-ceiling',
      x: i * 40,
      y: 80,
      circuitRef: 'L1',
    })),
    ...Array.from({ length: 2 }, (_, i) => ({
      id: `d${i}`,
      type: 'symbol' as const,
      symbolId: 'smoke-detector',
      x: i * 40,
      y: 160,
      circuitRef: 'FA1',
    })),
  ];
  const drawnCircuits = handDrawnCircuits(drawnObjs, [], false);
  const drawnRefs = drawnCircuits
    .map((c) => c.ref)
    .sort()
    .join(',');
  if (drawnRefs !== 'FA1,L1,S1') fail(`hand-drawn schedule invents circuits: ${drawnRefs}`);
  const alarms = drawnCircuits.find((c) => c.ref === 'FA1');
  if (alarms?.kind !== 'smoke-alarms' || alarms.points !== 2)
    fail(`hand-drawn detectors read as ${alarms?.kind} with ${alarms?.points} points`);
  const hjDrawn = jobNumbering([{ name: 'Room 1', objects: drawnObjs }]);
  const tags = hjDrawn.labelsFor(0);
  drawnCircuits.forEach((c) => {
    if (tags.get(c.ref) !== hjDrawn.ways.get(c.ref)?.full)
      fail(`hand-drawn ${c.ref}: tag and schedule disagree`);
  });
  // Edits are kept by where a circuit comes from, which doesn't move when a
  // sheet is added or the pages are reordered (the job ref does: S1 → S1 · 1).
  const flat = load('described-small-flat.json');
  const houseObjs = load('described-detached-house.json');
  const alone = jobNumbering([{ id: 'flat', name: 'Flat', objects: flat }]);
  const both = jobNumbering([
    { id: 'flat', name: 'Flat', objects: flat },
    { id: 'house', name: 'House', objects: houseObjs },
  ]);
  const swapped = jobNumbering([
    { id: 'house', name: 'House', objects: houseObjs },
    { id: 'flat', name: 'Flat', objects: flat },
  ]);
  const flatRing = alone.originOf('S1');
  if (flatRing !== 'flat:S1') fail(`origin of a lone sheet's S1 is ${flatRing}`);
  if (both.originOf(both.refOf(0, 'S1')) !== flatRing)
    fail("adding a sheet moved the flat ring's edits");
  if (swapped.originOf(swapped.refOf(1, 'S1')) !== flatRing)
    fail("reordering sheets moved the flat ring's edits");
  if (swapped.originOf(swapped.refOf(0, 'S1')) === flatRing)
    fail("the house ring took the flat ring's edits");
  // Three-phase on a small board stays compact: phases within one circuit.
  const house = scheduleFromObjects(load('described-detached-house.json')).circuits;
  const three = wayMap(house, 'three');
  const perPhase = { L1: 0, L2: 0, L3: 0 } as Record<string, number>;
  three.forEach((w) => w.phase && w.phase !== 'TPN' && (perPhase[w.phase] += 1));
  const counts = Object.values(perPhase);
  if (Math.max(...counts) - Math.min(...counts) > 1)
    fail(`three-phase positions uneven: ${counts.join('/')}`);
  // Board shorthand reads the text as written.
  const n = (device: string, rcd: boolean) =>
    notation({
      ref: 'X1',
      kind: 'radial',
      description: '',
      device,
      cable: '',
      points: 1,
      floor: '',
      rooms: [],
      rcd,
      afdd: false,
      notes: [],
      source: '',
    });
  const cases: [string, boolean, string, string][] = [
    ['32A MCB Type B', true, 'MCB', 'B32'],
    ['32A MCB Type B', false, 'MCB', 'B32'],
    ['B32 RCBO 30mA', true, 'RCBO', 'B32'],
    ['32 A Type B AFDD/RCBO 30 mA', true, 'AFDD/RCBO', 'B32'],
    ['6 A Type B RCBO 30 mA', true, 'RCBO', 'B6'],
  ];
  cases.forEach(([d, rcd, dev, rating]) => {
    const got = n(d, rcd);
    if (got.device !== dev || got.rating !== rating)
      fail(`"${d}" read as ${got.device} ${got.rating}`);
  });
}
{
  // Plan → certificate, 30 Sep 2026: the EIC gets every circuit, numbered as
  // the plan is, on the right board, with Table 41.3's maximum Zs.
  const load = (f: string) =>
    withRuns(
      placeBoard(
        aiPlanToObjects({ rooms: JSON.parse(readFileSync(join(FIXTURES, f), 'utf8')).rooms }, 11)
      )
    );
  for (const [f, three, fix] of [
    ['care-home-two-floor.json', true, false],
    ['primary-school.json', false, true],
    // Three-phase with sub-boards: TPN submains on the CU.
    ['primary-school.json', true, true],
  ] as const) {
    let objs = load(f);
    if (fix) objs = fixLongRuns(objs).objects;
    if (three)
      objs = objs.map((o) => (o.type === 'symbol' ? { ...o, supply: 'three' as const } : o));
    const job = jobNumbering([{ id: 's', name: f, objects: objs }]);
    const cert = planToCertificate([...job.designed, ...job.handCircuits], job.ways, {
      supply: job.supply,
      earthing: job.earthing,
      planName: f,
    });
    const boardOf = new Map(cert.distributionBoards.map((b) => [b.id, b.reference]));
    const multi = cert.distributionBoards.length > 1;
    const tags = new Set(job.labelsFor(0).values());
    const real = cert.scheduleOfTests.filter((r) => !r.isSpare);
    // The certificate's own form back to the plan's: "1.2" on L2 → "1L2",
    // a TPN way "1" → "1 TPN".
    const planLabel = (r: (typeof real)[number]) =>
      r.phaseAssignment === 'L1,L2,L3'
        ? `${r.wayNumber} TPN`
        : r.phaseAssignment
          ? `${r.wayNumber}${r.phaseAssignment}`
          : r.circuitNumber;
    const untagged = real.filter((r) => {
      const full = multi ? `${boardOf.get(r.boardId!)}/${planLabel(r)}` : planLabel(r);
      return !tags.has(full) && !/panel supply/i.test(r.circuitDescription);
    });
    if (untagged.length)
      fail(
        `${f}: ${untagged.length} certificate circuits match no plan tag (e.g. ${untagged[0].circuitNumber})`
      );
    const designedWays = job.designed.filter((c) => c.kind !== 'fire-zone').length;
    if (real.length !== designedWays)
      fail(`${f}: ${real.length} certificate circuits for ${designedWays} ways`);
    real
      .filter((r) => r.protectiveDeviceCurve === 'B' && r.protectiveDeviceRating === '32')
      .forEach((r) => r.maxZs !== '1.37' && fail(`${f}: B32 max Zs ${r.maxZs}`));
    // Nothing on a plan has been tested: no result may arrive filled in.
    cert.scheduleOfTests.forEach((r) => {
      const said = (
        [
          'insulationResistance',
          'insulationLiveNeutral',
          'insulationLiveEarth',
          'polarity',
          'functionalTesting',
          'zs',
          'r1r2',
          'rcdOneX',
        ] as const
      ).filter((k) => r[k]);
      if (said.length)
        fail(`${f}: way ${r.circuitNumber} arrives with results: ${said.join(', ')}`);
    });
    if (three && !real.every((r) => r.phaseAssignment))
      fail(`${f}: three-phase circuit with no phase`);
    cert.distributionBoards
      .filter((b) => b.order > 0)
      .forEach(
        (b) =>
          !/^CU way \d/.test(b.suppliedFrom ?? '') &&
          fail(`${f}: ${b.reference} not supplied from a CU way`)
      );
    // In the certificate's own numbering: unique per board, and a phase row
    // reads "n.k" — "1L1" typed there was cut to "1" on the first edit.
    const perBoard = new Map<string, Set<string>>();
    cert.scheduleOfTests.forEach((r) => {
      const seen = perBoard.get(r.boardId!) ?? new Set<string>();
      if (seen.has(r.circuitNumber)) fail(`${f}: ${r.circuitNumber} twice on one board`);
      seen.add(r.circuitNumber);
      perBoard.set(r.boardId!, seen);
      if (/L/.test(r.circuitNumber)) fail(`${f}: certificate number ${r.circuitNumber}`);
      if (/^L[123]$/.test(r.phaseAssignment ?? '')) {
        if (r.circuitNumber !== `${r.wayNumber}.${r.phaseAssignment!.slice(1)}`)
          fail(`${f}: ${r.phaseAssignment} row numbered ${r.circuitNumber}`);
        if (deriveCircuitNumber(r.circuitDesignation) !== String(r.wayNumber))
          fail(`${f}: designation ${r.circuitDesignation} edits to another way`);
      }
    });
    const door = buildScheduleFromCert(
      cert as unknown as Parameters<typeof buildScheduleFromCert>[0],
      cert.distributionBoards[0].id
    );
    const onMain = cert.scheduleOfTests.filter(
      (r) => r.boardId === cert.distributionBoards[0].id
    ).length;
    const mainRows = cert.scheduleOfTests.filter(
      (r) => r.boardId === cert.distributionBoards[0].id
    );
    if (three) {
      // One way on the door per way on the board, three rows (L1–L3) each.
      const ways = new Set(mainRows.map((r) => r.wayNumber));
      const doorWays = new Set(door.board.circuits.map((c) => c.circuitNumber));
      if (doorWays.size !== ways.size)
        fail(`${f}: door chart has ${doorWays.size} ways, the board ${ways.size}`);
      doorWays.forEach((w) => {
        const ph = door.board.circuits
          .filter((c) => c.circuitNumber === w)
          .map((c) => c.phase)
          .join(',');
        if (ph !== 'L1,L2,L3') fail(`${f}: door way ${w} rows ${ph}`);
      });
    } else if (door.board.circuits.length !== (multi ? onMain : cert.scheduleOfTests.length))
      fail(
        `${f}: door chart has ${door.board.circuits.length} ways, certificate board has ${onMain}`
      );
  }
}
{
  // Test results back on the drawing, 30 Sep 2026.
  {
    const objs = withRuns(
      placeBoard(
        aiPlanToObjects(
          {
            rooms: JSON.parse(readFileSync(join(FIXTURES, 'described-detached-house.json'), 'utf8'))
              .rooms,
          },
          11
        )
      )
    );
    const job = jobNumbering([{ id: 'sheet-a', name: 'House', objects: objs }]);
    const cert = planToCertificate([...job.designed, ...job.handCircuits], job.ways, {
      supply: job.supply,
      earthing: job.earthing,
      planName: 'House',
      link: { sheetIds: ['sheet-a'], originOf: job.originOf },
    });
    if (cert.sourcePlan?.sheetIds[0] !== 'sheet-a') fail('certificate not linked to its sheet');
    const real = cert.scheduleOfTests.filter((r) => !r.isSpare);
    if (real.some((r) => !r.planOrigin?.startsWith('sheet-a:')))
      fail('a certificate row carries no plan origin');
    const b32 = real.find(
      (r) => r.protectiveDeviceCurve === 'B' && r.protectiveDeviceRating === '32'
    )!;
    const b6 = real.find((r) => r.protectiveDeviceRating === '6')!;
    const other = real.find((r) => r !== b32 && r !== b6)!;
    const good = {
      r1r2: '0.30',
      insulationLiveEarth: '>200',
      insulationLiveNeutral: '>200',
      polarity: 'Correct',
    };
    const rows = cert.scheduleOfTests.map((r) =>
      r === b32
        ? { ...r, ...good, zs: '1.60' } // over the 1.37 Ω the row prints
        : r === b6
          ? { ...r, ...good, zs: '0.90' }
          : r === other
            ? { ...r, r1r2: '0.2' }
            : r
    );
    const linked = {
      id: 'r',
      certificateNumber: 'EIC-TEST',
      updatedAt: '',
      rows,
      boards: cert.distributionBoards,
      earthing: cert.earthingArrangement,
    };
    const refOfRow = (r: (typeof rows)[number]) =>
      [...job.ways.keys()].find((k) => job.originOf(k) === r.planOrigin)!;
    const res = planResults(linked, job.ways, job.originOf);
    const st = (r: (typeof rows)[number]) => res.get(refOfRow(r))?.status;
    if (st(b32) !== 'fail') fail(`B32 with Zs 1.60 Ω of 1.37 reads ${st(b32)}, not fail`);
    if (st(b6) !== 'pass') fail(`B6 with Zs 0.90 Ω of 7.28 reads ${st(b6)}, not pass`);
    if (st(other) !== 'partial') fail(`R1+R2 alone reads ${st(other)}, not in progress`);
    const todo = res.get(refOfRow(other))?.missing?.join(', ');
    if (todo !== 'Zs, insulation, polarity') fail(`in progress lists "${todo}" still to do`);
    if (res.get(refOfRow(b32))?.decidedBy !== 'zs') fail('the B32 fail is not put down to Zs');
    const untouched = real.find((r) => r !== b32 && r !== b6 && r !== other)!;
    if (res.get(refOfRow(untouched))?.status !== 'untested')
      fail('a circuit with no readings is not "not tested"');

    // A row added by hand on the certificate, sharing a way number with a plan
    // circuit whose own row was renumbered there, never takes that circuit.
    {
      const own = rows.find((r) => r.id === b6.id)!;
      const w6 = job.ways.get(refOfRow(b6))!;
      const intruder = {
        ...own,
        id: 'by-hand',
        planOrigin: undefined,
        zs: '9.99',
        circuitNumber: w6.label,
        wayNumber: w6.way,
      };
      const moved6 = { ...own, circuitNumber: '99', wayNumber: 99 };
      const r2 = planResults({ ...linked, rows: [intruder, moved6] }, job.ways, job.originOf);
      if (r2.get(refOfRow(b6))?.zs !== '0.90')
        fail(`a hand-added row took way ${w6.label}'s readings (${r2.get(refOfRow(b6))?.zs})`);
    }
    // Recorded decisions and the certificate's own wordings are not findings.
    {
      const own = rows.find((r) => r.id === b6.id)!;
      const na = planResults(
        { ...linked, rows: [{ ...own, insulationLiveNeutral: 'N/A', polarity: 'Satisfactory' }] },
        job.ways,
        job.originOf
      ).get(refOfRow(b6));
      if (na?.status !== 'pass') fail(`"N/A" or "Satisfactory" turned a pass into ${na?.status}`);
      const tt = planResults(
        { ...linked, earthing: 'tt', rows: [{ ...own, zs: '45' }] },
        job.ways,
        job.originOf
      ).get(refOfRow(b6));
      if (tt?.status !== 'pass' || tt.maxZs)
        fail(`TT: Zs 45 Ω with a 30 mA RCD reads ${tt?.status}, limit shown "${tt?.maxZs}"`);
    }

    // Renumber the plan: the readings stay on their own circuits.
    const order = [...job.ways.values()]
      .filter((w) => w.board === 'CU')
      .sort((a, b) => a.way - b.way)
      .map((w) => w.ref);
    const moved = moveWay(objs, order, order[1], -1);
    const job2 = jobNumbering([{ id: 'sheet-a', name: 'House', objects: moved }]);
    const res2 = planResults(linked, job2.ways, job2.originOf);
    if (res2.get(refOfRow(b32))?.status !== 'fail' || res2.get(refOfRow(b6))?.status !== 'pass')
      fail('moving a way on the plan moved its readings to another circuit');

    // A circuit taken off the plan is dropped, never guessed onto another.
    const gone = planResults(
      { ...linked, rows: [{ ...rows.find((r) => r.id === b32.id)!, planOrigin: 'sheet-a:NOPE' }] },
      job.ways,
      job.originOf
    );
    if (gone.size) fail('a row for a circuit no longer on the plan landed on one');

    // A row added on the certificate by hand matches by its way.
    const w = job.ways.get(refOfRow(b6))!;
    const byHand = planResults(
      { ...linked, rows: [{ ...rows.find((r) => r.id === b6.id)!, planOrigin: undefined }] },
      job.ways,
      job.originOf
    );
    if (byHand.get(w.ref)?.status !== 'pass') fail('a hand-added row did not match by its way');
  }

  // Amending a submain: an MCB in SWA, never an RCBO's 30 mA or T&E.
  const sm = applyCircuitEdit(
    {
      ref: 'DB2',
      kind: 'submain',
      description: 'Submain to DB2',
      device: 'Size to the sub-board’s design load — confirm',
      cable: 'Size to load, length and installation method — confirm',
      points: 0,
      floor: '',
      rooms: [],
      rcd: false,
      afdd: false,
      notes: [],
      source: '',
    },
    { device: 'RCBO', rating: 'C63', cable: '16' }
  );
  if (/30 mA|RCBO/.test(sm.device) || sm.rcd || !/SWA/.test(sm.cable) || /T&E/.test(sm.cable))
    fail(`submain amended to "${sm.device}" in "${sm.cable}"`);
  // Amending the board by hand, 30 Sep 2026.
  const base = withRuns(
    placeBoard(
      aiPlanToObjects(
        {
          rooms: JSON.parse(readFileSync(join(FIXTURES, 'described-detached-house.json'), 'utf8'))
            .rooms,
        },
        11
      )
    )
  );
  const before = waysOf(base);
  const order = [...before.values()]
    .filter((w) => w.board === 'CU')
    .sort((a, b) => a.way - b.way)
    .map((w) => w.ref);
  const [first, second] = order;
  const moved = moveWay(base, order, second, -1);
  const after = waysOf(moved);
  if (
    after.get(second)?.label !== before.get(first)?.label ||
    after.get(first)?.label !== before.get(second)?.label
  )
    fail(
      `moving way ${before.get(second)?.label} up didn't swap it with ${before.get(first)?.label}`
    );
  const ring = scheduleFromObjects(base).circuits.find((c) => c.kind === 'ring')!;
  const edited = editCircuit(base, ring.ref, {
    device: 'MCB',
    rating: 'B20',
    cable: '4/1.5',
    description: 'Workshop sockets',
  });
  const e = scheduleFromObjects(edited).circuits.find((c) => c.ref === ring.ref)!;
  const n = notation(e);
  if (
    n.device !== 'MCB' ||
    n.rating !== 'B20' ||
    n.cable !== '4/1.5' ||
    e.description !== 'Workshop sockets' ||
    e.rcd
  )
    fail(
      `an amended circuit reads ${n.device} ${n.rating} ${n.cable} "${e.description}" rcd=${e.rcd}`
    );
  if (e.length && e.length.ok !== undefined)
    fail("an amended circuit kept the design's OSG length verdict");
  const job = jobNumbering([{ id: 's', name: 'House', objects: edited }]);
  const row = planToCertificate([...job.designed, ...job.handCircuits], job.ways, {
    supply: 'single',
    earthing: 'TN-C-S',
    planName: 'House',
  }).scheduleOfTests.find((r) => r.circuitDescription.startsWith('Workshop sockets'));
  if (
    !row ||
    row.bsStandard !== 'MCB (BS EN 60898)' ||
    row.protectiveDeviceRating !== '20' ||
    row.maxZs !== '2.19' ||
    row.liveSize !== '4.0mm'
  )
    fail(
      `the certificate row for an amended circuit: ${row?.bsStandard} ${row?.protectiveDeviceRating} ${row?.maxZs} ${row?.liveSize}`
    );
  const redesigned = redesignCircuits(edited, { buildingType: 'house' });
  if (redesigned.some((o) => o.circuitEdit || o.wayPin))
    fail('a redesign kept amendments to circuits that no longer exist');
}
if (failures === beforeRegressions) console.log('  ✔ all fixed and staying fixed');

if (failures) {
  console.error(`\n✘ ${failures} layout faults`);
  process.exit(1);
}
console.log('\n✔ Every plan laid out cleanly');
