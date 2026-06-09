import 'https://deno.land/x/xhr@0.1.0/mod.ts';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { encode as base64Encode } from 'https://deno.land/std@0.168.0/encoding/base64.ts';
import { captureException } from '../_shared/sentry.ts';

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// ============================================================================
// TYPES
// ============================================================================

interface BoardReadRequest {
  images: string[];
  hints?: {
    main_switch_side?: 'left' | 'right';
    expected_ways?: number;
    board_type?: 'domestic' | 'commercial' | 'industrial';
    is_three_phase?: boolean;
  };
  options?: {
    use_claude_ocr?: boolean;
    use_openai_components?: boolean;
    fast_mode?: boolean;
  };
}

interface DetectedCircuit {
  index: number;
  label_text: string;
  device: {
    category: string;
    type: string;
    rating_amps: number | null;
    curve: string | null;
    breaking_capacity_kA: number | null;
  };
  pictograms: Array<{ type: string; confidence: number }>;
  phase: '1P' | '3P';
  phase_assignment?: string | string[];
  confidence: 'high' | 'medium' | 'low';
  evidence: string;
  source_model: string;
}

interface BoardStructure {
  brand: string;
  model: string;
  main_switch_rating: number | null;
  main_switch_poles?: string;
  is_three_phase: boolean;
  spd_status: 'present' | 'not_present' | 'unknown';
  board_layout: 'single_row' | 'dual_row' | '3P-vertical' | '3P-horizontal';
  estimated_total_ways: number;
  circuits_per_phase?: { L1: number; L2: number; L3: number };
}

// SSE Event Types
type StreamEvent =
  | { type: 'stage'; stage: string; message: string }
  | { type: 'board'; data: BoardStructure }
  | { type: 'circuits_batch'; circuits: DetectedCircuit[] }
  | { type: 'circuit_update'; index: number; updates: Partial<DetectedCircuit> }
  | { type: 'circuit_remove'; index: number }
  | { type: 'warning'; message: string }
  | { type: 'decision'; message: string }
  | { type: 'complete'; metadata: any }
  | { type: 'error'; message: string };

// ============================================================================
// UNIFIED GEMINI PROMPT - Comprehensive single-pass analysis
// ============================================================================

