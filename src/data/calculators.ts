/**
 * The calculator registry — one list, used by the picker, both pages and the
 * lazy-loaded switch.
 *
 * It lived inline in CalculatorSelector.tsx while the electrician page kept its
 * own 64-case switch and the apprentice page kept another. Three places had to
 * agree every time a calculator was added, and they had already drifted.
 *
 * `keywords` exists because a 63-item list is not browsable on a phone. Someone
 * looking for volt drop types "mV" or "3%", not "Voltage Drop" — the picker
 * searches these as well as the label.
 */

export interface CalculatorEntry {
  /** Stable slug — the switch key and the ?calc= URL param. */
  value: string;
  label: string;
  category: CalculatorCategory;
  /** Extra search terms: symbols, regs, and what an electrician actually says. */
  keywords?: string;
}

export type CalculatorCategory =
  | 'Fundamental'
  | 'Design & Installation'
  | 'Testing & Inspection'
  | 'Protection & Safety'
  | 'Lighting & Power Systems'
  | 'Renewable Energy'
  | 'Advanced Safety & Analysis'
  | 'Specialised Applications'
  | 'Specialist Locations'
  | 'Tools & Components'
  | 'Utilities & Cost Analysis';

/** Display order. Fundamentals first, niche last. */
export const CALCULATOR_CATEGORIES: CalculatorCategory[] = [
  'Fundamental',
  'Design & Installation',
  'Testing & Inspection',
  'Protection & Safety',
  'Lighting & Power Systems',
  'Renewable Energy',
  'Advanced Safety & Analysis',
  'Specialised Applications',
  'Specialist Locations',
  'Tools & Components',
  'Utilities & Cost Analysis',
];

