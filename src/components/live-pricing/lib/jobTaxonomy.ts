import {
  LucideIcon,
  Zap,
  ClipboardCheck,
  Car,
  Home,
  ShowerHead,
  CookingPot,
  Flame,
  TreePine,
  Lightbulb,
  Plug,
  Fan,
  Warehouse,
  Waves,
  Thermometer,
  Sun,
  SearchCheck,
  FileCheck2,
  Wrench,
} from 'lucide-react';

/**
 * Canonical Live Pricing job taxonomy.
 * Rule order matters and MUST stay in sync with the SQL classifier in
 * supabase/migrations/20260801130000_live_pricing_real_benchmarks.sql
 * (public.live_pricing_classify_job) — benchmarks are grouped server-side
 * with the same rules.
 */
const CLASSIFIER_RULES: { name: string; pattern: RegExp }[] = [
  { name: 'EICR', pattern: /eicr|periodic|condition report/ },
  {
    name: 'Consumer unit change',
    pattern: /consumer unit|fuse ?board|board change|cu change|distribution board|db change/,
  },
  {
    name: 'EV charger install',
    pattern: /\bev\b|ev charger|car charger|zappi|ohme|easee|wallbox|hypervolt|charge ?point/,
  },
  { name: 'Rewire', pattern: /rewire|re-wire|full house wiring/ },
  { name: 'Shower circuit', pattern: /shower/ },
  { name: 'Cooker / hob circuit', pattern: /cooker|hob|oven/ },
  { name: 'Smoke / fire alarms', pattern: /smoke|heat detector|fire alarm|\balarm\b/ },
  { name: 'Outdoor / garden', pattern: /outside|outdoor|garden|external/ },
  { name: 'Lighting', pattern: /light|lamp|downlight|spotlight|chandelier|pendant/ },
  { name: 'Sockets', pattern: /socket|spur|double gang|single gang/ },
  { name: 'Extractor fan', pattern: /extractor|\bfan\b/ },
  { name: 'Garage / outbuilding', pattern: /garage|shed|outbuilding/ },
  { name: 'Hot tub supply', pattern: /hot tub/ },
  { name: 'Heating / immersion', pattern: /immersion|heater|heating|radiator|storage heater/ },
  { name: 'Solar / battery', pattern: /solar|\bpv\b|battery/ },
  { name: 'Fault finding', pattern: /fault|trip|no power|investigat|call ?out|emergency/ },
  { name: 'Testing & certification', pattern: /test|certificate|\bcert\b|minor works|\beic\b/ },
];

export const OTHER_JOB_TYPE = 'Other';

export function classifyJobText(text: string): string {
  const t = (text || '').toLowerCase();
  for (const rule of CLASSIFIER_RULES) {
    if (rule.pattern.test(t)) return rule.name;
  }
  return OTHER_JOB_TYPE;
}

/** Distinct classified job types across a set of texts (e.g. line items). */
export function countJobTypes(texts: (string | undefined | null)[]): number {
  const types = new Set<string>();
  for (const text of texts) {
    const type = classifyJobText(text || '');
    if (type !== OTHER_JOB_TYPE) types.add(type);
  }
  return types.size;
}

/**
 * Deposit / balance / part-payment quotes carry partial prices and are
 * excluded from benchmarks. Mirrors the SQL exclusion in the v2 migration.
 */
export function isPartialPaymentTitle(title: string | undefined | null): boolean {
  return /^\s*(deposit|balance|part[ -]?payment|stage payment|final payment)/i.test(title || '');
}

export interface JobTypeMeta {
  icon: LucideIcon;
  blurb: string;
}

export const JOB_TYPE_META: Record<string, JobTypeMeta> = {
  EICR: { icon: ClipboardCheck, blurb: 'Condition reports, domestic and rental' },
  'Consumer unit change': { icon: Zap, blurb: 'Board changes and upgrades' },
  'EV charger install': { icon: Car, blurb: 'Home and workplace charge points' },
  Rewire: { icon: Home, blurb: 'Partial and full rewires' },
  'Shower circuit': { icon: ShowerHead, blurb: 'Electric shower circuits' },
  'Cooker / hob circuit': { icon: CookingPot, blurb: 'Cooker, hob and oven supplies' },
  'Smoke / fire alarms': { icon: Flame, blurb: 'Detection and alarm systems' },
  'Outdoor / garden': { icon: TreePine, blurb: 'External power and lighting' },
  Lighting: { icon: Lightbulb, blurb: 'Fittings, downlights and repairs' },
  Sockets: { icon: Plug, blurb: 'New sockets, spurs and moves' },
  'Extractor fan': { icon: Fan, blurb: 'Bathroom and kitchen fans' },
  'Garage / outbuilding': { icon: Warehouse, blurb: 'Sub-main and outbuilding supplies' },
  'Hot tub supply': { icon: Waves, blurb: 'Dedicated hot tub circuits' },
  'Heating / immersion': { icon: Thermometer, blurb: 'Heaters, immersions and controls' },
  'Solar / battery': { icon: Sun, blurb: 'PV and battery storage work' },
  'Fault finding': { icon: SearchCheck, blurb: 'Tripping, dead circuits, callouts' },
  'Testing & certification': { icon: FileCheck2, blurb: 'Testing, certs and minor works' },
  [OTHER_JOB_TYPE]: { icon: Wrench, blurb: 'Everything else' },
};

export function jobTypeMeta(jobType: string): JobTypeMeta {
  return JOB_TYPE_META[jobType] ?? JOB_TYPE_META[OTHER_JOB_TYPE];
}