const UNIFIED_BOARD_PROMPT = `You are a UK consumer-unit / DB analyst. Read the photo end-to-end and return strict JSON. Be exhaustive — every populated position AND every spare must appear.

═══════════════════════════════════════════════════════════════════
ABSOLUTE RULE — 3-POLE DEVICES ARE ONE CIRCUIT
═══════════════════════════════════════════════════════════════════
A 3-pole device (rotary isolator, 3P MCB, 3P RCBO, 3P MCCB, motor protector, contactor with three terminals top + bottom) IS A SINGLE CIRCUIT THAT OCCUPIES 3 ADJACENT WAYS. Output it as ONE entry with phase: "3P", phase_assignment: ["L1","L2","L3"], spans_ways: 3.

You MUST NEVER output the pattern:
  • {index: N, label: "<name>", phase: "1P", phase_assignment: "L1"}
  • {index: N+1, label: "Spare", phase: "1P", phase_assignment: "L2"}
  • {index: N+2, label: "Spare", phase: "1P", phase_assignment: "L3"}
This pattern is FORBIDDEN. If you produce it the output is rejected. Three-pole devices must be ONE entry.

How to spot a 3-pole device:
  • Three terminals top, three terminals bottom (six terminals total).
  • A toggle / handle / rotary that mechanically links three poles together.
  • Markings "3P", "TPN", "L1 L2 L3" on the front face.
  • Single moulded body that visibly spans three module widths.
  • Names like "Rotary Isolator", "3P Switch", "Cooker", "Sub-main", "DB-2", "EV", "Motor", "Hot Tub" on a TPN board.

═══════════════════════════════════════════════════════════════════

═══════════════════════════════════════════════════════════════════
PRIORITY 1 — THE I∆n RULE (overrides every other heuristic)
═══════════════════════════════════════════════════════════════════
If a device has any of these markings printed on its FACE, it is an RCBO or RCD — NEVER an MCB. No exceptions.

Markings that force RCBO/RCD:
  • "I∆n" followed by mA / A value (e.g. "I∆n 0.03 A", "I∆n 30 mA")
  • "30mA", "100mA", "300mA", "0.03A" prominently displayed
  • "Type A", "Type AC", "Type B", "Type F" appearing as a residual-current type
    (NOT to be confused with curve "Type B" which is a smaller printed letter on MCBs)
  • A residual-current symbol (a small square enclosing the trip-coil glyph)
  • "L OUT  N" terminal labels at top — RCBOs route both line and neutral through the device

Distinguishing RCBO from RCD by I∆n alone:
  • Single-module width with I∆n  →  RCBO
  • Two-module width with I∆n + LARGE test button  →  RCD
  • RCBOs may NOT have a visible test button on the front — the test may be by external accessory.
    Do not require a test button to classify as RCBO. The I∆n marking is sufficient and decisive.

UPSTREAM RCDs (split-load boards) — never emit as Spare or MCB:
A two-module device rated 63A / 80A / 100A with an I∆n value of 30mA / 100mA / 300mA, sitting BETWEEN groups of MCBs, is an upstream RCD. Emit it with category: "RCD", the correct rating (e.g. 80), the I∆n value (e.g. 30) and label_text "RCD" or "RCD 1" / "RCD 2" if numbered. NEVER emit it as Spare. NEVER emit it as MCB. NEVER omit it.

═══════════════════════════════════════════════════════════════════
PRIORITY 2 — UK MANUFACTURER MODEL-PREFIX TABLE
═══════════════════════════════════════════════════════════════════
If you can read the device's model code, use this table. The prefix is decisive over visual heuristics.

HAGER:
  ADA*, AD*, ADC*, ADM*, ADZ*       →  RCBO  (e.g. ADA306G, ADA316G, ADA332G are all RCBOs)
  NB*, NC*, NK*, NHN*, MTN*         →  MCB   (e.g. MTN150 = B50 MCB)
  CDA*, CDB*, CDC*, JB*, JG*        →  RCD
  HXC*, HXP*, SBN*, SBR*, SBH*      →  Main switch / isolator  (e.g. SBR290 = 100A)
  SPD*, SPL*, SPN*                  →  Surge protection device
  ARC*                              →  AFDD

MK SENTRY:
  RCB*, K6203*                      →  RCBO
  5BB*, 5BBA*, 5LM*                 →  MCB
  RCD*, 7763*                       →  RCD
  SH*, MS*                          →  Main switch

SCHNEIDER:
  A9D*, KQ*, R9D*                   →  RCBO
  iC60*, A9F*, R9F*                 →  MCB
  IID*, ID*, R9R*                   →  RCD
  SPU*, IPRD*                       →  SPD

WYLEX:
  NM*, NMR*, NHXMSB*                →  RCBO
  NHM*, NB*, NSB*, PSBM*            →  MCB
  NHRC*, WRS*                       →  RCD
  NHSPD*, WSPD*                     →  SPD

CRABTREE / EATON STARBREAKER:
  AB60*, RCBO*                      →  RCBO
  SB6000*, SB60*, B*                →  MCB
  RCCB*                             →  RCD

CONTACTUM:
  CLRB*, CLRC*                      →  RCBO
  CLB*, CLC*                        →  MCB
  CLRC*                             →  RCD

BG / NEXUS:
  CUR*                              →  RCBO
  CUMC*, CUR*                       →  MCB

LEWDEN, FUSEBOX, AICO, CHINT — extend by reading the model carefully if visible.

═══════════════════════════════════════════════════════════════════
PRIORITY 3 — TERMINAL ARCHITECTURE
═══════════════════════════════════════════════════════════════════
Look at the top of each device — the terminal labels reveal architecture:
  • "L OUT  N"        →  RCBO  (routes both line and neutral)
  • "L OUT" only      →  MCB   (switches line only; neutral goes elsewhere)
  • Three terminals + linked toggle  →  three-pole device

═══════════════════════════════════════════════════════════════════
PRIORITY 4 — ONLY when 1, 2 and 3 give nothing — visual heuristics
═══════════════════════════════════════════════════════════════════
  • MCB: single-module, simple toggle, no I∆n marking, no residual-current symbol
  • RCD: two-module width, large test button, I∆n always present
  • AFDD: marked "AFDD" or "Arc Fault Detection", often has a small LED/LCD or an electronic body. AFDDs are RCBO-form-factor in modern UK ranges (Hager ARC*, Schneider iDPN AFDD, Wylex NHRC AFDD) — use category AFDD, not RCBO.
  • Isolator / main switch: chunky toggle, often colour-coded red/black, no rating curve letter, "MAIN" or large amp value (100A, 125A). Use category "Isolator".
  • Fuse: rewirable carrier (Wylex Standard, Crabtree Polestar, MEM) or cartridge with a fuse-link inside. Use category "Fuse".
  • Time switch / contactor: Hager EH*, Schneider CT*, Theben TR — square electronic body, often a digital display, NO curve letter, NO toggle. Use category "Other" with label_text "Time switch" or "Contactor".
  • kWh / MID meter: rectangular body with a digital display showing energy units (kWh). Use category "Other" with label_text "Meter".
  • Surge protection device (SPD): chunky module(s) with green/red flag windows. Often labelled "SPD" or "T1+T2", "Iimp", "In", "Up". Treat as a device but DO NOT count it as a circuit — surface in board.spd_status and an spd_type field if visible (T1, T2, T1+T2, T3).

═══════════════════════════════════════════════════════════════════
DECISION RULE (apply in order)
═══════════════════════════════════════════════════════════════════
For EVERY position, classify by walking down this list and STOPPING at the first match:
  1. Does it show I∆n / mA / residual-current symbol?            →  RCBO (1-module) or RCD (2-module)
  2. Can you read a model code that matches the prefix table?    →  use the table
  3. Are the top terminals labelled "L OUT  N"?                   →  RCBO
  4. Is it visually an MCB by Priority 4?                          →  MCB
  5. Otherwise:                                                    →  category: "Unknown", confidence: "low"

═══════════════════════════════════════════════════════════════════
THREE-POLE CIRCUITS — ONE ENTRY, NOT THREE
═══════════════════════════════════════════════════════════════════
A 3-pole device (cooker, EV charger, motor, sub-main, immersion 3P, hot tub, etc.) is a SINGLE circuit that physically OCCUPIES 3 adjacent DIN-rail positions. You must emit it as ONE entry — never as three separate entries with two of them being "Spare".

How to recognise a 3-pole device:
  • A single moulded body that visibly spans 3 module widths.
  • OR: three adjacent single-pole devices LINKED at the toggle by a horizontal bar/yoke (mechanical linkage so they trip together).
  • OR: visible "3P" / "TPN" / "L1 L2 L3" markings on the device front.
  • OR: rating ≥ 16A on a board you have already determined is three-phase, with three terminals top and three bottom.

Output for a 3-pole circuit:
  {
    "index": <lowest physical way number it occupies>,
    "spans_ways": <number of DIN positions it occupies, usually 3>,
    "device": { "category": "MCB" | "RCBO" | "MCCB", "rating_amps": ..., "curve": ..., ... },
    "phase": "3P",
    "phase_assignment": ["L1","L2","L3"],
    "label_text": "<read the label, e.g. 'Cooker' / 'EV Charger' / 'Sub-main DB-2'>",
    "confidence": "high"
  }

NEVER emit two extra "Spare" rows for the second and third positions a 3P device occupies. Skip those positions entirely. The next emitted circuit's index should be (this_index + spans_ways).

WORKED EXAMPLE — a 12-way TPN board with one 3-pole cooker at ways 1-3:
  Wrong (do NOT do this):
    [{index:1, label:'Cooker', phase:'1P', phase_assignment:'L1'},
     {index:2, label:'Spare', device:null},
     {index:3, label:'Spare', device:null},
     ...]
  Right:
    [{index:1, spans_ways:3, label:'Cooker', phase:'3P', phase_assignment:['L1','L2','L3'], device:{category:'MCB', rating_amps:32, curve:'B'}},
     {index:4, spans_ways:1, label:'Lights L1', phase:'1P', phase_assignment:'L1', ...},
     ...]

═══════════════════════════════════════════════════════════════════
THREE-PHASE — DETECTION FROM MAIN SWITCH FIRST
═══════════════════════════════════════════════════════════════════
Determine three-phase ONLY from the main switch poles. This is the only reliable signal:

  • Main switch is 1P+N (2 terminals top, 2 terminals bottom)        →  is_three_phase: false
  • Main switch is 3P (3 terminals top, 3 terminals bottom)          →  is_three_phase: true
  • Main switch is 3P+N / 4P (4 terminals top, 4 terminals bottom)  →  is_three_phase: true
  • Visible "DANGER 400 VOLTS" or "400V" sticker confirms 3P, but is a CONFIRMATION only — never the trigger.

For three-phase boards:
  • board_layout: "3P-vertical" if 3 separate horizontal rows, one per phase
  • board_layout: "3P-horizontal" if a single row alternating L1, L2, L3
  • Phase assignment per circuit:
      - PRIMARY signal: a printed L1 / L2 / L3 / phase-colour strip directly next to the position. Read these — do not infer.
      - 3-pole device: phase: "3P", phase_assignment: ["L1","L2","L3"]
      - Single-pole device on 3P board: phase: "1P", phase_assignment determined by phase strip / row position
  • DO NOT mark a board three-phase based on row count or busy appearance alone.
  • Three single-pole devices linked by an external bridging bar = three SEPARATE 1P circuits sharing a busbar, NOT one 3P circuit.
  • A single moulded triple-pole body across 3 modules = ONE 3P circuit.

═══════════════════════════════════════════════════════════════════
PICTOGRAM LEGEND — read the icons under each way
═══════════════════════════════════════════════════════════════════
Most UK consumer units have a printed legend strip at the BOTTOM of the unit, beneath each DIN position, with a number and a small icon (pictogram) describing what the circuit feeds. This is gold — read it on every scan and use it to populate label_text and pictograms.

Common UK pictograms and what they mean:
  • Light bulb / hanging bulb           →  Lighting (label "Upstairs Lighting" / "Downstairs Lighting" / "Lighting" depending on row context)
  • Socket-outlet (rectangle with two pins)  →  Sockets / Ring final
  • Shower head (water droplets)         →  Shower
  • Cooker hob (4 rings)                 →  Cooker / Hob
  • Oven (rectangle with door)           →  Oven
  • Water heater (cylinder with element) →  Immersion heater / Water heater
  • Boiler / radiator                    →  Boiler / Central Heating
  • Smoke alarm (circle with waves)      →  Smoke detector
  • Garage / outbuilding (gable house)   →  Garage / Outbuilding / Garden / External
  • Car / EV symbol                      →  EV charger
  • Solar panel                          →  Solar PV
  • Fan                                  →  Extractor fan / HVAC
  • Spare (no icon, blank position)      →  Spare way

Above each pictogram a number is printed (1, 2, 3, 4, 5...) — this is the schedule-of-tests way number. Read these numbers and use them as the circuit "index". DO NOT guess or rely solely on left-to-right position when the legend numbers are visible.

When the legend says "1: Shower, 2: Sockets, 3: Lighting" but you see four MCBs (B40, B32, B6, blank), the mapping is:
  • Way 1 → B40 MCB → "Shower" (with shower pictogram)
  • Way 2 → B32 MCB → "Sockets" (with socket pictogram)
  • Way 3 → B6 MCB → "Lighting" (with bulb pictogram)
  • Way 4 → blank → "Spare"

For each circuit, populate the pictograms array:
  pictograms: [{"type": "SOCKET" | "LIGHTING" | "SHOWER" | "COOKER" | "HOB" | "OVEN" | "IMMERSION" | "BOILER" | "SMOKE_ALARM" | "GARAGE" | "EXTERNAL" | "EV_CHARGER" | "SOLAR" | "FAN" | "RING_MAIN" | "SPUR" | "UNKNOWN", "confidence": 0.0–1.0, "source": "legend" | "label" | "rating_inference"}]

If both the printed label AND the pictogram are visible, prefer the label and use the pictogram as confirmation. If they conflict, flag a warning and trust the pictogram (the label might be a leftover from a previous installation).

═══════════════════════════════════════════════════════════════════
COMMON BOARD ARCHITECTURES — recognise these patterns first
═══════════════════════════════════════════════════════════════════
  • Modern dual-RCD split-load (pre-2018): 100A main switch → two 30mA / 80A RCDs each feeding a bank of MCBs. The MCBs DOWNSTREAM of an RCD are MCBs (no I∆n on them) — do not look for I∆n on every device.
  • Modern all-RCBO board (post-A4:2018): 100A main switch → row of RCBOs (each circuit individually protected). Every "single-module" device in this layout is almost certainly an RCBO with I∆n 30mA.
  • All-AFDD board (A4:2026 onwards in HMOs/care homes): same as all-RCBO but with AFDD/RCBO combined units (RCBO body with electronic upper section).
  • High-integrity board: 100A main → one RCD over half + RCBOs over the other half.
  • Three-phase domestic / light-commercial DB: 3P+N main switch + a mix of 1P and 3P MCBs/RCBOs on a single chassis. Single-pole devices are 1P circuits assigned to L1/L2/L3 by row or printed phase strip.
  • Older fuse board (pre-2003): rewirable BS 3036 carriers, cartridge BS 1361 fuses, no RCDs. Use category "Fuse".

═══════════════════════════════════════════════════════════════════
COMMERCIAL & INDUSTRIAL THREE-PHASE — additional rules
═══════════════════════════════════════════════════════════════════
Commercial / industrial three-phase boards differ from domestic boards in scale and device families. Apply these rules in addition to the priorities above:

DEVICE CATEGORIES specific to industrial:
  • MCCB (Moulded Case Circuit Breaker): large rectangular breaker, ratings typically 32A–1600A, 3P or 4P, often with an adjustable thermal-trip dial on the face (Ir, Im) and a chunky toggle. Use category "MCCB". May have "ELCB" / "earth fault" trip module attached underneath for residual-current protection — record as i_delta_n_mA if visible.
  • Switch-fuse / fused isolator: rotary handle (often red) + fuse-holders (BS 88, BS 1361 cartridges). Use category "Isolator" with notes of fuse rating in label_text.
  • Air Circuit Breaker (ACB): very large draw-out unit (often the main incomer), 4P, 800A–6300A, with electronic trip unit. Use category "ACB" (or "MCCB" if space-constrained).
  • Motor protection device (MPCB / MPD): TeSys, Hager EBN, Schneider GV2/GV3 — short magnetic-only with thermal overload. Use category "MCCB" with notes "motor protection".
  • Star-delta starter / DOL starter / VSD / VFD: complete starter cell with contactors + overload + control module. Treat as ONE position with category "Starter".
  • Surge protection (commercial): T1 SPD with Iimp ≥ 12.5kA per pole (for buildings with external lightning protection). Identify T1, T2, T1+T2, T3 in board.spd_type.
  • CTs (current transformers) and metering: orange / amber rectangular blocks around busbars, NOT a circuit — record in evidence only.

THREE-PHASE LAYOUT TYPES (commercial/industrial):
  • TP&N panelboard (Hager Invicta, Schneider Acti9 IDPN, MK SX, Eaton xEnergy): 3P+N busbar trunking + plug-on MCBs/RCBOs. Layout 3P-horizontal — circuits alternate L1, L2, L3 down the column or across the row depending on bus orientation.
  • Free-standing distribution board (FSB): wall- or floor-mounted, transparent door, ratings 250A–800A main. Multiple stacked TP&N sections.
  • Switchboard / MCC (Motor Control Centre): cabinets with multiple compartments, each containing starters / breakers / control. Each compartment is a single "circuit" position; set label_text from the compartment door label.
  • Distribution pillar / sub-main board: fed from incoming cable, multiple outgoing MCCB ways for sub-distribution to other DBs. Outgoing devices are typically 3P MCCBs at 100A–400A.

PHASE ASSIGNMENT — commercial/industrial:
  • TP&N busbars are colour-coded in modern installations (UK harmonised): brown (L1), black (L2), grey (L3), blue (N). Older: red (L1), yellow (L2), blue (L3).
  • Industrial circuit charts often print L1/L2/L3 directly above each position. Read these.
  • Three-phase circuits to motors / VFDs / sub-mains: phase: "3P", phase_assignment: ["L1","L2","L3"]. Single-phase outgoing circuits (lighting, sockets) take one phase only.
  • Phase balance: the user/installer typically tries to balance 1P loads across L1/L2/L3 — circuits are commonly arranged in groups of 3 (one per phase).

INDICATOR / SENSING DEVICES (record but do NOT count as circuits):
  • Phase failure relay, neutral monitoring relay
  • Voltmeters, ammeters, Multifunction meters (MFM)
  • Phase rotation / sequence indicators
  • Pilot lights ("L1 healthy", "L2 healthy", "L3 healthy")
  Surface in the evidence field with a short note.

RATINGS to expect (commercial/industrial standard values):
  • MCB ratings: same as domestic plus 80, 100, 125, 160, 200, 250 — these are DIN-rail MCBs, not MCCBs.
  • MCCB ratings: 32, 63, 100, 125, 160, 200, 250, 400, 630, 800, 1000, 1250, 1600.
  • Main switch ratings: 100, 125, 160, 200, 250, 400, 630, 800, 1000, 1250 A.

═══════════════════════════════════════════════════════════════════
WHAT IS AND IS NOT A CIRCUIT — strict rules
═══════════════════════════════════════════════════════════════════
A "circuit" is an OUTGOING way that supplies a load (lighting, sockets, cooker, EV charger, etc.). The schedule of tests in the cert form lists ONLY outgoing circuits.

NEVER include these as circuits in the "circuits" array — they go in the BOARD object instead:
  • Main switch / main isolator (single-pole or multi-pole). Goes in board.main_switch_rating + main_switch_poles. Even if it has its own DIN-rail position, it is NOT a circuit.
  • Upstream RCD that protects a bank of MCBs / RCBOs (typical in split-load boards: 100A 30mA RCD feeding 5–6 MCBs). It is a PROTECTIVE DEVICE for the downstream bank, not an outgoing circuit. Surface in evidence on the affected MCBs only.
  • Surge Protection Device (SPD). Goes in board.spd_status + spd_type.
  • CTs, voltmeters, ammeters, phase failure relays, pilot lights, indicator modules. Surface in evidence only.
  • Time-switches and contactors that are switching devices for downstream MCBs (not the load itself). Use category "Other" with label "Time switch" or "Contactor" only when the device IS the outgoing way (e.g. directly feeds a heater).

DO include as circuits:
  • Every MCB, RCBO, AFDD, MCCB, fuse-link or starter that supplies a load.
  • Even spare positions (with label_text: "Spare" and device: null).

═══════════════════════════════════════════════════════════════════
WHICH SIDE IS THE MAIN SWITCH ON?
═══════════════════════════════════════════════════════════════════
Always identify which physical side the main switch sits on and surface it in board.main_switch_side ("left" or "right").
This drives circuit numbering in the schedule of tests:
  • main_switch_side: "left" → outgoing circuits are typically numbered left-to-right starting at the position next to the main switch.
  • main_switch_side: "right" → outgoing circuits are numbered right-to-left starting at the position next to the main switch.

Set the index field on each circuit to match the schedule numbering convention (closest to the main switch = index 1, working away from it).

═══════════════════════════════════════════════════════════════════
SCANNING METHOD — DO NOT MISS POSITIONS
═══════════════════════════════════════════════════════════════════
1. FIRST: locate the legend strip at the bottom of the unit. Count the printed way numbers. This tells you the total way count. A "10-way" board has positions 1 through 10 in the legend, even if only 6 are populated with devices.

2. SECOND: read every legend number left-to-right (or right-to-left, follow the printed direction). For each, identify what is in the matching DIN position above:
   • A device (MCB, RCBO, RCD, AFDD, etc.)?
   • An upstream RCD that protects the bank to its right?
   • A blank cover plate?
   • A main switch?

3. THIRD: emit ONE entry per legend way number, in the order they appear in the legend. For populated ways, include the device. For blank ways, include label_text: "Spare", device: null. For RCD positions that are NOT outgoing circuits, still emit an entry so the way numbering stays aligned with the physical board (but mark category: "RCD" and the user can decide whether to keep it on the schedule).

4. CRITICAL: do NOT skip way 1 or way N. Every printed legend number MUST have a corresponding circuit entry. If you can't see the device above a legend number (e.g. the photo is cropped), emit an entry with confidence: "low" and label_text: "[?]" rather than skipping it.

5. Be exhaustive: emit one entry per device + one entry per blank/spare position. If you cannot clearly read a position, emit Spare with confidence "low".

6. If a DIN position is genuinely blank (no device, just a cover plate), emit it as { label_text: "Spare", device: null }. Don't omit blank positions — they are part of the layout.
1. Count every DIN rail position from left to right (and across rows for multi-row boards).
2. Identify each position as: device | spare | main switch | SPD.
3. Apply the decision rule above to each device.
4. Read every printed label exactly. Expand common UK abbreviations:
   K/Kit→Kitchen, Lts/Lgt→Lights, Skt/Soc→Sockets, Dn→Downstairs, Up→Upstairs,
   FF→First Floor, GF→Ground Floor, Ext→External, Gar→Garage, Util→Utility,
   Smk→Smoke detectors, Imm→Immersion, CH→Central heating, Blr→Boiler,
   WM→Washing machine, DW→Dishwasher, TD→Tumble dryer, Shwr→Shower,
   Ckr→Cooker, Ring→Ring final, FCU→Fused spur. Suffix [?] only when genuinely unclear.
5. ratings_amps must be ONE of: 6, 10, 13, 16, 20, 25, 32, 40, 45, 50, 63, 80, 100, 125. If unreadable, null.
6. curve is the prefix letter B / C / D before the rating. If absent, null.
7. Confidence: "high" if I∆n or model prefix gave a definitive answer. "medium" if Priority 3 or 4 carried it. "low" if any conflict between signals or you had to guess.

═══════════════════════════════════════════════════════════════════
OUTPUT — strict JSON, this exact shape
═══════════════════════════════════════════════════════════════════
{
  "board": {
    "brand": "Hager | MK | Schneider | Wylex | Crabtree | Contactum | BG | Lewden | Fusebox | Other | Unknown",
    "model": "string or null",
    "main_switch_rating": number,
    "main_switch_poles": "1P+N | 3P | 3P+N | 4P",
    "main_switch_side": "left | right | unknown",
    "is_three_phase": boolean,
    "architecture": "all_rcbo | dual_rcd_split_load | high_integrity | all_afdd | fuse_board | three_phase_db | tpn_panelboard | mcc_switchboard | distribution_pillar | unknown",
    "spd_status": "present | not_present | unknown",
    "spd_type": "T1 | T2 | T1+T2 | T3 | unknown",
    "board_layout": "single_row | dual_row | 3P-vertical | 3P-horizontal",
    "estimated_total_ways": number,
    "circuits_per_phase": { "L1": number, "L2": number, "L3": number }   // only for 3P boards
  },
  "circuits": [
    {
      "index": number,                                // lowest physical way number occupied
      "spans_ways": number,                            // 1 for 1P circuits, 3 for 3P circuits, etc.
      "label_text": "string — expanded UK abbreviations, [?] suffix for unclear",
      "device": {
        "category": "MCB | RCBO | RCD | AFDD | Isolator | Fuse | MCCB | ACB | Starter | Other | Unknown",
        "rating_amps": number | null,
        "curve": "B | C | D" | null,
        "type": "string e.g. B16",
        "rcd_type": "AC | A | F | B" | null,         // only for RCBO/RCD/AFDD
        "i_delta_n_mA": number | null,                  // only for RCBO/RCD/AFDD, e.g. 30, 100, 300
        "breaking_capacity_kA": number | null,          // e.g. 6, 10 — read from device face if visible
        "model_code": "string or null"                   // exact model code if readable, e.g. "ADA306G"
      },
      "phase": "1P | 3P",
      "phase_assignment": "L1" | "L2" | "L3" | ["L1","L2","L3"] | null,
      "confidence": "high | medium | low",
      "evidence": "string — which Priority rule decided this and what was visible"
    }
  ]
}

Always include spares as { label_text: "Spare", device: null, confidence: "high" }.

OUTPUT ORDER (CRITICAL FOR STREAMING):
You MUST emit the "board" object FIRST, fully closed, before opening "circuits".
Inside circuits, emit each object in order from index 1 upward, fully closed before moving to the next.
This lets the front-end fill in the schedule of tests live as you read.

Return JSON only. No prose, no markdown fences.`;

