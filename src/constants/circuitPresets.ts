/**
 * Circuit presets — the one list.
 *
 * This data existed in three copies (`SmartAutoFillPromptDialog`,
 * `CompactCircuitAutoFillSection`, `CircuitAutoFillButton`) and they had
 * drifted, so the same preset name produced materially different circuits
 * depending on which button you pressed. For "Downstairs Ring":
 *
 *   | field            | Add-circuit sheet     | Compact autofill | Autofill button |
 *   | liveSize         | 2.5mm                 | 2.5              | 2.5mm           |
 *   | referenceMethod  | A  (Iz 20)            | C  (Iz 27)       | A               |
 *   | bsStandard       | RCBO (BS EN 61009)    | MCB              | (absent)        |
 *
 * Each of those changes a verdict. `2.5` (no unit) is not the canonical value
 * in `cableSizeOptions`, so the ring detector — which matches `2.5mm` — could
 * not recognise its own preset as a ring. `MCB` alone resolves no maximum Zs,
 * so the Zs check silently skipped. And method A vs C is Iz 20 vs 27.
 *
 * ── Three deliberate changes from the old data ──
 *
 * 1. **No `referenceMethod`.** It is a site observation, not design intent —
 *    you cannot know how a cable is installed from the circuit's name. The old
 *    default of `A` (enclosed in an insulated wall) appears in only 90 of the
 *    ~3,800 circuits recorded in production, against 2,127 for `C`; it also left
 *    several presets at exactly zero margin (a 20 A radial on 2.5 mm² method A
 *    has Iz 20 A). Asserting it is how a guessed input becomes a wrong verdict.
 *    Left blank, the validator asks for it.
 *
 * 2. **No `maxZs`.** It is derived from device, curve and rating, and the row
 *    components already fill it via `getMaxZsFromDeviceDetails`. Storing it here
 *    duplicates a derivation — which is precisely how these three copies drifted.
 *
 * 3. **Canonical cable sizes** — `2.5mm`, `4.0mm`, `10mm` — matching
 *    `cableSizeOptions`. Anything else breaks the size dropdown and the ring
 *    detector.
 */
import { TestResult } from '@/types/testResult';

export type PresetCategory =
  | 'Lighting'
  | 'Sockets'
  | 'Appliances'
  | 'Modern'
  | 'Commercial'
  | 'Industrial';

export interface CircuitPreset {
  /** Shown to the user, and used as the circuit description when applied. */
  type: string;
  category: PresetCategory;
  /** Extra terms the type-ahead should match on. The name is always matched. */
  keywords?: string[];
  suggestions: Partial<TestResult>;
}

/** One-line spec for the UI: "32A Type B RCBO · 2.5/1.5mm² · 30mA RCD Type A". */
export const describePreset = (preset: CircuitPreset): string => {
  const s = preset.suggestions;
  const parts: string[] = [];
  if (s.protectiveDeviceRating) {
    const curve = s.protectiveDeviceCurve ? ` Type ${s.protectiveDeviceCurve}` : '';
    parts.push(`${s.protectiveDeviceRating}A${curve} ${s.protectiveDeviceType ?? ''}`.trim());
  }
  if (s.liveSize) parts.push(`${s.liveSize.replace('mm', '')}/${(s.cpcSize ?? '').replace('mm', '')}mm²`);
  if (s.rcdRating) parts.push(`${s.rcdRating}mA RCD${s.rcdType ? ` Type ${s.rcdType}` : ''}`);
  return parts.join(' · ');
};

const lighting = (rating: string, extra: Partial<TestResult> = {}): Partial<TestResult> => ({
  liveSize: '1.5mm',
  cpcSize: '1.0mm',
  typeOfWiring: 'A',
  protectiveDeviceType: 'MCB',
  protectiveDeviceCurve: 'B',
  protectiveDeviceRating: rating,
  protectiveDevice: `MCB B${rating}`,
  bsStandard: 'MCB (BS EN 60898)',
  protectiveDeviceKaRating: '6',
  ...extra,
});

