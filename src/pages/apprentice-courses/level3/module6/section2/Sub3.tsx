/**
 * Module 6 · Section 2 · Subsection 3 — Domestic load assessment worked end-to-end
 * Maps to C&G 2365-03 / Unit 305 / LO2 / AC 2.4
 *   AC 2.4 — "Determine the maximum demand and design current of single-phase domestic installations"
 *
 * Layered depth: 2366-03 Unit 304 / AC 2.3; 5393-03 Unit 104 / AC 2.3
 *
 * One real dwelling. Connected load schedule, OSG diversity per category,
 * heat-pump and EV layering, supply check vs the 100 A cut-out, and the
 * decision tree: load-manage, upgrade, or stay within budget.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { LoadCalculator } from '@/components/apprentice-courses/LoadCalculator';
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

const TITLE = 'Domestic load assessment (2.4) | Level 3 Module 6.2.3 | Elec-Mate';
const DESCRIPTION =
  "End-to-end domestic load assessment. Real four-bed dwelling with EV, heat pump and PV. Build the load schedule, apply OSG Table A1 diversity per category, derive Ib at the supply origin, and decide between load management, supply upgrade or hold.";

const checks = [
  {
    id: 'dwelling-ib',
    question:
      "A four-bed dwelling has: 9.5 kW shower, 7.2 kW cooker (31.3 A), 3 kW immersion (uncontrolled), kitchen ring, lounge ring, upstairs ring, 1.2 kW LED lighting, 7.4 kW EV charger (32 A, OZEV-compliant load-managed to 16 A peak), 9 kW air-source heat pump (39 A nameplate). What is the rough diversified Ib at 230 V?",
    options: [
      "T = source directly earthed, N = installation exposed parts connected to that source earth via PE, C = combined N+PE in part of the system, S = separated N and PE in another part",
      "Because they extract a much larger quantity of heat from a renewable source (the outside air or ground) than the electricity input would deliver if used for direct resistive heating — typically 3:1, so they massively reduce the carbon footprint of heating.",
      "Bonding internal copper water pipework where the incoming water service is plastic — the internal copper has no external earth path so is unlikely to be extraneous (NOTE to Reg 411.3.1.2)",
      "About 95-110 A — heat pump and shower at 100 percent + cooker diversified to ~22 A + ring finals at OSG percentages + lighting at 100 percent + load-managed EV at 16 A. Right at the 100 A service limit.",
    ],
    correctIndex: 3,
    explanation:
      "Run the OSG categories: shower 41 A (100 percent), cooker 10 + 30%(31-10) + 5 = ~22 A, immersion 13 A (100 percent uncontrolled), kitchen ring at peak ~20 A, other rings ~13 A combined diversified, lighting ~5 A, EV at managed setpoint 16 A, heat pump 39 A (100 percent). Sum ~169 A on paper but applying 0.65 inter-category coincidence (not all peaking at the same instant) gives ~110 A peak. With heat pump cold-snap morning + EV evening this can exceed the 100 A cut-out fuse. Either upgrade the supply or tighten the load-managed setpoint.",
  },
  {
    id: 'documentation-page',
    question:
      "What goes on the diversity calc page in the design pack?",
    options: [
      "Cable cutters (or T+E shears) to crop the tail square; a stripper sized for 6/10 mm² to remove the green/yellow PVC; long-nose pliers to form the conductor into the clamp aperture OR a ratchet crimper to fit a bootlace ferrule (red for 10 mm², blue for 6 mm²) before insertion. Squared cut + clean strip + correct termination = 526.1 compliant.",
      "Because schedules give a sortable, filterable, totalisable list that drives procurement, install QC and as-installed verification — annotations on a layout cannot be totalised, sorted or counted at a glance. The SLD and the layouts show position and topology; the schedules give the bill.",
      "They are Distribution Network Operator engineering recommendations governing how customer-owned generation is connected in parallel with the public supply network — separate from BS 7671 (a British Standard) and from MCS (a certification scheme).",
      "A table per load category: connected load (kW or A), diversity factor applied, source citation (OSG Table A1 entry, GN1 Section 7 reference, manufacturer datasheet, project measurement), resulting category Ib. Then the inter-category coincidence factor applied at supply level. Then the failure-mode assessment per Reg 311.2.",
    ],
    correctIndex: 3,
    explanation:
      "Reg 132.13 (Documentation) and Reg 311.1 / 311.2 stack to require an auditable diversity calc. A discrete table page with category, factor, source citation and resulting Ib lets a peer reviewer or the next contractor pick up the design without guessing. Reg 311.2 then needs the load-management failure-mode demand alongside the normal-operation demand.",
  },
  {
    id: 'supply-decision',
    question:
      "Diversified Ib comes out at 95 A on a 100 A single-phase service. The right design move is:",
    options: [
      "Lower electricity bills (offset import + earn SEG on export), reduced carbon footprint, partial grid-independence (with battery), a hedge against rising electricity prices, often a positive impact on house value, and government incentive schemes that vary by year. Real benefits — but not “free electricity”.",
      "A highly sensitive system that continuously draws air samples through a pipe network to a central laser detection chamber, providing very early warning of smoke — used in data centres, clean rooms, heritage buildings, and high-value environments",
      "Reflect on whether unconscious bias or personal factors are influencing their behaviour, seek peer feedback, and consider whether the apprentice\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\u2019s needs require a different mentoring approach",
      "Either tighten the load-management setpoint to bring peak down to ~80 A (giving 20 A headroom for transients and future creep), apply for a DNO supply upgrade to 125 A or three-phase, or document the customer's acceptance of the tight margin in writing.",
    ],
    correctIndex: 3,
    explanation:
      "95 A on a 100 A service is technically compliant but leaves no margin for inrush transients (heat pump compressor start, EV charger ramp, kettle), seasonal load creep, or future EV upgrade. Good practice is 75-85 A peak design on a 100 A service. Options: tighten load management, upgrade the supply, or document the constraint and the customer's acceptance. Never sign off a 95-99 A design and walk away.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'For a domestic load assessment, the first step is:',
    options: [
      'Five — A (solids), B (flammable liquids), C (flammable gases), D (metals), F (cooking oils). Plus electrical (no class letter — uses CO2 or dry powder).',
      'Build the connected load schedule — every fixed appliance, every socket-outlet position, every dedicated circuit, with nameplate kW or A — before applying any diversity.',
      'Using the CMMS effectively for day-to-day maintenance tasks, understanding how your data contributes to maintenance planning, and producing accurate records',
      'The electrician is probably solving problems FOR team members rather than helping them think through solutions; they should use Socratic questions to guide self-discovery and ownership',
    ],
    correctAnswer: 1,
    explanation:
      "The load schedule is the source data for the diversity calc. Without a complete schedule the diversity calc is missing inputs and the Ib at supply origin is wrong. Schedule first; diversify second; size third.",
  },
  {
    id: 2,
    question: 'A 9.5 kW instantaneous electric shower at 230 V draws approximately:',
    options: [
      '95 A',
      '9.5 A',
      '41 A',
      '230 A',
    ],
    correctAnswer: 2,
    explanation:
      "I = P / V = 9500 / 230 = 41.3 A. The OSG dwelling diversity for a single instantaneous shower is 100 percent — no reduction. Showers are short-duration high-demand loads that justify full design current.",
  },
  {
    id: 3,
    question: 'A 9 kW air-source heat pump at 230 V single-phase draws approximately:',
    options: [
      '20 A',
      '9 A',
      '90 A',
      '39 A',
    ],
    correctAnswer: 3,
    explanation:
      "I = 9000 / 230 ≈ 39 A nameplate. Heat pumps are typically designed at 100 percent demand because of long duty cycle during cold-snap mornings. Some manufacturers publish refined duty-cycle data; default to 100 percent unless that data is in hand.",
  },
  {
    id: 4,
    question: 'Applying OSG cooker diversity to a 7.2 kW cooker (31.3 A) with integrated 13 A cooker socket gives Ib of approximately:',
    options: [
      '~22 A',
      '31 A',
      '5 A',
      '13 A',
    ],
    correctAnswer: 0,
    explanation:
      "OSG cooker formula: 10 A + 30 percent of (31.3 − 10) + 5 A = 10 + 6.4 + 5 = 21.4 A. Round up to 22 A. Specify a 32 A B-curve breaker on 6 mm² T+E typical, or stay at the as-built 32 A way if upgrading.",
  },
  {
    id: 5,
    question: 'Inter-category coincidence factor at the supply origin for a single dwelling:',
    options: [
      'Change the conduit size or add a draw box, then re-check the spacing factor (Sub 3.6) — sizing is not just electrical, it is mechanical too.',
      'Typically 0.6-0.8 for traditional dwellings (categories rarely peak at the same instant); pushing toward 0.8-0.95 for heat-pump and EV-rich dwellings (cold-morning categories align more).',
      'The observable symptoms exactly as reported by the operator and as found during your investigation, without jumping to conclusions about the cause',
      'The complete sequence including preparatory work, isolation, changeover procedure, testing, commissioning, reinstatement and handover',
    ],
    correctAnswer: 1,
    explanation:
      "Inside a single dwelling the cooker peak (dinner) does not always align with the shower peak (morning) or the EV charge peak (overnight). Traditional dwellings give 0.6-0.8 across categories. Modern dwellings with heat pump (cold morning continuous) + EV (evening + overnight) + cooker (dinner) start to overlap more, pushing the coincidence factor toward 0.85-0.95. Document the assumption.",
  },
  {
    id: 6,
    question: 'OZEV smart charge points regulations (2018 / 2021) require a domestic EV charger to:',
    options: [
      'Notifiable work under Approved Doc P must be done by a Competent Person Scheme registered installer OR notified to local authority building control (with associated fees and inspection). CPS registration is the normal industry route - NICEIC, NAPIT, ELECSA, Stroma etc.',
      'Three-point fall-of-potential method (most accurate, requires auxiliary spikes), OR earth fault loop impedance test method (Ze test on TT, gives an approximation including supply contribution), OR clamp-meter method (loop impedance via stake current/voltage)',
      'Have smart functionality including default off-peak charging window, randomised start delay, and the ability to respond to a demand-side response signal — practically meaning the charger can be load-managed.',
      'Cognitive distortions amplify perceived threats, trigger stronger amygdala responses, and create misinterpretations that provoke defensive reactions from others, creating escalation spirals',
    ],
    correctAnswer: 2,
    explanation:
      "The OZEV smart charge points regulations (Electric Vehicles (Smart Charge Points) Regulations 2021) mandate smart functionality on new domestic EV chargers in Great Britain. This is the practical foundation that makes load management of EV chargers a credible diversity tool — the hardware already supports it.",
  },
  {
    id: 7,
    question: 'When a load-managed EV charger fails, Reg 311.2 (A4:2026) requires the design to:',
    options: [
      'Typically 0.6-0.8 for traditional dwellings (categories rarely peak at the same instant); pushing toward 0.8-0.95 for heat-pump and EV-rich dwellings (cold-morning categories align more).',
      'A suitable and sufficient assessment of risks to employees and others affected by their work, recorded if 5+ employees, reviewed when significant changes occur',
      'The installation uses a TN-S earthing arrangement with a separate neutral and earth, requiring the neutral to be switched along with the three phases to prevent neutral current circulating between sources',
      'Assess the maximum demand under the failure-mode condition, document the manufacturer fall-back behaviour (typically a fixed reduced current or full-rate), and confirm the supply still survives or specify additional protection.',
    ],
    correctAnswer: 3,
    explanation:
      "Reg 311.2 (A4:2026) makes load-management failure-mode assessment a discrete design step. Most OZEV-compliant chargers have a manufacturer-defined fall-back state — often a fixed reduced rate (e.g. 16 A) but some default to full rated current. Read the datasheet; document the fall-back demand; confirm the supply margin survives the worst case.",
  },
  {
    id: 8,
    question: 'A diversified Ib of 78 A on a 100 A service is best described as:',
    options: [
      'Healthy headroom — 22 A margin for transients, future creep, and seasonal swings. Good design target.',
      'It provides the overarching legal framework under which the Electricity at Work Regulations 1989 were made',
      'A notice that immediately stops a dangerous work activity until the risk is adequately controlled',
      'All electrical systems are constructed, maintained and worked on so as to prevent danger',
    ],
    correctAnswer: 0,
    explanation:
      "A typical good-practice design target is 75-85 percent of supply rating at full design demand. 78 A on 100 A leaves 22 A margin (22 percent) which absorbs heat pump compressor start transients, kettle bursts, and 5-10 years of load creep. Designs in the 90+ A range on a 100 A service are short-margin and risk nuisance trips on cold mornings.",
  },
];

const faqs = [
  {
    question: 'Do I need to redo the diversity calc if the customer adds a load after handover?',
    answer:
      "Yes. The original diversity calc is for the as-handover load schedule. Adding a 7 kW EV charger or a heat pump materially changes Ib and may push the supply over rating. The L3 designer who handles the addition must redo the diversity calc, recheck the supply margin, and update the design pack. Many post-handover failures (nuisance trips, cut-out fuse blowing) trace to additions made without a fresh diversity calc.",
  },
  {
    question: "What if the dwelling has solar PV — does that reduce my design Ib?",
    answer:
      "No, not at the design-current level. PV exports to the grid mid-day when the household is typically at low demand; in the evening (peak demand) PV is generating zero or near zero. The supply Ib must be sized for the worst-case grid draw, which is the evening peak. Battery storage can reduce evening peak grid draw if sized for the household profile, but the design floor is still the no-battery worst case unless you can demonstrate battery dispatch reliability. Reg 712 (PV) covers the technical specifications; the diversity calc uses worst-case grid demand.",
  },
  {
    question: 'How do I size the tails for an upgraded supply?',
    answer:
      "Tail sizing follows Reg 433.1.1: Ib ≤ In ≤ Iz. For a 100 A service the typical tail is 25 mm² double-insulated meter tail, Iz around 100-110 A depending on installation. For a 125 A upgrade most installers run 35 mm² tails. The tails are sized for the supply fuse rating, not just the diversified Ib — you must accommodate the fuse not opening until well above its rated current. The DNO will specify minimum tail size for the supply rating; check the local DNO connections policy.",
  },
  {
    question: 'How do I handle a household with multiple electric vehicles?',
    answer:
      "Two EVs at 7 kW each is 14 kW (61 A) of EV demand — alone bigger than many older dwellings' total connected load. Options: (1) site-managed with both chargers throttled to share a 32-40 A combined peak; (2) supply upgrade to 125 A or three-phase to accommodate; (3) one charger only with a vehicle-rotation schedule. Document the choice. Two-EV households are increasingly common and the 1990s OSG diversity does not address them.",
  },
  {
    question: 'Does PV inverter connection count as a load on the diversity calc?',
    answer:
      "No. PV is a generator, not a load. It connects via Section 712 requirements with its own AC isolation. The PV inverter does not add to the supply Ib calculation; it offsets household demand against grid. However, the PV breaker on the consumer unit does need a free way and must be considered in CU way count and main switch coordination. For a 4 kWp single-phase PV, the AC inverter typically rates at 16 A — the way needs sizing for that, but it is a generation way, not a demand way.",
  },
  {
    question: 'Do battery storage systems count as a load on the diversity calc?',
    answer:
      "Battery charge mode does count — when charging from grid (typically off-peak overnight) the battery draws 3-7 kW depending on size. Diversity-wise, battery charge usually scheduled to off-peak hours when household demand is low, so it does not aggregate with peak. But Reg 311.2 requires the failure-mode check: if the battery scheduler fails and the battery tries to charge during peak, can the supply still survive? Document the assumption. Battery discharge mode supplies the household — it reduces grid demand, but design supply Ib for the no-battery worst case unless dispatch reliability is verified.",
  },
];

export default function Sub3() {
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
            eyebrow="Module 6 · Section 2 · Subsection 3"
            title="Domestic load assessment — worked end-to-end"
            description="One real four-bed dwelling with EV charger, heat pump and PV. Build the connected load schedule, apply OSG Table A1 diversity per category, derive Ib at the supply origin, and decide between load management, supply upgrade or hold."
            tone="amber"
          />

          <TLDR
            points={[
              "Domestic load assessment is a four-step workflow: build connected load schedule, apply OSG Table A1 diversity per category, apply inter-category coincidence at the supply, document the result on a diversity calc page with source citations.",
              "Modern dwellings with heat pump + EV + battery are at or beyond the 100 A standard service. The diversity calc tells you whether to load-manage, upgrade the supply or sit tight before any cable goes in.",
              "Reg 311.2 (A4:2026) requires the design to assess the load-management failure-mode demand. Document the fall-back behaviour from the manufacturer datasheet and confirm the supply still survives the worst case.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Build a complete connected load schedule for a typical UK dwelling — every fixed appliance, every socket-outlet position, every dedicated circuit, with nameplate kW or A.',
              'Apply OSG Table A1 dwelling diversity per category — cooker formula, ring final percentages, instantaneous shower, immersion heater, lighting, EV charger and heat pump.',
              'Apply inter-category coincidence at the supply origin to derive the diversified Ib at the dwelling cut-out.',
              'Recognise where modern load profiles (heat pump + EV + battery) require updated diversity assumptions vs traditional 1990s OSG defaults.',
              'Decide between load management, supply upgrade or hold based on the diversified Ib vs the supply rating, with the design margin sized for transients and future load creep.',
              'Document the diversity calc on a discrete table page in the design pack with category, connected load, diversity factor, source citation, resulting Ib, and the load-management failure-mode assessment per Reg 311.2.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="Step 1 — build the connected load schedule"
            plainEnglish="Walk every room. List every fixed appliance, every socket-outlet position, every dedicated circuit. Nameplate kW or A on each. No diversity yet."
            onSite="The most common omission is the immersion heater (assumed to be off) or the future EV charger (assumed not relevant). Both belong on the schedule because both will draw at peak when they decide to."
          >
            <p>
              The connected load schedule is the source data for everything that follows. A complete schedule for a typical four-bed dwelling looks like:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Shower (en-suite):</strong> 9.5 kW instantaneous = 41 A.</li>
              <li><strong>Cooker (free-standing electric):</strong> 7.2 kW = 31 A nameplate, with integrated 13 A cooker socket.</li>
              <li><strong>Immersion heater (cylinder):</strong> 3 kW = 13 A.</li>
              <li><strong>Kitchen ring final:</strong> 32 A nameplate.</li>
              <li><strong>Lounge / dining ring final:</strong> 32 A nameplate.</li>
              <li><strong>Upstairs bedroom ring final:</strong> 32 A nameplate.</li>
              <li><strong>Lighting (downstairs + upstairs):</strong> 1.2 kW total LED = 5 A.</li>
              <li><strong>EV charger (driveway):</strong> 7.4 kW single-phase = 32 A, OZEV-compliant smart with manufacturer fall-back at 16 A.</li>
              <li><strong>Heat pump (air-source, garden):</strong> 9 kW nameplate single-phase = 39 A.</li>
              <li><strong>PV inverter (4 kWp roof):</strong> 16 A AC export — generator way, not a load.</li>
              <li><strong>Battery (home storage):</strong> 5 kW charge / discharge — scheduled off-peak charging, peak discharge.</li>
              <li><strong>Smoke alarms, doorbell, low-load fixed equipment:</strong> negligible total.</li>
            </ul>
            <p>
              Sum of nameplate active demand (excluding PV which is generation): shower 9.5 + cooker 7.2 + immersion 3 + 3 ring finals at typical 7.36 each = 22 + lighting 1.2 + EV 7.4 + heat pump 9 + battery charge 5 = 64.3 kW = 280 A at 230 V. That is the connected load — it is not the design current. Without diversity the dwelling needs a 300 A service which simply does not exist for a domestic single-phase supply.
            </p>
          </ConceptBlock>

          <div className="my-4">
            <ContentEyebrow>Try the calculator</ContentEyebrow>
            <LoadCalculator />
          </div>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 311.1 (Maximum demand)"
            clause="For economic and reliable design of an installation within thermal limits and admissible voltage drop, the maximum demand shall be determined as required by Regulation 311.1. When determining the maximum demand of an installation or part thereof, diversity may be taken into account."
            meaning={
              <>
                Reg 311.1 makes the diversified maximum demand the legal design input — not the connected load. The wording &ldquo;may be taken into account&rdquo; sounds permissive but in practice not applying diversity for typical dwellings would oversize the supply, the cables and the devices to the point of being unreasonable. The IET On-Site Guide Table A1 is the recognised dwelling reference for the diversity factors themselves.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 3, Regulation 311.1. See also Appendix 1 (British Standards) and the IET On-Site Guide Table A1."
          />

          <SectionRule />

          <ContentEyebrow>Step 2 — apply OSG Table A1 diversity per category</ContentEyebrow>

          <ConceptBlock
            title="Run the OSG categories one by one"
            plainEnglish="Each load category has its own formula. Apply it. Cite the OSG entry. Record the resulting Ib."
          >
            <p>
              Same dwelling, OSG Table A1 applied per category (verify against current OSG edition):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Shower 9.5 kW (41 A):</strong> 100 percent demand = 41 A. (Single instantaneous shower entry.)</li>
              <li><strong>Cooker 7.2 kW (31 A) with cooker socket:</strong> 10 A + 30 percent (31 − 10) + 5 A = 10 + 6.3 + 5 = 21.3 A. Round to 22 A.</li>
              <li><strong>Immersion 3 kW (13 A) uncontrolled:</strong> 100 percent = 13 A. (If off-peak only with no overlap, can be 0 percent — verify the install.)</li>
              <li><strong>Kitchen ring final:</strong> Largest ring at peak diversified to working figure ~20 A.</li>
              <li><strong>Lounge / dining ring final:</strong> 40 percent of second ring = ~13 A.</li>
              <li><strong>Upstairs ring final:</strong> 30 percent of subsequent = ~10 A.</li>
              <li><strong>Lighting 1.2 kW (5 A):</strong> 100 percent peak (evening all-on) = 5 A.</li>
              <li><strong>EV charger 7.4 kW load-managed:</strong> Setpoint 16 A peak (manufacturer fall-back) = 16 A. Failure-mode demand (per Reg 311.2): 32 A full rate.</li>
              <li><strong>Heat pump 9 kW (39 A):</strong> 100 percent = 39 A. (Cold-snap morning continuous demand.)</li>
              <li><strong>Battery charge 5 kW:</strong> Scheduled off-peak only = 0 A at peak window. Failure-mode (charge during peak): 22 A.</li>
            </ul>
            <p>
              Sum of category Ib at peak window (normal load-management operation): 41 + 22 + 13 + 20 + 13 + 10 + 5 + 16 + 39 + 0 = 179 A. Sum at failure-mode (EV at full + battery charging at peak): 41 + 22 + 13 + 20 + 13 + 10 + 5 + 32 + 39 + 22 = 217 A. Both before inter-category coincidence.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Step 3 — apply inter-category coincidence at supply origin</ContentEyebrow>

          <ConceptBlock
            title="Categories don't all peak at the same instant — but they do overlap"
            plainEnglish="A traditional dwelling gets a 0.6-0.7 inter-category coincidence (peaks spread). A heat-pump-and-EV dwelling gets 0.85-0.95 (peaks align on cold mornings)."
          >
            <p>
              Inter-category coincidence is the second diversity layer. Inside a single dwelling, cooker peak (dinner 18:00-20:00), shower peak (morning 06:30-08:00) and EV charge peak (overnight or load-managed) historically did not overlap much. The coincidence factor at the supply origin was traditionally 0.6-0.7.
            </p>
            <p>
              Modern dwellings with heat pump and EV change the picture:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cold-snap morning</strong> — heat pump runs continuously, shower in use, kettle on, EV may still be charging from overnight. Multiple categories overlap at the same instant.</li>
              <li><strong>Evening peak</strong> — cooker in use, lighting on, EV starts charging (with or without load management), heat pump may be on for evening warm-up. Multiple categories overlap.</li>
              <li><strong>Off-peak overnight</strong> — battery charging, EV charging, heat pump for overnight setpoint. The overnight load on a modern dwelling is much higher than 1990s overnight base.</li>
            </ul>
            <p>
              For our worked dwelling, applying 0.65 inter-category coincidence gives normal-mode Ib = 179 × 0.65 = 116 A; failure-mode Ib = 217 × 0.65 = 141 A. Both exceed a 100 A standard service. The OSG dwelling formula is conservative for traditional load mix but unconservative for heat-pump-and-EV mix.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.3(c) (Daily and yearly variation of demand)"
            clause="Designers shall account for daily and yearly variation of demand when determining circuit numbers and types. Seasonal or diurnal variations that affect loading and diversity shall be included in the design calculations and documented."
            meaning={
              <>
                Load-management failure-mode assessment falls under the Reg 132.3(c) requirement to record daily and yearly demand variation in the design. The design pack must record the normal-operation diversified Ib AND the failure-mode Ib (load-manager dropping out, EV charger reverting to manufacturer fall-back rate, battery charging at peak), with confirmation that the supply still survives the worst case. For our dwelling the failure-mode Ib of 141 A on a 100 A service is non-compliant — either tighten the load management to a fail-safe lower setpoint, upgrade the supply, or specify supply-protection that rides through the transient.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 132.3(c). See also OZEV smart charge points regulations 2018 / 2021."
          />

          <SectionRule />

          <ContentEyebrow>Step 4 — document the diversity calc and decide</ContentEyebrow>

          <ConceptBlock
            title="The diversity calc page belongs in the design pack"
            plainEnglish="One discrete page per dwelling. Category × diversity × source × Ib. Then the failure-mode row. Then the supply decision."
          >
            <p>
              The diversity calc page is what an inspector or future designer reads first. Layout per row:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Load category (e.g. &ldquo;Shower, en-suite&rdquo;).</li>
              <li>Connected load (kW and A at 230 V).</li>
              <li>Diversity factor applied (e.g. &ldquo;100 percent&rdquo; or &ldquo;10A + 30% remainder + 5A&rdquo;).</li>
              <li>Source citation (e.g. &ldquo;OSG Table A1, current edition, Cooker entry&rdquo;).</li>
              <li>Resulting category Ib (A).</li>
            </ul>
            <p>
              Footer rows: sum of category Ib; inter-category coincidence factor and source; supply-origin Ib normal mode; supply-origin Ib failure mode (per Reg 311.2); supply rating (cut-out fuse rating); margin (A) and percent.
            </p>
            <p>
              The decision row at the bottom: HOLD (margin healthy), LOAD-MANAGE (specify EV / battery setpoints to bring within margin), UPGRADE (DNO supply upgrade application), or DOCUMENTED RISK (customer accepts the tight margin in writing, with implications spelled out).
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

          <ContentEyebrow>Sizing the design margin — why 75-85 percent is the target</ContentEyebrow>

          <ConceptBlock
            title="Headroom absorbs transients, future creep and seasonal swings"
            plainEnglish="Design Ib at 100 percent of supply = nuisance trips. Design Ib at 75-85 percent = healthy. The margin pays for the unknowns."
          >
            <p>
              A diversified Ib of 100 A on a 100 A service is technically compliant under Reg 433.1.1 (Ib ≤ In ≤ Iz) but wrong as a design choice. The supply rating is for steady-state demand; transients exceed it briefly.
            </p>
            <p>
              Three things eat the margin:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Inrush transients</strong> — heat pump compressor start (3-6 second peak at 1.5-3x running), kettle start, EV charger ramp, fridge/freezer compressor cycling. None show on the steady-state diversity calc but all eat margin.</li>
              <li><strong>Future load creep</strong> — second EV, kitchen extension, hot tub, garden office, bigger heat pump. Customers add load; designs that left zero margin fail in 2-3 years.</li>
              <li><strong>Seasonal swings</strong> — cold-snap heating loads, summer cooling (becoming more common), high-use periods (Christmas, working from home). Diversity calc is for typical peak; some weeks exceed.</li>
            </ul>
            <p>
              Industry practice for domestic supply Ib is 75-85 percent of the service rating. On a 100 A cut-out: aim for 75-85 A diversified Ib. On a 125 A upgrade: 95-105 A. On a three-phase 80 A per phase: 60-70 A per phase. The 22-25 A margin pays for the unknowns; the customer does not get nuisance-tripped on a cold January morning.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <Scenario
            title="Four-bed dwelling — full worked decision"
            situation={
              <>
                Existing 100 A single-phase service. Customer wants to add 9 kW air-source heat pump and 7.4 kW EV charger to an existing dwelling that already has 9.5 kW shower, 7.2 kW cooker, immersion, three rings, lighting and PV. The L3 designer is asked: does the supply support the additions?
              </>
            }
            whatToDo={
              <>
                Build the load schedule (above). Apply OSG diversity per category (above). Apply inter-category coincidence: 0.65 traditional, but reality with heat pump cold-morning + EV evening is 0.85+. Use 0.85 as the realistic floor. Normal-mode Ib = 179 × 0.85 = 152 A. Failure-mode Ib = 217 × 0.85 = 184 A. Both well above 100 A.
                {"\n\n"}
                Decision tree: (1) HOLD is not viable — the supply does not survive. (2) LOAD-MANAGE: tighten EV setpoint to 10 A peak (gives normal-mode 179 − 6 = 173 × 0.85 = 147 A, still over) — load management alone does not save it. (3) UPGRADE: DNO application for 125 A single-phase or three-phase. 125 A gives 25 A margin at 100 A diversified, viable but tight. Three-phase 80 A per phase with balanced load gives ~60 A per phase, comfortable. (4) DOCUMENTED RISK: not appropriate — the failure-mode is non-compliant.
                {"\n\n"}
                Recommend three-phase upgrade. Document on the diversity calc page: existing 100 A service insufficient; proposed three-phase 80 A per phase; balanced load distribution across phases (heat pump on L1, EV on L2, household on L3, swap loads to balance); diversity calc page updated for the three-phase service. Customer accepts the DNO upgrade cost (typically £3000-5000 for an urban single-to-three-phase upgrade).
              </>
            }
            whyItMatters={
              <>
                Without the diversity calc, the customer would discover the supply is undersized only after install — typically when the heat pump runs in cold weather and the cut-out fuse blows mid-evening. By then the install is done; the upgrade has to be retro-fitted at much higher disruption cost. The diversity calc done at design stage is the single highest-leverage activity for the L3 designer on heat-pump and EV-rich dwellings.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Treating an OZEV-compliant EV charger as zero-load"
            whatHappens={
              <>
                A designer assumes the smart charger will always charge off-peak, removes EV from the diversity calc entirely, and signs off a 100 A supply on what works out as a 95 A diversified dwelling. Three months later the customer plugs in early evening (peak window, charger ramps up to manufacturer minimum delay) and the cut-out fuse blows.
              </>
            }
            doInstead={
              <>
                OZEV-compliant means the charger CAN be load-managed, not that it always defers. The default off-peak window is a customer-changeable setting, the randomised start delay is a 10-minute window not a 6-hour one, and demand-side response signals are not always present. Design the EV at its load-managed setpoint at peak (typically 16 A or 20 A) AND record the failure-mode (full 32 A) per Reg 311.2.
              </>
            }
          />

          <CommonMistake
            title="Sizing on traditional OSG diversity for a heat-pump dwelling"
            whatHappens={
              <>
                A designer applies the same OSG dwelling formula that worked for 1990s gas-heated dwellings. Result: diversified Ib of 60 A on a heat-pump-and-EV dwelling whose actual cold-morning peak is 110 A. The 100 A supply trips on the first cold weekend of October; the customer is without heat for hours.
              </>
            }
            doInstead={
              <>
                Treat the heat pump and EV as 100 percent design demand items. Apply OSG diversity to the rest of the dwelling. Sum the heat pump (full nameplate), EV (full or load-managed setpoint), and the diversified rest. Apply inter-category coincidence in the 0.85-0.95 range, not the traditional 0.65. The result for typical four-bed heat-pump-and-EV dwellings is 95-130 A — at or above the 100 A service. Either upgrade or refuse the install.
              </>
            }
          />

          <ConceptBlock
            title="Three-phase domestic — when the single-phase service runs out of headroom"
            plainEnglish="Most UK domestic supplies are 100 A single-phase. Where the diversified maximum demand approaches or exceeds 100 A — typical for a heat pump plus EV plus the standard domestic loads — the options are: enforce hard load management, upgrade the single-phase service to 125 A (typical DNO ceiling), or upgrade to three-phase. Three-phase delivers the same total kVA over three independent legs, with comfortable headroom on each."
            onSite="A typical urban single-to-three-phase upgrade costs £3000-5000 from the DNO and adds weeks to the project timeline. The design balances loads across the three phases — heat pump on one leg, EV on another, household ring finals and lighting on the third. Three-phase service brings additional complexity: balanced phase loading, three-phase consumer unit, three-phase RCD or per-phase RCD selection, possible per-phase ADS calc. The L3 apprentice's contribution is the load schedule and the per-phase allocation; the certified designer signs off the three-phase submission."
          >
            <p>
              Three-phase domestic install considerations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DNO upgrade cost and timeline</strong> — typically
                £3000-5000, 4-12 weeks; raises the customer's project
                budget noticeably.
              </li>
              <li>
                <strong>Three-phase consumer unit</strong> — typical
                domestic install uses a Hager VML or Wylex NHX three-phase
                board with TP&N busbars and per-phase or aggregated RCD
                protection.
              </li>
              <li>
                <strong>Per-phase load allocation</strong> — heat pump on
                L1, EV on L2, household on L3 is a typical starting
                allocation; refine to balance.
              </li>
              <li>
                <strong>Three-phase EV charger</strong> — 22 kW (32 A per
                phase) units charge faster but are more expensive than
                single-phase units; some customers retain a single-phase
                charger on one leg for cost.
              </li>
              <li>
                <strong>Three-phase heat pump</strong> — larger units
                (over 12 kW) often available three-phase; smaller units
                stay single-phase.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Battery storage on the diversity calc — both consumer and source"
            plainEnglish="A home battery system is a load when charging and a source when discharging. On the diversity calc both states matter. Charging state adds to the household demand (typically 3-5 kW for a domestic battery on AC charge); discharging state offsets the household demand and can support evening peak. The L3 designer accounts for both — sizing the supply to handle the worst-case demand even if the battery is charging on a cheap-tariff schedule."
            onSite="The typical 5-10 kWh domestic battery (Tesla Powerwall, GivEnergy, Sonnen, SolarEdge) charges at 3-5 kW from the grid and discharges at similar power into the household. On a tariff-managed system (Octopus Go, Octopus Flux), the battery typically charges 00:30-04:30 and discharges 16:00-19:00. The diversity calc captures: worst-case demand with battery charging plus household demand running; worst-case demand with battery discharging support absent (battery empty, fault, or ageing). The 311.2 failure-mode test is whether the supply survives if the battery is offline."
          >
            <p>
              Battery storage in the diversity calc:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Charge mode</strong> — adds to total demand;
                typical 3-5 kW for a domestic battery; concentrated in
                cheap-tariff windows.
              </li>
              <li>
                <strong>Discharge mode</strong> — offsets demand;
                concentrated in expensive-tariff windows; may export to
                grid if surplus.
              </li>
              <li>
                <strong>Failure mode</strong> — battery offline (fault,
                empty, ageing, comms loss); design must hold without the
                battery.
              </li>
              <li>
                <strong>Hybrid inverter sizing</strong> — typically 5 kW
                AC for a domestic system; sets the upper limit on the
                battery's contribution to demand.
              </li>
              <li>
                <strong>SEG export limit</strong> — DNO G98 / G99 caps the
                export; the inverter's export curtailment setting
                respects the cap.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Smart-meter data and PQ logger — ground-truth diversity for retrofit projects"
            plainEnglish="On a retrofit project (heat pump retrofit, EV charger addition, CU swap on an established household) the customer's smart-meter data is a ground-truth picture of historic demand. Pulling 12 months of half-hourly data shows the actual peak demand the household has reached, the time-of-day pattern, the seasonal swing. Where the smart meter is not available, a PQ logger left on the consumer unit for 1-2 weeks captures the same picture more locally."
            onSite="Customer can pull their own smart-meter data from their supplier's portal or from a DCC-licensed third party (Loop, Hugo Energy app, Bright app). The L3 apprentice can review with the customer at the survey visit. The data shows the historic peak and pattern — typical UK household peak is 30-50 A on the busiest evening; heat pump dwellings reach 60-70 A; EV-charging dwellings can hit 75-80 A even before retrofit. The retrofit additions stack on top of the historic peak, which is the more honest design baseline than the pure nameplate calc."
          >
            <p>
              Retrofit data sources and what they tell you:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Smart meter half-hourly data</strong> — customer
                portal or third-party app; 12 months of history.
              </li>
              <li>
                <strong>Supplier energy-use breakdown</strong> — kWh per
                month; less useful for peak but confirms total annual use.
              </li>
              <li>
                <strong>PQ logger (Fluke 1738, Hioki PQ3198)</strong> —
                clipped on the consumer unit for 1-2 weeks; captures
                voltage, current, harmonic events.
              </li>
              <li>
                <strong>Customer pattern interview</strong> — when
                they cook, when they shower, when they charge devices,
                weekday vs weekend; supplements the data.
              </li>
              <li>
                <strong>Existing fuse-blowing history</strong> — has the
                supply ever tripped? When? If yes, that is the empirical
                ceiling and the retrofit must respect it.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.2(c)(iii) (maximum allowable current)"
            clause={
              <>
                The documentation shall include maximum current allowable. Designers shall
                calculate and record the maximum permissible current capacity for the supply
                and protective devices as part of supply characteristics.
              </>
            }
            meaning={
              <>
                Domestic load assessment depends on the supply data Reg 132.2(c)(iii) requires
                the designer to determine and document — maximum current allowable in particular.
                Without that value the diversity calculation cannot be meaningfully closed
                against the supply ceiling.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.2(c)(iii)."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Domestic load assessment is a four-step workflow: (1) build connected load schedule, (2) apply OSG Table A1 diversity per category with source citations, (3) apply inter-category coincidence at the supply origin, (4) document on the diversity calc page and decide.",
              "Modern dwellings with heat pump + EV + battery are at or beyond the 100 A standard service. Diversified Ib is typically 95-130 A for a four-bed heat-pump-and-EV dwelling — exceeds the supply.",
              "Heat pump is 100 percent design demand because of long cold-snap duty cycle. EV charger is 100 percent unless OZEV-compliant load-managed. Battery charge usually scheduled off-peak so 0 A at peak — but the failure-mode case (charge during peak) belongs on the diversity calc.",
              "Inter-category coincidence inside a single dwelling has historically been 0.6-0.7. Heat-pump-and-EV dwellings push it to 0.85-0.95 because cold-morning categories align.",
              "Reg 311.2 (A4:2026) requires the design to assess maximum demand under all foreseeable conditions including load-management failure. Document the manufacturer fall-back behaviour and the failure-mode Ib; confirm the supply survives.",
              "Healthy design margin is 75-85 percent of supply rating at full diversified demand. The 15-25 percent margin absorbs inrush transients, future load creep and seasonal swings. Designs at 95-100 percent of supply rating fail within 2-3 years.",
              "The diversity calc page is the most-audited part of the design pack. Layout: category, connected load, diversity factor, source citation, category Ib; footer with sum, coincidence, supply-origin Ib normal and failure mode, supply rating, margin, decision.",
              "PV is generation, not load — it does not reduce supply Ib at the design level (PV generates near zero at evening peak). Battery discharge can reduce evening peak grid draw but design floor is no-battery worst case unless dispatch reliability verified.",
            ]}
          />

          <Quiz title="Domestic load assessment — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section2-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.2 Diversity factors deep-dive
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section2-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.4 Commercial load assessment
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