export const CALCULATORS: CalculatorEntry[] = [
  {
    value: 'ohms-law',
    label: "Ohm's Law",
    category: 'Fundamental',
    keywords: 'ohm voltage current resistance power V=IR',
  },
  {
    value: 'ac-power',
    label: 'AC Power Calculator',
    category: 'Fundamental',
    keywords: 'apparent real reactive VA kVA kW kVAr power triangle',
  },
  {
    value: 'basic-ac-circuit',
    label: 'Basic AC Circuit',
    category: 'Fundamental',
    keywords: 'impedance Z reactance XL XC inductive capacitive resonance RLC',
  },
  {
    value: 'power-factor',
    label: 'Power Factor',
    category: 'Fundamental',
    keywords: 'power factor cos phi kVA kW kVAr',
  },
  {
    value: 'three-phase-power',
    label: 'Three Phase Power',
    category: 'Fundamental',
    keywords: 'three phase 400V line phase √3',
  },
  {
    value: 'star-delta',
    label: 'Star-Delta Conversion',
    category: 'Fundamental',
    keywords: 'star delta wye conversion line phase',
  },
  {
    value: 'voltage-drop',
    label: 'Voltage Drop',
    category: 'Design & Installation',
    keywords: 'volt drop mV/A/m 3% 5% cable run length',
  },
  {
    value: 'bonding-conductor-size',
    label: 'Bonding Conductor Size',
    category: 'Design & Installation',
    keywords: 'main protective bonding supplementary earthing conductor 544 Table 54.8 PME tails',
  },
  {
    value: 'cable-size',
    label: 'Cable Sizing',
    category: 'Design & Installation',
    keywords: 'cable sizing CSA csa conductor selection Iz It',
  },
  {
    value: 'load',
    label: 'Load Assessment',
    category: 'Design & Installation',
    keywords: 'maximum demand connected load diversity Ib design current',
  },
  {
    value: 'cable-current-capacity',
    label: 'Cable Current Capacity',
    category: 'Design & Installation',
    keywords: 'Iz current carrying capacity ampacity tabulated',
  },
  {
    value: 'cable-derating',
    label: 'Cable Derating',
    category: 'Design & Installation',
    keywords: 'derating correction factor Ca Cg Ci Cf grouping ambient insulation',
  },
  {
    value: 'conduit-fill',
    label: 'Conduit Fill',
    category: 'Design & Installation',
    keywords: 'conduit fill space factor 45%',
  },
  {
    value: 'conduit-bending',
    label: 'Conduit Bending',
    category: 'Design & Installation',
    keywords: 'offset saddle set bend radius shrink stub kick bender',
  },
  {
    value: 'trunking-size',
    label: 'Pipe & Trunking Size',
    category: 'Design & Installation',
    keywords: 'trunking size factor capacity',
  },
  {
    value: 'diversity-factor',
    label: 'Diversity Factor',
    category: 'Design & Installation',
    keywords: 'diversity factor after diversity maximum demand',
  },
  {
    value: 'maximum-demand',
    label: 'Maximum Demand',
    category: 'Design & Installation',
    keywords: 'maximum demand load assessment ADMD',
  },
  {
    value: 'power-factor-correction',
    label: 'Power Factor Correction',
    category: 'Design & Installation',
    keywords: 'capacitor kVAr correction target power factor',
  },
  {
    value: 'zs-values',
    label: 'Maximum Zs Values',
    category: 'Testing & Inspection',
    keywords: 'Zs earth fault loop impedance maximum disconnection',
  },
  {
    value: 'bs7671-zs-lookup',
    label: 'BS 7671 Zs Lookup',
    category: 'Testing & Inspection',
    keywords: 'Zs table 41.2 41.3 41.4 lookup limit',
  },
  {
    value: 'insulation-resistance',
    label: 'Insulation Resistance',
    category: 'Testing & Inspection',
    keywords: 'IR insulation resistance megger 500V 250V 1 megohm Table 64 643.3',
  },
  {
    value: 'r1r2',
    label: 'R1+R2 Calculation',
    category: 'Testing & Inspection',
    keywords: 'continuity R1 R2 line CPC loop resistance dead test',
  },
  {
    value: 'ring-circuit',
    label: 'Ring Circuit',
    category: 'Testing & Inspection',
    keywords: 'ring final r1 rn r2 continuity figure of eight',
  },
  {
    value: 'earth-fault-loop',
    label: 'Earth Fault Loop',
    category: 'Testing & Inspection',
    keywords: 'Zs Ze R1 R2 earth fault loop impedance',
  },
  {
    value: 'phase-rotation',
    label: 'Phase Rotation',
    category: 'Testing & Inspection',
    keywords: 'sequence L1 L2 L3 rotation meter motor direction reversed',
  },
  {
    value: 'adiabatic',
    label: 'Adiabatic Equation',
    category: 'Protection & Safety',
    keywords: 'adiabatic k factor S=√(I²t)/k earth conductor CPC fault',
  },
  {
    value: 'pfc',
    label: 'Prospective Fault Current',
    category: 'Protection & Safety',
    keywords: 'PFC prospective fault current Ipf breaking capacity',
  },
  {
    value: 'rcd-trip-time',
    label: 'RCD Trip Time',
    category: 'Protection & Safety',
    keywords: 'RCD trip time residual current disconnection',
  },
  {
    value: 'rcd-discrimination',
    label: 'RCD Discrimination',
    category: 'Protection & Safety',
    keywords: 'RCD selectivity discrimination upstream downstream',
  },
  {
    value: 'earth-electrode',
    label: 'Earth Electrode (TT Systems)',
    category: 'Protection & Safety',
    keywords: 'earth electrode rod resistance Ra TT',
  },
  {
    value: 'circuit-breaker-selector',
    label: 'Circuit Breaker Selector',
    category: 'Protection & Safety',
    keywords: 'MCB RCBO breaker curve type B C D rating select device',
  },
  {
    value: 'lumen',
    label: 'Lighting (Lumens)',
    category: 'Lighting & Power Systems',
    keywords: 'lumen lux illuminance light level',
  },
  {
    value: 'led-driver',
    label: 'LED Driver Calculator',
    category: 'Lighting & Power Systems',
    keywords: 'LED driver constant current voltage',
  },
  {
    value: 'motor-starting-current',
    label: 'Motor Starting Current',
    category: 'Lighting & Power Systems',
    keywords: 'motor starting inrush DOL star delta locked rotor',
  },
  {
    value: 'transformer-calculator',
    label: 'Transformer Calculator',
    category: 'Lighting & Power Systems',
    keywords: 'turns ratio primary secondary kVA step up step down winding',
  },
  {
    value: 'battery-backup',
    label: 'Battery Backup',
    category: 'Lighting & Power Systems',
    keywords: 'UPS runtime autonomy Ah amp hour standby inverter',
  },
  {
    value: 'emergency-lighting',
    label: 'Emergency Lighting Design',
    category: 'Lighting & Power Systems',
    keywords: 'escape route BS 5266 3 hour lux luminaire spacing maintained',
  },
  {
    value: 'solar-pv',
    label: 'Solar PV',
    category: 'Renewable Energy',
    keywords: 'solar PV array string kWp MCS',
  },
  {
    value: 'solar-array',
    label: 'Solar Array Calculator',
    category: 'Renewable Energy',
    keywords: 'PV panels string layout MPPT Voc Vmpp roof array design',
  },
  {
    value: 'battery-storage',
    label: 'Battery Storage System',
    category: 'Renewable Energy',
    keywords: 'battery storage kWh BESS depth of discharge',
  },
  {
    value: 'wind-power',
    label: 'Wind Power Calculator',
    category: 'Renewable Energy',
    keywords: 'turbine AEP capacity factor hub height wind speed',
  },
  {
    value: 'grid-tie-inverter',
    label: 'Grid-Tie Inverter',
    category: 'Renewable Energy',
    keywords: 'inverter DC AC ratio G98 G99 export string sizing',
  },
  {
    value: 'micro-hydro',
    label: 'Micro-Hydro Power',
    category: 'Renewable Energy',
    keywords: 'hydro head flow turbine Pelton Francis crossflow water',
  },
  {
    value: 'off-grid-system',
    label: 'Off-Grid System Calculator',
    category: 'Renewable Energy',
    keywords: 'standalone battery autonomy solar charge controller island',
  },
  {
    value: 'feed-in-tariff',
    label: 'Feed-In Tariff Calculator',
    category: 'Renewable Energy',
    keywords: 'FIT SEG export generation tariff payback deemed',
  },
  {
    value: 'heat-pump',
    label: 'Heat Pump Load',
    category: 'Renewable Energy',
    keywords: 'heat pump ASHP COP SCOP',
  },
  {
    value: 'ev-charging',
    label: 'EV Charging Station',
    category: 'Renewable Energy',
    keywords: 'EV charger EVSE load 7kW 22kW',
  },
  {
    value: 'evse-load',
    label: 'EVSE Load Calculator',
    category: 'Renewable Energy',
    keywords: 'EV charger diversity load 722 charge point maximum demand',
  },
  {
    value: 'arc-flash',
    label: 'Arc Flash Analysis',
    category: 'Advanced Safety & Analysis',
    keywords: 'arc flash incident energy PPE boundary',
  },
  {
    value: 'power-quality',
    label: 'Power Quality Analysis',
    category: 'Advanced Safety & Analysis',
    keywords: 'harmonics THD distortion flicker unbalance G5 crest',
  },
  {
    value: 'selectivity',
    label: 'Selectivity & Discrimination',
    category: 'Advanced Safety & Analysis',
    keywords: 'discrimination coordination upstream downstream backup let-through',
  },
  {
    value: 'fault-level',
    label: 'Fault Level Calculator',
    category: 'Advanced Safety & Analysis',
    keywords: 'fault level kA prospective short circuit',
  },
  {
    value: 'touch-step-voltage',
    label: 'Touch & Step Voltage',
    category: 'Advanced Safety & Analysis',
    keywords: 'touch step potential rise EPR substation earthing 50V',
  },
  {
    value: 'lightning-protection',
    label: 'Lightning Protection Risk Assessment',
    category: 'Advanced Safety & Analysis',
    keywords: 'LPS risk assessment BS EN 62305 surge air termination',
  },
  {
    value: 'data-centre',
    label: 'Data Centre Calculator',
    category: 'Specialised Applications',
    keywords: 'PUE UPS rack cooling redundancy N+1 kW per rack',
  },
  {
    value: 'generator-sizing',
    label: 'Generator Sizing',
    category: 'Specialised Applications',
    keywords: 'genset kVA prime standby step load alternator sizing',
  },
  {
    value: 'marine-electrical',
    label: 'Marine Electrical',
    category: 'Specialist Locations',
    keywords: 'boat shore power marina galvanic isolator 12V DC',
  },
  {
    value: 'swimming-pool',
    label: 'Swimming Pool Electrical',
    category: 'Specialist Locations',
    keywords: 'pool zones 702 SELV bonding hot tub spa',
  },
  {
    value: 'resistor-colour-code',
    label: 'Resistor Colour Code',
    category: 'Tools & Components',
    keywords: 'bands colour code ohm tolerance 4 band 5 band decode',
  },
  {
    value: 'wire-gauge',
    label: 'Wire Gauge (AWG/SWG)',
    category: 'Tools & Components',
    keywords: 'AWG SWG gauge mm2 conversion American wire',
  },
  {
    value: 'instrumentation',
    label: 'Instrumentation',
    category: 'Tools & Components',
    keywords: '4-20mA loop transmitter scale span PLC signal',
  },
  {
    value: 'ip-rating',
    label: 'IP Rating Decoder',
    category: 'Tools & Components',
    keywords: 'IP code ingress protection IP65 IP2X dust water BS EN 60529',
  },
  {
    value: 'energy-cost',
    label: 'Energy Cost Calculator',
    category: 'Utilities & Cost Analysis',
    keywords: 'energy cost kWh tariff running cost',
  },
  {
    value: 'unit-converter',
    label: 'Unit Converter',
    category: 'Utilities & Cost Analysis',
    keywords: 'convert units mm kW HP ohm milli kilo conversion',
  },
  {
    value: 'time-materials',
    label: 'Time & Materials',
    category: 'Utilities & Cost Analysis',
    keywords: 'quote price labour materials markup VAT invoice job cost',
  },
];