/** RCBO fields — an RCBO is the overcurrent device *and* the RCD. */
const rcbo = (rating: string, curve: string, ma = '30'): Partial<TestResult> => ({
  protectiveDeviceType: 'RCBO',
  protectiveDeviceCurve: curve,
  protectiveDeviceRating: rating,
  protectiveDevice: `RCBO ${curve}${rating}`,
  bsStandard: 'RCBO (BS EN 61009)',
  protectiveDeviceKaRating: '6',
  rcdBsStandard: 'RCBO (BS EN 61009)',
  rcdType: 'A',
  rcdRating: ma,
  rcdRatingA: rating,
});

const mcb = (rating: string, curve: string): Partial<TestResult> => ({
  protectiveDeviceType: 'MCB',
  protectiveDeviceCurve: curve,
  protectiveDeviceRating: rating,
  protectiveDevice: `MCB ${curve}${rating}`,
  bsStandard: 'MCB (BS EN 60898)',
  protectiveDeviceKaRating: '6',
});

/**
 * Cable fields.
 *
 * Deliberately does NOT set `cableSize`. That is a legacy denormalised field,
 * and the row's own sync treats it as authoritative — `if (field ===
 * 'cableSize') liveSize = value` — so writing "2.5/1.5" into it overwrote
 * `liveSize` with "2.5/1.5". A bog-standard 2.5 mm² ring then came back as
 * "Non-Standard Ring Final Cable Size", and the Appendix 4 lookup could not
 * resolve a capacity for it either. The sync fills `cableSize` from `liveSize`
 * on its own.
 */
const cable = (live: string, cpc: string): Partial<TestResult> => ({
  liveSize: live,
  cpcSize: cpc,
  typeOfWiring: 'A',
});

export const CIRCUIT_PRESETS: CircuitPreset[] = [
  // ── Lighting ──
  { type: 'Downstairs Lights', category: 'Lighting', keywords: ['light', 'ground floor'], suggestions: lighting('6') },
  { type: 'Upstairs Lights', category: 'Lighting', keywords: ['light', 'first floor'], suggestions: lighting('6') },
  { type: 'Kitchen Lights', category: 'Lighting', keywords: ['light'], suggestions: lighting('10') },
  {
    type: 'Outdoor Lights',
    category: 'Lighting',
    keywords: ['light', 'external', 'garden'],
    suggestions: { ...cable('1.5mm', '1.0mm'), ...rcbo('6', 'B') },
  },

  // ── Sockets ──
  {
    type: 'Downstairs Ring',
    category: 'Sockets',
    keywords: ['ring', 'socket', 'ground floor'],
    suggestions: { ...cable('2.5mm', '1.5mm'), ...rcbo('32', 'B'), circuitType: 'Ring Final' },
  },
  {
    type: 'Upstairs Ring',
    category: 'Sockets',
    keywords: ['ring', 'socket', 'first floor'],
    suggestions: { ...cable('2.5mm', '1.5mm'), ...rcbo('32', 'B'), circuitType: 'Ring Final' },
  },
  {
    type: 'Kitchen Ring',
    category: 'Sockets',
    keywords: ['ring', 'socket'],
    suggestions: { ...cable('2.5mm', '1.5mm'), ...rcbo('32', 'B'), circuitType: 'Ring Final' },
  },
  {
    type: 'Utility Radial',
    category: 'Sockets',
    keywords: ['radial', 'socket'],
    suggestions: { ...cable('2.5mm', '1.5mm'), ...rcbo('20', 'B'), circuitType: 'Radial' },
  },

  // ── Appliances ──
  { type: 'Cooker', category: 'Appliances', keywords: ['oven', 'hob'], suggestions: { ...cable('6.0mm', '2.5mm'), ...mcb('32', 'B') } },
  {
    type: 'Shower',
    category: 'Appliances',
    keywords: ['electric shower'],
    suggestions: { ...cable('10mm', '4.0mm'), ...rcbo('40', 'B') },
  },
  { type: 'Immersion', category: 'Appliances', keywords: ['water heater', 'cylinder'], suggestions: { ...cable('2.5mm', '1.5mm'), ...mcb('16', 'B') } },

  // ── Modern ──
  {
    type: 'EV Charger',
    category: 'Modern',
    keywords: ['car', 'charge point', 'evse'],
    suggestions: { ...cable('6.0mm', '2.5mm'), ...rcbo('32', 'C') },
  },
  { type: 'Heat Pump', category: 'Modern', keywords: ['ashp', 'air source'], suggestions: { ...cable('4.0mm', '1.5mm'), ...mcb('25', 'B') } },
  { type: 'Solar PV', category: 'Modern', keywords: ['pv', 'inverter', 'panels'], suggestions: { ...cable('4.0mm', '1.5mm'), ...mcb('16', 'B') } },
  { type: 'Heating', category: 'Modern', keywords: ['boiler', 'controls'], suggestions: lighting('6') },

  // ── Commercial ──
  { type: 'Office Lights', category: 'Commercial', keywords: ['light'], suggestions: lighting('10') },
  {
    type: 'Office Sockets',
    category: 'Commercial',
    keywords: ['socket', 'desk'],
    suggestions: { ...cable('4.0mm', '1.5mm'), ...rcbo('32', 'B') },
  },
  {
    type: 'Server Room',
    category: 'Commercial',
    keywords: ['comms', 'data', 'it'],
    suggestions: { ...cable('4.0mm', '1.5mm'), ...rcbo('20', 'C') },
  },
  { type: 'A/C Unit', category: 'Commercial', keywords: ['air con', 'aircon', 'hvac'], suggestions: { ...cable('4.0mm', '1.5mm'), ...mcb('20', 'C') } },
  { type: 'Emergency Lights', category: 'Commercial', keywords: ['emergency', 'light'], suggestions: lighting('6') },
  { type: 'Fire Alarm', category: 'Commercial', keywords: ['fire', 'detection'], suggestions: lighting('6') },

  // ── Industrial ──
  { type: '3-Phase Motor', category: 'Industrial', keywords: ['motor', '3ph'], suggestions: { ...cable('4.0mm', '1.5mm'), ...mcb('16', 'D') } },
  { type: 'Machinery', category: 'Industrial', keywords: ['machine', 'plant'], suggestions: { ...cable('10mm', '4.0mm'), ...mcb('40', 'D') } },
  {
    type: 'Workshop Sockets',
    category: 'Industrial',
    keywords: ['socket', 'workshop'],
    suggestions: { ...cable('6.0mm', '2.5mm'), ...rcbo('32', 'C') },
  },
  { type: 'Compressor', category: 'Industrial', keywords: ['air', 'plant'], suggestions: { ...cable('10mm', '4.0mm'), ...mcb('32', 'D') } },
];

