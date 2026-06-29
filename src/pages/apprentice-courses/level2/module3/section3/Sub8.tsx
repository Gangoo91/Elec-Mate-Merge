/**
 * Module 3 · Section 3 · Subsection 8 — Designing a small installation
 * Maps to City & Guilds 2365-02 / Unit 203 / LO3 (whole) — synthesises every AC in the LO
 *   AC 3.1 — "Describe principles of operation of different circuit types"
 *   AC 3.2 — "Identify wiring systems for different environments"
 *   AC 3.3 — "Determine minimum current carrying capacity of live conductors for given installation conditions"
 *   AC 3.4 — "State applications of different types of protective devices"
 *   AC 3.5 — "Identify purpose of specialised equipment for installing wiring systems"
 *   AC 3.6 — "Calculate spacing factor of wiring enclosures"
 *
 * LO3-wide synthesis Sub. Take a real spec — a small commercial unit (200 m²,
 * single-phase 100 A TN-C-S supply) — and design every circuit. Apply every
 * concept from §3 Subs 1-7. Produce a full circuit schedule.
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
import { ConsumerUnit } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Designing a small installation (3.1–3.6) | Level 2 Module 3.3.8 | Elec-Mate';
const DESCRIPTION =
  'LO3 synthesis — design a small commercial unit end-to-end. Single-phase 100 A TN-C-S, 200 m² floor area, 13 final circuits across lighting, power and dedicated loads. Full circuit schedule, devices, cable sizes, containment and fill check.';

const checks = [
  {
    id: 'circuit-shape-pick',
    question:
      'A retail floor of ~80 m² needs general 13 A socket coverage. The intended layout has six twin sockets around the perimeter. Best circuit shape?',
    options: [
      '20 A radial in 4 mm² T&E with a 4 mm² CPC, served by an MCB.',
      '16 A radial in 2.5 mm² T&E covering three of the six twins, the rest on a spur.',
      '32 A ring final circuit in 2.5 mm² T&E with 1.5 mm² CPC, served by an RCBO.',
      '45 A radial in 6 mm² T&E, served by a switch-fuse.',
    ],
    correctIndex: 2,
    explanation:
      'A 32 A ring final in 2.5 mm² is the standard shape for general-purpose 13 A sockets up to 100 m² floor area (BS 7671 Appendix 15 / OSG). Two paths share the load, the 2.5 mm² CSA is comfortable, and you cover six twins on a single RCBO. A radial would force 4 mm² (or larger) for the same coverage at higher cost.',
  },
  {
    id: 'rcd-type-pick',
    question:
      'You are picking the protective device for the 7 kW EV charger circuit. Which RCD type is required?',
    options: [
      'Type AC — adequate because the charge point is a fixed wired load with no socket-outlet.',
      'Type B — required because the EV charger&rsquo;s onboard charger can produce smooth DC fault current that would blind a Type A or AC.',
      'Type F — required because the charger only ever produces pulsating DC fault current.',
      'No RCD — the upstream Type C MCB provides all the fault protection the circuit needs.',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 Section 722 (electric vehicles) requires Type B RCD protection on EV charge points unless the charger itself includes integrated DC fault current protection (in which case a Type A RCD upstream is acceptable). Onboard chargers can produce smooth DC fault current — a Type AC or Type A RCD would magnetically saturate and miss it.',
  },
  {
    id: 'spd-type-pick',
    question:
      'Single-phase 100 A intake into a small commercial unit, no exposed location, no overhead supply. What SPD do you fit at the origin?',
    options: [
      'Type 1 SPD — mandatory at every consumer-unit origin regardless of the building&rsquo;s exposure.',
      'Type 3 SPD — the correct origin device because it gives the deepest level of clamping.',
      'Type 2 SPD — appropriate for a sub-board / consumer-unit-equivalent origin where a Type 1 lightning current SPD is not justified by the BS 7671 risk assessment.',
      'No SPD — surge protection is only required where an external lightning protection system is fitted.',
    ],
    correctIndex: 2,
    explanation:
      'Type 1 is for direct-strike lightning protection at the origin of installations exposed to a lightning protection system. Type 2 covers switching and indirect lightning surges and is the standard fit at a sub-board or commercial CU origin. Type 3 is for sensitive equipment local protection. Section 443 / 534 + the BS EN 62305 risk assessment drive the choice.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A small commercial unit has a single-phase 100 A intake. The summed maximum demand of all final circuits before diversity is 142 A. After applying BS 7671 Appendix 1 / OSG diversity, the design demand comes in at ~78 A. The unit is:',
    options: [
      'Over the supply rating — apply for a 3-phase upgrade.',
      'Inside the supply rating — install proceeds.',
      'Inside the rating but only because diversity is fictional — install does not proceed.',
      'Cannot proceed without a load test.',
    ],
    correctAnswer: 1,
    explanation:
      'Diversity is exactly how BS 7671 expects you to size the supply against connected load — not every circuit will be at full demand at the same time. 78 A on a 100 A intake is comfortable. The full 142 A figure is the worst-case if every circuit ran flat-out simultaneously, which in a small commercial unit will not happen.',
  },
  {
    id: 2,
    question:
      'You are choosing a wiring system for the run from the CU into the rear yard, then into a wall-mounted EV charger. Best choice for the buried section?',
    options: [
      'Standard T&E (6242Y) laid directly in the trench at the BS 7671 minimum depth.',
      'Singles in flexible plastic conduit buried directly in the soil, no warning tape.',
      'SWA (steel wire armoured) at the appropriate CSA, buried at the BS 7671 minimum depth and marked with warning tape.',
      'Heat-resistant flex clipped to the yard wall and dropped into a shallow channel.',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 Reg 522.8.10 requires buried cables to be either of an appropriate type (SWA, mineral-insulated) OR provided with mechanical protection. SWA is the default for buried sub-mains and outdoor circuits — armour gives mechanical protection and provides a CPC. T&E in conduit underground is not standard practice and brings water-ingress and termination problems.',
  },
  {
    id: 3,
    question:
      'The HVAC condenser circuit feeds a 4 kW unit with an inrush of around 6× FLC at start-up. The right MCB type is:',
    options: [
      'Type D',
      'Type B',
      'No MCB — fuse only',
      'Type C',
    ],
    correctAnswer: 3,
    explanation:
      'Type C (5–10× In magnetic trip) handles the routine inrush of an HVAC compressor without nuisance-tripping. Type B (3–5× In) would trip on every start. Type D (10–20× In) is overkill for a 4 kW unit and brings a tighter Zs requirement that may not be achievable on the route length.',
  },
  {
    id: 4,
    question:
      'Reg 411.3.4 mandates 30 mA RCD protection for AC final circuits supplying luminaires in:',
    options: [
      'Domestic (household) premises only.',
      'All installations, all locations.',
      'Commercial premises only.',
      'No installations — it is a recommendation only.',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 411.3.4 specifically applies to domestic (household) premises. In our small commercial unit it does not bite — but BS 7671 still requires 30 mA RCD additional protection for socket outlets up to 32 A (Reg 411.3.3) and for mobile equipment used outdoors. Lighting RCDs on commercial sites are a design choice, not a regs mandate.',
  },
  {
    id: 5,
    question:
      'You are running 6 × 2.5 mm² T&E circuits in a single 50×50 mm metal trunking above the ceiling. The OSG Appendix H 45 % fill rule means you must:',
    options: [
      'Count the conductors only and stop once they physically fit inside the trunking.',
      'Calculate the total cable factor sum, divide by the trunking factor, ensure the result keeps the fill ≤ 45 % AND apply the matching Cg grouping derate to the cable sizing.',
      'Apply the 45 % fill rule but ignore grouping derate because the trunking is metal and dissipates heat.',
      'Apply the grouping derate to the cable sizing but skip the fill calculation as it is advisory only.',
    ],
    correctAnswer: 1,
    explanation:
      'Fill and grouping derate are two faces of the same problem — cables packed together cannot dissipate heat, so you both physically check they fit (Sub 3.6) and electrically derate the CCC (Sub 3.3, Cg). Six grouped circuits gives Cg ≈ 0.57. Either check on its own is incomplete.',
  },
  {
    id: 6,
    question:
      'The architect&rsquo;s drawing puts the EV charger 80 m from the CU. At 30 A design current on 6 mm² SWA (mV/A/m ≈ 7.3), the voltage drop is about:',
    options: [
      '~1.75 V',
      '~52.6 V',
      '~17.5 V',
      '~175 V',
    ],
    correctAnswer: 2,
    explanation:
      'Vd = (7.3 × 30 × 80) / 1000 = 17.52 V. As a percentage of 230 V that is 7.6 % — well over the 5 % non-lighting limit. You either size up to 16 mm² SWA, re-route to shorten the run, or relocate the CU sub-board closer to the charger. This is exactly the kind of issue an apprentice catches by running the Vd gate on the drawing before the cable goes in.',
  },
  {
    id: 7,
    question:
      'AFDDs (Reg 421.1.7) on this small commercial install (no sleeping accommodation):',
    options: [
      'Are mandatory on every final circuit of any installation regardless of building type.',
      'Are explicitly prohibited on any commercial premises and must never be fitted here.',
      'Are only ever required on three-phase distribution circuits, never on single-phase finals.',
      'Are recommended by Reg 421.1.7 for AC final circuits supplying socket-outlets ≤ 32 A in dwellings — strengthened to a requirement in HRRBs under the Building Safety Act 2022, and treated as effectively required in HMOs / sleeping accommodation / care homes by fire-safety guidance. Not strictly required on this small commercial install, but a sensible fit on the IT rack and EV circuits.',
    ],
    correctAnswer: 3,
    explanation:
      'AFDDs are recommended for AC final circuits supplying socket-outlets ≤ 32 A in dwellings (per BS 7671 Reg 421.1.7). The recommendation strengthens to a requirement in Higher-Risk Residential Buildings (HRRBs) under the Building Safety Act 2022 framework. In HMOs, sleeping accommodation and care homes, supporting fire-safety guidance treats them as effectively required practice. A retail unit with no sleeping accommodation is not in that scope, but fitting AFDDs on the IT rack and EV circuits is good practice — both are arc-fault-prone loads.',
  },
  {
    id: 8,
    question:
      'You finish the design schedule. The total maximum demand after diversity is 78 A on a 100 A supply, every circuit clears CCC / Vd / I²R / Zs, the trunking comes in at 38 % fill, and the SPD is Type 2 at the origin. The next step is:',
    options: [
      'Hand the schedule to the supervisor for sign-off, then lift it into the formal design pack (cable schedule, single-line, EIC issue draft) before procurement starts.',
      'Order all the cable and devices straight away — the calc clears, so the design is finished.',
      'Energise the installation to load-test the design before any sign-off takes place.',
      'Issue the EIC now, since every circuit has passed its CCC, Vd and Zs checks.',
    ],
    correctAnswer: 0,
    explanation:
      'A passing calc is not the same as a signed-off design. Real installs go through a sign-off step where a senior electrician or designer checks every column of the schedule, verifies the assumptions match the actual site survey, and authorises procurement. The calc is the input; the signed schedule is the output that drives the install and the eventual EIC.',
  },
];

const faqs = [
  {
    question: 'How do I know which BS 7671 diversity factor to apply to which load?',
    answer:
      'BS 7671 Appendix 1 (and the matching On-Site Guide tables) gives diversity factors for each load type — sockets, cookers, water heaters, EV charge points, lighting, motors, instantaneous water heaters. The principle is that not every circuit will run at full load simultaneously. Some loads (EV, water heater) get no diversity (treat as 100 % of rated current); others (general sockets) get aggressive diversity (often 40 % of the largest plus 50 % of the rest). Always check the table for the specific load class.',
  },
  {
    question: 'Why is the EV charger circuit treated separately from the general socket circuits?',
    answer:
      'EV charging is a continuous, high-current, weather-exposed load with specific BS 7671 requirements (Section 722). It needs its own dedicated radial sized for the rated charger current with no diversity, Type B RCD protection (or Type A with integrated DC fault detection), often on its own RCBO, and the cable type is dictated by the route (SWA buried, T&E in conduit indoors). Bundling it onto a shared circuit would breach 722 and would routinely overload the upstream device.',
  },
  {
    question: 'When does an SPD become mandatory rather than risk-assessed?',
    answer:
      'BS 7671 Section 443 makes SPDs the default — you fit them unless a documented BS EN 62305 risk assessment shows otherwise. In practice, almost every install in the UK comes back from the risk assessment with "yes, fit an SPD". For consumer units and sub-boards a Type 2 at the origin is the standard fit. Type 1 is added where the building has external lightning protection or an exposed overhead supply. Type 3 is for sensitive local equipment in addition to the upstream Type 2.',
  },
  {
    question: 'How do I split a 100 A supply across 13 circuits without overloading the cut-out?',
    answer:
      'You apply diversity. Sum the design current of every final circuit assuming each runs at its own rated load, then apply the BS 7671 Appendix 1 diversity factors per load class. The result is the after-diversity maximum demand — that is the figure you compare to the cut-out fuse rating. For a typical small commercial unit with mixed lighting, sockets, HVAC and one dedicated load (EV or shower), the after-diversity figure usually lands at 60–80 % of the connected total.',
  },
  {
    question: 'What goes in the final circuit schedule the supervisor signs off?',
    answer:
      'A clean table with one row per circuit and these columns: circuit number, description, Ib, In, device type and rating, cable type and CSA, route and length, Reference Method, derate factors applied, derated Iz, Vd in V and %, Zs target and predicted Zs, RCD type if any, AFDD if any. Plus a header block stating supply type (TN-C-S), nominal voltage (230 V), declared Ze, and total after-diversity maximum demand vs supply rating. That is what an inspector will check on the EIC, so design it that way from day one.',
  },
  {
    question: 'I have specced everything correctly but the customer wants to add a sauna later — what do I do?',
    answer:
      'Future-proof now or future-pain later. Two options. (1) Add a clearly labelled spare way on the CU (with the busbar capacity to take it) and run a draw-string in the trunking on the relevant route. (2) Size the sub-main and main cables now for the eventual full load, not just today&rsquo;s. The cost difference between a 16 mm² and a 25 mm² sub-main fitted today is small; the cost of upgrading it later is enormous. A senior electrician will always size the spine of the install for the building&rsquo;s likely 10-year future, not just the current spec.',
  },
];

export default function Sub8() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 3 · Subsection 8"
            title="Designing a small installation"
            description="Take a real spec — a small commercial unit, 200 m², single-phase 100 A TN-C-S supply. Design every circuit. Apply every concept from §3 Subs 1 to 7. Produce a complete circuit schedule with protective devices, cable sizes, containment and a fill check."
            tone="emerald"
          />

          <TLDR
            points={[
              'Real design starts with the load list, then maximum demand and diversity, then circuit-by-circuit selection — never the other way round. By the time you reach cable sizing every other decision is locked in.',
              'A small commercial unit on a 100 A single-phase TN-C-S supply gives you ~13 final circuits across lighting / sockets / dedicated loads. The supply rating, not the floor area, sets the design ceiling.',
              'Synthesis lens — every Sub in §3 contributes one column of the final schedule. Sub 3.1 picks circuit shape, Sub 3.2 picks wiring system, Sub 3.3 sizes the cable, Sub 3.4 picks the device, Sub 3.5 informs install kit, Sub 3.6 sizes the containment, Sub 3.7 ties it all together.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Read a small commercial brief (floor area, intake rating, load list) and produce a full final-circuit list with the correct shape (radial / ring / dedicated) for each load class.',
              'Apply BS 7671 Appendix 1 diversity correctly to derive maximum demand and verify it sits inside the cut-out fuse rating.',
              'Select the appropriate wiring system per circuit and per environment (T&E, SWA, conduit, trunking) using §3 Sub 3.2 reasoning.',
              'Size every final circuit using the §3 Sub 3.7 ten-gate process and produce a clean schedule row per circuit (Ib, In, cable, derated Iz, Vd, Zs).',
              'Pick the right protective device per circuit — MCB type (B/C/D), RCBO, RCD type (AC/A/B), AFDD where applicable, and the correct SPD type at the origin.',
              'Run the OSG Appendix H spacing-factor calc on the principal containment run and verify the matching Cg derate has been applied to the cable sizing.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="The brief"
            plainEnglish="A small ground-floor commercial unit. 200 m² floor area split between a customer area at the front and back-of-house with kitchen, IT rack, plant room and rear yard. Single-phase 100 A TN-C-S intake. Mixed loads — typical for a small office, retail unit, treatment clinic or studio."
            onSite="The kind of fit-out you would meet within the first six months of a commercial apprenticeship. Single-phase, no exotic loads, but enough variety to need every Sub in §3."
          >
            <p>
              <strong>Building:</strong> 200 m² ground-floor commercial unit. 230 V single-phase
              TN-C-S supply, declared Ze = 0.35 Ω, 100 A cut-out fuse. New fit-out from bare
              shell.
            </p>
            <p>
              <strong>Areas:</strong> customer-facing area (~120 m²), back-of-house with staff
              area + kitchenette (~50 m²), plant room (~15 m²), rear yard with EV bay (~15 m²).
            </p>
            <p>
              <strong>Final circuits required (13 total):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>4 lighting circuits</strong> — general LED throughout, emergency lighting on its own circuit, external bulkhead/PIR, illuminated signage.</li>
              <li><strong>6 socket circuits</strong> — general staff area, kitchen ring, IT rack dedicated, plant-room sockets, EV charger dedicated, retail-floor ring.</li>
              <li><strong>3 dedicated circuits</strong> — HVAC condenser, water heater, server PDU.</li>
            </ul>
            <p>
              <strong>Supply, origin and CU layout:</strong> 100 A switch-fuse at the origin,
              SPD Type 2 fitted at the origin, distribution board with RCBO ways. Main bonding to
              MET. Containment along the back-of-house ceiling void in 50&times;50 mm metal
              trunking; T&E elsewhere; SWA for the buried run to the EV bay.
            </p>
            <div className="flex justify-center pt-2">
              <ConsumerUnit />
            </div>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Stage 1 — Load list and maximum demand</ContentEyebrow>

          <ConceptBlock
            title="Build the load list, then apply diversity"
            plainEnglish="Sum every circuit&rsquo;s rated demand assuming each runs at full load. That is the worst-case connected total. Apply BS 7671 Appendix 1 diversity to get the realistic maximum demand. Compare that to the 100 A supply."
            onSite="Diversity is the single biggest tool you have for keeping a small unit on a single-phase supply. Skip it and every job needs a 3-phase upgrade."
          >
            <p>
              Connected load summary (before diversity):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lighting (4 circuits) — 4 &times; ~6 A &asymp; 24 A.</li>
              <li>Sockets — retail ring, staff ring, kitchen ring, plant ring &asymp; 4 &times; 32 A &asymp; 128 A worst-case (almost never realised).</li>
              <li>IT rack dedicated radial — 16 A.</li>
              <li>EV charger — 30.43 A (7 kW &divide; 230 V).</li>
              <li>HVAC condenser — 17.4 A (4 kW &divide; 230 V).</li>
              <li>Water heater (immersion-style) — 13 A continuous (3 kW &divide; 230 V).</li>
              <li>Server PDU — 13 A continuous.</li>
            </ul>
            <p>
              <strong>Connected total:</strong> ~242 A — well over the 100 A supply if every
              circuit ran at full load simultaneously, which it will not.
            </p>
            <p>
              <strong>After BS 7671 Appendix 1 / OSG diversity:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lighting — 90 % of total = ~22 A.</li>
              <li>General socket circuits — 100 % of largest + 50 % of remainder = 32 + (3 &times; 32 &times; 0.5) = 32 + 48 = 80 A.</li>
              <li>IT rack — 100 % (continuous) = 16 A.</li>
              <li>EV charger — 100 % (no diversity) = 30.43 A.</li>
              <li>HVAC — 75 % (typical for cycling load) = 13 A.</li>
              <li>Water heater — 100 % = 13 A.</li>
              <li>Server PDU — 100 % = 13 A.</li>
            </ul>
            <p>
              The raw socket figure is conservative — for a small commercial unit the OSG actually
              allows tighter diversity than this. After applying realistic OSG Appendix A
              diversity for a small commercial unit (typically 25–40 % on general sockets after
              the largest), the after-diversity demand for the unit comes out at approximately
              <strong> 78–92 A</strong>, comfortably inside the 100 A supply but with limited
              headroom for future expansion. <em>This is exactly why a senior designer would
              flag the customer about a possible future 3-phase upgrade if more EV bays or
              kitchen kit are likely.</em>
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 314.1 (Division of installation)"
            clause="Every installation shall be divided into circuits, as necessary, to: (a) avoid danger and minimize inconvenience in the event of a fault; (b) facilitate safe inspection, testing and maintenance; (c) take account of hazards that may arise from the failure of a single circuit such as a lighting circuit; (d) reduce the possibility of unwanted tripping of RCDs due to excessive protective conductor (PE) currents not due to a fault; (e) mitigate the effects of electromagnetic disturbances; (f) prevent the indirect energizing of a circuit intended to be isolated."
            meaning={
              <>
                Reg 314.1 is the regulation that justifies the 13-circuit split. We do not run all
                the lighting on one circuit because (a) and (c) — a single fault would plunge the
                whole unit into darkness. We do not run sockets and IT on the same RCBO because
                (d) — IT equipment generates protective conductor current that nuisance-trips
                RCDs sharing the load. We give the EV its own circuit and its own RCD because
                (a) and (b). Every split in this design points back to one or more clauses of
                314.1.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 3, Chapter 31, Regulation 314.1."
          />

          <SectionRule />

          <ContentEyebrow>Stage 2 — Circuit shape per load class (Sub 3.1)</ContentEyebrow>

          <ConceptBlock
            title="Picking the shape — radial, ring, dedicated"
            plainEnglish="Each load class has a default shape. Lighting goes loop-in. General sockets up to 100 m² floor area go ring final. EV / heater / HVAC go dedicated radial. Stick to the defaults unless a specific reason pushes you off them."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>L1 — Customer-area lighting</strong> — 6 A loop-in radial, 1.5 mm² T&E, 6 A or 10 A Type B MCB.</li>
              <li><strong>L2 — Back-of-house lighting</strong> — same.</li>
              <li><strong>L3 — Emergency lighting</strong> — 6 A radial, dedicated, fed from same RCBO bank but flagged "Emergency — DO NOT switch off".</li>
              <li><strong>L4 — External / signage</strong> — 6 A radial, IP-rated fittings, controlled by photocell or timer.</li>
              <li><strong>S1 — Retail floor sockets</strong> — 32 A ring final, 2.5 mm² T&E, 30 mA RCBO Type A.</li>
              <li><strong>S2 — Staff area sockets</strong> — 32 A ring final, same.</li>
              <li><strong>S3 — Kitchen sockets</strong> — 32 A ring final dedicated to kitchenette, 30 mA RCBO Type A.</li>
              <li><strong>S4 — IT rack</strong> — 16 A dedicated radial, 2.5 mm² T&E, 30 mA RCBO Type A on its own way (avoid sharing nuisance-trip risk with general sockets).</li>
              <li><strong>S5 — Plant room sockets</strong> — 20 A radial, 2.5 mm² T&E, 30 mA RCBO Type A.</li>
              <li><strong>S6 — EV charger</strong> — 32 A dedicated radial, 6 mm² SWA buried + T&E indoors, 30 mA RCBO Type B (or Type A if charger has integrated DC RCM).</li>
              <li><strong>D1 — HVAC condenser</strong> — 20 A dedicated radial, 4 mm² T&E, 20 A Type C MCB (motor inrush).</li>
              <li><strong>D2 — Water heater</strong> — 16 A dedicated radial, 2.5 mm² T&E, 16 A Type B MCB.</li>
              <li><strong>D3 — Server PDU</strong> — 16 A dedicated radial, 2.5 mm² T&E, 16 A Type B AFDD-RCBO (server room arc-fault risk).</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Stage 3 — Wiring system per environment (Sub 3.2)</ContentEyebrow>

          <ConceptBlock
            title="Containment per area — three systems on one job"
            plainEnglish="The customer area gets concealed T&E in stud walls. The back-of-house ceiling void gets singles in metal trunking for flexibility. The yard gets SWA buried at the proper depth."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Customer area</strong> — T&E (6242Y) chased into stud walls and dropped to socket positions, capped, finished. Reg 522.6.202 satisfied via 30 mA RCD additional protection on every socket circuit.</li>
              <li><strong>Back-of-house ceiling void</strong> — 50&times;50 mm metal trunking carrying singles for the 6 socket circuits and the 4 lighting circuits, plus T&E for any short drops to fittings. Trunking grounds to MET.</li>
              <li><strong>Plant room</strong> — galvanised conduit and trunking — all surface-mount, no concealed work, mechanical protection from impact.</li>
              <li><strong>Rear yard to EV bay</strong> — 6 mm² SWA buried at minimum 600 mm depth (BS 7671 Reg 522.8.10 typical), warning tape above, marker posts at the property boundary.</li>
              <li><strong>External lighting / signage</strong> — IP-rated SWA or LSF flex out to fittings.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Stage 4 — Cable sizing per circuit (Sub 3.7 ten-gate process)</ContentEyebrow>

          <ConceptBlock
            title="Apply the ten gates to each circuit"
            plainEnglish="Sub 3.7 walked the ten gates on a single circuit. Now repeat the process for each of the 13 circuits and produce a schedule row. The shape of the calc is identical; only the inputs change."
            onSite="On a real design you do this in a spreadsheet or design tool. The output is a tidy schedule the supervisor and inspector both read."
          >
            <p>
              Schedule (after the ten-gate calc on each circuit). Numbers verified — Method C
              clipped direct, 30 °C ambient assumed indoors, derates applied where grouping or
              insulation justifies it.
            </p>
            <div className="space-y-2.5">
              {[
                { ckt: 'L1', desc: 'Customer ltg', ib: '5.0', in: '10', cable: '1.5 T&E', length: '28', vd: '1.77', device: 'B10 RCBO' },
                { ckt: 'L2', desc: 'BoH ltg', ib: '3.0', in: '6', cable: '1.5 T&E', length: '18', vd: '0.68', device: 'B6 RCBO' },
                { ckt: 'L3', desc: 'Emergency ltg', ib: '2.0', in: '6', cable: '1.5 T&E', length: '35', vd: '0.88', device: 'B6 RCBO' },
                { ckt: 'L4', desc: 'External / signage', ib: '3.0', in: '6', cable: '1.5 T&E', length: '22', vd: '0.83', device: 'B6 RCBO' },
                { ckt: 'S1', desc: 'Retail ring', ib: '≤32', in: '32', cable: '2.5 T&E', length: '42', vd: '2.59', device: 'B32 A-RCBO' },
                { ckt: 'S2', desc: 'Staff ring', ib: '≤32', in: '32', cable: '2.5 T&E', length: '28', vd: '1.72', device: 'B32 A-RCBO' },
                { ckt: 'S3', desc: 'Kitchen ring', ib: '≤32', in: '32', cable: '2.5 T&E', length: '15', vd: '0.92', device: 'B32 A-RCBO' },
                { ckt: 'S4', desc: 'IT rack radial', ib: '16', in: '16', cable: '2.5 T&E', length: '12', vd: '0.38', device: 'B16 A-RCBO' },
                { ckt: 'S5', desc: 'Plant sockets', ib: '≤20', in: '20', cable: '2.5 T&E', length: '8', vd: '0.13', device: 'B20 A-RCBO' },
                { ckt: 'S6', desc: 'EV charger', ib: '30.4', in: '32', cable: '6 SWA + T&E', length: '38', vd: '3.66', device: 'B32 B-RCBO' },
                { ckt: 'D1', desc: 'HVAC condenser', ib: '17.4', in: '20', cable: '4 T&E', length: '22', vd: '1.83', device: 'C20 RCBO' },
                { ckt: 'D2', desc: 'Water heater', ib: '13', in: '16', cable: '2.5 T&E', length: '14', vd: '0.36', device: 'B16 RCBO' },
                { ckt: 'D3', desc: 'Server PDU', ib: '13', in: '16', cable: '2.5 T&E', length: '10', vd: '0.26', device: 'B16 AFDD-RCBO' },
              ].map((row) => (
                <div
                  key={row.ckt}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 mb-2.5">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-elec-yellow font-semibold text-[14px] tracking-wider">
                        {row.ckt}
                      </span>
                      <span className="text-white text-[14px] font-medium">
                        {row.desc}
                      </span>
                    </div>
                    <span className="text-[11px] uppercase tracking-wider text-white/60 font-medium">
                      {row.device}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[12.5px] text-white/85">
                    <div className="flex justify-between">
                      <span className="text-white/55">Ib</span>
                      <span className="font-medium">{row.ib} A</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/55">In</span>
                      <span className="font-medium">{row.in} A</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/55">Cable</span>
                      <span className="font-medium">{row.cable}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/55">Length</span>
                      <span className="font-medium">{row.length} m</span>
                    </div>
                    <div className="flex justify-between col-span-2">
                      <span className="text-white/55">Voltage drop</span>
                      <span className="font-medium">{row.vd} %</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[12.5px] text-white/70 italic">
              Vd % uses indicative mV/A/m: 1.5&nbsp;T&E = 29, 2.5 = 18, 4 = 11, 6 = 7.3 (clipped direct). All circuits clear the 5 % limit (3 % for lighting). Numbers rounded to two decimals.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Stage 5 — Protective devices (Sub 3.4)</ContentEyebrow>

          <ConceptBlock
            title="Device selection — MCB type, RCD type, AFDD, SPD"
            plainEnglish="Each circuit gets the protective device family that matches its load behaviour and the surrounding regs. Type B MCBs for resistive and small inductive loads; Type C for the HVAC inrush; Type A RCDs for general; Type B RCDs for the EV; AFDD on the server PDU; Type 2 SPD at the origin."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lighting (L1–L4)</strong> — Type B MCB integrated into a Type A RCBO. Type A handles the pulsating DC fault waveforms from LED drivers.</li>
              <li><strong>General socket rings (S1–S3, S5)</strong> — Type B MCB integrated into a Type A RCBO at 32 A (or 20 A for plant). Reg 411.3.3 mandates 30 mA RCD on socket outlets up to 32 A.</li>
              <li><strong>IT rack (S4)</strong> — its own Type A RCBO to keep the IT-driven PE current off the shared general-sockets RCBO. Stops the routine "RCD trip every Monday morning when the office lights up" failure mode.</li>
              <li><strong>EV charger (S6)</strong> — Type B RCBO (or Type A + integrated DC RCM in the charger). BS 7671 Section 722 + Reg 722.531.3.5 require DC fault protection.</li>
              <li><strong>HVAC (D1)</strong> — Type C MCB (5–10× In magnetic trip) to ride out the compressor inrush. RCBO if the condenser is outdoors.</li>
              <li><strong>Water heater (D2)</strong> — Type B MCB at 16 A. Steady resistive load, no inrush.</li>
              <li><strong>Server PDU (D3)</strong> — Type B AFDD-RCBO. Reg 421.1.7 recommends AFDDs for AC final circuits supplying socket-outlets ≤ 32 A in dwellings (with the recommendation strengthening to a requirement in HRRBs under the Building Safety Act 2022 framework, and treated as effectively required in HMOs / sleeping accommodation / care homes by fire-safety guidance). On this commercial install AFDDs are not in that scope, but a server room with high-density wiring and concealed cabling is exactly the kind of arc-fault-risk environment where they earn their keep.</li>
              <li><strong>Origin SPD</strong> — Type 2 SPD at the consumer-unit origin (Section 443 / 534). No exposed overhead supply, no external lightning protection system, so Type 1 is not required.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.3 (Additional protection — socket outlets)"
            clause="411.3.3 has been revised and now applies to socket-outlets with a rated current not exceeding 32 A. There is an exception to omit RCD protection where, other than for a dwelling, a documented risk assessment determines that RCD protection is not necessary."
            meaning={
              <>
                Reg 411.3.3 makes 30 mA RCD additional protection the default on every socket
                outlet up to 32 A, in any installation. The only escape route is a documented
                risk assessment (and that escape is not available in a dwelling). For our
                small commercial unit, every general socket circuit gets a 30 mA RCBO. The
                IT rack and the plant-room sockets are also socket outlets and also get the
                30 mA RCBO — the documented risk assessment exception is reserved for
                fault-finding on industrial control systems where nuisance-tripping a
                production line would create greater danger.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.3."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.4 (Additional protection — domestic luminaires)"
            clause="411.3.4 requires that, within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires."
            meaning={
              <>
                Reg 411.3.4 applies <strong>only</strong> to domestic premises. In our
                commercial unit it does not bite, so 30 mA RCD on lighting is a design
                choice, not a regs mandate. Most modern RCBO consumer-unit fits have RCBOs on
                every way anyway, so all four lighting circuits end up RCD-protected — but the
                regs do not force it commercially. Worth knowing because a domestic-trained
                electrician will sometimes apply 411.3.4 by reflex on commercial work and
                miss that the requirement is location-specific.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.4."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (Arc fault detection devices) (paraphrased)"
            clause="Regulation 421.1.7 has been introduced recommending the installation of arc fault detection devices (AFDDs) to mitigate the risk of fire in AC final circuits of a fixed installation due to the effects of arc fault currents — specifically AC final circuits supplying socket-outlets with rated current not exceeding 32 A in dwellings."
            meaning={
              <>
                Reg 421.1.7 itself uses <em>recommending</em> wording: AFDDs are recommended for
                AC final circuits supplying socket-outlets ≤ 32 A in dwellings. The recommendation
                strengthens to a requirement in Higher-Risk Residential Buildings (HRRBs) under
                the Building Safety Act 2022 framework. In HMOs, sleeping accommodation and care
                homes, supporting fire-safety guidance treats AFDDs as effectively required
                practice. Our small commercial unit is not in any of those categories, but the
                AFDD-RCBO on the server PDU is a sensible application of the recommendation —
                high-density cabling, concealed runs, expensive and hard-to-replace IT load.
                AFDDs are prohibited in medical group 0 and 2 locations (Reg 710.421.1.7) — not
                relevant here, but worth knowing.
              </>
            }
            cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Part 4, Chapter 42, Regulation 421.1.7 for the full text; Building Safety Act 2022 framework for HRRBs."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Stage 6 — Containment fill check (Sub 3.6)</ContentEyebrow>

          <ConceptBlock
            title="The 50&times;50 mm trunking carrying 6 socket + 4 lighting singles"
            plainEnglish="Six 32 A circuits worth of singles (line + neutral + CPC for each ring = 18 conductors of 2.5 mm²) plus four 6/10 A lighting circuits (12 conductors of 1.5 mm²) all share the back-of-house ceiling void trunking. Run the OSG Appendix H fill calc."
          >
            <p>
              Cable factors from OSG Appendix H Table H4 (singles, copper):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1.5 mm² single — cable factor 8.0 per conductor.</li>
              <li>2.5 mm² single — cable factor 11.4 per conductor.</li>
            </ul>
            <p>
              Conductor count: 6 socket circuits &times; 3 cores (L, N, CPC) = 18 of 2.5 mm². 4
              lighting circuits &times; 3 cores = 12 of 1.5 mm² (or 2 cores switched live runs
              are a separate calc; we will assume worst case 3 cores for sizing).
            </p>
            <p>
              Total cable factor = (18 &times; 11.4) + (12 &times; 8.0) = 205.2 + 96.0 ={' '}
              <strong>301.2</strong>.
            </p>
            <p>
              Trunking factor for 50&times;50 mm steel trunking from OSG Table H5 ≈
              <strong> 1037</strong>.
            </p>
            <p>
              Effective fill = 301.2 / 1037 = <strong>29 %</strong>. Comfortably under the 45 %
              maximum. Spare capacity ≈ (1037 &times; 0.45) − 301.2 = 466.65 − 301.2 = 165.45
              factor units — enough headroom for one or two more 2.5 mm² circuits later.
            </p>
            <p>
              <strong>Cg derate cross-check:</strong> from BS 7671 Table 4C1, 10 grouped
              circuits gives Cg ≈ 0.50. Our 32 A ring circuits in 2.5 mm² T&E have a tabulated
              CCC of ~27 A clipped direct (Method C); after Cg = 0.50 the derated Iz = ~13.5
              A — which would <strong>fail</strong> Reg 433.1.1 against a 32 A device. To make
              the trunking work as designed we either (a) split the trunking into two parallel
              50&times;50 mm runs to halve the grouping per trunking, or (b) use larger CSA
              singles — 4 mm² for the rings — to absorb the Cg hit. <em>This is exactly
              the kind of finding that surfaces during the fill check and forces a redesign
              upstream.</em>
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Specifying a Type 1 SPD at every origin because someone read the 'always fit an SPD' rule"
            whatHappens={
              <>
                Section 443 says fit an SPD unless a risk assessment says otherwise — fair
                enough. You spec a Type 1 SPD at the consumer unit on every job, including this
                small commercial unit with no overhead supply and no external lightning
                protection system. The Type 1 costs three times the Type 2, takes more space
                in the CU, and brings tighter installation rules (16 mm² minimum connecting
                conductor per Reg 534.4.10). You have over-engineered the protection at the
                customer&rsquo;s expense.
              </>
            }
            doInstead={
              <>
                Type 1 is for direct-strike protection — required where the building has an
                external BS EN 62305 lightning protection system, an exposed overhead supply,
                or specific risk-assessment outcomes pointing to direct lightning current
                exposure. <strong>Type 2 at the origin is the standard fit for a typical
                small commercial unit</strong> — handles switching surges and indirect lightning,
                with sensible Reg 534.4.10 sizing. Type 3 is added at sensitive equipment
                downstream where a final layer of clamping is justified. Read Section 443 +
                the BS EN 62305 risk assessment, then size the SPD to the answer — not by
                reflex.
              </>
            }
          />

          <Scenario
            title="Apprentice spots that the architect&rsquo;s drawing puts the EV charger 80 m from the CU"
            situation={
              <>
                You are halfway through the Stage 4 schedule. Circuit S6 — the EV charger —
                is shown on the architect&rsquo;s drawing as wall-mounted at the back of the
                rear yard, 80 m by route from the consumer unit (round the perimeter, down a
                kerb, across the yard). At 30.4 A on 6 mm² SWA the Vd is (7.3 &times; 30.4
                &times; 80) / 1000 = <strong>17.76 V</strong> — that is <strong>7.7 %</strong>{' '}
                of 230 V. Well over the 5 % non-lighting limit.
              </>
            }
            whatToDo={
              <>
                Three options, in order of preference. (1) Re-route the SWA to shorten the run —
                the architect&rsquo;s drawing assumed perimeter routing; a direct buried route
                across the yard cuts to ~50 m and brings Vd to 4.8 %. (2) If routing is fixed,
                size up to 16 mm² SWA — Vd drops to ~6.7 V (2.9 %) but the cable cost more
                than doubles. (3) Move the EV bay closer to the building (~30 m route) — needs
                customer sign-off but is the cheapest fix electrically. Flag all three to the
                supervisor with cost and disruption notes; let the customer choose.
              </>
            }
            whyItMatters={
              <>
                This is exactly the value an apprentice adds during design review. The
                architect drew the EV bay where it looked best on the site plan. The Vd gate
                catches it before the cable goes in the ground. The cost of changing a drawing
                is zero; the cost of changing a buried SWA run is enormous.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Final summary</ContentEyebrow>

          <ConceptBlock
            title="What you have just produced"
            plainEnglish="A complete design package — load list, after-diversity demand, 13 circuit specifications, full schedule, device list, containment fill check, and a documented size-up rationale for the EV circuit. Everything an inspector and a senior electrician will check before sign-off."
            onSite="This is what LO3 looks like in real practice. Not 35 disconnected facts — one design that holds together top to bottom."
          >
            <p>
              The deliverable for the supervisor and customer:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Header block</strong> — 230 V single-phase TN-C-S, declared Ze = 0.35 Ω, 100 A cut-out, after-diversity maximum demand ~80 A.</li>
              <li><strong>Distribution board</strong> — 13-way RCBO board, Type 2 SPD at the origin, MET with main bonding to gas and water service entries.</li>
              <li><strong>Circuit schedule</strong> — 13 rows (Stage 4 table) with Ib / In / cable / route / Vd / device. Each row defendable column by column.</li>
              <li><strong>Containment</strong> — 50&times;50 mm steel trunking BoH ceiling void, 29 % fill, with the Cg redesign decision documented.</li>
              <li><strong>Wiring systems</strong> — T&E concealed (Reg 522.6.202 satisfied via 30 mA RCD), singles in trunking BoH, SWA buried to EV.</li>
              <li><strong>Sign-off</strong> — supervisor reviews, signs the schedule, then procurement and install proceed.</li>
            </ul>
            <p>
              That is LO3 in one design. Each Sub from 3.1 to 3.7 contributed one column or one
              decision. None of it can be skipped; none of it can be done out of order.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="What's next — Section 4: Earthing systems and ADS"
            plainEnglish="You have just designed circuits that all rely on Ze = 0.35 Ω being given to you and the Zs sanity check clearing. Section 4 is where the earth-fault story actually lives — what Ze is, where it comes from, how (R1 + R2) is measured, and how ADS protects people from electric shock."
          >
            <p>
              Section 4 takes the earthing-system assumption you made all through this Sub
              (TN-C-S, Ze = 0.35 Ω) and explains where every part of it comes from:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>The three earthing system types — TN-S, TN-C-S (PME), TT — and how to identify each on site.</li>
              <li>The fault loop in detail — Ze, R1 + R2, Zs, and the disconnection times in BS 7671 Table 41.1 and 41.3.</li>
              <li>Main protective bonding, supplementary equipotential bonding, and where each is required.</li>
              <li>The earth electrode arrangement on a TT system and how to test it.</li>
              <li>RCD additional protection — when it is required and when it is the only path to ADS compliance.</li>
            </ul>
            <p>
              Cable sizing and earthing are two halves of the same compliance story — Reg 433.1.1
              and Reg 411 working together. Section 4 closes the loop.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Real design starts with the load list and ends with a signed-off schedule. The order — load list → diversity → circuit list → wiring system → cable size → device → containment + fill → sign-off — is fixed.',
              'BS 7671 Reg 314.1 is the regulation behind the 13-circuit split. Lighting on its own circuits, IT on its own RCBO, EV on its own dedicated radial — every split points back to one of the six clauses of 314.1.',
              'Reg 411.3.3 mandates 30 mA RCD on every socket outlet up to 32 A in any installation. Reg 411.3.4 only mandates 30 mA RCD on lighting in domestic premises — commercial lighting RCD is a design choice.',
              'EV charger circuits (Section 722, Reg 722.531.3.5) require Type B RCD or Type A with integrated DC RCM in the charger. Type AC and Type A alone are non-compliant on EV.',
              'Type 2 SPD at the origin is the standard fit for a small commercial unit. Type 1 is reserved for buildings with external lightning protection or exposed overhead supply, after a BS EN 62305 risk assessment.',
              'The fill check (OSG Appendix H, 45 % maximum) and the grouping derate (Cg, BS 7671 Tables 4C1–4C5) are two faces of the same problem — pack cables together, both their physical room and their electrical CCC suffer.',
            ]}
          />

          <Quiz title="Designing a small installation — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section3/3-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.7 Cable sizing worked end-to-end
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section4/4-1')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 4 — Earthing systems and ADS
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