// ============================================================================
// VALIDATION PROMPT - Second pass for uncertain circuits
// ============================================================================

const VALIDATION_PROMPT = `You are a UK electrical expert reviewing a board reading. The image is the same board you saw before. For each provided circuit, look again at that position and apply the decision rule:

1. I∆n / mA / residual-current symbol present?  →  RCBO (1-module) or RCD (2-module). NEVER an MCB.
2. Model code prefix (Hager ADA*, MK RCB*, Schneider A9D*, Wylex NM*, Crabtree AB60*, etc.)?  →  use the prefix.
3. Top terminals labelled "L OUT  N"?  →  RCBO.
4. Otherwise →  visual heuristic.

Common errors to fix:
  • Hager ADA* / AD* misclassified as MCB — they are ALWAYS RCBOs (the ADA series is RCBO).
  • Devices showing "I∆n 0.03 A" labelled as MCB — they are RCBOs/RCDs.
  • Curve letter (B/C/D) confused with RCD type letter (AC/A/F/B). The curve sits before the amp rating, the RCD type appears with a residual-current symbol.

For each circuit, return either:
  • status: "confirmed"   — current detection holds
  • status: "corrected"   — provide fixed device_category / rating_amps / curve / label_text and a short evidence string explaining which Priority rule applied.

Return JSON:
{
  "validations": [
    {
      "index": number,
      "status": "confirmed" | "corrected",
      "corrections": {
        "device_category": "MCB | RCBO | RCD | AFDD | Isolator | Fuse",
        "rating_amps": number,
        "curve": "B | C | D",
        "label_text": "string",
        "rcd_type": "AC | A | F | B",
        "i_delta_n_mA": number
      },
      "evidence": "string"
    }
  ]
}`;

