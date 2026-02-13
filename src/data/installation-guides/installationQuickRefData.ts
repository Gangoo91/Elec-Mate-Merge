import {
  Cable,
  CircuitBoard,
  Shield,
  Plug,
  Palette,
  AlertTriangle,
  Ruler,
  type LucideIcon,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────

export interface QuickRefCard {
  id: string;
  label: string;
  icon: LucideIcon;
  colour: string;        // Tailwind colour stem e.g. "cyan"
  borderColour: string;  // e.g. "border-cyan-500"
  bgColour: string;      // e.g. "bg-cyan-500/20"
  textColour: string;    // e.g. "text-cyan-400"
  ringColour: string;    // e.g. "ring-cyan-500/40"
}

export interface CableSizingRow {
  cable: string;
  ratingClipped: string;
  ratingEnclosed: string;
  voltDrop: string;
  commonCircuit: string;
  mcb: string;
}

export interface CircuitData {
  name: string;
  cable: string;
  protection: string;
  maxArea?: string;
  maxPoints?: string;
  tip: string;
  extras?: string[];
}

export interface IPRatingRow {
  code: string;
  solids: string;
  liquids: string;
  example: string;
}

export interface BathroomZone {
  zone: string;
  ipMin: string;
  notes: string;
}

export interface EarthingSystem {
  name: string;
  shortName: string;
  prevalence: string;
  description: string;
  ze: string;
  tip: string;
}

export interface ColourRow {
  function: string;
  fixedWiring: string;
  flexibleCable: string;
}

export interface SafeIsolationStep {
  step: number;
  title: string;
  description: string;
}

export interface AccessoryHeightRow {
  accessory: string;
  standardHeight: string;
  accessibleHeight: string;
  notes: string;
}

// ── Quick Reference Card Definitions ───────────────────────────────────

export const quickRefCards: QuickRefCard[] = [
  {
    id: "cable-sizing",
    label: "Cable Sizing",
    icon: Cable,
    colour: "cyan",
    borderColour: "border-cyan-500",
    bgColour: "bg-cyan-500/20",
    textColour: "text-cyan-400",
    ringColour: "ring-cyan-500/40",
  },
  {
    id: "circuit-essentials",
    label: "Circuit Essentials",
    icon: CircuitBoard,
    colour: "blue",
    borderColour: "border-blue-500",
    bgColour: "bg-blue-500/20",
    textColour: "text-blue-400",
    ringColour: "ring-blue-500/40",
  },
  {
    id: "ip-ratings",
    label: "IP Ratings",
    icon: Shield,
    colour: "green",
    borderColour: "border-green-500",
    bgColour: "bg-green-500/20",
    textColour: "text-green-400",
    ringColour: "ring-green-500/40",
  },
  {
    id: "earthing-systems",
    label: "Earthing Systems",
    icon: Plug,
    colour: "amber",
    borderColour: "border-amber-500",
    bgColour: "bg-amber-500/20",
    textColour: "text-amber-400",
    ringColour: "ring-amber-500/40",
  },
  {
    id: "cable-colours",
    label: "Cable Colours",
    icon: Palette,
    colour: "purple",
    borderColour: "border-purple-500",
    bgColour: "bg-purple-500/20",
    textColour: "text-purple-400",
    ringColour: "ring-purple-500/40",
  },
  {
    id: "safe-isolation",
    label: "Safe Isolation",
    icon: AlertTriangle,
    colour: "red",
    borderColour: "border-red-500",
    bgColour: "bg-red-500/20",
    textColour: "text-red-400",
    ringColour: "ring-red-500/40",
  },
  {
    id: "accessory-heights",
    label: "Accessory Heights",
    icon: Ruler,
    colour: "teal",
    borderColour: "border-teal-500",
    bgColour: "bg-teal-500/20",
    textColour: "text-teal-400",
    ringColour: "ring-teal-500/40",
  },
];

// ── 1. Cable Sizing ───────────────────────────────────────────────────

export const cableSizingData: CableSizingRow[] = [
  { cable: "1.0mm\u00B2", ratingClipped: "15.5A", ratingEnclosed: "13.5A", voltDrop: "44", commonCircuit: "Lighting (6A)", mcb: "6A" },
  { cable: "1.5mm\u00B2", ratingClipped: "20A", ratingEnclosed: "17.5A", voltDrop: "29", commonCircuit: "Lighting (10A)", mcb: "6A/10A" },
  { cable: "2.5mm\u00B2", ratingClipped: "27A", ratingEnclosed: "24A", voltDrop: "18", commonCircuit: "Ring final / Radial", mcb: "32A / 20A" },
  { cable: "4.0mm\u00B2", ratingClipped: "37A", ratingEnclosed: "32A", voltDrop: "11", commonCircuit: "Heavy radial / Cooker (small)", mcb: "32A" },
  { cable: "6.0mm\u00B2", ratingClipped: "47A", ratingEnclosed: "41A", voltDrop: "7.3", commonCircuit: "Cooker / EV charger", mcb: "32A/40A" },
  { cable: "10mm\u00B2", ratingClipped: "65A", ratingEnclosed: "57A", voltDrop: "4.4", commonCircuit: "Shower (10.8kW)", mcb: "45A/50A" },
  { cable: "16mm\u00B2", ratingClipped: "87A", ratingEnclosed: "76A", voltDrop: "2.8", commonCircuit: "Sub-main / Large shower", mcb: "63A" },
  { cable: "25mm\u00B2", ratingClipped: "114A", ratingEnclosed: "101A", voltDrop: "1.75", commonCircuit: "Sub-main / Large load", mcb: "80A/100A" },
];

export const cableSizingTip =
  "These are Reference Method C (clipped direct) ratings from BS 7671 Table 4D5. Always apply correction factors for grouping, ambient temperature, and thermal insulation.";

// ── 2. Circuit Essentials ─────────────────────────────────────────────

export const circuitData: CircuitData[] = [
  {
    name: "Ring Final Circuit",
    cable: "2.5mm\u00B2 T&E",
    protection: "32A MCB or RCBO",
    maxArea: "100m\u00B2",
    tip: "A ring with a spur must never have more than one socket on the spur unfused, or unlimited via a 13A fused connection unit.",
    extras: ["Unlimited socket outlets", "Must form a complete ring"],
  },
  {
    name: "Radial Circuit (20A)",
    cable: "2.5mm\u00B2 T&E",
    protection: "20A MCB",
    maxArea: "50m\u00B2",
    tip: "Use for small rooms, garages, sheds \u2014 simpler than a ring.",
  },
  {
    name: "Radial Circuit (32A)",
    cable: "4.0mm\u00B2 T&E",
    protection: "32A MCB",
    maxArea: "75m\u00B2",
    tip: "Use for workshops or areas with higher demand.",
  },
  {
    name: "Lighting Circuit",
    cable: "1.5mm\u00B2 T&E",
    protection: "6A MCB",
    maxPoints: "12 per circuit (industry convention, not regulation)",
    tip: "Consider LED loads \u2014 you can put far more LED fittings on a 6A circuit than old halogen.",
  },
  {
    name: "Cooker Circuit",
    cable: "6mm\u00B2 T&E (up to 15kW with diversity)",
    protection: "32A MCB",
    tip: "Apply diversity factor from BS 7671 Table 1B. First 10A at 100%, remaining at 30%, plus 5A if socket on cooker control unit.",
  },
  {
    name: "Shower Circuit",
    cable: "10mm\u00B2 T&E (up to 10.8kW)",
    protection: "45A or 50A RCBO",
    tip: "Dedicated circuit, no spurs, no other loads. RCD protection mandatory.",
  },
  {
    name: "EV Charging",
    cable: "6mm\u00B2 T&E (up to 7.4kW)",
    protection: "32A RCBO (Type A minimum)",
    tip: "Must comply with BS 7671 Section 722. PEN fault detection may be required on TN-C-S supplies.",
  },
];

// ── 3. IP Ratings ─────────────────────────────────────────────────────

export const ipRatingsData: IPRatingRow[] = [
  { code: "IP20", solids: "Protected against fingers", liquids: "None", example: "Standard domestic socket/switch" },
  { code: "IP2X", solids: "Protected against fingers", liquids: "\u2014", example: "Minimum for live parts inside CU" },
  { code: "IP44", solids: "Protected against 1mm+ objects", liquids: "Splashing water", example: "Outdoor PIR sensor, junction boxes" },
  { code: "IP55", solids: "Dust protected", liquids: "Water jets", example: "Outdoor consumer unit, garden sockets" },
  { code: "IP65", solids: "Dust tight", liquids: "Water jets", example: "Outdoor LED floodlight, bathroom downlight" },
  { code: "IP66", solids: "Dust tight", liquids: "Powerful water jets", example: "Industrial enclosure, car wash areas" },
  { code: "IP67", solids: "Dust tight", liquids: "Immersion (30 min)", example: "Underground junction box, submersible pump" },
  { code: "IP68", solids: "Dust tight", liquids: "Continuous immersion", example: "Pool lighting, marine applications" },
];

export const bathroomZones: BathroomZone[] = [
  { zone: "Zone 0 (inside bath/shower)", ipMin: "IPX7 minimum", notes: "Max 12V SELV" },
  { zone: "Zone 1 (above bath to 2.25m)", ipMin: "IPX4 minimum", notes: "IPX5 if water jets likely" },
  { zone: "Zone 2 (0.6m from Zone 1)", ipMin: "IPX4 minimum", notes: "Standard rated accessories OK" },
  { zone: "Outside zones", ipMin: "IP20 minimum", notes: "Standard domestic" },
];

export const ipRatingsTip =
  "The first digit is solids (0\u20136), the second is liquids (0\u20139). IP2X means the liquid digit hasn\u2019t been tested \u2014 it does NOT mean it\u2019s waterproof.";

// ── 4. Earthing Systems ───────────────────────────────────────────────

export const earthingSystems: EarthingSystem[] = [
  {
    name: "TN-C-S (PME \u2014 Protective Multiple Earthing)",
    shortName: "TN-C-S (PME)",
    prevalence: "Most common in UK urban areas (80%+ of supplies)",
    description:
      "Combined neutral and earth from transformer to property. Earth provided by the DNO via the combined neutral/earth conductor.",
    ze: "0.35\u03A9 maximum",
    tip: "PME restrictions apply to bathrooms, swimming pools, caravan parks, petrol stations, and EV charging. Check BS 7671 Regulation 411.4.5.",
  },
  {
    name: "TN-S (Separate Earth)",
    shortName: "TN-S",
    prevalence: "Older properties (pre-1970s typically)",
    description:
      "Separate earth conductor from transformer (usually cable sheath). More reliable earth but higher impedance.",
    ze: "0.8\u03A9 maximum",
    tip: "If you see a green wire going to the cable sheath at the intake, it\u2019s TN-S. The cable sheath IS the earth.",
  },
  {
    name: "TT (Earth Electrode)",
    shortName: "TT",
    prevalence: "Common in rural areas with overhead supplies",
    description:
      "No earth from DNO \u2014 property provides its own earth rod. Higher earth impedance \u2014 RCD protection essential.",
    ze: "Up to 200\u03A9 (varies hugely)",
    tip: "TT systems MUST have RCD protection on every circuit. The earth electrode resistance (Ra) \u00D7 RCD rating (I\u0394n) must not exceed 50V.",
  },
];

// ── 5. Cable Colours ──────────────────────────────────────────────────

export const newColours: ColourRow[] = [
  { function: "Line (L)", fixedWiring: "Brown", flexibleCable: "Brown" },
  { function: "Neutral (N)", fixedWiring: "Blue", flexibleCable: "Blue" },
  { function: "Earth (CPC)", fixedWiring: "Green/Yellow", flexibleCable: "Green/Yellow" },
  { function: "L1 (3-phase)", fixedWiring: "Brown", flexibleCable: "Brown" },
  { function: "L2 (3-phase)", fixedWiring: "Black", flexibleCable: "Black" },
  { function: "L3 (3-phase)", fixedWiring: "Grey", flexibleCable: "Grey" },
];

export const oldColours: ColourRow[] = [
  { function: "Line", fixedWiring: "Red", flexibleCable: "Brown" },
  { function: "Neutral", fixedWiring: "Black", flexibleCable: "Blue" },
  { function: "Earth", fixedWiring: "Green/Yellow (or bare)", flexibleCable: "Green/Yellow" },
  { function: "L1 (3-phase)", fixedWiring: "Red", flexibleCable: "\u2014" },
  { function: "L2 (3-phase)", fixedWiring: "Yellow", flexibleCable: "\u2014" },
  { function: "L3 (3-phase)", fixedWiring: "Blue", flexibleCable: "\u2014" },
];

export const colourSafetyPoints: string[] = [
  "Blue was NEUTRAL in old flex but is LINE 3 in old 3-phase fixed wiring \u2014 NEVER assume.",
  "Black was NEUTRAL in old fixed wiring but is L2 in new 3-phase \u2014 NEVER assume.",
  "A warning notice is required at the consumer unit if both old and new colours exist in the same installation (Regulation 514.14.1).",
];

export const coloursTip =
  "If you find mixed colours in an installation, label everything clearly and fit a dual-colour warning notice at the CU. Test EVERY conductor before touching it.";

// ── 6. Safe Isolation ─────────────────────────────────────────────────

export const safeIsolationSteps: SafeIsolationStep[] = [
  { step: 1, title: "Identify", description: "Identify the circuit to be worked on using drawings/schedules" },
  { step: 2, title: "Notify", description: "Inform all affected persons that the supply will be switched off" },
  { step: 3, title: "Isolate", description: "Switch off and isolate the circuit at the distribution board" },
  { step: 4, title: "Lock off", description: "Apply a lock and personal danger tag (your lock, your key)" },
  { step: 5, title: "Prove", description: "Test your voltage indicator on a KNOWN live source (proving unit)" },
  { step: 6, title: "Test", description: "Test between all conductors (L-N, L-E, N-E) to confirm dead" },
  { step: 7, title: "Prove again", description: "Re-test your voltage indicator on the known live source" },
  { step: 8, title: "Work", description: "Only begin work once steps 1\u20137 are complete" },
];

export const safeIsolationRules: string[] = [
  "Use a GS38 compliant two-pole voltage tester (NOT a multimeter).",
  "NEVER use a non-contact voltage detector (voltstick) as the sole method.",
  "If your tester fails the second prove, your dead test is INVALID \u2014 start again.",
  "Keep your lock and key on you at all times \u2014 NEVER let someone else remove your lock.",
  "Each person working on the circuit must apply their OWN lock.",
];

export const safeIsolationTip =
  "Prove-Test-Prove is not optional. It is not a guideline. It is the law under the Electricity at Work Regulations 1989 Regulation 14. People have died because they skipped the second prove.";

// ── 7. Accessory Heights ──────────────────────────────────────────────

export const accessoryHeights: AccessoryHeightRow[] = [
  { accessory: "Socket outlets", standardHeight: "450mm from floor", accessibleHeight: "450\u20131200mm", notes: "Part M: between 450\u20131200mm from FFL" },
  { accessory: "Light switches", standardHeight: "1200\u20131400mm", accessibleHeight: "900\u20131100mm", notes: "Part M: large rocker plates" },
  { accessory: "Consumer unit", standardHeight: "1350\u20131500mm", accessibleHeight: "Accessible without bending/stretching", notes: "BS 7671 Reg 132.12" },
  { accessory: "Cooker control unit", standardHeight: "1200\u20131400mm", accessibleHeight: "Within easy reach", notes: "Above worktop level" },
  { accessory: "Fused connection unit", standardHeight: "As required", accessibleHeight: "450\u20131200mm", notes: "Match socket heights if visible" },
  { accessory: "Isolator switches", standardHeight: "1200\u20131400mm", accessibleHeight: "Accessible", notes: "Emergency switches at obvious height" },
  { accessory: "Thermostat", standardHeight: "1200\u20131500mm", accessibleHeight: "1200\u20131400mm", notes: "Away from draughts and direct sun" },
  { accessory: "Outdoor socket", standardHeight: "450mm+", accessibleHeight: "Protected location", notes: "IP66 minimum, RCD protected" },
];

export const partMKeyPoints: string[] = [
  "All new dwellings must comply with Part M Building Regulations.",
  "Switches and sockets at consistent heights throughout.",
  "Large rocker switches preferred over small toggle switches.",
  "Consumer units must be accessible without bending or stretching (not above head height or behind obstacles).",
  "Horizontal cable runs should be at consistent heights (avoid diagonal runs).",
];

export const accessoryHeightsTip =
  "If in doubt, go with Part M heights for everything \u2014 it\u2019s the direction of travel and makes installations more user-friendly for everyone.";
