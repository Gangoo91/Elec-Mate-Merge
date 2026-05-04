/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * vision-to-wizard — turn vision extraction into wizard-state suggestions.
 *
 * Two mappers, deliberately simple:
 *   - floorPlanToCircuitSuggestions: rooms + accessories → suggested circuits
 *     using common UK domestic / commercial patterns. Heuristic — the user
 *     reviews and edits in the Circuits step before generating.
 *   - scheduleToCircuits: extracted schedule rows map directly to CircuitInput
 *     since a schedule already enumerates circuits.
 *
 * Both return Partial<CircuitInput> with `id` stamped — the Circuits step
 * accepts these directly.
 */

import { CircuitInput, LoadType } from '@/types/installation-design';

const newId = () =>
  `vision-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

interface Accessory {
  kind?: string;
  count?: number;
}

interface Room {
  name?: string;
  areaM2?: number;
  floor?: number;
  cableRunEstimateM?: number;
  specialLocation?: string;
  accessories?: Accessory[];
}

const accCount = (rooms: Room[], match: (kind: string) => boolean): number =>
  rooms.reduce((n, r) => {
    const accs = Array.isArray(r.accessories) ? r.accessories : [];
    return (
      n +
      accs.reduce(
        (s, a) => s + (a.kind && match(String(a.kind)) ? Number(a.count ?? 0) : 0),
        0
      )
    );
  }, 0);

const longestRunFor = (rooms: Room[], match: (kind: string) => boolean): number => {
  let max = 0;
  for (const r of rooms) {
    const accs = Array.isArray(r.accessories) ? r.accessories : [];
    if (accs.some((a) => a.kind && match(String(a.kind)))) {
      max = Math.max(max, Number(r.cableRunEstimateM ?? 0));
    }
  }
  return max || 20; // sensible default
};

/**
 * Generate suggested circuits from an extracted floor plan. UK domestic / small
 * commercial pattern: aggregate accessories by kind, propose one circuit per
 * load category. The AI fills in cable size + protection during design.
 */
export function floorPlanToCircuitSuggestions(extraction: any): CircuitInput[] {
  const rooms: Room[] = Array.isArray(extraction?.rooms) ? extraction.rooms : [];
  const floors: number = Math.max(1, Number(extraction?.floors ?? 1));

  const totalSockets = accCount(rooms, (k) => /socket/.test(k));
  const totalLights = accCount(rooms, (k) => /light/.test(k));
  const hasCooker = rooms.some((r) =>
    (r.accessories ?? []).some((a) => /cooker/.test(String(a.kind ?? '')))
  );
  const hasShower = rooms.some((r) =>
    (r.accessories ?? []).some((a) => /shower/.test(String(a.kind ?? '')))
  );
  const hasEv = rooms.some((r) =>
    (r.accessories ?? []).some((a) => /ev-charger/.test(String(a.kind ?? '')))
  );
  const hasFcu = rooms.some((r) =>
    (r.accessories ?? []).some((a) => /fcu|towel-rail/.test(String(a.kind ?? '')))
  );
  const hasSmoke = rooms.some((r) =>
    (r.accessories ?? []).some((a) =>
      /smoke|heat-detector|co-detector/.test(String(a.kind ?? ''))
    )
  );

  const circuits: CircuitInput[] = [];

  // Cooker — kitchen, ~4m run typical (CU near kitchen)
  if (hasCooker) {
    circuits.push({
      id: newId(),
      name: 'Kitchen cooker',
      loadType: 'cooker' as LoadType,
      loadPower: 7400,
      cableLength: longestRunFor(rooms, (k) => /cooker/.test(k)),
      phases: 'single',
      specialLocation: 'kitchen',
    });
  }

  // Shower — bathroom, watch for special location
  if (hasShower) {
    circuits.push({
      id: newId(),
      name: 'Shower',
      loadType: 'shower' as LoadType,
      loadPower: 9500,
      cableLength: longestRunFor(rooms, (k) => /shower/.test(k)),
      phases: 'single',
      specialLocation: 'bathroom',
    });
  }

  // EV charger — outdoor location, longer run typical
  if (hasEv) {
    circuits.push({
      id: newId(),
      name: 'EV charger',
      loadType: 'ev-charger',
      loadPower: 7400,
      cableLength: longestRunFor(rooms, (k) => /ev-charger/.test(k)),
      phases: 'single',
      specialLocation: 'outdoor',
    });
  }

  // Sockets — UK convention: one ring final per ~12 outlets OR per ~100 m²
  // floor area (BS 7671 Appendix 15), whichever gives more rings. A large
  // open-plan with few sockets still needs ≥1 ring; a heavily socket-loaded
  // small floor needs more.
  if (totalSockets > 0) {
    const totalAreaM2 = Number(extraction?.totalAreaM2 ?? 0);
    const ringByCount = Math.max(1, Math.ceil(totalSockets / 12));
    const ringByArea =
      totalAreaM2 > 0 ? Math.max(1, Math.ceil(totalAreaM2 / 100)) : 1;
    const ringCount = Math.max(ringByCount, ringByArea);
    for (let i = 0; i < ringCount; i++) {
      circuits.push({
        id: newId(),
        name: ringCount === 1 ? 'Sockets' : `Sockets ring ${i + 1}`,
        loadType: 'socket',
        loadPower: 7200,
        cableLength: 30,
        phases: 'single',
        circuitTopology: 'ring',
      });
    }
  }

  // Lighting — one circuit per floor (or single if floor count unclear)
  for (let f = 0; f < floors; f++) {
    const totalLoad = Math.max(500, totalLights * 50);
    const lightLoad = Math.round(totalLoad / floors);
    circuits.push({
      id: newId(),
      name: floors === 1 ? 'Lighting' : `Floor ${f} lighting`,
      loadType: 'lighting' as LoadType,
      loadPower: lightLoad,
      cableLength: 25,
      phases: 'single',
    });
  }

  // FCU / towel rail — bathroom or kitchen
  if (hasFcu) {
    circuits.push({
      id: newId(),
      name: 'FCU / towel rail',
      loadType: 'heating',
      loadPower: 600,
      cableLength: longestRunFor(rooms, (k) => /fcu|towel/.test(k)),
      phases: 'single',
    });
  }

  // Smoke / heat detection — dedicated circuit per BS 5839-6
  if (hasSmoke) {
    circuits.push({
      id: newId(),
      name: 'Smoke / heat alarms',
      loadType: 'smoke-alarm',
      loadPower: 50,
      cableLength: 20,
      phases: 'single',
      notes: 'Smoke / heat / CO alarms (BS 5839-6 / BS EN 14604)',
    });
  }

  return circuits;
}

/**
 * Map a scope-of-works extraction directly to CircuitInput[]. The edge
 * function's scope kind already returns circuits in the right shape — we
 * just stamp ids and clamp values to valid enums.
 */
export function scopeToCircuits(extraction: any): CircuitInput[] {
  const circuits: any[] = Array.isArray(extraction?.circuits) ? extraction.circuits : [];
  // Conservative LoadType allowlist — anything outside maps to 'other'.
  const ALLOWED_LOAD_TYPES = new Set([
    'socket', 'lighting', 'cooker', 'shower', 'ev-charger', 'immersion', 'heating',
    'smoke-alarm', 'garage', 'outdoor', 'office-sockets', 'emergency-lighting',
    'hvac', 'server-room', 'kitchen-equipment', 'signage', 'fire-alarm',
    'access-control', 'cctv', 'data-cabinet', 'three-phase-motor', 'machine-tool',
    'welding', 'conveyor', 'extraction', 'control-panel', 'overhead-lighting',
    'workshop-sockets', 'compressor', 'production-line', 'motor', 'other',
  ]);
  const ALLOWED_LOCATIONS = new Set(['bathroom', 'outdoor', 'underground', 'kitchen', 'none']);
  const ALLOWED_PROTECTION = new Set(['auto', 'MCB', 'RCBO', 'RCBO-TypeA', 'RCBO-TypeB']);

  return circuits.map((c) => {
    const lt = String(c.loadType ?? '').toLowerCase().trim();
    const loadType: LoadType = (ALLOWED_LOAD_TYPES.has(lt) ? lt : 'other') as LoadType;
    const sl = String(c.specialLocation ?? '').toLowerCase().trim();
    const specialLocation = (ALLOWED_LOCATIONS.has(sl) ? sl : 'none') as
      | 'bathroom' | 'outdoor' | 'underground' | 'kitchen' | 'none';
    const pt = String(c.protectionType ?? '').trim();
    const protectionType = ALLOWED_PROTECTION.has(pt)
      ? (pt as 'auto' | 'MCB' | 'RCBO' | 'RCBO-TypeA' | 'RCBO-TypeB')
      : 'auto';
    return {
      id: newId(),
      name: String(c.name ?? '').trim() || 'Circuit',
      loadType,
      loadPower: typeof c.loadPower === 'number' ? c.loadPower : undefined,
      cableLength: typeof c.cableLength === 'number' ? c.cableLength : undefined,
      phases: c.phases === 'three' ? 'three' : 'single',
      circuitTopology:
        c.circuitTopology === 'ring' || c.circuitTopology === 'radial' || c.circuitTopology === 'auto'
          ? c.circuitTopology
          : 'auto',
      specialLocation,
      protectionType,
      notes: typeof c.notes === 'string' ? c.notes : undefined,
    } as CircuitInput;
  });
}

/**
 * Map an extracted schedule directly to CircuitInput[]. Uses the schedule's
 * own values for cable size / protection / load type / length where present.
 * The AI will design / verify the cable + protection from these hints rather
 * than computing from scratch.
 */
export function scheduleToCircuits(extraction: any): CircuitInput[] {
  const circuits: any[] = Array.isArray(extraction?.circuits) ? extraction.circuits : [];
  return circuits.map((c) => {
    // Map extraction load type strings to LoadType where possible.
    const loadStr = String(c.loadType ?? '').toLowerCase();
    let loadType: LoadType = 'other';
    if (/light/.test(loadStr)) loadType = 'lighting';
    else if (/socket|ring/.test(loadStr)) loadType = 'socket';
    else if (/cooker|hob/.test(loadStr)) loadType = 'cooker';
    else if (/shower/.test(loadStr)) loadType = 'shower';
    else if (/immersion/.test(loadStr)) loadType = 'immersion';
    else if (/heat|boiler/.test(loadStr)) loadType = 'heating';
    else if (/ev|charge/.test(loadStr)) loadType = 'ev-charger';
    else if (/motor/.test(loadStr)) loadType = 'motor';

    // Estimate load from protection rating × phase voltage when not given.
    // Lighting tends to draw far less than rating; sockets/general are
    // already diversified, so use a conservative fraction.
    const protectionA = Number(c.protectionRating ?? 0);
    const phasesType = c.phases === 'three' ? 'three' : 'single';
    const phaseVoltage = phasesType === 'three' ? 400 : 230;
    const utilisation =
      loadType === 'lighting'
        ? 0.5
        : loadType === 'socket'
          ? 0.6
          : loadType === 'cooker' || loadType === 'shower' || loadType === 'ev-charger'
            ? 0.85
            : 0.7;
    const estimatedLoadW =
      protectionA > 0
        ? Math.round(
            phasesType === 'three'
              ? phaseVoltage * Math.sqrt(3) * protectionA * utilisation
              : phaseVoltage * protectionA * utilisation
          )
        : undefined;
    return {
      id: newId(),
      name: String(c.name ?? `Circuit ${c.wayNumber ?? ''}`).trim() || 'Circuit',
      loadType,
      loadPower: estimatedLoadW,
      cableLength: c.cableLengthM ?? undefined,
      phases: c.phases === 'three' ? 'three' : 'single',
      // socket circuits with no explicit topology default to ring (UK convention).
      circuitTopology:
        loadType === 'socket' && /ring/i.test(loadStr)
          ? 'ring'
          : loadType === 'socket'
            ? 'auto'
            : c.cableType
              ? 'radial'
              : 'auto',
      protectionType:
        c.protectionType === 'RCBO'
          ? 'RCBO'
          : c.protectionType === 'MCB'
            ? 'MCB'
            : 'auto',
      // Hints — the AI uses these as guides during design.
      estimatedCableSize: c.cableSize,
      suggestedMCB: c.protectionRating,
      notes: c.note,
    } as CircuitInput;
  });
}