// ============================================================================
// UTILITIES
// ============================================================================

const parseAIResponse = (content: string, context: string = 'AI response'): any => {
  if (!content || content.trim() === '') {
    throw new Error(`${context} is empty`);
  }

  try {
    return JSON.parse(content);
  } catch {
    // Continue with extraction
  }

  const patterns = [/```json\s*\n([\s\S]*?)\n```/, /```\s*\n([\s\S]*?)\n```/, /({[\s\S]*})/];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      try {
        return JSON.parse((match[1] || match[0]).trim());
      } catch {
        continue;
      }
    }
  }

  throw new Error(`Could not parse ${context} as JSON`);
};

/**
 * Find the closing brace of an object that starts at `openIdx` in `raw`.
 * Respects strings and escapes. Returns -1 if unclosed yet.
 */
function findMatchingClose(raw: string, openIdx: number): number {
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = openIdx; i < raw.length; i++) {
    const ch = raw[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (inString) {
      if (ch === '\\') escape = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/**
 * Pull the `"board"` object from a partial JSON stream as soon as it closes.
 */
function extractBoardObject(raw: string): any | null {
  const key = '"board"';
  const keyIdx = raw.indexOf(key);
  if (keyIdx < 0) return null;
  const colonIdx = raw.indexOf(':', keyIdx);
  if (colonIdx < 0) return null;
  const openIdx = raw.indexOf('{', colonIdx);
  if (openIdx < 0) return null;
  const closeIdx = findMatchingClose(raw, openIdx);
  if (closeIdx < 0) return null;
  try {
    return JSON.parse(raw.slice(openIdx, closeIdx + 1));
  } catch {
    return null;
  }
}

/**
 * Pull every newly-complete circuit object from inside the `"circuits"` array.
 * Skips any whose `index` is already in `emitted`.
 */
function extractCompleteCircuits(raw: string, emitted: Set<number>): any[] {
  const key = '"circuits"';
  const keyIdx = raw.indexOf(key);
  if (keyIdx < 0) return [];
  const colonIdx = raw.indexOf(':', keyIdx);
  if (colonIdx < 0) return [];
  const arrayIdx = raw.indexOf('[', colonIdx);
  if (arrayIdx < 0) return [];

  const out: any[] = [];
  let cursor = arrayIdx + 1;
  while (cursor < raw.length) {
    // skip whitespace and commas
    while (cursor < raw.length && /[\s,]/.test(raw[cursor])) cursor++;
    if (cursor >= raw.length) break;
    if (raw[cursor] === ']') break;
    if (raw[cursor] !== '{') break;
    const closeIdx = findMatchingClose(raw, cursor);
    if (closeIdx < 0) break; // partial — wait for more chunks
    try {
      const obj = JSON.parse(raw.slice(cursor, closeIdx + 1));
      if (typeof obj.index === 'number' && !emitted.has(obj.index)) {
        out.push(obj);
      }
    } catch {
      // unparseable — bail and let final pass handle it
      break;
    }
    cursor = closeIdx + 1;
  }
  return out;
}

async function urlToBase64(url: string): Promise<{ mimeType: string; data: string }> {
  // Handle data URLs
  if (url.startsWith('data:')) {
    const match = url.match(/^data:([^;]+);base64,(.+)$/);
    if (match) {
      return { mimeType: match[1], data: match[2] };
    }
    throw new Error('Invalid data URL format');
  }

  // Fetch external URLs
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const base64 = base64Encode(new Uint8Array(arrayBuffer));
  const contentType = response.headers.get('content-type') || 'image/jpeg';

  return { mimeType: contentType, data: base64 };
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function createSSEStream(): {
  stream: ReadableStream;
  sendEvent: (event: StreamEvent) => void;
  close: () => void;
} {
  let controller: ReadableStreamDefaultController<Uint8Array>;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(c) {
      controller = c;
    },
  });

  const sendEvent = (event: StreamEvent) => {
    const data = `data: ${JSON.stringify(event)}\n\n`;
    controller.enqueue(encoder.encode(data));
  };

  const close = () => {
    controller.close();
  };

  return { stream, sendEvent, close };
}

// ============================================================================
// MAIN ANALYSIS - Single Gemini Call
// ============================================================================

async function analyzeWithGemini(
  images: string[],
  hints: BoardReadRequest['hints'],
  sendEvent: (event: StreamEvent) => void
): Promise<{
  board: Partial<BoardStructure>;
  circuits: Partial<DetectedCircuit>[];
}> {
  sendEvent({ type: 'stage', stage: 'analyzing', message: 'Analysing board with AI...' });

  // Build prompt with hints
  let prompt = UNIFIED_BOARD_PROMPT;

  if (hints) {
    prompt += `\n\n## HINTS FROM USER
- Main switch side: ${hints.main_switch_side || 'not specified'}
- Expected ways: ${hints.expected_ways || 'not specified'}
- Board type: ${hints.board_type || 'domestic'}
- Is three phase: ${hints.is_three_phase === true ? 'YES - look for L1/L2/L3' : hints.is_three_phase === false ? 'NO - single phase' : 'not specified'}`;
  }

  // Prepare image parts
  const parts: any[] = [{ text: prompt }];

  for (const imageUrl of images.slice(0, 4)) {
    try {
      const { mimeType, data } = await urlToBase64(imageUrl);
      parts.push({ inlineData: { mimeType, data } });
    } catch (error) {
      console.error('Failed to process image:', error);
      sendEvent({ type: 'warning', message: `Could not process one image` });
    }
  }

  if (parts.length < 2) {
    throw new Error('No valid images to analyse');
  }

  sendEvent({ type: 'stage', stage: 'analyzing', message: 'Reading board.' });

  // ── True token-level streaming via Gemini's streamGenerateContent SSE ──
  // We accumulate the JSON as Gemini types it, parse the board object as soon
  // as it lands, and emit each circuit object the moment its closing brace
  // arrives. This makes the UI feel like a schedule of tests filling itself
  // in live.
  const response = await fetchWithTimeout(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${geminiApiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts }],
        generationConfig: {
          maxOutputTokens: 16000,
          temperature: 0.1,
          responseMimeType: 'application/json',
          // Disable Gemini's extended-thinking phase. Cuts first-token latency
          // from ~10–30s to ~1–3s on Flash. Vision OCR with a strict prompt
          // doesn't need a reasoning preamble.
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    },
    150000
  );

  if (!response.ok || !response.body) {
    const errorText = response.body ? await response.text() : '(no body)';
    console.error('[board-read-stream] Gemini stream error:', response.status, errorText);
    // Retry once with the non-streaming endpoint as a safety net.
    sendEvent({
      type: 'stage',
      stage: 'analyzing',
      message: 'Retrying with stable endpoint…',
    });
    const fallback = await fetchWithTimeout(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts }],
          generationConfig: {
            maxOutputTokens: 16000,
            temperature: 0.1,
            responseMimeType: 'application/json',
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      },
      120000
    );
    if (!fallback.ok) {
      throw new Error(`Gemini analysis failed (${response.status}/${fallback.status})`);
    }
    const data = await fallback.json();
    const text =
      data.candidates?.[0]?.content?.parts?.find((p: any) => p.text)?.text || '';
    const parsed = parseAIResponse(text, 'Board analysis (fallback)');
    if (parsed.board) {
      sendEvent({ type: 'board', data: parsed.board });
    }
    if (Array.isArray(parsed.circuits)) {
      sendEvent({
        type: 'circuits_batch',
        circuits: parsed.circuits.map((c: any) => ({ ...c, source_model: 'gemini-2.5-flash' })),
      });
    }
    return {
      board: parsed.board || {},
      circuits: (parsed.circuits || []).map((c: any) => ({ ...c, source_model: 'gemini-2.5-flash' })),
    };
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let raw = '';
  let buffer = '';
  let boardEmitted = false;
  const emittedIndices = new Set<number>();
  const circuits: any[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const data = line.startsWith('data: ') ? line.slice(6).trim() : null;
      if (!data) continue;
      try {
        const chunk = JSON.parse(data);
        const text = chunk.candidates?.[0]?.content?.parts
          ?.map((p: any) => p.text || '')
          .join('') || '';
        if (!text) continue;
        raw += text;

        // 1. Try to extract the board object the moment it closes.
        if (!boardEmitted) {
          const boardObj = extractBoardObject(raw);
          if (boardObj) {
            boardEmitted = true;
            sendEvent({ type: 'board', data: boardObj });
            const phaseType = boardObj.is_three_phase ? 'three-phase' : 'single-phase';
            sendEvent({
              type: 'decision',
              message: `${boardObj.brand || 'Board'} · ${phaseType} · ${boardObj.estimated_total_ways || '?'} way`,
            });
          }
        }

        // 2. Extract any newly-complete circuit objects.
        const newCircuits = extractCompleteCircuits(raw, emittedIndices);
        if (newCircuits.length > 0) {
          for (const c of newCircuits) {
            if (typeof c.index === 'number') emittedIndices.add(c.index);
            circuits.push(c);
          }
          sendEvent({
            type: 'circuits_batch',
            circuits: newCircuits.map((c) => ({ ...c, source_model: 'gemini-2.5-flash' })),
          });
        }
      } catch {
        // partial chunk — keep streaming
      }
    }
  }

  // Final pass — if Gemini closed without emitting a clean board object, parse
  // the full raw text as a fallback so we don't lose data.
  let result: any;
  try {
    result = parseAIResponse(raw, 'Board analysis');
  } catch (err) {
    await captureException(err, { functionName: 'board-read-stream', requestUrl: req.url, requestMethod: req.method });
    console.error('[board-read-stream] Parse failed.', {
      rawLength: raw.length,
      preview: raw.slice(0, 500),
      tail: raw.slice(-500),
      boardEmitted,
      circuitsExtracted: circuits.length,
    });
    if (boardEmitted && circuits.length > 0) {
      // We salvaged at least the board + some circuits during streaming.
      result = { board: extractBoardObject(raw) || {}, circuits };
    } else if (circuits.length > 0) {
      // Got circuits but no full board. Return what we have rather than fail.
      result = { board: extractBoardObject(raw) || {}, circuits };
    } else {
      // Nothing usable. Surface a useful error message that includes a tiny
      // preview of what Gemini produced so we can debug without redeploying.
      const previewMsg = raw.length === 0
        ? 'No response from AI'
        : `Gemini returned text the parser could not read (${raw.length} chars). Try retaking the photo with better lighting.`;
      throw new Error(previewMsg);
    }
  }

  // Backfill any circuits that didn't make it through the streaming parser.
  if (Array.isArray(result.circuits)) {
    for (const c of result.circuits) {
      if (typeof c.index === 'number' && !emittedIndices.has(c.index)) {
        emittedIndices.add(c.index);
        circuits.push(c);
        sendEvent({
          type: 'circuits_batch',
          circuits: [{ ...c, source_model: 'gemini-2.5-flash' }],
        });
      }
    }
  }
  if (!boardEmitted && result.board) {
    sendEvent({ type: 'board', data: result.board });
  }

  // ────────────────────────────────────────────────────────────────────────
  // Deterministic 3P-coalescing pass.
  // The model still occasionally emits a 3-pole circuit as: one 1P at L1,
  // followed by two "Spare" rows at L2 and L3. Catch that pattern and merge
  // them into a single 3P circuit spanning 3 ways.
  //
  // Match: any 1P circuit at index N with phase_assignment 'L1', immediately
  //        followed by a circuit at N+1 (Spare or empty device, phase 'L2')
  //        and a circuit at N+2 (Spare or empty device, phase 'L3').
  // ────────────────────────────────────────────────────────────────────────
  function isSpareLike(c: any): boolean {
    if (!c) return false;
    if (!c.device) return true;
    const cat = (c.device?.category || '').toLowerCase();
    if (cat === 'spare' || cat === '' || cat === 'unknown') return true;
    if ((c.label_text || '').toLowerCase().trim() === 'spare') return true;
    return false;
  }
  function getPhaseAssignment(c: any): string {
    const pa = c.phase_assignment;
    if (Array.isArray(pa)) return pa.join(',');
    return typeof pa === 'string' ? pa : '';
  }

  const coalesced: any[] = [];
  const skipIndices = new Set<number>();
  const sortedCircuits = [...circuits].sort(
    (a, b) => (a.index ?? 0) - (b.index ?? 0)
  );

  for (const circuit of sortedCircuits) {
    if (skipIndices.has(circuit.index)) continue;

    const phase = circuit.phase;
    const phaseAssign = getPhaseAssignment(circuit);
    const isOnePoleAtL1 = phase === '1P' && phaseAssign === 'L1';

    if (isOnePoleAtL1 && circuit.device && !isSpareLike(circuit)) {
      const next1 = sortedCircuits.find((c) => c.index === circuit.index + 1);
      const next2 = sortedCircuits.find((c) => c.index === circuit.index + 2);
      const next1Phase = next1 ? getPhaseAssignment(next1) : '';
      const next2Phase = next2 ? getPhaseAssignment(next2) : '';

      if (
        next1 &&
        next2 &&
        isSpareLike(next1) &&
        isSpareLike(next2) &&
        (next1Phase === 'L2' || next1Phase === '') &&
        (next2Phase === 'L3' || next2Phase === '')
      ) {
        // Merge into a single 3P circuit
        coalesced.push({
          ...circuit,
          phase: '3P',
          phase_assignment: ['L1', 'L2', 'L3'],
          spans_ways: 3,
          evidence:
            (circuit.evidence || '') +
            ' [Coalesced: model emitted L1+spare L2+spare L3 — merged to 3P]',
        });
        skipIndices.add(next1.index);
        skipIndices.add(next2.index);
        continue;
      }
    }

    // Default: pass through
    coalesced.push({
      ...circuit,
      spans_ways: circuit.spans_ways ?? (circuit.phase === '3P' ? 3 : 1),
    });
  }

  // Replace the local circuits array with the coalesced version, AND tell the
  // front-end about it via circuit_update events so the UI re-renders.
  circuits.length = 0;
  circuits.push(...coalesced);

  // If we coalesced anything, drop the absorbed rows from the UI and update
  // the surviving 3P rows with their new phase + span info.
  if (skipIndices.size > 0) {
    sendEvent({
      type: 'decision',
      message: `Merged ${skipIndices.size / 2} three-pole circuit(s) the AI split into single phases.`,
    });
    for (const removeIdx of skipIndices) {
      sendEvent({ type: 'circuit_remove', index: removeIdx });
    }
    for (const c of coalesced) {
      if (c.phase === '3P') {
        sendEvent({
          type: 'circuit_update',
          index: c.index,
          updates: c,
        });
      }
    }
  }

  // ────────────────────────────────────────────────────────────────────────
  // Tag non-circuit positions (upstream RCDs, main switch, SPDs).
  // They stay in the layout for visual confirmation but they are NOT ways —
  // ways are circuits and spares only. The front-end renders them as faint
  // "infrastructure" rows with no way number, and the apply-to-schedule step
  // filters them out and renumbers the actual ways sequentially.
  // Surface RCD presence on the board metadata so the cert knows about
  // split-load RCD protection.
  // ────────────────────────────────────────────────────────────────────────
  const isInfrastructure = (c: any): boolean => {
    const cat = (c.device?.category || '').toLowerCase();
    const rating = c.device?.rating_amps ?? 0;
    const label = (c.label_text || '').toLowerCase().trim();
    const iDeltaN = c.device?.i_delta_n_mA ?? 0;

    if (cat === 'rcd' && rating >= 63) return true; // upstream split-load RCD
    if (cat === 'isolator') return true; // main switch / isolator
    if (cat === 'acb') return true;
    // Catch-all: any device with I∆n marking AND a rating ≥63A is almost
    // certainly an upstream RCD even if the model labelled it MCB/RCBO/Spare.
    if (iDeltaN > 0 && rating >= 63) return true;
    if (
      label === 'main switch' ||
      label === 'main isolator' ||
      label === 'main' ||
      label === 'incomer' ||
      /^rcd\s*\d*$/i.test(label) // "RCD", "RCD 1", "RCD 2"
    ) {
      return true;
    }
    return false;
  };

  const tagged = circuits.map((c) => ({ ...c, is_infrastructure: isInfrastructure(c) }));
  const infraCount = tagged.filter((c) => c.is_infrastructure).length;
  const wayCount = tagged.filter((c) => !c.is_infrastructure).length;

  // Update board metadata
  if (infraCount > 0 && result.board) {
    const upstreamRcdCount = tagged.filter(
      (c) =>
        c.is_infrastructure && (c.device?.category || '').toLowerCase() === 'rcd'
    ).length;
    result.board.upstream_rcd_count = upstreamRcdCount;
    result.board.has_split_load_rcd = upstreamRcdCount > 0;
  }

  // Replace the working list with the tagged version. Front-end gets the
  // is_infrastructure flag and renders accordingly.
  circuits.length = 0;
  circuits.push(...tagged);

  if (infraCount > 0) {
    sendEvent({
      type: 'decision',
      message: `${wayCount} way${wayCount === 1 ? '' : 's'} (${infraCount} infrastructure position${infraCount === 1 ? '' : 's'} held separately).`,
    });
    // Push updates so existing streamed rows pick up the is_infrastructure flag
    for (const c of tagged) {
      sendEvent({
        type: 'circuit_update',
        index: c.index,
        updates: c,
      });
    }
  }

  // Summary
  const highConfidence = circuits.filter((c: any) => c.confidence === 'high').length;
  const threePhaseCircuits = circuits.filter((c: any) => c.phase === '3P').length;
  const estimatedWays = result.board?.estimated_total_ways || 0;

  let summary = `Found ${circuits.length} circuits (${highConfidence} high confidence)`;
  if (threePhaseCircuits > 0) {
    summary += `, ${threePhaseCircuits} three-phase`;
  }

  sendEvent({ type: 'decision', message: summary });

  // Warn if circuit count doesn't match board size — be aggressive here so the
  // user notices and can add the missing ways manually.
  const wayCircuits = circuits.filter((c: any) => !c.is_infrastructure).length;
  if (estimatedWays > 0 && wayCircuits < estimatedWays) {
    const missing = estimatedWays - wayCircuits;
    sendEvent({
      type: 'warning',
      message: `Board reads as ${estimatedWays}-way but only ${wayCircuits} ${wayCircuits === 1 ? 'way' : 'ways'} detected. Tap "Add way" at the bottom to add the missing ${missing}.`,
    });
  }

  return {
    board: result.board || {},
    circuits: circuits.map((c: any) => ({ ...c, source_model: 'gemini-2.5-flash' })),
  };
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

