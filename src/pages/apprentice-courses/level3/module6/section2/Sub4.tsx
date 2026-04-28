/**
 * Module 6 · Section 2 · Subsection 4 — Commercial load assessment worked end-to-end
 * Maps to C&G 2365-03 / Unit 305 / LO2 / AC 2.5
 *   AC 2.5 — "Determine the maximum demand and design current of three-phase commercial installations"
 *
 * Layered depth: 2366-03 Unit 304 / AC 2.4; 5393-03 Unit 104 / AC 2.4
 *
 * Small commercial fit-out — 320 m² mixed-use unit (kitchen + retail + office)
 * with three-phase 100 A service. Per-circuit Ib, sub-main coincidence,
 * origin coincidence, balanced-phase distribution and the design pack output.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Commercial load assessment (2.5) | Level 3 Module 6.2.4 | Elec-Mate';
const DESCRIPTION =
  "Three-phase commercial fit-out load assessment. 320 m² mixed-use unit with kitchen, retail and office. GN1 Section 7 categories, sub-main and origin coincidence, balanced-phase distribution, and the design pack output ready for the DNO connection application.";

const checks = [
  {
    id: 'three-phase-conv',
    question:
      "A three-phase 400 V load of 30 kW (balanced) draws what line current?",
    options: [
      "30 A — same as single-phase.",
      "I = P / (√3 × VL × pf) = 30000 / (1.732 × 400 × 1.0) = 43.3 A per line.",
      "75 A.",
      "130 A.",
    ],
    correctIndex: 1,
    explanation:
      "Three-phase balanced load formula: I = P / (√3 × VL × pf), where VL = 400 V line-to-line. At unity power factor: I = 30000 / (1.732 × 400) = 43.3 A per line. At pf 0.85 (typical for mixed loads with motors): I = 30000 / (1.732 × 400 × 0.85) = 51 A per line. Always use the realistic power factor for the load mix; small commercial typically 0.85-0.95.",
  },
  {
    id: 'category-coincidence',
    question:
      "A small commercial DB feeds: cooking 35 A, refrigeration 18 A, lighting 14 A, ring finals 22 A combined, AV 8 A. Sum = 97 A. Sub-main coincidence factor for a single-tenant commercial DB feeding correlated load categories is typically:",
    options: [
      "1.0 — no smoothing inside one tenant.",
      "0.85-0.95 — categories overlap heavily during operating hours (cooking + refrigeration + lighting all on at lunch service); only AV is independent.",
      "0.5.",
      "0.3.",
    ],
    correctIndex: 1,
    explanation:
      "Inside a single commercial tenant, the categories are highly correlated to operating hours — cooking peaks at service times when lighting and refrigeration are also running. Sub-main coincidence stays high (0.85-0.95). Multi-tenant commercial buildings get lower coincidence at origin because tenants stagger hours. For a single tenant, treat the sub-main as near-100 percent of the sum of category Ib values.",
  },
  {
    id: 'phase-balance',
    question:
      "A 100 A three-phase service (300 A total across three phases). The cafe sub-main needs 75 A. The retail sub-main needs 18 A. The office sub-main needs 22 A. What is the right phase distribution?",
    options: [
      "All loads on L1.",
      "Distribute across L1, L2, L3 to balance — e.g. cafe split across two phases (37 + 38 A), retail on L3 (18 A) plus office on L3 (22 A) = 40 A on L3. Phase loads: L1 ~40 A, L2 ~37 A, L3 ~40 A. Imbalance under 10 percent acceptable.",
      "All loads on L3.",
      "It does not matter how phases are loaded.",
    ],
    correctIndex: 1,
    explanation:
      "Three-phase services depend on balanced loading to be efficient. Heavy imbalance (e.g. 80 A on one phase, 5 A on the other two) wastes the service rating and overloads the heaviest phase. Aim for under 10 percent imbalance. Cooking equipment, lighting, sockets and HVAC should be allocated across all three phases. Single-phase loads (small kitchens, lighting circuits) get distributed in rotation. The design pack should show the per-phase load and the imbalance percentage.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Three-phase line current formula for a balanced load:',
    options: [
      'I = P / V',
      'I = P / (√3 × VL × pf)',
      'I = V / R',
      'I = P × V',
    ],
    correctAnswer: 1,
    explanation:
      "Three-phase balanced: I = P / (√3 × VL × pf), where VL = line-to-line voltage (400 V in UK), pf = power factor. Single-phase: I = P / (V × pf). Always check whether the kW figure is the active power (kW) or apparent power (kVA); the formulas are different.",
  },
  {
    id: 2,
    question: 'Power factor for a typical small commercial mixed load (lighting + sockets + small motors + IT) is approximately:',
    options: ['1.0', '0.85-0.95', '0.5', '0.2'],
    correctAnswer: 1,
    explanation:
      "Typical small commercial mixed load: lighting (LED ~0.95), socket loads (typically 0.95-1.0 for IT, 0.85 with motors and HVAC), kitchen (0.85-0.95). Aggregate is usually 0.85-0.95. Heavy motor or welding load drops to 0.7-0.85; pure IT load with PFC PSUs hits 0.95+. Use realistic pf for the load mix; default to 0.9 if unsure.",
  },
  {
    id: 3,
    question: 'GN1 Section 7 office socket diversity is typically:',
    options: [
      '100 percent.',
      '50-65 percent of the socket-circuit nameplate aggregate, depending on equipment mix.',
      '20 percent.',
      'No diversity allowed.',
    ],
    correctAnswer: 1,
    explanation:
      "Office socket loads run at 50-65 percent of nameplate aggregate for typical knowledge work — laptops 30-65 W, monitors 30-50 W, no printer per desk, occasional kettle. Heavy-use spaces (workshops, labs) higher; light-use (boardrooms, occasional meeting rooms) lower. GN1 has worked examples; cite the specific entry in the design pack.",
  },
  {
    id: 4,
    question: 'A commercial kitchen with three induction hobs (7 kW each), 5 kW combination oven, 3 kW dishwasher, 8 kW refrigeration. Sub-main Ib at 400 V three-phase (assume balanced):',
    options: [
      'Sum / 230 = ~165 A.',
      'Apply category diversity (cooking 70-80 percent for high-coincidence service times, refrigeration 100 percent, dishwasher 100 percent), sum the diversified kW (~30 kW), divide by (1.732 × 400 × 0.9 pf) = ~48 A per line.',
      '8 A per line.',
      '300 A per line.',
    ],
    correctAnswer: 1,
    explanation:
      "Kitchen diversity: cooking 21 + 21 + 21 × 0.75 = 47 kW × 0.75 = 35 kW, refrigeration 8 kW (100 percent), oven 5 kW (100 percent), dishwasher 3 kW (100 percent). Sum diversified ~22 kW (cooking lower than nameplate sum). At 400 V three-phase pf 0.9: I = 22000 / (1.732 × 400 × 0.9) = 35 A per line. Working answer in the 35-50 A range depending on assumed cooking diversity. Check against actual menu and service pattern.",
  },
  {
    id: 5,
    question: 'For a multi-tenant commercial building (5 retail units), the origin coincidence factor is typically:',
    options: [
      '1.0 (no smoothing).',
      'Around 0.7-0.85 — tenants have similar opening hours so peaks largely align, but small variations (different trading hours, different load mix) reduce the perfect-coincidence figure.',
      '0.3.',
      'Same as a single dwelling.',
    ],
    correctAnswer: 1,
    explanation:
      "Multi-tenant retail with similar trading hours (e.g. shopping centre, retail parade) gets 0.7-0.85 origin coincidence — better than single-tenant (0.85-0.95) because tenant load mix varies, but worse than mixed-use (0.5-0.7) where tenants have very different operating patterns. GN1 has worked examples per use class.",
  },
  {
    id: 6,
    question: 'Phase imbalance on a three-phase commercial installation should ideally be:',
    options: [
      'Whatever the install allows.',
      'Under 10 percent of the average phase load — e.g. if average is 50 A, no phase should be below 45 A or above 55 A. Heavy imbalance wastes service rating and overloads the heaviest phase.',
      '50 percent imbalance is fine.',
      'All load on one phase is acceptable.',
    ],
    correctAnswer: 1,
    explanation:
      "Three-phase service rating assumes balanced load. Heavy imbalance overloads the heaviest phase before the others reach their share. Industry target is under 10 percent imbalance. Distribute single-phase loads in rotation; balance heavy single-phase items (cookers, EV chargers) across phases; show the per-phase load on the design pack and target sub-10-percent imbalance.",
  },
  {
    id: 7,
    question: 'Reg 132.3 (Nature of demand) requires the designer to consider:',
    options: [
      'Only the peak demand.',
      'The locations of points of demand, the loads expected on circuits, daily and yearly variation of demand, special conditions (such as harmonics), and special control or signalling requirements.',
      "The customer's budget.",
      'Only the connected load.',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 132.3 makes the demand profile a discrete design consideration. Daily and yearly variation drives the diversity calc. Special conditions like harmonics matter for IT and inverter loads — they raise apparent power above active power. Document the demand profile assumptions in the design pack alongside the diversity factors.",
  },
  {
    id: 8,
    question: 'For a commercial design pack, the diversity calc page should show per category, per sub-main and per origin:',
    options: [
      'Just the final supply Ib.',
      'Connected load, diversity factor with source citation, category Ib, sub-main coincidence with source, sub-main Ib, origin coincidence with source, origin Ib, per-phase distribution, phase imbalance percent, and supply rating with margin.',
      'A single total kW figure.',
      'The customer name only.',
    ],
    correctAnswer: 1,
    explanation:
      "Commercial diversity calc has more layers than domestic: per-circuit Ib at the DB, sub-main aggregation, origin aggregation, three-phase distribution. Each layer needs its own row. The design pack page becomes a small spreadsheet — but it is the most-audited part of the pack and the foundation of the DNO connection application.",
  },
];

const faqs = [
  {
    question: "What kVA do I quote on the DNO connection application?",
    answer:
      "Quote the diversified maximum demand at the supply origin in kVA, not kW. Most DNOs ask for kVA. Convert from your diversified Ib using S = √3 × VL × IL for three-phase or S = V × I for single-phase. Use the apparent-power figure (kVA), not the active-power (kW). For a 320 m² fit-out at ~80 A diversified per phase three-phase: kVA = 1.732 × 400 × 80 / 1000 = 55 kVA. Round up to the next standard increment (60 kVA) and quote that. The DNO will design the service for the kVA you quote; under-quoting risks an undersized service.",
  },
  {
    question: "How do I size the sub-main breaker — by Ib or by something larger?",
    answer:
      "Sub-main breaker In >= Ib (per Reg 433.1.1) but typically sized one or two standard ratings above to allow margin and accommodate the next size of cable. For a sub-main Ib of 75 A on a 4-core SWA, common practice is 80 A or 100 A breaker on 25 mm² SWA (Iz typical 95-110 A depending on installation method). The sub-main breaker also has to coordinate with the downstream final-circuit devices for selective discrimination — do not tip downstream breakers when an upstream one trips. Selectivity is covered in 6.5 (protection coordination).",
  },
  {
    question: "Where does power factor correction sit in the diversity calc?",
    answer:
      "Power factor correction (typically capacitor banks or active PFC equipment) raises the system pf from native (often 0.7-0.85 with motor loads) toward 0.95+. Higher pf reduces apparent power (kVA) for the same active power (kW), which reduces the line current and the supply size. For a heavy-motor commercial site, PFC can reduce the connection size by 10-20 percent. The diversity calc should show pre-PFC and post-PFC kVA; the supply size goes off the post-PFC figure if PFC is installed and reliable. PFC failure must be assessed per Reg 311.2 — if the PFC drops out, can the supply still survive?",
  },
  {
    question: "What about harmonics in the diversity calc?",
    answer:
      "Harmonics raise the RMS current above what the simple kW × diversity calc would predict. Heavy IT load (servers, UPS, LED drivers, EV chargers, PV inverters) injects 3rd, 5th, 7th and higher harmonics back into the supply. Harmonic distortion increases the neutral current (in three-phase, triplen harmonics from each phase add in the neutral instead of cancelling) and the RMS line current. For a high-IT site, neutral current can equal or exceed line current — the neutral conductor must be sized accordingly (Reg 524 covers this). Document harmonic loading in the diversity calc and cross-reference Section 5 for cable sizing.",
  },
  {
    question: "Do I need to consult the DNO before submitting the connection application?",
    answer:
      "For small commercial (under ~70 kVA) the DNO connection application is usually a standard form online with the design data submitted directly. For larger or unusual loads (above 70 kVA, three-phase upgrades, EV-heavy sites), pre-application consultation with the DNO connections team avoids surprises. The DNO checks network capacity at the proposed connection point and may require offsetting investment if local network is at limit. Pre-app consultation is free; submitting an application that fails capacity check costs time. For projects over £20k connection cost, always pre-consult.",
  },
  {
    question: "How do I document load growth assumptions for a commercial fit-out?",
    answer:
      "Commercial fit-outs should account for growth — 10-20 percent above day-one diversified Ib over a 5-10 year horizon. The diversity calc page should have a row for growth allowance with a source justification (industry standard, customer request, change-of-use risk). The supply Ib used for the DNO application includes the growth allowance. The CU and sub-mains should have spare ways for the growth load. This is one of the discriminators between a junior design (sized for day one) and an L3 design (sized for the next 5-10 years with growth path). Document the growth assumption explicitly.",
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 6 · Section 2 · Subsection 4"
            title="Commercial load assessment — worked end-to-end"
            description="320 m² mixed-use commercial unit (cafe + retail + office) on a three-phase 100 A service. Per-circuit Ib, sub-main coincidence, origin coincidence, balanced-phase distribution, and the design pack output ready for the DNO connection application."
            tone="amber"
          />

          <TLDR
            points={[
              "Commercial load assessment uses the same four-step workflow as domestic but with three-phase math (I = P / (√3 × VL × pf)), GN1 Section 7 category factors, and an extra layer of phase-balance distribution.",
              "Sub-main coincidence inside a single tenant stays high (0.85-0.95) because categories peak at the same operating hours. Origin coincidence across tenants drops (0.5-0.85) depending on hour overlap.",
              "Phase imbalance under 10 percent is the design target. Distribute single-phase loads in rotation; balance heavy single-phase items across phases. The design pack shows per-phase load and imbalance percent.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Build a commercial connected load schedule across cooking, refrigeration, lighting, sockets, HVAC, IT, signage and special equipment.',
              'Apply IET GN1 Section 7 commercial diversity factors per category — office, retail, hospitality, education, healthcare, industrial.',
              'Convert single-phase and three-phase loads to line current using the correct formulas and a realistic power factor.',
              'Apply sub-main coincidence inside a single tenant and origin coincidence across multi-tenant buildings.',
              'Distribute loads across L1, L2, L3 to achieve under-10-percent phase imbalance, and document the per-phase load on the design pack.',
              'Produce the diversity calc page output for the DNO connection application — kVA at supply origin, growth allowance, source citations per category and per coincidence factor.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="The three-phase math — line current from kW"
            plainEnglish="Three-phase: I per line = kW / (1.732 × 400 × pf). Always use realistic power factor."
            onSite="Most three-phase mistakes come from forgetting the √3 factor or confusing line-to-line voltage with line-to-neutral. UK three-phase is 400 V line-to-line, 230 V line-to-neutral. The √3 (1.732) appears because the three-phase current is shared across three lines but the power flow uses the line-to-line voltage."
          >
            <p>
              The single-phase formula I = P / (V × pf) does not generalise. Three-phase line current for a balanced load is:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>I (per line) = P / (√3 × VL × pf), where P is total active power across all three phases (W), VL is line-to-line voltage (400 V in the UK), pf is power factor.</li>
              <li>S (apparent power, kVA) = √3 × VL × IL / 1000.</li>
              <li>For a single-phase load on a three-phase service: I = P / (VLN × pf), where VLN is line-to-neutral voltage (230 V).</li>
            </ul>
            <p>
              Worked examples:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>30 kW balanced three-phase load at pf 0.9: I = 30000 / (1.732 × 400 × 0.9) = 48 A per line.</li>
              <li>15 kW single-phase load on L1: I = 15000 / (230 × 0.95) = 68.6 A on L1 only (L2, L3 unaffected).</li>
              <li>3 kW LED lighting per phase across L1, L2, L3 (balanced): I per line = 3000 / (230 × 0.98) = 13.3 A per line.</li>
            </ul>
            <p>
              Power factor matters. UK domestic estimates often default to pf 1.0 (resistive heating dominant) but commercial mixed loads with motors, IT and HVAC are typically 0.85-0.95. Using pf 1.0 when actual pf is 0.85 underestimates line current by ~15 percent — the supply size is wrong.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.3 (Nature of demand)"
            clause="The number and type of circuits required for lighting, heating, power, control, signalling, communication and information technology, etc. shall be determined from knowledge of location of points of power demand; loads to be expected on the various circuits; daily and yearly variation of demand; any special conditions such as harmonics; requirements for control, signalling, information and communications technology; and anticipated future demand, if specified."
            meaning={
              <>
                Reg 132.3 makes the demand profile a discrete design consideration. Daily and yearly variation is the diversity input. Special conditions like harmonics matter for IT and inverter loads (PV, EV chargers, heat pump compressors) — they raise apparent power above active power and require sizing on apparent rather than active load. The L3 designer documents the demand profile assumptions in the design pack alongside the diversity factors.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 132.3."
          />

          <SectionRule />

          <ContentEyebrow>Build the commercial load schedule — 320 m² mixed-use unit</ContentEyebrow>

          <ConceptBlock
            title="Walk the unit, room by room, function by function"
            plainEnglish="Cooking equipment, refrigeration, lighting, sockets, HVAC, IT, signage. Per-room schedule with nameplate kW, voltage and phase."
          >
            <p>
              Worked example: 320 m² mixed-use ground-floor unit. Front 80 m² is retail (clothing). Middle 100 m² is cafe (kitchen + seating). Rear 60 m² is office (4 desks + meeting room). Plant 30 m² (HVAC, water heater, refrigeration plant). Toilets and circulation 50 m².
            </p>
            <p>
              Connected load schedule per zone:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cafe kitchen:</strong> 2x induction hob 7 kW each = 14 kW; combi oven 5 kW; dishwasher 3 kW; coffee machine 2.5 kW; refrigeration (3 fridges + 1 freezer) 5 kW running; extract fan 1.2 kW; lighting 0.8 kW. Total connected ~31 kW.</li>
              <li><strong>Retail floor:</strong> Display lighting 2 kW; ambient lighting 1 kW; 8 socket outlets 8 × 13 A nominal but realistic load 2 kW; EPOS 0.3 kW; signage external 1.5 kW. Total connected ~7 kW.</li>
              <li><strong>Office:</strong> 4 desks at 0.5 kW each = 2 kW; meeting room AV 1 kW; office lighting 0.6 kW; small kitchenette 1 kW. Total connected ~5 kW.</li>
              <li><strong>HVAC:</strong> 12 kW heat-pump-based system (single unit, three-phase) for whole unit.</li>
              <li><strong>Hot water:</strong> 9 kW unvented cylinder heater.</li>
              <li><strong>Toilets / circulation lighting and small loads:</strong> 1 kW.</li>
            </ul>
            <p>
              Sum of connected load: 31 + 7 + 5 + 12 + 9 + 1 = 65 kW. At three-phase pf 0.9 if balanced and connected at full demand: I = 65000 / (1.732 × 400 × 0.9) = 104 A per line. Cannot fit on a 100 A three-phase service without diversity.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Apply GN1 Section 7 category diversity</ContentEyebrow>

          <ConceptBlock
            title="GN1 categories applied per zone"
            plainEnglish="Hospitality kitchen 70-90 percent, refrigeration 100 percent, retail lighting 100 percent (opening hours), office sockets 50-65 percent, HVAC sequenced or per BMS."
          >
            <p>
              Run GN1 Section 7 per category (verify against current edition):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cafe cooking</strong> (induction + oven): 80 percent at lunch service peak. Connected 19 kW × 0.8 = 15.2 kW.</li>
              <li><strong>Cafe ancillary</strong> (dishwasher, coffee, extract): 100 percent (run during service). Connected 6.7 kW × 1.0 = 6.7 kW.</li>
              <li><strong>Refrigeration</strong>: 100 percent (compressor cycle independent of service times). 5 kW × 1.0 = 5 kW.</li>
              <li><strong>Cafe lighting</strong>: 100 percent (opening hours). 0.8 kW × 1.0 = 0.8 kW.</li>
              <li><strong>Retail display + ambient lighting</strong>: 100 percent (opening hours). 3 kW × 1.0 = 3 kW.</li>
              <li><strong>Retail sockets</strong>: 50 percent (occasional plug-in stock equipment, no continuous heavy load). 2 kW × 0.5 = 1 kW.</li>
              <li><strong>Retail EPOS + signage</strong>: 100 percent (continuous). 1.8 kW × 1.0 = 1.8 kW.</li>
              <li><strong>Office sockets</strong>: 60 percent (typical knowledge work). 2 kW × 0.6 = 1.2 kW.</li>
              <li><strong>Office AV + meeting room</strong>: 50 percent (intermittent). 1 kW × 0.5 = 0.5 kW.</li>
              <li><strong>Office + kitchenette + lighting</strong>: 80 percent. 1.6 kW × 0.8 = 1.3 kW.</li>
              <li><strong>HVAC</strong>: 100 percent (BMS-controlled but sized for peak heating / cooling). 12 kW × 1.0 = 12 kW.</li>
              <li><strong>Hot water</strong>: 100 percent (post-service recovery, peak demand at lunch service end). 9 kW × 1.0 = 9 kW.</li>
              <li><strong>Toilets / circulation</strong>: 100 percent. 1 kW × 1.0 = 1 kW.</li>
            </ul>
            <p>
              Sum of diversified category demand: 15.2 + 6.7 + 5 + 0.8 + 3 + 1 + 1.8 + 1.2 + 0.5 + 1.3 + 12 + 9 + 1 = 58.5 kW.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Apply sub-main and origin coincidence</ContentEyebrow>

          <ConceptBlock
            title="Categories overlap inside one tenant — coincidence stays high"
            plainEnglish="Cafe service hour aligns with cafe lighting, refrigeration and HVAC. Coincidence ~0.9. Whole unit aligns retail + cafe + office — coincidence ~0.85."
          >
            <p>
              Sub-main coincidence inside a single sub-main (e.g. cafe DB feeding cafe loads) stays high because the categories are correlated to operating hours. Coincidence factor ~0.9 inside one tenant.
            </p>
            <p>
              For multi-zone single-tenant (cafe + retail + office under one occupier), origin coincidence applies across the zones. Cafe, retail and office mostly operate during the same business hours but the kitchen peaks at lunch, retail peaks at weekends afternoon, office peaks 09:00-17:00 weekdays. Origin coincidence ~0.85.
            </p>
            <p>
              Apply 0.85 to the diversified sum: 58.5 × 0.85 = 49.7 kW at origin.
            </p>
            <p>
              At 400 V three-phase pf 0.9: I = 49700 / (1.732 × 400 × 0.9) = 80 A per line.
            </p>
            <p>
              Apparent power: S = √3 × 400 × 80 / 1000 = 55 kVA. Round up to 60 kVA for the DNO application.
            </p>
            <p>
              Supply margin: 80 A on a 100 A three-phase service = 80 percent of rating. Within the 75-85 percent target band — healthy but not loose. Document growth allowance (10-15 percent over 5 years) which would push to 88-92 A; consider the upgrade path (125 A three-phase) if growth is anticipated.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Phase distribution — balance the three lines</ContentEyebrow>

          <ConceptBlock
            title="Balance loads across L1, L2, L3 to under 10 percent imbalance"
            plainEnglish="Three-phase service rating assumes balanced load. Heavy imbalance overloads one phase before the others reach their share."
          >
            <p>
              Allocate sub-main loads across phases:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>HVAC</strong> 12 kW three-phase = balanced across all three lines (4 kW per phase).</li>
              <li><strong>Cafe induction hobs</strong> 14 kW: split — hob 1 (7 kW) on L1, hob 2 (7 kW) on L2.</li>
              <li><strong>Cafe combi oven</strong> 5 kW on L3.</li>
              <li><strong>Cafe ancillary</strong> 6.7 kW: dishwasher on L1, coffee on L2, extract on L3 (roughly balanced 2-3 kW per phase).</li>
              <li><strong>Refrigeration</strong> 5 kW: spread across phases via individual fridge circuits.</li>
              <li><strong>Hot water cylinder</strong> 9 kW: typically three-phase load = balanced 3 kW per phase.</li>
              <li><strong>Retail loads</strong> ~6 kW: distribute lighting + sockets + EPOS across phases.</li>
              <li><strong>Office loads</strong> ~3 kW: distribute across phases.</li>
            </ul>
            <p>
              Worked balance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>L1:</strong> HVAC 4 + hob 1 7 + dishwasher 1.5 + refrigeration 1.5 + HW 3 + retail 2 + office 1 = ~20 kW.</li>
              <li><strong>L2:</strong> HVAC 4 + hob 2 7 + coffee 2 + refrigeration 1.5 + HW 3 + retail 2 + office 1 = ~20 kW.</li>
              <li><strong>L3:</strong> HVAC 4 + combi oven 5 + extract 1.2 + refrigeration 2 + HW 3 + retail 2 + office 1 = ~18 kW.</li>
            </ul>
            <p>
              Per-phase apparent demand: L1 ~20 kVA (87 A), L2 ~20 kVA (87 A), L3 ~18 kVA (78 A). Imbalance: (87 − 78) / 84 = 11 percent. Just above the 10 percent target — swap one office circuit from L1 to L3 to bring within 10 percent.
            </p>
            <p>
              Final per-phase distribution and imbalance go on the diversity calc page. The design pack shows the L1, L2, L3 loading and the imbalance percent. The CU schedule shows which way feeds which phase.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 314.1 (division of installation into circuits)"
            clause="Every installation shall be divided into circuits, as necessary, to: (a) avoid danger and minimize inconvenience in the event of a fault; (b) facilitate safe inspection, testing and maintenance (see also Chapter 46 and Section 537); (c) take account of hazards that may arise from the failure of a single circuit such as a lighting circuit; (d) reduce the possibility of unwanted tripping of RCDs due to excessive protective conductor (PE) currents not due to a fault; (e) mitigate the effects of electromagnetic disturbances (see also Chapter 44); (f) prevent the indirect energizing of a circuit intended to be isolated."
            meaning={
              <>
                Reg 314.1 covers the design rationale for splitting commercial loads across phases and feeders — heavy phase imbalance, harmonic distortion and inrush events all sit under (e) "mitigate the effects of electromagnetic disturbances". The diversity calc and phase distribution feed into the circuit-division decision. For commercial sites with motors, refrigeration compressors, EV charging or PV inverters, harmonic and inrush considerations drive separate circuits / sub-mains and belong in the design pack.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 314.1 — full text from published amendment."
          />

          <Scenario
            title="Cafe + retail + office fit-out — DNO application"
            situation={
              <>
                Same 320 m² mixed-use unit. Existing 100 A three-phase service. Customer is the new operator and asks the L3 designer for a connection design and DNO application within 4 weeks of opening.
              </>
            }
            whatToDo={
              <>
                Build the load schedule (above), apply GN1 diversity (above), apply 0.85 origin coincidence, derive 80 A per line at 55 kVA. Distribute across phases for under 10 percent imbalance. Submit DNO online application: connection point address, requested capacity 60 kVA (rounded up), proposed installation start date, contact details. DNO acknowledges within 5 working days, confirms network capacity available at the connection point, issues quotation for any reinforcement. For a mid-urban site with existing 100 A three-phase already present, the upgrade to 60 kVA is usually a paperwork exercise (no network reinforcement) and confirms the existing service.
                {"\n\n"}
                Diversity calc page in the design pack: 13 categories listed with diversity factor and source citation, sub-totals per zone, origin coincidence with source, supply origin Ib normal mode 80 A and failure mode (HVAC scheduler failure - 12 kW becomes uncontrolled but still under 100 A per phase), per-phase distribution table, growth allowance 10 percent (5-year horizon), supply rating 100 A, decision: HOLD (within margin).
                {"\n\n"}
                Hand the calc page to the customer with the DNO application. The customer presents to landlord and accountant; the calc justifies any future requests for upgrade.
              </>
            }
            whyItMatters={
              <>
                The diversity calc page is the cornerstone of every commercial connection. It is what the DNO connection assessor reads, what the building inspector audits, what the future designer reuses for any change-of-use, what the customer presents to insurers and landlord. Done right, it lasts 10+ years; done wrong (sized on connected load, no source citations) it forces a re-design at every change. L3 designers earn their keep on this page.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Harmonic loading and neutral conductor sizing</ContentEyebrow>

          <ConceptBlock
            title="Triplen harmonics in three-phase commercial — the neutral can carry more than the lines"
            plainEnglish="Three-phase loads with non-linear current waveforms (LED drivers, switch-mode PSUs, EV chargers, PV inverters, VFDs) inject 3rd, 5th, 7th and higher harmonics back into the supply. The 3rd harmonic and its multiples (3, 9, 15...) are 'triplen' harmonics — they're in phase across all three lines, so they ADD in the neutral instead of cancelling. On a heavy-IT site the neutral can carry up to 1.73 × the line current."
            onSite="Modern offices with high LED density and high IT load routinely show neutral currents of 60-80 % of the line current, sometimes higher. A 100 A three-phase service designed with a 100 A neutral on the assumption it cancels can have an overloaded neutral while the lines are well within rating. Reg 524.1 requires the neutral csa to match the load."
          >
            <p>
              The physics: in a balanced three-phase system, the fundamental currents (50 Hz) on L1, L2, L3 are 120° apart and sum to zero in the neutral. But the 3rd harmonic at 150 Hz on each line is in phase with the 3rd harmonic on the others — they all peak together — and therefore ADD in the neutral rather than cancelling. Same for 9th, 15th and higher triplens.
            </p>
            <p>
              Practical consequences for the L3 designer:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Office with heavy LED + IT</strong> — neutral current typically 50-70 % of line current. Reg 524.1: neutral csa ≥ line csa.
              </li>
              <li>
                <strong>Data centre / server room</strong> — neutral current routinely 80-120 % of line current. Reg 524.1: neutral csa one bracket up from line csa, or full-size neutral on multi-core (4 × line csa instead of 4 × line + reduced neutral).
              </li>
              <li>
                <strong>EV charger ranks (multiple chargers on three-phase service)</strong> — neutral current 60-90 % of line current under typical use. Same neutral upsize rule.
              </li>
              <li>
                <strong>Industrial with VFDs (variable frequency drives)</strong> — harmonic content depends on drive type (6-pulse vs 12-pulse). Specific harmonic mitigation may be required to keep the supply within the DNO's connection conditions (typically THD ≤ 5 % at the point of common coupling).
              </li>
            </ul>
            <p>
              <strong>Sizing example.</strong> Office fit-out, 80 A balanced line current per phase. Harmonic analysis indicates 60 % neutral current = 48 A. Reg 524.1 requires neutral csa ≥ line csa — but you'd typically size the neutral the same as the line (e.g. 25 mm² four-core SWA) anyway because manufactured cables come with full or reduced neutrals; the reduced-neutral option is unsuitable here. Document the harmonic assumption in the design pack with the source (manufacturer load profile, IEC 61000 study, measured site data).
            </p>
            <p>
              <strong>K-factor transformers</strong> are sometimes specified for high-harmonic loads. K-13 or K-20 rated transformers handle harmonic heating without derate. On commercial / industrial sites with significant non-linear load, the supply transformer specification should account for K-factor; on a fit-out where the transformer is the DNO's equipment, document the harmonic load on the connection application so the DNO can verify network capacity.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Sub-main breaker selection — In ≥ Ib plus margin, with cable Iz coordination"
            plainEnglish="The sub-main protective device (typically a moulded-case circuit breaker or HBC fuse) must satisfy three constraints: In ≥ Ib (Reg 433.1.1), Iz of the sub-main cable ≥ In × correction factors (Reg 433.1.1), and breaking capacity ≥ PFC at the sub-main location (Reg 434.5.1). On commercial fit-outs the breaker is often sized one or two ratings above Ib to allow load growth and cable utilisation."
            onSite="A 75 A diversified Ib on a sub-main feeding a small commercial DB typically gets an 80 A or 100 A MCCB (matching the standard incremental ratings). The 25 mm² SWA cable has Iz of ~95-110 A in typical buried installation method — comfortably above the 80 A MCCB rating. Future load growth of 10-15 % can be absorbed without changing the cable."
          >
            <p>
              The sub-main sizing workflow:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Calculate diversified Ib at the sub-main</strong> — the diversified line current feeding the downstream DB after applying GN1 category factors and sub-main coincidence.
              </li>
              <li>
                <strong>Pick a standard breaker rating</strong> ≥ Ib. Standard MCCB ratings: 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 400, 630 A. Standard HBC fuse ratings (BS 88-3): similar plus intermediate values.
              </li>
              <li>
                <strong>Pick a cable size</strong> with Iz (after application of correction factors per Appendix 4) ≥ In × any further correction. The cable Iz must be at least the breaker In so the breaker reliably operates on overload before the cable cooks (Reg 433.1.1).
              </li>
              <li>
                <strong>Check breaking capacity</strong> — the breaker's Icn or Icu must be ≥ PFC at its location. Standard MCCB ratings: 10 kA, 25 kA, 36 kA, 50 kA. For a commercial sub-main with PSCC of 16 kA, a 25 kA Icn MCCB is appropriate; lower-rated devices fail Reg 434.5.1.
              </li>
              <li>
                <strong>Verify Vd</strong> on the sub-main with the chosen cable size. Sub-mains typically size on Vd rather than CCC because route lengths are long; aim for ~2 % Vd to leave headroom for downstream final-circuit Vd.
              </li>
              <li>
                <strong>Verify selectivity</strong> with the upstream device (typically the supply intake fuse) and downstream final-circuit devices. The sub-main breaker should clear before the upstream device, and the downstream breaker should clear before the sub-main on a final-circuit fault. Selectivity tables are manufacturer-specific (Sub 6.5).
              </li>
            </ol>
            <p>
              <strong>Worked example.</strong> Cafe sub-main, diversified Ib = 75 A, three-phase 400 V. Pick 80 A MCCB (next standard above 75 A). Cable: 25 mm² four-core SWA in a buried duct, Iz ≈ 110 A — well above 80 A. PFC at the sub-main location calculated as 8 kA — pick 25 kA Icn MCCB for comfortable margin. Vd over the 30 m run from main switch to cafe DB on 25 mm² four-core: mV/A/m ≈ 1.5, Vd = (1.5 × 75 × 30)/1000 = 3.4 V = 0.85 % — plenty of Vd headroom for downstream final circuits.
            </p>
            <p>
              Document on the design pack: sub-main reference, route, Ib, In selected (with rationale for size step above Ib), cable size, Iz (with correction factors applied and source citations), PFC at the location, breaker Icn, Vd, selectivity outcome. The sub-main row is the most-audited row on a commercial design — get it right.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Single-phase loads on a three-phase service — phase rotation and tenant DBs"
            plainEnglish="Most three-phase services feed both balanced three-phase loads (HVAC, large motors) and single-phase loads (lighting, sockets, small appliances). The single-phase loads connect line-to-neutral (230 V) and must be distributed across L1, L2, L3 in rotation to keep the service balanced. Each single-phase final circuit comes off ONE phase plus the neutral; the choice of phase determines the per-phase load."
            onSite="On a multi-tenant commercial building with 3 retail units, allocate one tenant primarily to L1, one to L2, one to L3 — but spread some loads from each across the other phases to even out the balance. The aim is each phase carrying roughly equal load; perfect tenant-to-phase mapping is rare because tenant load profiles differ."
          >
            <p>
              Single-phase loading principles:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Each single-phase circuit uses one line conductor + neutral.</strong> The line is L1, L2 or L3; the choice is the designer's. Voltage between line and neutral = 230 V (UK nominal).
              </li>
                            <li>
                <strong>Distribute single-phase loads in rotation</strong> — L1 first, L2 second, L3 third, then back to L1. On a CU with 12 single-phase circuits (4 per phase), this rotation gives roughly balanced per-phase load if the per-circuit demand is similar.
              </li>
              <li>
                <strong>Heavy single-phase loads</strong> (cookers, electric showers, water heaters, EV chargers) need careful phase allocation — splitting two heavy single-phase loads between two different phases, or using a three-phase EV charger that draws balanced power.
              </li>
              <li>
                <strong>Per-tenant DBs in multi-tenant buildings</strong> — each tenant's CU is fed by either a single-phase sub-main (one line + neutral + CPC) drawn from one of the three phases at the origin, or a three-phase sub-main (all three lines + neutral + CPC). Single-phase sub-mains are simpler but force tenant load onto one phase only — limits balance.
              </li>
            </ul>
            <p>
              <strong>Multi-tenant balance worked example.</strong> A retail parade with three units, each with diversified Ib of 25 A, 30 A and 20 A respectively. Three single-phase sub-mains:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Unit 1 → L1</strong> (Ib 25 A on L1).</li>
              <li><strong>Unit 2 → L2</strong> (Ib 30 A on L2).</li>
              <li><strong>Unit 3 → L3</strong> (Ib 20 A on L3).</li>
            </ul>
            <p>
              Per-phase loading: L1 25 A, L2 30 A, L3 20 A. Imbalance: (30 − 20) / 25 = 40 % — well above the 10 % target. To improve, swap a heavy circuit from Unit 2 onto L3 — say a 5 A lighting circuit moves from L2 to L3 (achieved by allocating that circuit's MCB to a different phase at the origin, with Unit 2's DB carrying both L2 and L3 supply).
            </p>
            <p>
              <strong>Documentation.</strong> The CU schedule shows which phase each single-phase circuit is on (L1 / L2 / L3 column). The diversity calc page sums per-phase load and reports imbalance percentage. For three-phase tenancy DBs, all three phases enter the DB and the rotation logic applies internally; for single-phase tenant DBs, only one phase enters the DB and the building-level balance is achieved by tenant-to-phase mapping at the origin.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Using single-phase formulas on three-phase loads"
            whatHappens={
              <>
                A junior designer divides the total kW by 230 V (single-phase formula) for a three-phase commercial load. Result: I = 30000 / 230 = 130 A per line — three times the actual three-phase line current of 43 A. The supply is sized at 200 A when 60 A would do. The customer pays £8000-15000 extra in DNO connection cost.
              </>
            }
            doInstead={
              <>
                Three-phase balanced: I = P / (√3 × VL × pf). VL = 400 V in the UK. The √3 factor is non-negotiable. Single-phase loads on a three-phase service use 230 V (line-to-neutral); three-phase balanced loads use 400 V (line-to-line) with the √3 factor. Always check whether the kW figure is already per-phase or total; the formulas assume total active power across all three phases.
              </>
            }
          />

          <CommonMistake
            title="Ignoring power factor on a mixed commercial load"
            whatHappens={
              <>
                A designer assumes pf 1.0 for a commercial site that has motor loads, HVAC and PV inverter. Actual pf is 0.85. The line current is 18 percent higher than the calc shows. The supply is undersized; on a hot day with HVAC at peak, the cut-out fuse blows.
              </>
            }
            doInstead={
              <>
                Use realistic power factor for the load mix. Default to 0.9 for typical small commercial mixed; 0.85 if motors and HVAC dominate; 0.95+ for pure IT or LED lighting. Document the assumption. For larger sites with significant motor or inverter load, specify power factor correction (capacitor bank or active PFC) and design at the post-PFC pf — but include the failure-mode (PFC drops out) per Reg 311.2.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.2(c)(iv) (prospective fault current)"
            clause={
              <>
                The documentation shall include prospective fault current. Designers shall
                determine and record the prospective (available) fault current at relevant
                points to select protective devices and ensure disconnection requirements are
                achievable.
              </>
            }
            meaning={
              <>
                Commercial loads with motors and large transformers raise the prospective fault
                current significantly above typical domestic levels. Reg 132.2(c)(iv) requires
                the designer to determine and record the value — protective device breaking
                capacity (per Reg 432.1) is then sized against the recorded PFC. An
                under-rated MCB on a high-PFC industrial supply is a textbook compliance
                failure.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.2(c)(iv) — verbatim from published facets."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Commercial load assessment: I = P / (√3 × VL × pf) for three-phase balanced load (VL = 400 V UK). Always use realistic power factor (0.85-0.95 typical small commercial).",
              "GN1 Section 7 categories: cafe cooking 70-90 percent at service peak, refrigeration 100 percent, retail lighting 100 percent (opening hours), office sockets 50-65 percent, HVAC 100 percent (or BMS-sequenced).",
              "Sub-main coincidence inside a single tenant stays high (0.85-0.95) because categories peak at the same operating hours. Origin coincidence across multi-tenant buildings drops to 0.5-0.85 depending on hour overlap.",
              "Phase imbalance under 10 percent is the design target. Distribute single-phase loads in rotation; balance heavy single-phase items (large cookers, EV chargers) across phases. Document per-phase load on the design pack.",
              "DNO connection application uses kVA, not kW. Convert from your diversified Ib at the supply origin: kVA = √3 × VL × IL / 1000. Round up to standard increment (60, 80, 100 kVA). Quote the post-growth figure if growth allowance is included.",
              "Reg 311.2 (A4:2026) requires failure-mode assessment for any load-management or sequencing equipment — HVAC scheduler, PFC capacitor bank, EV chargers, BMS. Document the fall-back behaviour and confirm supply survives.",
              "Reg 132.3 demand-profile considerations include daily and yearly variation, harmonics from IT and inverter loads, control and signalling. Document the demand-profile assumptions in the design pack alongside the diversity factors.",
              "The diversity calc page is the most-audited part of the commercial design pack. Layout: per-category row with source citation; sub-main row with coincidence; origin row with coincidence; per-phase distribution; imbalance percent; growth allowance; supply rating; margin; decision. Hand to customer with DNO application.",
            ]}
          />

          <Quiz title="Commercial load assessment — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section2-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.3 Domestic load assessment
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section2-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.5 Industrial load assessment
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