export const PRESET_CATEGORIES: PresetCategory[] = [
  'Lighting',
  'Sockets',
  'Appliances',
  'Modern',
  'Commercial',
  'Industrial',
];

/**
 * Presets matching what the electrician has typed so far.
 *
 * Ranked so the most useful sits at the top: a name that starts with the query
 * beats one that merely contains it, which beats a keyword hit. Typing "ring"
 * should surface the three rings before "Workshop Sockets".
 *
 * Returns nothing for an empty query — this suggests while typing, it does not
 * present a menu the user has to dismiss.
 */
export const searchCircuitPresets = (query: string, limit = 6): CircuitPreset[] => {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const scored = CIRCUIT_PRESETS.map((preset) => {
    const name = preset.type.toLowerCase();
    let score = -1;
    if (name.startsWith(q)) score = 0;
    else if (name.includes(q)) score = 1;
    else if (name.split(/\s+/).some((word) => word.startsWith(q))) score = 2;
    else if (preset.keywords?.some((k) => k.includes(q))) score = 3;
    else if (preset.category.toLowerCase().startsWith(q)) score = 4;
    return { preset, score };
  }).filter((x) => x.score >= 0);

  scored.sort((a, b) => a.score - b.score || a.preset.type.localeCompare(b.preset.type));
  return scored.slice(0, limit).map((x) => x.preset);
};

/**
 * The same presets grouped by category.
 *
 * Two of the autofill surfaces render category-by-category with their own icons
 * and colours, so they need the nesting — but the circuit data underneath must
 * still be the one list, which is the whole point of this module.
 */
export const presetsByCategory = (): { category: PresetCategory; options: CircuitPreset[] }[] =>
  PRESET_CATEGORIES.map((category) => ({
    category,
    options: CIRCUIT_PRESETS.filter((p) => p.category === category),
  }));