serve(async (req) => {
  console.log('board-read-stream | Simplified single-model analysis | ' + new Date().toISOString());

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  const { stream, sendEvent, close } = createSSEStream();

  // Start processing in background
  (async () => {
    try {
      const { images, hints }: BoardReadRequest = await req.json();

      if (!images || images.length === 0) {
        sendEvent({ type: 'error', message: 'At least one image is required' });
        close();
        return;
      }

      if (!geminiApiKey) {
        sendEvent({ type: 'error', message: 'Gemini API key not configured' });
        close();
        return;
      }

      sendEvent({
        type: 'stage',
        stage: 'connecting',
        message: `Processing ${images.length} image(s)...`,
      });

      // Single comprehensive Gemini analysis
      const result = await analyzeWithGemini(images, hints, sendEvent);

      // Send completion
      sendEvent({
        type: 'complete',
        metadata: {
          analysisTime: Date.now() - startTime,
          model: 'gemini-2.5-flash',
          imageCount: images.length,
          circuitCount: result.circuits.length,
          boardSize: result.board.estimated_total_ways || result.circuits.length,
          isThreePhase: result.board.is_three_phase || false,
        },
      });
    } catch (error) {
      console.error('Stream error:', error);
      sendEvent({
        type: 'error',
        message: error instanceof Error ? error.message : 'Analysis failed',
      });
    } finally {
      close();
    }
  })();

  // Return streaming response immediately
  return new Response(stream, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
});