/** Slug → entry, for resolving the ?calc= param and the page title. */
export const CALCULATOR_BY_SLUG = new Map(CALCULATORS.map((c) => [c.value, c]));

/**
 * Label + keyword match, case- and punctuation-insensitive so "3 phase",
 * "3-phase" and "three phase" all land on the same tool.
 */
const normalise = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9%]+/g, ' ')
    .trim();

/**
 * How well an entry matches — lower is better.
 *
 * Filtering alone is not enough. "volt" matches Ohm's Law (its keywords mention
 * voltage) and Voltage Drop equally, and in registry order Ohm's Law wins — so
 * typing "volt" and pressing Enter opened the wrong calculator. A name match
 * beats a keyword match, and a match at the start of the name beats one buried
 * in the middle.
 */
function matchScore(c: CalculatorEntry, q: string): number {
  const label = normalise(c.label);
  if (label === q) return 0;
  if (label.startsWith(q)) return 1;
  if (new RegExp(`\\b${q}`).test(label)) return 2;
  if (label.includes(q)) return 3;
  if (normalise(c.category).includes(q)) return 4;

  // Keyword hits, ranked by how complete the match is. "ups" must find Battery
  // Backup (keyword "UPS") ahead of RCD Discrimination, whose keywords contain
  // "upstream" — a word that legitimately STARTS with ups, so a word-boundary
  // test alone does not separate them. Only a whole-word match does. Short
  // queries are exactly where an electrician types an abbreviation, so the
  // abbreviation has to win.
  const keywords = normalise(c.keywords ?? '');
  if (new RegExp(`\\b${q}\\b`).test(keywords)) return 5; // whole word: "UPS"
  if (new RegExp(`\\b${q}`).test(keywords)) return 6; // word prefix: "upstream"
  return 7; // substring somewhere
}

export function searchCalculators(query: string): CalculatorEntry[] {
  const q = normalise(query);
  if (!q) return CALCULATORS;
  const terms = q.split(' ').filter(Boolean);
  const hits = CALCULATORS.filter((c) => {
    const hay = normalise(`${c.label} ${c.category} ${c.keywords ?? ''}`);
    return terms.every((t) => hay.includes(t));
  });
  // Stable sort — equal scores keep registry order.
  return hits
    .map((c, i) => ({ c, i, s: matchScore(c, q) }))
    .sort((a, b) => a.s - b.s || a.i - b.i)
    .map((x) => x.c);
}
